import React, { useState, useEffect, useRef } from 'react';
import FEATURE_SLIDES from '../constants/featureSlides';

function FeaturesCarousel() {
  const [slide, setSlide] = useState(1); // 0=clone-of-last, 1=real-slide-0, 2=real-slide-1, 3=clone-of-first
  const [animated, setAnimated] = useState(true);
  const [mob, setMob] = useState(window.innerWidth <= 640);
  const [isDesk, setIsDesk] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const h = () => { setMob(window.innerWidth <= 640); setIsDesk(window.innerWidth >= 1024); };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (isDesk) return; // no auto-swipe on desktop
    const t = setInterval(() => setSlide(s => s + 1), 4500);
    return () => clearInterval(t);
  }, [isDesk]);

  // When we land on a clone, silently jump to the real slide
  useEffect(() => {
    if (slide === 3) {
      const id = setTimeout(() => {
        setAnimated(false);
        setSlide(1);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      }, 570);
      return () => clearTimeout(id);
    }
    if (slide === 0) {
      const id = setTimeout(() => {
        setAnimated(false);
        setSlide(2);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      }, 570);
      return () => clearTimeout(id);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
  }, [slide]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth <= 640);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  /* ── Right card SVG icons — white line-art matching reference ── */
  const IMicroscope = () => (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="10" r="5"/><line x1="13" y1="5" x2="13" y2="3"/><line x1="8.5" y1="7" x2="7" y2="5.5"/><line x1="17.5" y1="7" x2="19" y2="5.5"/>
      <path d="M5 28a11 11 0 0122 0"/><line x1="8" y1="28" x2="24" y2="28"/>
    </svg>
  );
  const ITestTubes = () => (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4v12l-4 6a2 2 0 003.46 2h5.08A2 2 0 0018 22l-4-6V4"/><line x1="8" y1="4" x2="18" y2="4"/>
      <path d="M22 4v8l-2 4a2 2 0 003.46 2h1.08A2 2 0 0027 16l-2-4V4"/><line x1="20" y1="4" x2="28" y2="4"/>
      <line x1="8" y1="18" x2="16" y2="18"/>
    </svg>
  );
  const IBadgeCheck = () => (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3l3.09 6.26L26 10.27l-5 4.87 1.18 6.88L16 18.77l-6.18 3.25L11 15.14 6 10.27l6.91-1.01L16 3z"/>
      <polyline points="12 16 15 19 20 13"/>
    </svg>
  );
  const IClockReport = () => (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="14" height="18" rx="2"/><line x1="9" y1="9" x2="17" y2="9"/><line x1="9" y1="13" x2="17" y2="13"/>
      <circle cx="22" cy="22" r="6"/><polyline points="22 19 22 22 24 24"/>
    </svg>
  );
  const IFlask = () => (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v10L6 22a3 3 0 002.6 4.5h12.8A3 3 0 0024 22l-6-8V4"/><line x1="10" y1="4" x2="22" y2="4"/>
      <line x1="8" y1="20" x2="24" y2="20"/>
    </svg>
  );
  const IDiscount = () => (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="12"/><line x1="10" y1="22" x2="22" y2="10"/>
      <circle cx="11" cy="12" r="2" fill="white"/><circle cx="21" cy="20" r="2" fill="white"/>
    </svg>
  );

  /* ── Ring icons for left card ── */
  const RingIcon = ({ i }) => {
    const icons = [
      <><rect x="6" y="6" width="12" height="12" rx="2" stroke="white" strokeWidth="1.6" fill="none"/><polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
      <><rect x="5" y="4" width="14" height="16" rx="2" stroke="white" strokeWidth="1.6" fill="none"/><line x1="8" y1="9" x2="16" y2="9" stroke="white" strokeWidth="1.6" strokeLinecap="round"/><line x1="8" y1="13" x2="14" y2="13" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></>,
      <><circle cx="12" cy="8" r="5" stroke="white" strokeWidth="1.6" fill="none"/><path d="M4 20a8 8 0 0116 0" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/></>,
      <><path d="M12 21s7-3.5 7-8.5V7l-7-2.5L5 7v5.5C5 17.5 12 21 12 21z" stroke="white" strokeWidth="1.6" fill="none"/></>,
      <><path d="M8 4v8L5 17a3 3 0 002.6 3h8.8A3 3 0 0019 17l-3-5V4" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/><line x1="7" y1="4" x2="17" y2="4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></>,
      <><circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.6" fill="none"/><polyline points="12 8 12 12 15 14" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
      <><circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.6" fill="none"/><line x1="8" y1="16" x2="16" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="9" r="1.5" fill="white"/><circle cx="15" cy="15" r="1.5" fill="white"/></>,
      <><path d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="white" strokeWidth="1.6" fill="none"/><polyline points="9 20 9 12 15 12 15 20" stroke="white" strokeWidth="1.6" fill="none"/></>,
    ];
    return <svg viewBox="0 0 24 24" width="14" height="14">{icons[i % icons.length]}</svg>;
  };

  /* ── Wave background matching reference exactly ── */
  const Wave = () => (
    <svg style={{ position:"absolute",bottom:0,left:0,width:"100%",height:"70%",pointerEvents:"none" }} viewBox="0 0 600 180" preserveAspectRatio="none">
      <path d="M0 90 C100 50,200 130,300 90 C400 50,500 130,600 90 L600 180 L0 180Z" fill="rgba(255,255,255,.055)"/>
      <path d="M0 110 C100 70,200 150,300 110 C400 70,500 150,600 110 L600 180 L0 180Z" fill="rgba(255,255,255,.04)"/>
      <path d="M0 130 C100 95,200 165,300 130 C400 95,500 165,600 130 L600 180 L0 180Z" fill="rgba(255,255,255,.03)"/>
    </svg>
  );

  const CARD = {
    borderRadius: 18,
    background: "linear-gradient(160deg, #1158A6 0%, #0F2D6B 100%)",
    border: "1.5px solid rgba(255,255,255,.18)",
    boxShadow: "0 8px 40px rgba(17,88,166,.25), inset 0 1px 0 rgba(255,255,255,.1)",
    overflow: "hidden",
    position: "relative",
  };

  const SLIDE_H = mob ? "auto" : 220;
  const ringSize = mob ? 110 : 170;

  /* Slide 1 — Why LabEase */
  const SlideWhy = () => (
    <div style={{ ...CARD, display:"flex", flexDirection: mob ? "column" : "row", alignItems:"center", padding: mob ? "14px 14px" : "18px 24px 18px 30px", height: mob ? 220 : 220, boxSizing:"border-box", overflow:"hidden" }}>
      <Wave/>
      <div style={{ flex:1, zIndex:1, paddingRight: mob ? 0 : 16, textAlign: mob ? "center" : "left" }}>
        <h3 style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize: mob ? "1.1rem" : "clamp(1.2rem,2vw,1.6rem)", color:"#fff", lineHeight:1.2, marginBottom: mob ? 10 : 14 }}>
          Why LabEase<br/>is Helpful?
        </h3>
        <ul style={{ listStyle:"none", padding:0, margin: mob ? "0 auto" : 0, display:"flex", flexDirection:"column", gap: mob ? 7 : 10, maxWidth: mob ? 260 : "none" }}>
          {["Compare real prices across multiple labs before booking","Book a slot in minutes with doorstep sample collection","Get digital reports delivered directly to you"].map((b,i) => (
            <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize: mob ? ".76rem" : ".85rem", color:"rgba(255,255,255,.9)", lineHeight:1.4, textAlign:"left" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,.85)", flexShrink:0, marginTop:4 }}/>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flexShrink:0, width:ringSize, height:ringSize, zIndex:1, display:"flex", alignItems:"center", justifyContent:"center", marginTop: mob ? 16 : 0 }}>
        <svg viewBox="0 0 190 190" width={ringSize} height={ringSize}>
          <circle cx="95" cy="95" r="85" stroke="rgba(255,255,255,.12)" strokeWidth="1.2" strokeDasharray="5 4" fill="none"/>
          {[0,1,2,3,4,5,6,7].map(idx => {
            const a=(idx/8)*2*Math.PI-Math.PI/2, r=72, cx=95+r*Math.cos(a), cy=95+r*Math.sin(a);
            const icons=[
              <><rect x="5" y="5" width="14" height="14" rx="2" stroke="white" strokeWidth="1.6" fill="none"/><polyline points="8 12 10 14 15 9" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
              <><rect x="4" y="3" width="16" height="18" rx="2" stroke="white" strokeWidth="1.6" fill="none"/><line x1="7" y1="9" x2="17" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="7" y1="13" x2="14" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></>,
              <><circle cx="12" cy="8" r="5" stroke="white" strokeWidth="1.6" fill="none"/><path d="M3 21a9 9 0 0118 0" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/></>,
              <><path d="M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10z" stroke="white" strokeWidth="1.6" fill="none"/></>,
              <><path d="M8 3v10L5 18a3 3 0 002.6 3.5h8.8A3 3 0 0019 18l-3-5V3" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/><line x1="6" y1="3" x2="18" y2="3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></>,
              <><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6" fill="none"/><polyline points="12 7 12 12 15 15" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
              <><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6" fill="none"/><line x1="8" y1="16" x2="16" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/><circle cx="9.5" cy="9.5" r="1.8" fill="white"/><circle cx="14.5" cy="14.5" r="1.8" fill="white"/></>,
              <><path d="M3 9l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="1.6" fill="none"/><polyline points="9 21 9 12 15 12 15 21" stroke="white" strokeWidth="1.6" fill="none"/></>,
            ];
            return (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="19" fill="rgba(79,70,229,.72)" stroke="rgba(255,255,255,.28)" strokeWidth="1.2"/>
                <g transform={`translate(${cx-12},${cy-12})`}>
                  <svg viewBox="0 0 24 24" width="24" height="24">{icons[idx]}</svg>
                </g>
              </g>
            );
          })}
          <circle cx="95" cy="95" r="32" fill="white" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
          <text x="95" y="90" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="900" fontSize="13" fill="#1158A6">Lab</text>
          <text x="95" y="106" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="900" fontSize="13" fill="#1158A6">Ease</text>
        </svg>
      </div>
    </div>
  );

  /* Slide 2 — 6 Features */
  const SlideFeatures = () => {
    const pad   = mob ? "14px 14px" : isDesk ? "20px 28px" : "28px 44px";
    const cols  = mob ? "1fr 1fr"   : isDesk ? "1fr 1fr"   : "1fr 1fr 1fr";
    const gapV  = mob ? "8px 12px"  : isDesk ? "14px 20px" : "28px 52px";
    const circ  = mob ? 32          : isDesk ? 44           : 62;
    const gapI  = mob ? 7           : isDesk ? 10           : 18;
    return (
    <div style={{ ...CARD, padding: pad, height: mob ? 220 : 220, boxSizing:"border-box", display:"flex", alignItems:"center", overflow:"hidden" }}>
      <Wave/>
      <div style={{ display:"grid", gridTemplateColumns: cols, gap: gapV, width:"100%", zIndex:1 }}>
        {[
          { Ic:ITestTubes,  t1:"Wide Range of",          t2:"Tests Available" },
          { Ic:IFlask,      t1:"Sample Collection",    t2:"at your convenience" },
          { Ic:IBadgeCheck, t1:"Verified",              t2:"Partner Labs" },
          { Ic:IClockReport,t1:"On Time",              t2:"Reports" },
          { Ic:IDiscount,   t1:"Attractive Discounts", t2:"& Offers" },
        ].map(({ Ic, t1, t2 }, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap: gapI, minWidth:0 }}>
            <div style={{ width: circ, height: circ, borderRadius:"50%", border:"2px solid rgba(134,239,172,.6)", background:"rgba(134,239,172,.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 0 0 1px rgba(134,239,172,.15)" }}>
              <Ic/>
            </div>
            <div style={{ minWidth:0, overflow:"hidden" }}>
              <div style={{ fontSize: mob ? ".58rem" : isDesk ? ".75rem" : ".85rem", color:"rgba(255,255,255,.6)", lineHeight:1.2, marginBottom:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t1}</div>
              <div style={{ fontSize: mob ? ".68rem" : isDesk ? ".88rem" : "1rem", fontWeight:700, color:"#fff", lineHeight:1.2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t2}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  };

  // Desktop: both slides side by side, no carousel — same max-width as PromoCarousel above
  if (isDesk) {
    return (
      <section style={{ padding:"32px 0 28px", background:"#EBF0FA" }}>
        <div style={{ maxWidth:1600, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <SlideWhy/><SlideFeatures/>
          </div>
        </div>
      </section>
    );
  }

  // Mobile: carousel
  return (
    <section style={{ padding: mob ? "20px 0 18px" : "32px 0 28px", background:"#EBF0FA" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding: mob ? "0 12px" : "0 24px" }}>
        <div style={{ position:"relative" }}>
          <div style={{ height:220, overflow:"hidden", borderRadius:18 }}>
            {/* Layout: [clone-SlideFeatures, SlideWhy, SlideFeatures, clone-SlideWhy] */}
            <div style={{ display:"flex", height:"100%", transition: animated ? "transform .55s cubic-bezier(.4,0,.2,1)" : "none", transform:`translateX(${slide * -100}%)`, willChange:"transform" }}>
              <div style={{ minWidth:"100%", flexShrink:0, height:"100%" }}><SlideFeatures/></div>
              <div style={{ minWidth:"100%", flexShrink:0, height:"100%" }}><SlideWhy/></div>
              <div style={{ minWidth:"100%", flexShrink:0, height:"100%" }}><SlideFeatures/></div>
              <div style={{ minWidth:"100%", flexShrink:0, height:"100%" }}><SlideWhy/></div>
            </div>
          </div>
          <div style={{ display:"flex",justifyContent:"center",gap:6,marginTop:10 }}>
            {[0,1].map(i=>{const active=(slide===1&&i===0)||(slide===2&&i===1); return <div key={i} onClick={()=>{ setAnimated(true); setSlide(i+1); }} style={{ width:active?20:6,height:6,borderRadius:3,background:active?"#1158A6":"#CBD5E1",cursor:"pointer",transition:"all .3s" }}/>;} )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesCarousel;
