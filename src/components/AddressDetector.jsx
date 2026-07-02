import React, { useState, useEffect, useRef, useCallback } from 'react';

const _locCache = { lat: null, lng: null, address: null, accuracy: null, ts: 0 };
const LOC_TTL  = 3 * 60 * 1000; // 3 min — don't re-request GPS within this window
const ACC_GOOD = 50;             // metres — accept immediately if GPS reaches this
const DEADLINE = 12000;          // ms  — hard cutoff, use best fix we have by then

// ─── Geocoding ────────────────────────────────────────────────────────────────
const GMAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || "";

async function _fetchJSON(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(r.status);
  return r.json();
}

// ── Google Maps: extract one component type from address_components ──────────
function _gc(components, type) {
  const c = components.find(x => x.types.includes(type));
  return c ? c.long_name : "";
}

// ── Google Maps Geocoding + nearby POI (CORS-safe from browser) ──────────────
async function _googleGeocode(lat, lng) {
  const base = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&key=${GMAPS_KEY}`;

  // Two parallel calls:
  //   1. General reverse geocode  → address_components
  //   2. POI filter               → nearest named establishment/landmark
  const [general, poi] = await Promise.allSettled([
    _fetchJSON(base),
    _fetchJSON(`${base}&result_type=point_of_interest|establishment|premise`),
  ]);

  if (general.status !== "fulfilled" || !general.value.results?.length) {
    throw new Error("google_no_results");
  }

  // Merge components from ALL results so we capture the most specific data
  // (Google returns multiple results at different granularities)
  const allComps = {};
  for (const result of general.value.results) {
    for (const comp of result.address_components) {
      for (const type of comp.types) {
        if (!allComps[type]) allComps[type] = comp.long_name; // first = most specific
      }
    }
  }

  // Nearest landmark name from POI call
  const poiName = poi.status === "fulfilled"
    ? poi.value.results?.[0]?.name || ""
    : "";

  const comps = general.value.results[0].address_components;

  return {
    streetNumber : _gc(comps, "street_number"),
    route        : _gc(comps, "route")
                || allComps["route"] || "",
    premise      : _gc(comps, "premise")
                || allComps["premise"] || "",
    sublocality2 : allComps["sublocality_level_2"] || "",
    sublocality1 : _gc(comps, "sublocality_level_1")
                || allComps["sublocality_level_1"] || "",
    neighborhood : allComps["neighborhood"] || "",
    locality     : _gc(comps, "locality")
                || allComps["locality"] || "",
    state        : _gc(comps, "administrative_area_level_1")
                || allComps["administrative_area_level_1"] || "",
    pin          : _gc(comps, "postal_code")
                || allComps["postal_code"] || "",
    landmark     : poiName,
  };
}

// ── BigDataCloud fallback (free, no key, reasonable India coverage) ───────────
async function _bigdataGeocode(lat, lng) {
  const d = await _fetchJSON(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  return {
    streetNumber : "",
    route        : d.locality || "",
    premise      : "",
    sublocality2 : "",
    sublocality1 : d.locality || "",
    neighborhood : "",
    locality     : d.city || d.locality || "",
    state        : d.principalSubdivision || "",
    pin          : d.postcode || "",
    landmark     : "",
  };
}

// ── Nominatim fallback (zoom=18, last resort) ─────────────────────────────────
async function _nominatimGeocode(lat, lng) {
  const d = await _fetchJSON(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&extratags=1&accept-language=en&lat=${lat}&lon=${lng}&zoom=18`
  );
  const a = d.address || {};
  return {
    streetNumber : a.house_number || "",
    route        : a.road || a.residential || a.pedestrian || "",
    premise      : a.building || a.amenity || "",
    sublocality2 : "",
    sublocality1 : a.neighbourhood || a.suburb || a.quarter || "",
    neighborhood : a.neighbourhood || "",
    locality     : a.city || a.town || a.village || "",
    state        : a.state || "",
    pin          : a.postcode || "",
    landmark     : (d.name && d.name !== a.road) ? d.name : "",
  };
}

async function reverseGeocodeAll(lat, lng) {
  // Google Maps if key is configured, otherwise fall through to free services
  if (GMAPS_KEY) {
    try { return await _googleGeocode(lat, lng); } catch { /* fall through */ }
  }
  // BigDataCloud first (better India city/pin data), then Nominatim
  try { return await _bigdataGeocode(lat, lng); } catch { /* fall through */ }
  return _nominatimGeocode(lat, lng);
}

