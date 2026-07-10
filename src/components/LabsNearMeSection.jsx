import React from 'react';
import { LabLogo, DEFAULT_MARQUEE_LOGOS, LAB_LOGOS_B64, MARQUEE_NAME_B64 } from './LabLogo';
const LabsNearMeSection = ({ T, navTo, sbAdminSettings }) => {
  const logos = React.useMemo(() => {
    const hiddenDefaults = Array.isArray(sbAdminSettings['le_hidden_defaults']) ? sbAdminSettings['le_hidden_defaults'] : [];
    const defaults = DEFAULT_MARQUEE_LOGOS.filter(l => !hiddenDefaults.includes(l.id)).map(l => ({ ...l, b64: LAB_LOGOS_B64[l.id] || null }));
    const ids = Array.isArray(sbAdminSettings['le_logo_ids']) ? sbAdminSettings['le_logo_ids'] : [];
    const custom = ids.map(id => {
      const data = sbAdminSettings['le_logo_' + id];
      return (data && data.b64) ? { id, name: data.name || id, b64: data.b64 } : null;
    }).filter(Boolean);
    return [...defaults, ...custom];
  }, [sbAdminSettings]);
  // Triple the list for seamless loop (prevents visible jump on wide viewports)
  const doubled = [...logos, ...logos, ...logos];

  return (
  <section style={{ padding:"16px 0 56px", background:"#fff", borderBottom:"1px solid #F1F5F9", overflow:"hidden" }}>
    <div style={{ maxWidth:1600, margin:"0 auto", padding:"0 24px", marginBottom:18 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div>
          <p style={{ fontSize:".68rem",fontWeight:700,color:"#1158A6",letterSpacing:".12em",textTransform:"uppercase",marginBottom:4 }}>VERIFIED PARTNERS</p>
          <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.1rem,2.5vw,1.4rem)",fontWeight:900,color:"#0D1117",letterSpacing:"-.02em",lineHeight:1.2,margin:0 }}>Our Trusted Lab Partners</h2>
        </div>
        <button onClick={()=>navTo("labs")}
          style={{ background:"transparent",color:"#1158A6",border:"1.5px solid #1158A6",borderRadius:50,padding:"8px 20px",fontWeight:700,fontSize:".82rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:6,transition:"all .18s",whiteSpace:"nowrap" }}
          onMouseEnter={e=>e.currentTarget.style.background="#EFF6FF"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          View All <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </button>
      </div>
    </div>

    {/* marquee track */}
    <div style={{ overflow:"hidden", position:"relative", display:"flex", alignItems:"center", minHeight:110, paddingTop:32 }}>
      <style>{`
        @keyframes marquee-labs { from { transform: translateX(-33.3333%); } to { transform: translateX(0); } }
        .marquee-labs-track { display:flex; width:max-content; animation: marquee-labs 28s linear infinite; align-items:center; cursor:pointer; }
        .marquee-labs-track.paused { animation-play-state: paused; }
        .marquee-lab-logo img { height:64px; max-width:160px; object-fit:contain; filter:grayscale(10%); transition:filter .2s,transform .2s; }
        .marquee-lab-logo { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; margin:0 52px; flex-shrink:0; }
        .marquee-lab-logo:hover img { filter:grayscale(0%); transform:scale(1.06); }
        .marquee-lab-logo span { font-size:.78rem; font-weight:700; color:#64748B; font-family:'Manrope',sans-serif; white-space:nowrap; }
      `}</style>

      <div className="marquee-labs-track"
        onClick={e=>e.currentTarget.classList.toggle("paused")}
        onMouseLeave={e=>e.currentTarget.classList.remove("paused")}>
        {doubled.map((l,i)=>(
          <div key={i} className="marquee-lab-logo">
            {(l.b64||l.src)
              ? <img src={l.b64||l.src} alt={l.name}
                  style={{ height:64, maxWidth:160, objectFit:"contain" }}
                  onError={e=>{ e.target.replaceWith(Object.assign(document.createElement('div'),{
                    style:'width:64px;height:64px;border-radius:12px;background:#EFF6FF;border:1px solid #BFDBFE;display:flex;align-items:center;justify-content:center;font-size:1.3rem',
                    innerHTML:'🏥'
                  })); }}
                />
              : <div style={{ width:64, height:64, borderRadius:12, background:"#EFF6FF", border:"1px solid #BFDBFE", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"1.3rem" }}>🏥</span>
                </div>}
            <span>{l.name}</span>
          </div>
        ))}
      </div>
    </div>


  </section>
  );
}

export default LabsNearMeSection;
