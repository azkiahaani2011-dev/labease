import React from 'react';
import { POPULAR_CATS } from '../constants/packages';
import { IBlood, IThyroid, IDiabetes, ICardiac, IVitamin, IKidney, ILiver, IPackage, IRadiology, IHormone, IInfectious, ICovid, IAllergy, IAutoimmune, ICancer, IUrine, IGeneral, ICONS } from '../components/icons';
import _CarouselDots from './CarouselDots';

function PopularTestsCarousel({ setCatF, navTo, setSelectedTest }) {
  const trackRef = React.useRef(null);
  const [canLeft,  setCanLeft]  = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);
  const [isDesk,   setIsDesk]   = React.useState(() => window.innerWidth >= 1024);
  React.useEffect(() => {
    const fn = () => setIsDesk(window.innerWidth >= 1024);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const onScroll = () => {
    const el = trackRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };
  const scroll = dir => {
    const el = trackRef.current; if (!el) return;
    const w = el.querySelector(".pt-tile")?.offsetWidth || 120;
    el.scrollBy({ left: dir * w * 2, behavior:"smooth" });
  };
  const arrStyle = v => ({
    position:"absolute", top:"50%", transform:"translateY(-50%)",
    width:36, height:36, borderRadius:"50%", background:"#fff",
    border:"1.5px solid #E0EAFF", boxShadow:"0 2px 12px rgba(17,88,166,.14)",
    display:"flex", alignItems:"center", justifyContent:"center",
    cursor:"pointer", zIndex:10,
    opacity:v?1:0, pointerEvents:v?"all":"none", transition:"opacity .2s",
  });

  return (
    <section style={{ padding:"18px 0 16px", background:"#F5F7FF", borderTop:"1px solid #E2E8F0", borderBottom:"1px solid #E2E8F0" }}>
      <div style={{ maxWidth:1600, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24, flexWrap:"wrap", gap:12 }}>
          <div style={{ textAlign:"left" }}>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.45rem", fontWeight:800, color:"#0D1117", marginBottom:6, letterSpacing:"-.01em" }}>Popular Tests</h2>
            <p style={{ color:"#6B7280", fontSize:".85rem" }}>Compare prices across all certified labs and book instantly</p>
          </div>
          <button onClick={()=>navTo("alltests")}
            style={{ background:"transparent", border:"1.5px solid #1158A6", borderRadius:50, padding:"9px 22px", fontWeight:700, fontSize:".84rem", color:"#1158A6", cursor:"pointer", fontFamily:"'Manrope',sans-serif", transition:"all .16s", whiteSpace:"nowrap", minHeight:44, flexShrink:0 }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#EFF6FF"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; }}
            onMouseDown={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.color="#fff"; e.currentTarget.style.transform="scale(.97)"; }}
            onMouseUp={e=>{ e.currentTarget.style.background="#EFF6FF"; e.currentTarget.style.color="#1158A6"; e.currentTarget.style.transform="scale(1)"; }}>
            View All Specialities →
          </button>
        </div>
        <div style={{ position:"relative" }}>

          <div ref={trackRef} onScroll={onScroll}
            style={{ display:"flex", gap: isDesk ? 20 : 8, overflowX:"auto", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", scrollbarWidth:"none", msOverflowStyle:"none", paddingBottom:4, paddingTop:4 }}>
            {POPULAR_CATS.map(({ cat, label, Icon }) => (
              <div key={cat} className="pt-tile"
                onClick={()=>{ setCatF(cat); setSelectedTest({name:label, cat}); navTo("labs"); }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", padding: isDesk ? "24px 16px 20px" : "18px 10px 16px", minWidth: isDesk ? 140 : 110, maxWidth: isDesk ? 170 : 130, flexShrink:0, scrollSnapAlign:"start", cursor:"pointer", borderRadius:16, transition:"transform .22s cubic-bezier(.34,1.56,.64,1),background .18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.background="#F0F6FF"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.background="transparent"; }}>
                <div style={{ width: isDesk ? 104 : 86, height: isDesk ? 104 : 86, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginBottom: isDesk ? 16 : 12, flexShrink:0, border:"1px solid #E5E7EB", transition:"border-color .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#BFDBFE"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#E5E7EB"}>
                  <Icon s={isDesk ? 104 : 86}/>
                </div>
                <div style={{ fontWeight:700, color:"#1F2937", fontSize: isDesk ? ".9rem" : ".8rem", textAlign:"center", lineHeight:1.3, marginBottom: isDesk ? 8 : 5 }}>{label}</div>
                <div style={{ fontSize: isDesk ? ".76rem" : ".68rem", fontWeight:800, color:"#1158A6", letterSpacing:".05em", textTransform:"uppercase", background: isDesk ? "#EFF6FF" : "none", padding: isDesk ? "4px 12px" : 0, borderRadius: isDesk ? 50 : 0, border: isDesk ? "1px solid #BFDBFE" : "none" }}>Book Now</div>
              </div>
            ))}
          </div>

        </div>
        <_CarouselDots trackRef={trackRef} total={POPULAR_CATS.length}/>
      </div>
    </section>
  );
}

export default PopularTestsCarousel;