function buildAddressString({ streetNumber, route, premise, sublocality2, sublocality1, neighborhood, locality, state, pin, landmark }) {
  // ── Build each segment, most specific → least specific ───────────────────
  // Line 1: street number + road
  const streetPart = [streetNumber, route].filter(Boolean).join(", ");

  // Sublocality: prefer level 2 (more granular) then level 1
  const areaPart = sublocality2 || sublocality1 || neighborhood || "";

  // Nearby landmark (prefix "near")
  const nearPart = landmark ? `near ${landmark}` : (premise || "");

  const parts = [
    streetPart,   // e.g. "1-711, Moghulpura Fire Station Road"
    nearPart,     // e.g. "near Moghalpura Fire Station"
    areaPart,     // e.g. "Moghalpura"
    locality,     // e.g. "Hyderabad"
    state,        // e.g. "Telangana"
    pin,          // e.g. "500002"
  ].filter(Boolean);

  return parts.join(", ");
}

// ─── Component ────────────────────────────────────────────────────────────────
function AddressDetector({ value, onChange }) {
  const [phase,    setPhase]    = useState("idle"); // idle|locking|geocoding|success|error
  const [accuracy, setAccuracy] = useState(null);
  const [errMsg,   setErrMsg]   = useState("");
  const watchIdRef  = useRef(null);
  const bestPosRef  = useRef(null);
  const timerRef    = useRef(null);
  const finishedRef = useRef(false); // Bug 2 fix: guard against double-call

  useEffect(() => () => _cleanup(), []);

  function _cleanup() {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    clearTimeout(timerRef.current);
  }

  async function _geocodeAndFinish(pos) {
    // Bug 2 fix: only the first caller proceeds
    if (finishedRef.current) return;
    finishedRef.current = true;
    _cleanup();
    setPhase("geocoding");
    const { latitude: lat, longitude: lng, accuracy: acc } = pos.coords;
    try {
      const parts = await reverseGeocodeAll(lat, lng);
      const addr  = buildAddressString(parts);
      _locCache.lat = lat; _locCache.lng = lng;
      _locCache.address = addr; _locCache.accuracy = Math.round(acc); _locCache.ts = Date.now();
      onChange(addr);
      setAccuracy(Math.round(acc));
      setPhase("success");
    } catch {
      setErrMsg("Could not fetch address details. Please type it manually.");
      setPhase("error");
    }
  }

  async function detect() {
    if (phase === "locking" || phase === "geocoding") return;

    // Serve from cache if fresh
    if (_locCache.address && Date.now() - _locCache.ts < LOC_TTL) {
      onChange(_locCache.address);
      setAccuracy(_locCache.accuracy);
      setPhase("success");
      return;
    }

    if (!navigator.geolocation) {
      setErrMsg("GPS not available on this browser. Please type your address.");
      setPhase("error");
      return;
    }

    finishedRef.current = false;
    bestPosRef.current  = null;
    setPhase("locking");
    setErrMsg("");
    setAccuracy(null);

    // Bug 1 & 3 fix: timeout:Infinity prevents watchPosition from self-erroring.
    // We control the deadline ourselves via setTimeout below.
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const acc = pos.coords.accuracy;
        setAccuracy(Math.round(acc));
        if (!bestPosRef.current || acc < bestPosRef.current.coords.accuracy) {
          bestPosRef.current = pos;
        }
        // Accept immediately if GPS is precise enough
        if (acc <= ACC_GOOD) _geocodeAndFinish(pos);
      },
      (err) => {
        // Only handle permission denied (code 1) — other codes mean no signal yet,
        // our deadline timer handles those cases.
        if (err.code === 1) {
          _cleanup();
          setErrMsg("Location permission denied. Enable it in Chrome Settings → Site Settings → Location.");
          setPhase("error");
        }
        // codes 2 & 3: GPS just hasn't fixed yet — keep waiting for deadline
      },
      // Bug 1 fix: timeout:Infinity — never let watchPosition self-error on timeout
      { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }
    );

    // Hard deadline: use best fix seen, even if > ACC_GOOD
    timerRef.current = setTimeout(() => {
      if (bestPosRef.current) {
        _geocodeAndFinish(bestPosRef.current);
      } else {
        _cleanup();
        if (!finishedRef.current) {
          finishedRef.current = true;
          setErrMsg("GPS signal too weak indoors. Move near a window or step outside, then try again.");
          setPhase("error");
        }
      }
    }, DEADLINE);
  }

  const isWorking  = phase === "locking" || phase === "geocoding";
  const phaseLabel = phase === "geocoding" ? "Fetching address…"
    : accuracy ? `Finding precise location… ±${accuracy}m` : "Requesting GPS permission…";

  return (
    <div>
      {phase !== "success" && (
        <button type="button" onClick={detect} disabled={isWorking}
          style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",
            padding:"11px 16px",marginBottom:10,border:"1.5px dashed #1158A6",borderRadius:10,
            background:isWorking?"#EEF4FF":"#F5F7FF",color:"#1158A6",fontWeight:700,
            fontSize:".83rem",cursor:isWorking?"not-allowed":"pointer",
            fontFamily:"'Manrope',sans-serif",transition:"all .15s" }}>
          {isWorking
            ? <><svg style={{animation:"spin 1s linear infinite"}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>{phaseLabel}</>
            : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>Use Current Location</>
          }
        </button>
      )}


      {/* Accuracy bar — visible while locking */}
      {phase === "locking" && accuracy && (
        <div style={{ marginBottom:8,fontSize:".73rem",color:"#6B7280",fontWeight:600,display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ flex:1,height:4,background:"#E5E7EB",borderRadius:2,overflow:"hidden" }}>
            <div style={{ height:"100%",borderRadius:2,transition:"width .4s",
              width:`${Math.max(5,Math.min(100,100-(accuracy/3)))}%`,
              background: accuracy<=ACC_GOOD?"#16A34A":accuracy<=100?"#F59E0B":"#EF4444" }}/>
          </div>
          <span style={{color:accuracy<=ACC_GOOD?"#16A34A":accuracy<=100?"#D97706":"#DC2626"}}>±{accuracy}m</span>
          {accuracy > ACC_GOOD && <span style={{color:"#9CA3AF",fontWeight:500}}>Improving…</span>}
        </div>
      )}

      {/* Weak signal hint */}
      {phase === "locking" && accuracy && accuracy > ACC_MAX && (
        <div style={{ background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:8,padding:"8px 12px",marginBottom:8,fontSize:".75rem",color:"#92400E",fontWeight:600 }}>
          📡 Weak GPS signal. Move near a window or step outside for better accuracy.
        </div>
      )}

      {/* Error banner */}
      {phase === "error" && (
        <div style={{ background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:8,padding:"9px 13px",marginBottom:10,fontSize:".78rem",color:"#DC2626",fontWeight:600,display:"flex",gap:7,alignItems:"flex-start" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {errMsg}
        </div>
      )}

      {/* Success pill + accuracy badge */}
      {phase === "success" && (
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap" }}>
          <div style={{ background:"#DCFCE7",color:"#16A34A",fontSize:".73rem",fontWeight:700,padding:"3px 10px",borderRadius:20,display:"flex",alignItems:"center",gap:5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Location detected
          </div>
          {accuracy && <span style={{ fontSize:".72rem",color:"#6B7280",fontWeight:600 }}>±{accuracy}m accuracy</span>}
          <button type="button" onClick={()=>{ setPhase("idle"); setAccuracy(null); onChange(""); }}
            style={{ background:"none",border:"none",color:"#9CA3AF",fontSize:".73rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontWeight:600,padding:0,marginLeft:"auto" }}>
            Re-detect
          </button>
        </div>
      )}

      {/* Always-visible editable textarea */}
      <textarea rows={3}
        style={{ width:"100%",border:"1.5px solid #DBEAFE",borderRadius:10,padding:"11px 14px",
          fontSize:".87rem",fontFamily:"'Manrope',sans-serif",background:"#fff",color:"#111",
          outline:"none",resize:"vertical",boxSizing:"border-box",transition:"border-color .15s",lineHeight:1.6 }}
        placeholder="Door No 24, Afif Plaza, Fire Station Rd, near Moghalpura, Hyderabad, Telangana 500002"
        value={value}
        onChange={e=>onChange(e.target.value)}
        onFocus={e=>e.target.style.borderColor="#1158A6"}
        onBlur={e=>e.target.style.borderColor="#DBEAFE"}
      />
    </div>
  );
}

export { AddressDetector, buildAddressString };
