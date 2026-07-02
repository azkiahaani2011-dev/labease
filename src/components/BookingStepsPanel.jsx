import React from 'react';

const HOW_TO_STEPS = [
  { n:1, title:"Search Tests & Packages",
    desc:"Type any test name, health package, or category. Browse 1,500+ tests from certified labs — all in one place." },
  { n:2, title:"Compare Prices, Reviews & TAT",
    desc:"See real prices, patient ratings, and turnaround times across all partner labs. Pick the best match for you." },
  { n:3, title:"Book a Slot at Your Convenience",
    desc:"Choose a date and time that suits you. A qualified and experienced phlebotomist comes home — free collection, no waiting rooms." },
];

function BookingStepsPanel() {
  const [active, setActive] = React.useState(0);
  const [animKey, setAnimKey] = React.useState(0);

  const goTo = React.useCallback((i) => {
    setActive(i);
    setAnimKey(k => k + 1);
  }, []);

  React.useEffect(() => {
    const t = setInterval(() => {
      goTo((active + 1) % HOW_TO_STEPS.length);
    }, 3400);
    return () => clearInterval(t);
  }, [active, goTo]);

  const s = HOW_TO_STEPS[active];

  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", paddingLeft:8 }}>
      {/* Header */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:".68rem", fontWeight:800, color:"#1158A6", letterSpacing:".14em", textTransform:"uppercase", marginBottom:4 }}>How to Book</div>
        <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"1.15rem", color:"#0A1628", lineHeight:1.2 }}>Book your test in 3 easy steps</div>
      </div>

      {/* Arrow left + card + arrow right */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <button onClick={() => goTo((active - 1 + HOW_TO_STEPS.length) % HOW_TO_STEPS.length)}
          style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", opacity:.7 }}
          onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.7}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div key={animKey} className="step-slide" style={{ flex:1, background:"#fff", borderRadius:20, border:"2px solid #1158A6", boxShadow:"0 8px 32px rgba(17,88,166,.18)", padding:"22px 22px 20px" }}>
          <div style={{ width:50, height:50, borderRadius:14, background:"#1158A6", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, boxShadow:"0 4px 14px rgba(17,88,166,.3)" }}>
            <span style={{ color:"#fff", fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"1.4rem", lineHeight:1 }}>{s.n}</span>
          </div>
          <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:"1rem", color:"#0D1117", marginBottom:8, lineHeight:1.3 }}>{s.title}</div>
          <div style={{ color:"#6B7280", fontSize:".84rem", lineHeight:1.7 }}>{s.desc}</div>
        </div>

        <button onClick={() => goTo((active + 1) % HOW_TO_STEPS.length)}
          style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", opacity:.7 }}
          onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.7}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Step dots — centered */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginTop:14 }}>
        {HOW_TO_STEPS.map((_, i) => (
          <div key={i} onClick={() => goTo(i)}
            style={{ width: i===active ? 24 : 8, height:8, borderRadius:4, background: i===active ? "#1158A6" : "#CBD5E1", transition:"all .3s", cursor:"pointer" }}/>
        ))}
      </div>
    </div>
  );
}

export default BookingStepsPanel;
