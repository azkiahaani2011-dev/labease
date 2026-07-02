import React, { useEffect } from 'react';
const Toast = ({ msg, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, Math.max(2600, msg.length * 60)); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"var(--teal)",color:"#fff",borderRadius:50,padding:"12px 24px",fontWeight:700,fontSize:".86rem",zIndex:9999,boxShadow:"0 8px 28px rgba(17,88,166,.38)",animation:"slideUp .25s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:10,fontFamily:"'Manrope',sans-serif" }}>
      <span style={{ width:20,height:20,borderRadius:"50%",background:"#60A5FA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".72rem",flexShrink:0 }}>✓</span>
      {msg}
    </div>
  );
};
export default Toast;
