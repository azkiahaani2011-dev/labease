import React, { useState } from 'react';
import { LabCardML, LabBanner, LabCardSkeleton } from '../components/LabCard';

function LabsPageML({ T, catF, setCatF, setLab, setTestQ, navTo, cart, selectedTest, setSelectedTest, addCart, setCartOpen, allLabs, isDesktop, cartSlot }) {
  const [sortBy,     setSortBy]     = useState("rating");
  const [sortOpen,   setSortOpen]   = useState(false);
  const sortRef = React.useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterHome, setFilterHome] = useState(false);
  const [filterNabl, setFilterNabl] = useState(false);
  const [searchQ,    setSearchQ]    = useState("");
  const [labSugOpen, setLabSugOpen] = useState(false);
  const [loading,    setLoading]    = useState(true);
  const [showAllLabs, setShowAllLabs] = useState(false);
  const labSearchRef = React.useRef(null);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const h = e => {
      if(labSearchRef.current && !labSearchRef.current.contains(e.target)) setLabSugOpen(false);
      if(sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);

  const specialties = [
    ["Blood Tests","Blood"],["Thyroid","Thyroid"],["Diabetes","Diabetes"],
    ["Vitamin Tests","Vitamins"],["Full Body Package","Packages"],
    ["Cardiac","Cardiac"],["Kidney","Kidney"],["Liver","Liver"],
    ["Hormones","Hormones"],["Radiology","Radiology"],
  ];
  const tagMap = {
    1:["Blood Tests","Packages","Home Collection"],
    2:["Pathology","Urine","Thyroid"],
    3:["Full Body","Cancer Markers","Allergy"],
    4:["Blood Sugar","Infectious","Packages"],
    5:["Hormones","Thyroid","Fertility"],
    6:["Radiology","Echo","MRI"],
  };

  // Merge LABS (+ admin-added labs) with NEAR_ME metadata
  const labsSource = allLabs || LABS;
  const enriched = labsSource.map((l) => {
    const nm = NEAR_ME.find(x => l.name.startsWith(x.name.split(" ")[0]));
    return { ...l, open: nm?.open ?? true, dist: nm?.dist ?? "—", area: nm?.area ?? l.city, homecoll: nm?.homecoll ?? l.homeCollection, tags: tagMap[l.id] || ["Blood Tests","Packages"] };
  });

  const labSuggestions = searchQ.trim().length < 1 ? [] :
    enriched.filter(l => l.name.toLowerCase().includes(searchQ.toLowerCase()) || (l.area||"").toLowerCase().includes(searchQ.toLowerCase())).slice(0,5);

  const filtered = enriched
    .filter(l => l.active !== false)
    .filter(l => {
      if (!selectedTest) return true;
      const n = selectedTest.name.toLowerCase();
      return (l.tests || []).some(t =>
        t.name.toLowerCase() === n ||
        t.name.toLowerCase().includes(n) ||
        n.includes(t.name.toLowerCase()) ||
        (selectedTest.cat && t.cat === selectedTest.cat)
      );
    })
    .filter(l => !filterOpen || l.open)
    .filter(l => !filterHome || l.homecoll)
    .filter(l => !filterNabl || l.nabl)
    .filter(l => !searchQ || l.name.toLowerCase().includes(searchQ.toLowerCase()) || l.address.toLowerCase().includes(searchQ.toLowerCase()))
    .sort((a,b) =>
      sortBy === "price" ? (a.tests?.length ? Math.min(...a.tests.map(t=>t.price)) : 9999) - (b.tests?.length ? Math.min(...b.tests.map(t=>t.price)) : 9999) :
      b.rating - a.rating
    );

  return (
    <div style={{ minHeight:"100vh", background:"#fff", fontFamily:"'Manrope',sans-serif" }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"12px 16px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={()=>navTo("home")} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:4,flexShrink:0 }} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
          </button>
          <h1 style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"1.4rem", color:"#0D1117", margin:0, letterSpacing:"-.02em" }}>Our Trusted Lab Partners</h1>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ background:"#fff", minHeight:"80vh", padding:"16px 0" }}>
        {/* Desktop two-column wrapper */}
        <div style={isDesktop ? { display:"flex", gap:28, alignItems:"flex-start", maxWidth:1280, margin:"0 auto", padding:"0 24px" } : {}}>
        <div style={isDesktop ? { flex:1, minWidth:0 } : {}}>
        {/* Search + Sort row */}
        <div style={{ padding:"0 16px" }}>
        <div style={{ display:"flex",gap:4,marginBottom:16,alignItems:"center",maxWidth:580 }}>
        <div style={{ position:"relative", flex:1 }} ref={labSearchRef}>
          <svg style={{ position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.7"/><path d="M13.5 13.5L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.7" strokeLinecap="round"/></svg>
          <input className="labs-search-input" value={searchQ} onChange={e=>{ setSearchQ(e.target.value); setLabSugOpen(true); }} placeholder="Search labs by name…" style={{ paddingLeft:42,paddingRight:16,paddingTop:13,paddingBottom:13,border:"2px solid #E5E7EB",borderRadius:14,fontSize:".9rem",fontFamily:"'Manrope',sans-serif",outline:"none",width:"100%",background:"#fff",color:"#111",boxShadow:"0 2px 12px rgba(17,88,166,.08)",transition:"border .18s,box-shadow .18s",boxSizing:"border-box" }}
            onFocus={e=>{ e.target.style.border="2px solid #1158A6"; e.target.style.boxShadow="0 0 0 4px rgba(17,88,166,.12)"; setLabSugOpen(true); }}
            onBlur={e=>{ e.target.style.border="2px solid #E5E7EB"; e.target.style.boxShadow="0 2px 12px rgba(17,88,166,.08)"; }}/>
          {labSugOpen && searchQ.trim().length>0 && labSuggestions.length>0 && (
            <div style={{ position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",borderRadius:12,border:"1px solid #E5E7EB",boxShadow:"0 8px 28px rgba(0,0,0,.1)",zIndex:200,overflow:"hidden" }}>
              {labSuggestions.map((l,i)=>(
                <button key={l.id} onClick={()=>{ setSearchQ(l.name); setLabSugOpen(false); }} style={{ display:"block",width:"100%",padding:"9px 14px",background:"none",border:"none",borderBottom:i<labSuggestions.length-1?"1px solid #F3F4F6":"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",fontSize:".84rem",fontWeight:600,color:"#111",transition:"background .1s" }} onMouseEnter={e=>e.currentTarget.style.background="#F0F6FF"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  {l.name}
                  <span style={{ fontSize:".72rem",color:"#9CA3AF",fontWeight:400,marginLeft:6 }}>{l.area}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div ref={sortRef} style={{ position:"relative",flexShrink:0 }}>
          <button onClick={()=>setSortOpen(o=>!o)}
            style={{ height:46,borderRadius:12,border:"1.5px solid "+(sortOpen?"#1158A6":"#E5E7EB"),background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:6,padding:"0 14px",fontFamily:"'Manrope',sans-serif",fontSize:".85rem",fontWeight:700,color:"#1158A6",whiteSpace:"nowrap" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><circle cx="8" cy="6" r="2" fill="#1158A6" stroke="#1158A6"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="16" cy="12" r="2" fill="#1158A6" stroke="#1158A6"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="10" cy="18" r="2" fill="#1158A6" stroke="#1158A6"/></svg>
            Sort
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {sortOpen && (
            <div style={{ position:"absolute",top:"calc(100% + 6px)",right:0,background:"#fff",borderRadius:12,border:"1px solid #E5E7EB",boxShadow:"0 8px 28px rgba(0,0,0,.12)",zIndex:300,minWidth:180,overflow:"hidden" }}>
              {[
                {key:"rating", label:"Rating (High → Low)"},
              ].map(opt=>(
                <button key={opt.key} onClick={()=>{ setSortBy(opt.key); setSortOpen(false); }}
                  style={{ display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"11px 16px",background:sortBy===opt.key?"#F0F6FF":"none",border:"none",borderBottom:"1px solid #F3F4F6",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".88rem",fontWeight:sortBy===opt.key?700:500,color:sortBy===opt.key?"#1158A6":"#374151",transition:"background .1s" }}
                  onMouseEnter={e=>{ if(sortBy!==opt.key) e.currentTarget.style.background="#F9FAFB"; }}
                  onMouseLeave={e=>{ if(sortBy!==opt.key) e.currentTarget.style.background="none"; }}>
                  {opt.label}
                  {sortBy===opt.key && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>
        </div>
        {selectedTest && (
          <div style={{ margin:"0 16px 12px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
            <div>
              <span style={{ fontSize:".72rem",fontWeight:700,color:"#1158A6",letterSpacing:".06em",textTransform:"uppercase" }}>Selected Test</span>
              <div style={{ fontWeight:800,color:"#0D1117",fontSize:".95rem",marginTop:2 }}>{selectedTest.name}</div>
              <div style={{ fontSize:".76rem",color:"#6B7280",marginTop:2 }}>Tap "Book Now →" on any lab to book directly</div>
            </div>
            <button onClick={()=>setSelectedTest(null)} style={{ background:"none",border:"1px solid #CBD5E8",borderRadius:8,padding:"6px 12px",fontSize:".78rem",fontWeight:700,color:"#374151",cursor:"pointer",fontFamily:"'Manrope',sans-serif",flexShrink:0 }}>Clear ✕</button>
          </div>
        )}
        <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
          {loading && [0,1,2,3].map(i=><LabCardSkeleton key={i} delay={i*80}/>)}
          {!loading && filtered.length===0 && (
            <div style={{ background:"#fff",borderRadius:16,border:"1px solid #E5E7EB",padding:48,textAlign:"center",color:"#9CA3AF" }}>
              <div style={{ fontSize:"2.5rem",marginBottom:10 }}>🔬</div>
              No labs match your filters.
            </div>
          )}
          {!loading && (showAllLabs ? filtered : filtered.slice(0,7)).map(l => (
            <LabCardML key={l.id} l={l} T={T} setLab={setLab} setCatF={setCatF} setTestQ={setTestQ} setSelectedTest={setSelectedTest} navTo={navTo} selectedTest={selectedTest} addCart={addCart} setCartOpen={setCartOpen}/>
          ))}
          {!loading && filtered.length > 7 && (
            <button onClick={()=>setShowAllLabs(v=>!v)}
              style={{ display:"block",width:"100%",padding:"14px 20px",background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".84rem",fontWeight:700,color:"#1158A6",textAlign:"center",margin:"4px 0 12px",transition:"background .14s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#EFF6FF"}
              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              {showAllLabs ? "Show Less ↑" : `Show ${filtered.length - 7} More Labs ↓`}
            </button>
          )}
        </div>
        </div>{/* end flex-1 list column */}
        {isDesktop && cartSlot}
        </div>{/* end desktop two-column wrapper */}
      </div>
    </div>
  );
};

export default LabsPageML;
