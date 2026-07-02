import React, { useState } from 'react';
import { LABS } from '../constants/labs';
import { ICONS } from '../components/icons';
import { POPULAR_CATS } from '../constants/packages';

function AllTestsPage({ setCatF, navTo, setSelectedTest }) {
  return (
    <div style={{ minHeight:"100vh", background:"#F5F7FF", fontFamily:"'Manrope',sans-serif" }}>
      <div style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"14px 0" }}>
        <div style={{ maxWidth:1600, margin:"0 auto", padding:"0 24px", textAlign:"left" }}>
          <button onClick={()=>navTo("home")} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:4,flexShrink:0 }} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
          </button>
          <h1 style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"clamp(1.4rem,3vw,1.9rem)", color:"#0D1117", marginBottom:6, letterSpacing:"-.03em" }}>All Specialities</h1>
          <p style={{ color:"#6B7280", fontSize:".88rem" }}>Browse popular test categories and compare prices across all certified labs</p>
        </div>
      </div>

      <div style={{ maxWidth:1600, margin:"0 auto", padding:"28px 24px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }}>
          {POPULAR_CATS.map(({ cat, label, Icon }) => (
            <div key={cat} className="pt-tile"
              onClick={()=>{ setCatF(cat); setSelectedTest({name:label, cat}); navTo("labs"); }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"22px 12px 18px", background:"#fff", borderRadius:18, border:"1px solid #EEF2FF", cursor:"pointer", transition:"transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .18s,background .18s" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.background="#F0F6FF"; e.currentTarget.style.boxShadow="0 8px 24px rgba(17,88,166,.13)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.background="#fff"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ width:86, height:86, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, flexShrink:0, border:"1px solid #E5E7EB" }}>
                <Icon s={86}/>
              </div>
              <div style={{ fontWeight:700, color:"#1F2937", fontSize:".85rem", textAlign:"center", lineHeight:1.3, marginBottom:5 }}>{label}</div>
              <div style={{ fontSize:".68rem", fontWeight:800, color:"#1158A6", letterSpacing:".05em", textTransform:"uppercase" }}>Book Now</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllTestsPage;
