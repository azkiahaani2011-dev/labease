import React, { useEffect } from 'react';

const _td = new Date();
export const TODAY = _td.getFullYear()+'-'+String(_td.getMonth()+1).padStart(2,'0')+'-'+String(_td.getDate()).padStart(2,'0');

export const Stars = ({ r }) => (
  <span style={{ color:"#F59E0B", fontSize:".82rem", letterSpacing:"1px" }}>
    {"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}
  </span>
);

export const pct = (p,m) => Math.round((1-p/m)*100);

export const Pill = ({ children, bg="#EFF6FF", fg="#1158A6", style={} }) => (
  <span style={{ background:bg, color:fg, borderRadius:20, padding:"3px 10px", fontSize:".68rem", fontWeight:700, letterSpacing:".04em", display:"inline-flex", alignItems:"center", gap:3, ...style }}>{children}</span>
);

export const Modal = ({ children, onClose }) => (
  <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)",animation:"fadeIn .18s" }}>
    <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:24,maxWidth:680,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(0,0,0,.22)",animation:"scaleIn .22s cubic-bezier(.34,1.56,.64,1)" }}>
      {children}
    </div>
  </div>
);

export const Toast = ({ msg, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, Math.max(2600, msg.length * 60)); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"var(--teal)",color:"#fff",borderRadius:50,padding:"12px 24px",fontWeight:700,fontSize:".86rem",zIndex:9999,boxShadow:"0 8px 28px rgba(17,88,166,.38)",animation:"slideUp .25s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:10,fontFamily:"'Manrope',sans-serif" }}>
      <span style={{ width:20,height:20,borderRadius:"50%",background:"#60A5FA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".72rem",flexShrink:0 }}>✓</span>
      {msg}
    </div>
  );
};
