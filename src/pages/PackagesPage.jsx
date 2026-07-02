import React, { useState } from 'react';
import { ALL_PACKAGES, POPULAR_CATS } from '../constants/packages';
import { Pill } from '../components/ui/index';

function PackagesPage({ navTo, setSelectedTest }) {
  return (
    <div style={{ minHeight:"100vh", background:"#F5F7FF", fontFamily:"'Manrope',sans-serif" }}>
      <div style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"14px 0" }}>
        <div style={{ maxWidth:760, margin:"0 auto", padding:"0 20px" }}>
          <button onClick={()=>navTo("home")} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,padding:4,color:"#374151",fontFamily:"'Manrope',sans-serif",fontWeight:600,fontSize:".9rem" }} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
            Back
          </button>
          <h1 style={{ fontWeight:900, fontSize:"clamp(1.4rem,3vw,1.9rem)", color:"#0D1117", letterSpacing:"-.03em", marginBottom:6, marginTop:8 }}>Health Packages</h1>
          <p style={{ fontSize:".88rem", color:"#6B7280" }}>Comprehensive screening packages at transparent prices. All include home sample collection.</p>
        </div>
      </div>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"24px 20px 60px" }}>
        {activePackages.map((pkg, i) => (
          <div key={pkg.title} style={{ background:"#fff", borderRadius:16, border:"1px solid #E5E7EB", marginBottom:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
            <div style={{ padding:"20px 20px 18px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:12 }}>
                <div style={{ flex:1 }}>
                  <span style={{ display:"inline-block", background:pkg.badgeColor, color:"#fff", borderRadius:6, padding:"2px 10px", fontSize:".65rem", fontWeight:800, letterSpacing:".05em", marginBottom:8 }}>{pkg.badge}</span>
                  <h2 style={{ fontWeight:900, fontSize:"1.1rem", color:"#0D1117", marginBottom:4, letterSpacing:"-.02em" }}>{pkg.title}</h2>
                  <p style={{ fontSize:".82rem", color:"#6B7280", margin:0 }}>{pkg.sub}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontWeight:900, fontSize:"1.3rem", color:"#0D1117" }}>₹{pkg.price.toLocaleString()}</div>
                  <div style={{ fontSize:".76rem", color:"#CBD5E1", textDecoration:"line-through" }}>₹{pkg.mrp.toLocaleString()}</div>
                  <div style={{ fontSize:".72rem", fontWeight:800, color:"#16A34A", marginTop:2 }}>{pkg.off}% OFF</div>
                </div>
              </div>
              <button
                onClick={()=>{ setSelectedTest({name:pkg.title, cat:pkg.cat}); navTo("labs"); }}
                style={{ width:"100%", background:"#1158A6", color:"#fff", border:"none", borderRadius:10, padding:"13px", fontWeight:800, fontSize:".92rem", cursor:"pointer", fontFamily:"'Manrope',sans-serif", letterSpacing:".02em" }}
                onMouseEnter={e=>e.currentTarget.style.background="#0F2D6B"}
                onMouseLeave={e=>e.currentTarget.style.background="#1158A6"}>
                Book Now — ₹{pkg.price.toLocaleString()} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackagesPage;
