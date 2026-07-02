import React, { useState, useRef } from 'react';
const UploadPrescription = () => {
  const [sheet,   setSheet]   = useState(false); // source picker sheet
  const [modal,   setModal]   = useState(false); // upload review modal
  const [file,    setFile]    = useState(null);
  const [preview, setPreview] = useState(null);
  const [status,  setStatus]  = useState("idle"); // idle | uploading | done
  const [pct,     setPct]     = useState(0);
  const galleryRef = useRef(null);
  const cameraRef  = useRef(null);

  const MAX_MB = 10;

  const ingest = f => {
    if (!f) return;
    const allowed = ['image/jpeg','image/png','image/jpg','application/pdf'];
    if (!allowed.includes(f.type)) { alert('Only JPG, PNG, or PDF files are allowed.'); return; }
    if (f.size > MAX_MB * 1024 * 1024) { alert(`File must be under ${MAX_MB} MB.`); return; }
    setFile(f);
    setPct(0); setStatus("idle");
    if (f.type.startsWith("image/")) {
      const r = new FileReader();
      r.onload = e => setPreview(e.target.result);
      r.readAsDataURL(f);
    } else setPreview(null);
    setSheet(false);
    setModal(true);
  };

  const handleChange = e => ingest(e.target.files?.[0]);

  const startUpload = () => {
    setStatus("uploading"); setPct(0);
    const iv = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(iv); setStatus("done"); return 100; }
        return p + Math.random() * 14 + 4;
      });
    }, 180);
  };

  const close = () => {
    setModal(false); setSheet(false);
    setFile(null); setPreview(null); setStatus("idle"); setPct(0);
    if (galleryRef.current) galleryRef.current.value = "";
    if (cameraRef.current)  cameraRef.current.value  = "";
  };

  const fmt = b => b > 1024*1024 ? (b/1024/1024).toFixed(1)+" MB" : Math.round(b/1024)+" KB";
  const isPdf = file?.type === "application/pdf";

  return (
    <>
      {/* ── TRIGGER BUTTON ── */}
      <button onClick={() => setSheet(true)} className="nav-a"
        style={{ background:"transparent",border:"none",cursor:"pointer",color:"var(--muted)",fontWeight:700,fontSize:".86rem",padding:"7px 6px",borderRadius:8,fontFamily:"'Manrope',sans-serif",transition:"color .15s" }}>
        Upload Prescription
      </button>

      {/* hidden file inputs */}
      <input ref={galleryRef} type="file" accept="image/*,application/pdf" style={{ display:"none" }} onChange={handleChange}/>
      <input ref={cameraRef}  type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={handleChange}/>

      {/* ── SOURCE PICKER SHEET ── */}
      {sheet && (
        <div onClick={close} style={{ position:"fixed",inset:0,zIndex:4000,background:"rgba(13,17,25,.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)",animation:"fadeIn .15s" }}>
          <div onClick={e=>e.stopPropagation()}
            style={{ background:"#fff",width:"100%",maxWidth:480,borderRadius:"28px 28px 0 0",padding:"0 0 env(safe-area-inset-bottom,24px)",fontFamily:"'Manrope',sans-serif",animation:"slideUp .26s cubic-bezier(.22,1,.36,1)",boxShadow:"0 -8px 40px rgba(0,0,0,.18)" }}>

            {/* handle bar */}
            <div style={{ width:40,height:4,borderRadius:99,background:"#D1D5DB",margin:"14px auto 0" }}/>

            {/* header section */}
            <div style={{ padding:"20px 24px 18px",borderBottom:"1px solid #F1F5F9" }}>
              <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#1158A6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 4px 14px rgba(17,88,166,.3)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:"1.08rem",color:"#0D1117",letterSpacing:"-.01em" }}>Upload Prescription</div>
                  <div style={{ fontSize:".78rem",color:"#9CA3AF",marginTop:2 }}>JPG · PNG · PDF &nbsp;·&nbsp; Max 10 MB</div>
                </div>
              </div>
            </div>

            {/* option buttons */}
            <div style={{ padding:"16px 20px",display:"flex",flexDirection:"column",gap:10 }}>

              {/* Take Photo */}
              <button
                onClick={() => { cameraRef.current?.click(); }}
                style={{ display:"flex",alignItems:"center",gap:14,background:"#F0F6FF",border:"1.5px solid #BFDBFE",borderRadius:18,padding:"14px 16px",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",width:"100%",transition:"all .18s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 1px 4px rgba(17,88,166,.06)" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#1158A6"; e.currentTarget.style.background="#EFF6FF"; e.currentTarget.style.transform="scale(1.01)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(17,88,166,.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#BFDBFE"; e.currentTarget.style.background="#F0F6FF"; e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(17,88,166,.06)"; }}>
                <div style={{ width:50,height:50,borderRadius:15,background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid #BFDBFE" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:".95rem",color:"#0D1117",marginBottom:3,letterSpacing:"-.005em" }}>Take a Photo</div>
                  <div style={{ fontSize:".76rem",color:"#6B7280",lineHeight:1.5 }}>Open camera to photograph your prescription</div>
                </div>
                <div style={{ width:28,height:28,borderRadius:9,background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12l4-4-4-4"/></svg>
                </div>
              </button>

              {/* Choose from Gallery / Files */}
              <button
                onClick={() => { galleryRef.current?.click(); }}
                style={{ display:"flex",alignItems:"center",gap:14,background:"#F8F8FF",border:"1.5px solid #D0D4F7",borderRadius:18,padding:"14px 16px",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",width:"100%",transition:"all .18s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 1px 4px rgba(99,102,241,.06)" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#6366F1"; e.currentTarget.style.background="#EEEEFD"; e.currentTarget.style.transform="scale(1.01)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(99,102,241,.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#D0D4F7"; e.currentTarget.style.background="#F8F8FF"; e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(99,102,241,.06)"; }}>
                <div style={{ width:50,height:50,borderRadius:15,background:"linear-gradient(135deg,#EDEDFE,#DFE0FB)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid #C4C7F5" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2.5"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:".95rem",color:"#0D1117",marginBottom:3,letterSpacing:"-.005em" }}>Choose from Gallery</div>
                  <div style={{ fontSize:".76rem",color:"#6B7280",lineHeight:1.5 }}>Pick an image or PDF from your device</div>
                </div>
                <div style={{ width:28,height:28,borderRadius:9,background:"#EDEDFE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#6366F1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12l4-4-4-4"/></svg>
                </div>
              </button>
            </div>

            {/* security note */}
            <div style={{ margin:"0 20px 8px",background:"#F5F7FF",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:9,border:"1px solid #F1F5F9" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize:".72rem",color:"#9CA3AF",lineHeight:1.4 }}>Your prescription is encrypted and shared only with your chosen lab</span>
            </div>

            <div style={{ padding:"4px 20px 28px" }}>
              <button onClick={close} style={{ width:"100%",background:"#F5F7FF",border:"none",color:"#374151",fontWeight:700,fontSize:".88rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",padding:"13px",borderRadius:14,transition:"background .14s" }}
                onMouseEnter={e=>e.currentTarget.style.background="#E5E7EB"}
                onMouseLeave={e=>e.currentTarget.style.background="#F5F7FF"}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── REVIEW & UPLOAD MODAL ── */}
      {modal && file && (
        <div onClick={e=>{ if(e.target===e.currentTarget) close(); }}
          style={{ position:"fixed",inset:0,zIndex:4000,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)",animation:"fadeIn .15s" }}>
          <div style={{ background:"#fff",borderRadius:22,maxWidth:480,width:"100%",fontFamily:"'Manrope',sans-serif",boxShadow:"0 32px 80px rgba(0,0,0,.28)",animation:"scaleIn .22s cubic-bezier(.34,1.56,.64,1)",overflow:"hidden" }}>

            {/* header */}
            <div style={{ padding:"20px 22px 16px",borderBottom:"1px solid #F1F5F9",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <div>
                <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117" }}>Review Prescription</div>
                <div style={{ fontSize:".73rem",color:"#9CA3AF",marginTop:2 }}>Verify the file looks correct before uploading</div>
              </div>
              <button onClick={close} style={{ width:32,height:32,borderRadius:"50%",background:"#F1F5F9",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",flexShrink:0,fontSize:"1rem" }}>✕</button>
            </div>

            <div style={{ padding:"20px 22px 22px" }}>

              {/* image preview */}
              {preview ? (
                <div style={{ borderRadius:14,overflow:"hidden",marginBottom:16,border:"1px solid #E5E7EB",background:"#F5F7FF",display:"flex",alignItems:"center",justifyContent:"center",minHeight:180 }}>
                  <img src={preview} alt="Prescription" style={{ maxHeight:240,maxWidth:"100%",objectFit:"contain",display:"block" }}/>
                </div>
              ) : (
                <div style={{ borderRadius:14,border:"1px solid #E5E7EB",background:"#FEF2F2",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 16px",marginBottom:16,gap:8 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <div style={{ fontWeight:700,fontSize:".86rem",color:"#DC2626" }}>PDF Document</div>
                </div>
              )}

              {/* file chip */}
              <div style={{ display:"flex",alignItems:"center",gap:12,background:"#F5F7FF",borderRadius:11,padding:"11px 14px",border:"1px solid #E9EEF2",marginBottom:16 }}>
                <div style={{ width:36,height:36,borderRadius:9,background:isPdf?"#FEE2E2":"#DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  {isPdf
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  }
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontWeight:700,fontSize:".84rem",color:"#0D1117",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{file.name}</div>
                  <div style={{ fontSize:".72rem",color:"#9CA3AF",marginTop:1 }}>{fmt(file.size)} · {isPdf?"PDF Document":"Image"}</div>
                </div>
                {status === "done" && (
                  <div style={{ width:24,height:24,borderRadius:"50%",background:"#1158A6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 4.5,9 10.5,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>

              {/* progress bar */}
              {status === "uploading" && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",fontSize:".72rem",fontWeight:600,color:"#6B7280",marginBottom:6 }}>
                    <span>Uploading…</span><span>{Math.min(100,Math.round(pct))}%</span>
                  </div>
                  <div style={{ height:5,background:"#F1F5F9",borderRadius:99,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${Math.min(100,pct)}%`,background:"linear-gradient(90deg,#1158A6,#2563EB)",borderRadius:99,transition:"width .2s linear" }}/>
                  </div>
                </div>
              )}

              {/* success */}
              {status === "done" && (
                <div style={{ background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:11,padding:"12px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"flex-start" }}>
                  <div style={{ width:22,height:22,borderRadius:"50%",background:"#1158A6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 4.5,9 10.5,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:".84rem",color:"#1158A6" }}>Uploaded successfully!</div>
                    <div style={{ fontSize:".73rem",color:"#6B7280",marginTop:1 }}>Our team will review your prescription and reach out within 2 hours.</div>
                  </div>
                </div>
              )}

              {/* actions */}
              {status === "done" ? (
                <button onClick={close} style={{ width:"100%",background:"#1158A6",color:"#fff",border:"none",borderRadius:11,padding:"12px",fontWeight:700,fontSize:".9rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>Done</button>
              ) : (
                <div style={{ display:"flex",gap:10 }}>
                  <button onClick={close} style={{ flex:1,background:"transparent",color:"#6B7280",border:"1.5px solid #E5E7EB",borderRadius:11,padding:"12px",fontWeight:700,cursor:"pointer",fontSize:".86rem",fontFamily:"'Manrope',sans-serif" }}>Cancel</button>
                  <button onClick={startUpload} disabled={status==="uploading"}
                    style={{ flex:2,background:status==="uploading"?"#BFDBFE":"#1158A6",color:"#fff",border:"none",borderRadius:11,padding:"12px",fontWeight:700,cursor:status==="uploading"?"default":"pointer",fontSize:".88rem",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"background .18s" }}>
                    {status === "uploading"
                      ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" style={{ animation:"spin .85s linear infinite",transformOrigin:"12px 12px" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Uploading…</>
                      : <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                          Upload Prescription
                        </>
                    }
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UploadPrescription;
