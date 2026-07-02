import React from 'react';
import LabIcon from './LabIcon';
import { LabLogo } from './LabLogo';
import { Stars, Pill, pct, Modal, TODAY } from './ui/index';

export function LabCardML({ l, T, setLab, setCatF, setTestQ, setSelectedTest, navTo, selectedTest, addCart, setCartOpen }) {
  const minPrice = l.tests?.length ? Math.min(...l.tests.map(t=>t.price)) : null;
  const reportTime = l.reportTime || "";

  // Find the matching test for the selected test in this lab
  const matchedTest = selectedTest ? (
    l.tests.find(t => t.name.toLowerCase() === selectedTest.name.toLowerCase())
    || l.tests.find(t => t.name.toLowerCase().includes(selectedTest.name.toLowerCase()) || selectedTest.name.toLowerCase().includes(t.name.toLowerCase()))
    || l.tests.find(t => t.cat === selectedTest.cat)
  ) : null;

  // Price to show: matched test price if a test is selected, else min price
  const displayPrice = matchedTest ? matchedTest.price : minPrice;
  const displayLabel = matchedTest ? matchedTest.name : null;

  // When a test is pre-selected, clicking the card/Book Now auto-adds it and opens cart
  const handleBookDirect = (e) => {
    if (!selectedTest || !addCart) return false;
    e?.stopPropagation?.();
    const match = matchedTest || l.tests[0];
    if (match) { addCart(l, match); if (setCartOpen) setCartOpen(true); return true; }
    return false;
  };

  return (
    <div style={{ background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,marginBottom:12,overflow:"hidden",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}
      onClick={(e)=>{ if(selectedTest){ handleBookDirect(e); return; } setLab(l); setCatF("All"); setTestQ(""); if(setSelectedTest) setSelectedTest(null); navTo("lab"); }}>
      <div style={{ padding:"20px 18px 18px" }}>
        <div style={{ display:"flex",gap:14,alignItems:"flex-start",marginBottom:16 }}>
          <div style={{ flexShrink:0 }}><LabLogo lab={l} size={86} radius={10}/></div>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ fontWeight:900,fontSize:"1.08rem",color:"#0D1117",lineHeight:1.3,letterSpacing:"-.02em",marginBottom:2 }}>{l.name}</div>
            <div style={{ fontSize:".78rem",color:"#6B7280",marginBottom:5 }}>
              {[l.address, l.area, l.city].filter(Boolean).join(", ") || l.city || "—"}
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:".83rem",fontWeight:700,color:"#16A34A",marginBottom:5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#16A34A"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>
              {l.tests.length} Tests Available
            </div>
            {(()=>{
              const rating = l.rating||4.5;
              const full = Math.floor(rating);
              const pct  = Math.round((rating - full)*100);
              const gid  = `lsg-${l.id}`;
              return (
                <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                  <span style={{ fontWeight:900,fontSize:"1rem",color:"#0D1117" }}>{rating.toFixed(1)}</span>
                  <div style={{ display:"flex",gap:1 }}>
                    {Array.from({length:5},(_,i)=>{
                      const sid=`${gid}-${i}`;
                      if(i<full) return <svg key={i} width="20" height="20" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#F59E0B" stroke="none"/></svg>;
                      if(i===full&&pct>0) return <svg key={i} width="20" height="20" viewBox="0 0 24 24"><defs><linearGradient id={sid} x1="0" y1="0" x2="1" y2="0"><stop offset={`${pct}%`} stopColor="#F59E0B"/><stop offset={`${pct}%`} stopColor="#D1D5DB"/></linearGradient></defs><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={`url(#${sid})`} stroke="none"/></svg>;
                      return <svg key={i} width="20" height="20" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#D1D5DB" stroke="none"/></svg>;
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
        <div style={{ height:1,background:"#F1F5F9",margin:"0 -18px 14px" }}/>

        {/* Selected test price */}
        {displayLabel && (
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:5,background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:6,padding:"3px 10px",fontSize:".72rem",fontWeight:700,color:"#1158A6",marginBottom:6 }}>
              🔬 {displayLabel}
            </div>
            <div style={{ fontSize:"1rem",fontWeight:800,color:"#0D1117" }}>
              ₹{displayPrice?.toLocaleString()}
              <span style={{ fontWeight:400,fontSize:".78rem",color:"#9CA3AF",marginLeft:5 }}>for this test</span>
            </div>
          </div>
        )}

        {reportTime && (
          <div style={{ fontSize:".7rem",fontWeight:800,color:"#16A34A",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10,textAlign:"center" }}>REPORTS IN {reportTime.toUpperCase()}</div>
        )}
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",marginBottom:12,gap:18 }}>
          <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:".8rem",color:"#374151",fontWeight:500 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {l.timing||"6AM – 10PM"}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:".8rem",color:"#374151",fontWeight:500 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            {l.homeCollection!==false
              ? (l.homeCollectionFee && l.homeCollectionFee.toString().toLowerCase()!=="free"
                  ? `Home Collection · ₹${l.homeCollectionFee} extra`
                  : "Home Collection · Free")
              : "Walk-in Only"}
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"center" }}>
          {selectedTest ? (
            <button onClick={e=>{ e.stopPropagation(); const match = matchedTest || l.tests[0]; if(match){ addCart(l, match); if(setCartOpen) setCartOpen(true); } }}
              style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:10,padding:"13px 0",fontWeight:700,cursor:"pointer",fontSize:".88rem",fontFamily:"'Manrope',sans-serif",boxShadow:"0 3px 12px rgba(17,88,166,.35)",transition:"background .15s",width:"85%" }}
              onMouseEnter={e=>e.currentTarget.style.background="#0F2D6B"}
              onMouseLeave={e=>e.currentTarget.style.background="#1158A6"}>
              Book Now
            </button>
          ) : (
            <button onClick={e=>{ e.stopPropagation(); if(setSelectedTest) setSelectedTest(null); setLab(l); setCatF("All"); setTestQ(""); navTo("lab"); }}
              style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:10,padding:"13px 0",fontWeight:700,cursor:"pointer",fontSize:".88rem",fontFamily:"'Manrope',sans-serif",boxShadow:"0 3px 12px rgba(17,88,166,.35)",transition:"background .15s",width:"85%" }}
              onMouseEnter={e=>e.currentTarget.style.background="#0F2D6B"}
              onMouseLeave={e=>e.currentTarget.style.background="#1158A6"}>
              View Tests &amp; Prices
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


/* ─── LAB BANNER (background-image avoids overflow/border-radius clipping bugs) ── */
export function LabBanner({ lab }) {
  const meta = LAB_META.find(m => m.id === lab.id);
  const embedded = LAB_LOGOS_B64[lab.id];
  const src = lab.logoBase64 || lab.logoUrl || embedded || (meta?.srcs?.[0]) || '';
  const accent = meta?.accent || "#1158A6";
  const bg = meta?.bg || "#EEF4FF";
  if (src) return (
    <div style={{ width:"100%", height:"100%", backgroundImage:`url(${src})`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat", borderRadius:12 }}/>
  );
  return (
    <div style={{ width:"100%", height:"100%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:12 }}>
      <span style={{ fontFamily:"Manrope,sans-serif", fontWeight:900, fontSize:56, color:accent, lineHeight:1 }}>
        {(meta?.short || lab.name).slice(0,2)}
      </span>
    </div>
  );
}

/* ─── SKELETON LOADER ─────────────────────────────────────────────────────── */
export function LabCardSkeleton({ delay = 0 }) {
  return (
    <div style={{ background:"#fff",borderRadius:16,border:"1px solid #F0F4F8",padding:"20px 18px",marginBottom:12,overflow:"hidden",opacity:0,animation:`revealUp .4s ease ${delay}ms both` }}>
      {/* Top row: logo + details */}
      <div style={{ display:"flex",gap:14,alignItems:"flex-start",marginBottom:14 }}>
        <div className="sk" style={{ width:72,height:72,borderRadius:14,flexShrink:0 }}/>
        <div style={{ flex:1,paddingTop:2 }}>
          <div className="sk" style={{ height:15,width:"65%",marginBottom:10 }}/>
          <div className="sk" style={{ height:11,width:"42%",marginBottom:8 }}/>
          <div className="sk" style={{ height:11,width:"55%",marginBottom:10 }}/>
          <div className="sk" style={{ height:20,width:"28%",borderRadius:99 }}/>
        </div>
      </div>
      {/* Divider */}
      <div style={{ height:1,background:"#F0F4F8",margin:"0 0 14px" }}/>
      {/* Bottom row: 2 stat chips + button */}
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        <div className="sk" style={{ height:32,width:90,borderRadius:8,flexShrink:0 }}/>
        <div className="sk" style={{ height:32,width:90,borderRadius:8,flexShrink:0 }}/>
        <div style={{ flex:1 }}/>
        <div className="sk" style={{ height:36,width:88,borderRadius:10,flexShrink:0 }}/>
      </div>
    </div>
  );
}
