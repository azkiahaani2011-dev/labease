import React from 'react';
import { Stars, Pill, pct, Modal, TODAY } from '../components/ui/index';
import { getTestPrep, getTestInfo } from '../constants/testData';
import { getTestSubtitle } from '../constants/testSubtitles';
import { slotsFromTiming } from '../constants/labs';
import LabIcon from '../components/LabIcon';

function LabDetailML({ lab, T, cart, total, testQ, setTestQ, catF, setCatF, filtTests, addCart, delCart, has, pct, navTo, setCartOpen, isDesktop, cartSlot }) {
  if (!lab) return null;
  const cats = ["All",...new Set(lab.tests.map(t=>t.cat))];
  const [showAllTests, setShowAllTests] = React.useState(false);
  const TESTS_LIMIT = 10;
  React.useEffect(()=>{ setShowAllTests(false); }, [catF, testQ]);
  const visibleTests = showAllTests ? filtTests : filtTests.slice(0, TESTS_LIMIT);
  return (
  <div className="lab-detail-enter" style={{ minHeight:"80vh",background:"#fff" }}>
    {/* Lab info section */}
    <div style={{ background:"#F8FAFC",borderBottom:"1px solid #E5E7EB",fontFamily:"'Manrope',sans-serif" }}>
      {(()=>{
        const meta   = LAB_META.find(m=>m.id===lab.id);
        const src    = lab.logoBase64||lab.logoUrl||LAB_LOGOS_B64[lab.id]||(meta?.srcs?.[0])||'';
        const accent = meta?.accent||"#1158A6";
        const rating = lab.rating||4.5;
        const full   = Math.floor(rating);
        const partial= Math.round((rating-full)*100);
        const gid    = `sg-${lab.id}`;
        return (
          <div style={{ padding:"0" }}>
            {/* Single combined card — full width, includes back button */}
            <div style={{ background:"#fff",borderTop:"1px solid #E5E7EB",borderBottom:"1px solid #E5E7EB",overflow:"hidden",marginBottom:12 }}>
              {/* Back button inside card */}
              <button onClick={()=>navTo("labs")} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,padding:"12px 16px 4px",color:"#6B7280",fontFamily:"'Manrope',sans-serif",fontWeight:600,fontSize:".84rem" }} aria-label="Back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
                Labs
              </button>
              {/* Top: logo + name + rating */}
              <div style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"8px 16px 12px" }}>
                <div style={{ width:80,height:80,borderRadius:14,border:"1px solid #E5E7EB",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0,position:"relative" }}>
                  {src
                    ? (()=>{
                        const [imgLoaded, setImgLoaded] = React.useState(false);
                        return <>
                          {!imgLoaded && <div className="sk" style={{ position:"absolute",inset:0,borderRadius:14 }}/>}
                          <img src={src} alt={lab.name} onLoad={()=>setImgLoaded(true)} style={{ width:"100%",height:"100%",objectFit:"contain",opacity:imgLoaded?1:0,transition:"opacity .3s" }}/>
                        </>;
                      })()
                    : <span style={{ fontWeight:900,fontSize:28,color:accent }}>{(meta?.short||lab.name).slice(0,2)}</span>
                  }
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontWeight:900,fontSize:"1.05rem",color:"#0D1117",lineHeight:1.3,marginBottom:4,letterSpacing:"-.02em" }}>{lab.name}</div>
                  <div style={{ fontSize:".76rem",color:"#6B7280",marginBottom:6 }}>Diagnostic Lab · {lab.city}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:4 }}>
                    <div style={{ display:"flex",gap:1 }}>
                      {Array.from({length:5},(_,i)=>{
                        const sid=`${gid}-${i}`;
                        if(i<full) return <svg key={i} width="15" height="15" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#F59E0B" stroke="none"/></svg>;
                        if(i===full&&partial>0) return <svg key={i} width="15" height="15" viewBox="0 0 24 24"><defs><linearGradient id={sid} x1="0" y1="0" x2="1" y2="0"><stop offset={`${partial}%`} stopColor="#F59E0B"/><stop offset={`${partial}%`} stopColor="#D1D5DB"/></linearGradient></defs><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={`url(#${sid})`} stroke="none"/></svg>;
                        return <svg key={i} width="15" height="15" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#D1D5DB" stroke="none"/></svg>;
                      })}
                    </div>
                    <span style={{ fontWeight:800,fontSize:".8rem",color:"#0D1117" }}>{rating.toFixed(1)}</span>
                    <span style={{ fontSize:".75rem",color:"#9CA3AF" }}>({(lab.reviews||0).toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div style={{ display:"flex",alignItems:"flex-start",gap:6,fontSize:".81rem",color:"#6B7280",lineHeight:1.5,padding:"0 16px 12px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0,marginTop:1 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {[lab.area, lab.address, lab.city].filter(Boolean).join(", ")||"—"}
              </div>

              {/* Divider */}
              <div style={{ height:1,background:"#F1F5F9" }}/>

              {/* Stats row */}
              <div style={{ display:"flex" }}>
                {/* Timing cell — shows weekday + Sunday if available */}
                <div style={{ flex:1,padding:"11px 8px",textAlign:"center",borderRight:"1px solid #F1F5F9" }}>
                  <div style={{ display:"flex",justifyContent:"center",marginBottom:4 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div style={{ fontSize:".58rem",color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",marginBottom:3 }}>Timing</div>
                  <div style={{ fontSize:".68rem",fontWeight:800,color:"#0D1117",lineHeight:1.4 }}>
                    {lab.sunday_timing ? (
                      <div style={{ display:"flex",alignItems:"stretch",gap:0,justifyContent:"center" }}>
                        <div style={{ textAlign:"center",flex:1 }}>
                          <div style={{ fontSize:".55rem",color:"#9CA3AF",fontWeight:700,marginBottom:2 }}>Mon–Sat</div>
                          <div style={{ fontSize:".66rem" }}>{lab.timing||"6AM–10PM"}</div>
                        </div>
                        <div style={{ width:1,background:"#E5E7EB",margin:"0 6px",flexShrink:0 }}/>
                        <div style={{ textAlign:"center",flex:1 }}>
                          <div style={{ fontSize:".55rem",color:"#9CA3AF",fontWeight:700,marginBottom:2 }}>Sunday</div>
                          <div style={{ fontSize:".66rem" }}>{lab.sunday_timing}</div>
                        </div>
                      </div>
                    ) : (
                      lab.timing||"6AM–10PM"
                    )}
                  </div>
                </div>
                {/* Tests cell */}
                <div style={{ flex:1,padding:"11px 8px",textAlign:"center",borderRight:"1px solid #F1F5F9" }}>
                  <div style={{ display:"flex",justifyContent:"center",marginBottom:4 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v10L5 18a3 3 0 002.6 3.5h8.8A3 3 0 0019 18l-3-5V3"/><line x1="7" y1="3" x2="17" y2="3"/></svg>
                  </div>
                  <div style={{ fontSize:".58rem",color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2 }}>Tests</div>
                  <div style={{ fontSize:".72rem",fontWeight:800,color:"#0D1117",lineHeight:1.3 }}>{lab.tests.length} available</div>
                </div>
                {/* Collection cell */}
                <div style={{ flex:1,padding:"11px 8px",textAlign:"center" }}>
                  <div style={{ display:"flex",justifyContent:"center",marginBottom:4 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="20" height="13" rx="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg>
                  </div>
                  <div style={{ fontSize:".58rem",color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2 }}>Collection</div>
                  <div style={{ fontSize:".72rem",fontWeight:800,color:"#0D1117",lineHeight:1.3 }}>{lab.homeCollection!==false?"Home & Walk-in":"Walk-in Only"}</div>
                </div>
              </div>
            </div>

          </div>
        );
      })()}
    </div>

    <div style={{ padding:"16px 0" }}>
      {/* Desktop two-column wrapper */}
      <div style={isDesktop ? { display:"flex", gap:28, alignItems:"flex-start", maxWidth:1280, margin:"0 auto", padding:"0 24px" } : {}}>
      <div style={isDesktop ? { flex:1, minWidth:0 } : {}}>
      {/* search */}
      <div style={{ position:"relative",marginBottom:14,maxWidth:440,padding:"0 12px" }}>
        <svg style={{ position:"absolute",left:25,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.7"/><path d="M13.5 13.5L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.7" strokeLinecap="round"/></svg>
        <input style={{ ...T.inp,paddingLeft:46,background:"#fff",border:"1.5px solid #E5E7EB",borderRadius:10,fontSize:".9rem",transition:"border .18s,box-shadow .18s" }}
          placeholder="Search tests…" value={testQ} onChange={e=>setTestQ(e.target.value)}
          onFocus={e=>{ e.target.style.border="1.5px solid #1158A6"; e.target.style.boxShadow="0 0 0 3px rgba(17,88,166,.1)"; }}
          onBlur={e=>{ e.target.style.border="1.5px solid #E5E7EB"; e.target.style.boxShadow="none"; }}/>
      </div>

      {/* category chips */}
      <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom:10,marginBottom:14,padding:"0 12px 10px" }}>
        {cats.map(c=>(
          <button key={c} className="chip" onClick={()=>setCatF(c)}
            style={{ background:catF===c?lab.color:"#fff",color:catF===c?"#fff":"var(--muted)",border:`1.5px solid ${catF===c?lab.color:"var(--line)"}`,borderRadius:50,padding:"6px 14px",fontWeight:600,cursor:"pointer",fontSize:".77rem",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",flexShrink:0,transition:"all .14s" }}>
            {c}
          </button>
        ))}
      </div>

      {/* test cards — paddingBottom makes room for sticky Book Now bar */}
      <div style={{ padding:`0 16px`, paddingBottom: cart.length > 0 ? 90 : 16 }}>
        {filtTests.length===0 ? (
          <div style={{ padding:48,textAlign:"center",color:"#94A3B8" }}>
            <IBlood s={56}/><div style={{ marginTop:10 }}>No tests found.</div>
          </div>
        ) : visibleTests.map(t=>{
          const added=has(t.id); const d=pct(t.price,t.mrp); const subtitle=t.subtitle||getTestSubtitle(t.name);
          return (
            <div key={t.id} style={{ background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,marginBottom:10,overflow:"hidden",fontFamily:"'Manrope',sans-serif" }}>
              {/* Top section: name + price */}
              <div style={{ padding:"14px 16px 12px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800,color:"#0D1117",fontSize:"1rem",lineHeight:1.3,marginBottom:4 }}>{t.name}</div>
                    <span style={{ display:"inline-block",background:"#EFF6FF",color:"#1158A6",borderRadius:6,padding:"2px 9px",fontSize:".7rem",fontWeight:700 }}>{subtitle}</span>
                  </div>
                  <div style={{ flexShrink:0,textAlign:"right" }}>
                    <div style={{ fontWeight:900,color:"#0D1117",fontSize:"1.1rem" }}>₹{t.price}</div>
                    {d > 0 && (
                      <div style={{ display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end",marginTop:2 }}>
                        <span style={{ color:"#9CA3AF",textDecoration:"line-through",fontSize:".73rem" }}>₹{t.mrp}</span>
                        <span style={{ background:"#EFF6FF",color:"#2563EB",borderRadius:4,padding:"1px 5px",fontSize:".62rem",fontWeight:700 }}>{d}% off</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Divider line */}
              <div style={{ height:1,background:"#F1F5F9" }}/>
              {/* Bottom section: info + button */}
              <div style={{ padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
                <div style={{ display:"flex",gap:16 }}>
                  <div>
                    <div style={{ fontSize:".68rem",color:"#9CA3AF",marginBottom:1 }}>TAT</div>
                    <div style={{ fontSize:".82rem",fontWeight:700,color:"#374151" }}>12–48 hrs</div>
                  </div>
                  <div>
                    <div style={{ fontSize:".68rem",color:"#9CA3AF",marginBottom:1 }}>Sample</div>
                    <div style={{ fontSize:".82rem",fontWeight:700,color:"#374151" }}>Blood</div>
                  </div>
                </div>
                {added ? (
                  <button onClick={()=>delCart(t.id)} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"#FEF3C7",color:"#B45309",border:"1.5px solid #F59E0B",borderRadius:8,padding:"8px 18px",fontWeight:800,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",flexShrink:0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    Added
                  </button>
                ) : (
                  <button className="btn-anim" onClick={()=>addCart(lab,t)} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"#1158A6",color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontWeight:800,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",flexShrink:0 }}>
                    + Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filtTests.length > TESTS_LIMIT && (
          <button onClick={()=>setShowAllTests(v=>!v)} style={{ display:"block",width:"100%",padding:"14px 20px",background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".84rem",fontWeight:700,color:"#1158A6",textAlign:"center",marginBottom:12,transition:"background .14s" }} onMouseEnter={e=>e.currentTarget.style.background="#EFF6FF"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
            {showAllTests ? "Show Less ↑" : `Show ${filtTests.length - TESTS_LIMIT} More Tests ↓`}
          </button>
        )}
      </div>
      </div>{/* end flex-1 list column */}
      {isDesktop && cartSlot}
      </div>{/* end desktop two-column wrapper */}
    </div>

    {/* ── Sticky Book Now bar — mobile only ── */}
    {!isDesktop && cart.length > 0 && (
      <div style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"#fff",borderTop:"1px solid #E5E7EB",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,fontFamily:"'Manrope',sans-serif" }}>
        <div style={{ display:"flex",flexDirection:"column",gap:2 }}>
          <span style={{ color:"#6B7280",fontSize:".72rem",fontWeight:600 }}>{cart.length} test{cart.length>1?"s":""} selected</span>
          <span style={{ color:"#0D1117",fontWeight:900,fontSize:"1.05rem" }}>₹{total.toLocaleString()}</span>
        </div>
        <button onClick={()=>setCartOpen(true)} className="btn-anim"
          style={{ background:"#F59E0B",color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",fontWeight:800,fontSize:".92rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
          Book a Test Now
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </button>
      </div>
    )}

  </div>
  );
};

export default LabDetailML;
