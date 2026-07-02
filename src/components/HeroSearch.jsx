import React, { useState, useRef } from 'react';
import SEARCH_INDEX from '../constants/search';
import { TRENDING_CHIPS } from '../constants/packages';
import { ALL_PACKAGES } from '../constants/packages';
import LABS from '../constants/labs';

function HeroSearch({ q, setQ, setLabQ, setSelectedTest, navTo, T, allLabs }) {
  const [open, setOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(-1);
  const [tab, setTab] = React.useState("tests"); // "tests" | "labs"
  const wrapRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Build search index dynamically from actual website data
  const searchIndex = React.useMemo(() => {
    const labs = (allLabs || LABS).filter(l => l.active !== false);
    const items = [];
    const seenTests = new Set();
    labs.forEach(lab => {
      (lab.tests || []).forEach(t => {
        if (!seenTests.has(t.name)) {
          seenTests.add(t.name);
          items.push({ type:"test", label:t.name, sub:`${t.cat} · from ₹${t.price}`, cat:t.cat, price:t.price });
        }
      });
      items.push({ type:"lab", label:lab.name, sub:`${lab.city} · ${(lab.tests||[]).length} tests`, cat:"" });
    });
    ALL_PACKAGES.forEach(p => {
      items.push({ type:"package", label:p.title, sub:`${p.sub} · ₹${p.price}`, cat:p.cat, price:p.price });
    });
    // Only include categories that have at least one test in the active labs
    const activeCats = new Set(items.filter(i=>i.type==="test").map(i=>i.cat));
    ["Blood Tests","Thyroid","Diabetes","Heart Health","Vitamins","Kidney","Liver","Full Body Packages","Cancer Markers","Hormones"]
      .filter(cat => activeCats.has(cat))
      .forEach(cat => items.push({ type:"category", label:cat, sub:"Category", cat }));
    return items;
  }, [allLabs]);

  const suggestions = React.useMemo(() => {
    if (q.trim().length < 1) return [];
    const qlo = q.toLowerCase();
    const words = qlo.split(/\s+/).filter(Boolean);
    const match = item => words.some(w => item.label.toLowerCase().includes(w));
    if (tab === "labs") {
      return searchIndex.filter(i => i.type === "lab" && match(i)).slice(0, 8);
    }
    const tests = searchIndex.filter(i => i.type === "test"     && match(i)).slice(0, 5);
    const pkgs  = searchIndex.filter(i => i.type === "package"  && match(i)).slice(0, 3);
    const cats  = searchIndex.filter(i => i.type === "category" && match(i)).slice(0, 2);
    return [...tests, ...pkgs, ...cats].slice(0, 8);
  }, [q, tab, searchIndex]);

  React.useEffect(() => {
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) { setOpen(false); setActiveIdx(-1); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const pick = (item) => {
    setOpen(false); setActiveIdx(-1);
    if (item.type === "lab") {
      setLabQ(item.label); setQ(item.label); navTo("labs");
    } else if (item.type === "category") {
      setLabQ(item.label); setQ(item.label); navTo("labs");
    } else {
      setSelectedTest({ name: item.label, cat: item.cat || "" });
      setQ(item.label); setLabQ("");
      navTo("labs");
    }
  };

  const goText = (text) => {
    if (!text.trim()) return;
    if (tab === "labs") {
      const labMatch = searchIndex.find(i => i.type === "lab" && i.label.toLowerCase().includes(text.toLowerCase()));
      if (labMatch) { pick(labMatch); return; }
      // No lab found — show no-results state in dropdown
      setOpen(true); return;
    }
    const exact = searchIndex.find(i => i.label.toLowerCase() === text.toLowerCase());
    if (exact) { pick(exact); return; }
    const partial = searchIndex.find(i => i.label.toLowerCase().includes(text.toLowerCase()) && i.type === "test")
      || searchIndex.find(i => i.label.toLowerCase().includes(text.toLowerCase()));
    if (partial) { pick(partial); return; }
    // No test found — show no-results state in dropdown instead of going to labs
    setOpen(true);
  };

  const onKey = e => {
    if (!open || suggestions.length === 0) { if (e.key === "Enter") goText(q); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i+1, suggestions.length-1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i-1, -1)); }
    else if (e.key === "Enter") { e.preventDefault(); if (activeIdx >= 0) pick(suggestions[activeIdx]); else goText(q); }
    else if (e.key === "Escape") { setOpen(false); setActiveIdx(-1); }
  };

  const tabStyle = (active) => ({
    flex: 1,
    padding: "11px 0",
    border: "none",
    background: "none",
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 700,
    fontSize: ".85rem",
    cursor: "pointer",
    color: active ? "#1158A6" : "#6B7280",
    borderBottom: active ? "2.5px solid #1158A6" : "2.5px solid transparent",
    transition: "all .15s",
  });

  // grouped results for tests tab
  const testItems = suggestions.filter(s => s.type === "test" || s.type === "category");
  const pkgItems  = suggestions.filter(s => s.type === "package");

  return (
    <div ref={wrapRef} style={{ position:"relative", maxWidth:580, width:"100%", margin:"0 auto", boxSizing:"border-box" }}>

      {/* Tab bar + input combined card */}
      <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 4px 24px rgba(17,88,166,.13)", overflow:"hidden" }}>
        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid #F1F5F9" }}>
          <button style={tabStyle(tab==="tests")} onClick={()=>{ setTab("tests"); setQ(""); setActiveIdx(-1); inputRef.current?.focus(); }}>
            <span style={{ display:"flex",alignItems:"center",gap:8,justifyContent:"center" }}>
              {/* Pill / capsule icon — represents medicine/test */}
              <span style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:26,height:26,borderRadius:8,background:tab==="tests"?"#DBEAFE":"#F3F4F6",transition:"background .15s" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={tab==="tests"?"#1158A6":"#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H5v10l6.29 6.29a1 1 0 0 0 1.41 0l6.3-6.3a1 1 0 0 0 0-1.41L13 5.5V3"/>
                  <path d="M9 3h4"/><circle cx="6.5" cy="11.5" r="1"/>
                </svg>
              </span>
              Tests &amp; Packages
            </span>
          </button>
          <div style={{ width:1, background:"#E5E7EB", margin:"8px 0" }}/>
          <button style={tabStyle(tab==="labs")} onClick={()=>{ setTab("labs"); setQ(""); setActiveIdx(-1); inputRef.current?.focus(); }}>
            <span style={{ display:"flex",alignItems:"center",gap:8,justifyContent:"center" }}>
              <span style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:26,height:26,borderRadius:8,background:tab==="labs"?"#DBEAFE":"#F3F4F6",transition:"background .15s" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={tab==="labs"?"#1158A6":"#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2v6l3.79 9.26A1 1 0 0 1 17 19H7a1 1 0 0 1-.79-1.74L10 8V2"/>
                  <path d="M8.5 2h7"/><path d="M7 16h10"/>
                </svg>
              </span>
              Labs
            </span>
          </button>
        </div>

        {/* Input row */}
        <div style={{ display:"flex", alignItems:"center" }}>
          <svg style={{ flexShrink:0, margin:"0 14px" }} width="17" height="17" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.8"/>
            <path d="M13.5 13.5 L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input ref={inputRef}
            value={q}
            onChange={e=>{ setQ(e.target.value); setOpen(true); setActiveIdx(-1); }}
            onFocus={()=>setOpen(true)}
            onKeyDown={onKey}
            placeholder={tab==="labs" ? "Search labs by name or area…" : "Search tests or packages…"}
            className="hero-search-input-field"
            style={{ flex:1, border:"none", outline:"none", padding:"14px 8px", fontSize:".95rem", color:"#111", fontFamily:"'Manrope',sans-serif", background:"transparent" }}
            autoComplete="off"
          />
          {q && (
            <button onClick={()=>{ setQ(""); setOpen(false); inputRef.current?.focus(); }}
              style={{ background:"none",border:"none",cursor:"pointer",padding:"0 10px",color:"#9CA3AF",fontSize:"1rem",display:"flex",alignItems:"center",flexShrink:0 }}>
              ✕
            </button>
          )}
          <button onClick={()=>goText(q)} className="btn-anim"
            style={{ background:"#1158A6",color:"#fff",border:"none",margin:6,borderRadius:10,padding:"12px 22px",flexShrink:0,fontSize:".88rem",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap" }}>
            Search
          </button>
        </div>
      </div>

      {/* Popular chips */}
      {!q && (
        <div style={{ display:"flex",gap:8,marginTop:14,flexWrap:"wrap",alignItems:"center",justifyContent:"center" }}>
          <span style={{ fontSize:".72rem",color:"#9CA3AF",fontWeight:600 }}>Popular:</span>
          {TRENDING_CHIPS.map(chip=>(
            <button key={chip.label} onClick={()=>pick({ type:"test", label:chip.label, cat:chip.cat })}
              style={{ background:"#fff",border:"1px solid #DBEAFE",borderRadius:20,padding:"5px 14px",fontSize:".73rem",fontWeight:700,color:"#1158A6",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#1158A6"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#1158A6"; e.currentTarget.style.borderColor="#DBEAFE"; }}>
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {open && q.trim().length > 0 && suggestions.length === 0 && (
        <div style={{ position:"absolute",top:"calc(100% - 14px)",left:0,right:0,background:"#fff",borderRadius:"0 0 16px 16px",boxShadow:"0 12px 40px rgba(0,0,0,.13)",zIndex:500,borderTop:"1px solid #F1F5F9",padding:"24px 20px",textAlign:"center" }}>
          <div style={{ fontSize:"1.6rem",marginBottom:8 }}>🔍</div>
          <div style={{ fontWeight:700,fontSize:".9rem",color:"#111827",marginBottom:4 }}>
            No {tab === "labs" ? "lab" : "test"} found for &ldquo;{q}&rdquo;
          </div>
          <div style={{ fontSize:".8rem",color:"#6B7280",fontWeight:500 }}>
            {tab === "labs" ? "Try a different lab name or area." : "Try a different test name or browse categories below."}
          </div>
          {tab === "tests" && (
            <div style={{ marginTop:14,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap" }}>
              {TRENDING_CHIPS.slice(0,4).map(chip=>(
                <button key={chip.label} onClick={()=>{ pick({ type:"test", label:chip.label, cat:chip.cat }); }}
                  style={{ background:"#EFF6FF",border:"none",borderRadius:20,padding:"5px 14px",fontSize:".73rem",fontWeight:700,color:"#1158A6",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>
                  {chip.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div style={{ position:"absolute",top:"calc(100% - 14px)",left:0,right:0,background:"#fff",borderRadius:"0 0 16px 16px",boxShadow:"0 12px 40px rgba(0,0,0,.13)",zIndex:500,overflow:"hidden",borderTop:"1px solid #F1F5F9",maxHeight:360,overflowY:"auto" }}>
          {tab === "labs" ? (
            <>
              {suggestions.map((s, i) => (
                <button key={s.label} onClick={()=>pick(s)}
                  style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 16px",background:i===activeIdx?"#F0FFF4":"none",border:"none",borderBottom:i<suggestions.length-1?"1px solid #F9FAFB":"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",transition:"background .1s" }}
                  onMouseEnter={e=>{ setActiveIdx(i); e.currentTarget.style.background="#F0FFF4"; }}
                  onMouseLeave={e=>{ if(activeIdx!==i) e.currentTarget.style.background="none"; }}>
                  <span style={{ flex:1,fontWeight:600,fontSize:".87rem",color:"#111",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{s.label}</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M6 3l5 5-5 5"/></svg>
                </button>
              ))}
            </>
          ) : (
            <>
              {testItems.length > 0 && (
                <>
                  {testItems.map((s, i) => (
                    <button key={s.label} onClick={()=>pick(s)}
                      style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 16px",background:i===activeIdx?"#F0F6FF":"none",border:"none",borderBottom:"1px solid #F9FAFB",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",transition:"background .1s" }}
                      onMouseEnter={e=>{ setActiveIdx(i); e.currentTarget.style.background="#F0F6FF"; }}
                      onMouseLeave={e=>{ if(activeIdx!==i) e.currentTarget.style.background="none"; }}>
                      <span style={{ flex:1,fontWeight:600,fontSize:".87rem",color:"#111",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{s.label}</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M6 3l5 5-5 5"/></svg>
                    </button>
                  ))}
                </>
              )}
              {pkgItems.length > 0 && (
                <>
                  {pkgItems.map((s, i) => (
                    <button key={s.label} onClick={()=>pick(s)}
                      style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 16px",background:i+testItems.length===activeIdx?"#FFFBEB":"none",border:"none",borderBottom:"1px solid #F9FAFB",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",transition:"background .1s" }}
                      onMouseEnter={e=>{ setActiveIdx(i+testItems.length); e.currentTarget.style.background="#FFFBEB"; }}
                      onMouseLeave={e=>{ if(activeIdx!==i+testItems.length) e.currentTarget.style.background="none"; }}>
                      <span style={{ flex:1,fontWeight:600,fontSize:".87rem",color:"#111",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{s.label}</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M6 3l5 5-5 5"/></svg>
                    </button>
                  ))}
                </>
              )}
            </>
          )}
          <div style={{ padding:"9px 16px",borderTop:"1px solid #F3F4F6",background:"#FAFBFF" }}>
            <button onClick={()=>goText(q)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:".8rem",fontWeight:700,color:"#1158A6",fontFamily:"'Manrope',sans-serif",padding:0,display:"flex",alignItems:"center",gap:6 }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.2" strokeLinecap="round"><circle cx="6.5" cy="6.5" r="4.5"/><path d="M11 11l3 3"/></svg>
              See all results for &ldquo;{q}&rdquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroSearch;
