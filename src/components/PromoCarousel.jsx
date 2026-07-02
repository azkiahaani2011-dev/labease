import React, { useState, useEffect, useRef } from 'react';

function PromoCarousel({ navTo }) {
  // Infinite loop: [clone-card2, card1, card2, clone-card1], start at idx=1
  const [idx, setIdx] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [isDesk, setIsDesk] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const h = () => setIsDesk(window.innerWidth >= 1024);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (isDesk) return; // no auto-swipe on desktop
    const t = setInterval(() => setIdx(s => s + 1), 4000);
    return () => clearInterval(t);
  }, [isDesk]);

  useEffect(() => {
    if (idx === 3) {
      const id = setTimeout(() => {
        setAnimated(false);
        setIdx(1);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      }, 520);
      return () => clearTimeout(id);
    }
    if (idx === 0) {
      const id = setTimeout(() => {
        setAnimated(false);
        setIdx(2);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      }, 520);
      return () => clearTimeout(id);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
  }, [idx]);

  const Card1 = () => (
    <div style={{ borderRadius:20,overflow:"hidden",background:"#F0FDF9",position:"relative",minHeight:200,display:"flex",alignItems:"stretch",boxShadow:"0 4px 20px rgba(16,185,129,.10)",border:"1px solid #A7F3D0",height:"100%" }}>
      <div style={{ flex:1,padding:"28px 24px 24px",display:"flex",flexDirection:"column",justifyContent:"space-between",zIndex:1 }}>
        <div>
          <div style={{ display:"inline-block",background:"#ECFDF5",border:"1px solid #6EE7B7",borderRadius:50,padding:"3px 12px",fontSize:".66rem",fontWeight:800,color:"#059669",letterSpacing:".06em",textTransform:"uppercase",marginBottom:12 }}>Home Visit</div>
          <h3 style={{ fontFamily:"'Manrope',sans-serif",fontWeight:900,fontSize:"clamp(1rem,2.2vw,1.3rem)",color:"#064E3B",lineHeight:1.25,marginBottom:8 }}>Quick Home<br/>Sample Pickup</h3>
          <p style={{ fontSize:".78rem",color:"#065F46",lineHeight:1.6,maxWidth:200 }}>Qualified and experienced phlebotomist visits your home at your chosen slot. Sterile, safe &amp; quick.</p>
        </div>
        <button onClick={()=>navTo("labs")}
          style={{ alignSelf:"flex-start",marginTop:16,background:"#059669",color:"#fff",border:"none",borderRadius:10,padding:"9px 22px",fontWeight:800,fontSize:".8rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 14px rgba(5,150,105,.35)",transition:"all .18s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="#047857"; e.currentTarget.style.transform="translateY(-1px)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="#059669"; e.currentTarget.style.transform="translateY(0)"; }}>
          BOOK NOW <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </button>
      </div>
      <div className="promo-img-col" style={{ width:170,flexShrink:0,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:0 }}>
        <svg viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto"}}>
          <ellipse cx="118" cy="135" rx="56" ry="70" fill="#D1FAE5" opacity="0.7"/>
          <rect x="80" y="48" width="76" height="154" rx="4" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
          <rect x="88" y="58" width="30" height="40" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1"/>
          <rect x="122" y="58" width="26" height="40" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1"/>
          <rect x="88" y="104" width="60" height="90" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1"/>
          <circle cx="84" cy="142" r="5" fill="#6EE7B7" stroke="#1E293B" strokeWidth="1"/>
          <rect x="72" y="198" width="92" height="8" rx="3" fill="#BBF7D0" stroke="#1E293B" strokeWidth="1"/>
          <rect x="52" y="170" width="22" height="28" rx="3" fill="#A7F3D0" stroke="#1E293B" strokeWidth="1.2"/>
          <ellipse cx="63" cy="170" rx="13" ry="6" fill="#6EE7B7" stroke="#1E293B" strokeWidth="1"/>
          <path d="M63 164 Q55 150 48 140" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <ellipse cx="48" cy="138" rx="8" ry="5" fill="#34D399" stroke="#1E293B" strokeWidth="1" transform="rotate(-20 48 138)"/>
          <path d="M63 162 Q70 148 76 140" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <ellipse cx="76" cy="138" rx="8" ry="5" fill="#34D399" stroke="#1E293B" strokeWidth="1" transform="rotate(20 76 138)"/>
          <circle cx="46" cy="74" r="20" fill="#FDDCB5" stroke="#1E293B" strokeWidth="1.5"/>
          <path d="M26 68 Q26 50 46 48 Q66 50 66 68 L64 60 Q54 46 46 46 Q38 46 28 60 Z" fill="#2C1A0E" stroke="#1E293B" strokeWidth="1"/>
          <path d="M22 108 Q22 98 46 96 Q70 98 70 108 L74 198 H18 Z" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
          <path d="M40 98 L32 116 L46 122" stroke="#1E293B" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M52 98 L60 116 L46 122" stroke="#1E293B" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="30" cy="112" r="10" fill="#FEE2E2" stroke="#1E293B" strokeWidth="1.2"/>
          <rect x="27" y="107" width="6" height="10" rx="1" fill="#EF4444"/>
          <rect x="24.5" y="109.5" width="11" height="5" rx="1" fill="#EF4444"/>
          <path d="M70 112 Q84 126 80 156" stroke="white" strokeWidth="18" strokeLinecap="round" fill="none"/>
          <path d="M70 112 Q84 126 80 156" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <rect x="67" y="150" width="28" height="22" rx="4" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1.5"/>
          <rect x="77" y="146" width="8" height="8" rx="2" fill="#FDE68A" stroke="#1E293B" strokeWidth="1"/>
          <line x1="78" y1="158" x2="88" y2="158" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="83" y1="153" x2="83" y2="163" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse cx="39" cy="76" rx="4.5" ry="5" fill="white" stroke="#1E293B" strokeWidth="1"/>
          <ellipse cx="53" cy="76" rx="4.5" ry="5" fill="white" stroke="#1E293B" strokeWidth="1"/>
          <circle cx="40" cy="77" r="3" fill="#1E293B"/>
          <circle cx="54" cy="77" r="3" fill="#1E293B"/>
          <circle cx="41" cy="75.5" r="1.2" fill="white"/>
          <circle cx="55" cy="75.5" r="1.2" fill="white"/>
          <path d="M40 87 Q46 93 52 87" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M28 80 Q28 96 46 96 Q64 96 64 80 Q46 74 28 80Z" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );

  const Card2 = () => (
    <div style={{ borderRadius:20,overflow:"hidden",background:"#EFF6FF",position:"relative",minHeight:200,display:"flex",alignItems:"stretch",boxShadow:"0 4px 20px rgba(17,88,166,.10)",border:"1px solid #BFDBFE",height:"100%" }}>
            <div style={{ flex:1,padding:"28px 24px 24px",display:"flex",flexDirection:"column",justifyContent:"space-between",zIndex:1 }}>
              <div>
                <div style={{ display:"inline-block",background:"#EFF6FF",border:"1px solid #93C5FD",borderRadius:50,padding:"3px 12px",fontSize:".66rem",fontWeight:800,color:"#1158A6",letterSpacing:".06em",textTransform:"uppercase",marginBottom:12 }}>Digital Reports</div>
                <h3 style={{ fontFamily:"'Manrope',sans-serif",fontWeight:900,fontSize:"clamp(1rem,2.2vw,1.3rem)",color:"#1E3A5F",lineHeight:1.25,marginBottom:8 }}>Fastest Report<br/>Delivery</h3>
                <p style={{ fontSize:".78rem",color:"#1E40AF",lineHeight:1.6,maxWidth:200 }}>Secure digital reports on WhatsApp &amp; email. Delivered promptly.</p>
              </div>
              <button onClick={()=>navTo("labs")}
                style={{ alignSelf:"flex-start",marginTop:16,background:"#1158A6",color:"#fff",border:"none",borderRadius:10,padding:"9px 22px",fontWeight:800,fontSize:".8rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 14px rgba(17,88,166,.35)",transition:"all .18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; }}>
                VIEW TESTS <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </button>
            </div>
            <div className="promo-img-col" style={{ width:170,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px 0" }}>
              <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto"}}>
                <ellipse cx="100" cy="110" rx="72" ry="80" fill="#DBEAFE" opacity="0.6"/>
                <rect x="52" y="30" width="92" height="130" rx="10" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
                <rect x="76" y="26" width="44" height="10" rx="5" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1"/>
                <rect x="62" y="54" width="72" height="6" rx="3" fill="#DBEAFE"/>
                <rect x="62" y="66" width="56" height="5" rx="2.5" fill="#E2E8F0"/>
                <rect x="62" y="78" width="64" height="5" rx="2.5" fill="#E2E8F0"/>
                <rect x="62" y="94" width="14" height="36" rx="3" fill="#93C5FD"/>
                <rect x="80" y="106" width="14" height="24" rx="3" fill="#BFDBFE"/>
                <rect x="98" y="100" width="14" height="30" rx="3" fill="#60A5FA"/>
                <rect x="116" y="110" width="14" height="20" rx="3" fill="#BFDBFE"/>
                <rect x="62" y="136" width="72" height="14" rx="4" fill="#DCFCE7" stroke="#BBF7D0" strokeWidth="1"/>
                <path d="M70 143 L74 147 L82 140" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <line x1="88" y1="143" x2="126" y2="143" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="100" y="148" width="60" height="36" rx="8" fill="#1158A6" stroke="#1E293B" strokeWidth="1"/>
                <rect x="100" y="156" width="60" height="14" rx="0" fill="#1158A6"/>
                <polygon points="108,184 116,184 112,192" fill="#1158A6" stroke="#1E293B" strokeWidth="0.5"/>
                <circle cx="112" cy="158" r="5" fill="#DBEAFE"/>
                <path d="M110 158 L112 160 L116 155" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <line x1="120" y1="156" x2="152" y2="156" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="120" y1="162" x2="146" y2="162" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="24" cy="80" r="7" fill="#BFDBFE" stroke="#1E293B" strokeWidth="1" opacity="0.8"/>
                <circle cx="162" cy="55" r="5" fill="#93C5FD" stroke="#1E293B" strokeWidth="1" opacity="0.7"/>
                <circle cx="22" cy="148" r="5" fill="#DBEAFE" opacity="0.8"/>
              </svg>
            </div>
          </div>
  );

  // Desktop: both cards side by side, no carousel
  if (isDesk) {
    return (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:10 }}>
        <Card1/><Card2/>
      </div>
    );
  }

  // Mobile: infinite loop carousel [clone-Card2, Card1, Card2, clone-Card1], start at idx=1
  return (
    <div style={{ position:"relative", marginBottom:10, borderRadius:20, overflow:"hidden", width:"100%" }}>
      <div style={{ display:"flex", width:"400%", transition: animated ? "transform .5s cubic-bezier(.4,0,.2,1)" : "none", transform:`translateX(${idx * -25}%)`, willChange:"transform" }}>
        <div style={{ width:"25%", flexShrink:0 }}><Card2/></div>
        <div style={{ width:"25%", flexShrink:0 }}><Card1/></div>
        <div style={{ width:"25%", flexShrink:0 }}><Card2/></div>
        <div style={{ width:"25%", flexShrink:0 }}><Card1/></div>
      </div>
      <div style={{ display:"flex",justifyContent:"center",gap:6,marginTop:8 }}>
        {[0,1].map(i=>{ const active=(idx===1&&i===0)||(idx===2&&i===1); return <div key={i} onClick={()=>{ setAnimated(true); setIdx(i+1); }} style={{ width:active?20:6,height:6,borderRadius:3,background:active?"#1158A6":"#CBD5E1",cursor:"pointer",transition:"all .3s" }}/>; })}
      </div>
    </div>
  );
}

export default PromoCarousel;
