import React, { useState } from 'react';

function PaymentSelector({ total, onPay, onBack, mode }) {
  const [method, setMethod] = React.useState("");
  const [upi, setUpi]       = React.useState("");
  const [paying, setPaying] = React.useState(false);

  const allMethods = [
    { id:"upi",      icon:"📱", label:"UPI",            sub:"Google Pay, PhonePe, Paytm & more" },
    { id:"card",     icon:"💳", label:"Credit / Debit Card", sub:"Visa, Mastercard, RuPay" },
    { id:"netbank",  icon:"🏦", label:"Net Banking",     sub:"All major banks supported"        },
    { id:"paylater", icon:"🏥", label:"Pay at Lab",      sub:"Pay cash or card at the centre"   },
  ];
  // Home collection requires upfront payment — hide "Pay at Lab"
  const methods = mode === "home" ? allMethods.filter(m => m.id !== "paylater") : allMethods;

  const handlePay = () => {
    if (!method) return;
    setPaying(true);
    setTimeout(() => { setPaying(false); onPay(method); }, 900);
  };

  return (
    <div>
      {/* Method tiles */}
      <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:20 }}>
        {methods.map(m => (
          <div key={m.id} onClick={()=>setMethod(m.id)}
            style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:14,border:`1.5px solid ${method===m.id?"#1158A6":"#E8EEFF"}`,background:method===m.id?"#EFF6FF":"#fff",cursor:"pointer",transition:"all .15s",boxShadow:method===m.id?"0 2px 12px rgba(17,88,166,.12)":"none" }}>
            {/* radio dot */}
            <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${method===m.id?"#1158A6":"#CBD5E1"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"border-color .15s" }}>
              {method===m.id&&<div style={{ width:10,height:10,borderRadius:"50%",background:"#1158A6" }}/>}
            </div>
            <span style={{ fontSize:"1.3rem",flexShrink:0 }}>{m.icon}</span>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontWeight:700,fontSize:".9rem",color:"#0D1117" }}>{m.label}</div>
              <div style={{ fontSize:".74rem",color:"#9CA3AF" }}>{m.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* UPI input if UPI selected */}
      {method==="upi"&&(
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:".78rem",fontWeight:700,color:"#374151",display:"block",marginBottom:6 }}>UPI ID</label>
          <div style={{ display:"flex",gap:8 }}>
            <input value={upi} onChange={e=>setUpi(e.target.value)}
              placeholder="yourname@upi"
              style={{ flex:1,border:"1.5px solid #DBEAFE",borderRadius:10,padding:"11px 14px",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",outline:"none",color:"#111",background:"#F5F7FF" }}
              onFocus={e=>e.target.style.borderColor="#1158A6"}
              onBlur={e=>e.target.style.borderColor="#DBEAFE"}
            />
            <div style={{ display:"flex",alignItems:"center",padding:"0 12px",background:"#EFF6FF",borderRadius:10,fontSize:".75rem",fontWeight:700,color:"#1158A6",border:"1.5px solid #DBEAFE",whiteSpace:"nowrap" }}>Verify →</div>
          </div>
          <div style={{ fontSize:".7rem",color:"#9CA3AF",marginTop:6 }}>
            💡 UPI payment integration coming soon. Currently books your appointment.
          </div>
        </div>
      )}

      {/* Pay at lab note */}
      {method==="paylater"&&(
        <div style={{ background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:".8rem",color:"#15803D",fontWeight:600 }}>
          ✓ Your slot is reserved. Pay directly at the lab on your visit date.
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display:"flex",gap:10,marginTop:4 }}>
        <button onClick={onBack} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:4,flexShrink:0 }} aria-label="Back"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg></button>
        <button onClick={handlePay} disabled={!method||paying}
          style={{ flex:2,background:method?(paying?"#4B8DE0":"#1158A6"):"#94A3B8",color:"#fff",border:"none",borderRadius:50,padding:"13px",fontWeight:800,fontSize:".92rem",cursor:method?"pointer":"not-allowed",fontFamily:"'Manrope',sans-serif",boxShadow:method?"0 4px 14px rgba(17,88,166,.3)":"none",transition:"all .18s",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
          {paying
            ? <><span style={{ width:16,height:16,border:"2px solid rgba(255,255,255,.4)",borderTop:"2px solid #fff",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite" }}/> Processing…</>
            : <>{method==="paylater"?<>Confirm &amp; Reserve · <span style={{fontWeight:600,fontSize:".8em",opacity:.85}}>Amount Pending</span></>:`Pay ₹${total.toLocaleString()}`}</>
          }
        </button>
      </div>
    </div>
  );
}

export default PaymentSelector;
