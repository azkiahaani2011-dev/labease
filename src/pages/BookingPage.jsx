import React, { useState, useEffect } from 'react';
import { slotsFromTiming } from '../constants/labs';
import PaymentSelector from '../components/PaymentSelector';

const BookingField = ({ label, req, ...p }) => (
  <div>
    <label style={{ display:"block",fontWeight:700,fontSize:".78rem",marginBottom:6,color:"#374151",letterSpacing:".01em" }}>{label}{req&&<span style={{color:"#EF4444"}}> *</span>}</label>
    <input style={{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"12px 14px",fontSize:".88rem",fontFamily:"'Manrope',sans-serif",background:"#fff",color:"#111",display:"block",outline:"none",transition:"border-color .15s",boxSizing:"border-box" }}
      onFocus={e=>e.target.style.borderColor="#1158A6"}
      onBlur={e=>e.target.style.borderColor="#E5E7EB"}
      {...p}/>
  </div>
);

function BookingPage({ form, setForm, step, setStep, cart, total, mrpTotal, saving, lab, navTo, confirm, labSettings, homeCollFee=0 }) {
  const [loc, setLoc] = useState(form);
  const [bkSlotFocus, setBkSlotFocus] = useState(false);
  const [bkSlotQuery, setBkSlotQuery] = useState('');
  const sl = (k,v) => setLoc(f=>({...f,[k]:v}));

  // If the selected lab does not offer home collection, force mode to walk-in
  useEffect(() => {
    if (lab?.homeCollection === false && loc.mode !== "clinic") {
      setLoc(f => ({ ...f, mode: "clinic", address: "" }));
    }
  }, [lab?.homeCollection, loc.mode]);

  // Validation per step
  const homeAddrOk = loc.houseNo?.trim().length>0 && loc.area?.trim().length>1 && loc.city?.trim().length>1 && loc.pincode?.replace(/\D/g,'').length===6;
  const ok1 = loc.name.trim().length>=2 && loc.phone.replace(/\D/g,'').length>=8 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(loc.email.trim())
              && (loc.mode==="clinic" || (loc.mode==="home" && homeAddrOk));
  const ok2 = loc.date && loc.slot;

  // lab.timing / lab.sunday_timing already contain the merged admin + Supabase values from allLabs
  const _effectiveTiming = lab?.timing || '';
  const _effectiveSundayTiming = lab?.sunday_timing || '';
  const isSunday = loc.date ? new Date(loc.date + 'T00:00:00').getDay() === 0 : false;
  const LAB_SLOTS = isSunday && _effectiveSundayTiming
    ? slotsFromTiming(_effectiveSundayTiming)
    : slotsFromTiming(_effectiveTiming);
  const steps = ["Details","Schedule","Review & Pay"];

  const BtnBack = ({onClick}) => (
    <button onClick={onClick} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:4,flexShrink:0 }} aria-label="Back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
    </button>
  );
  const BtnNext = ({disabled,onClick,children}) => (
    <button disabled={disabled} onClick={onClick}
      style={{ flex:2,background:disabled?"#E5E7EB":"#1158A6",color:disabled?"#9CA3AF":"#fff",border:"none",borderRadius:50,padding:"13px 0",fontWeight:800,fontSize:".9rem",cursor:disabled?"not-allowed":"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .18s",boxShadow:disabled?"none":"0 4px 14px rgba(17,88,166,.3)" }}
      onMouseEnter={e=>!disabled&&(e.currentTarget.style.background="#0F2D6B")}
      onMouseLeave={e=>!disabled&&(e.currentTarget.style.background="#1158A6")}>
      {children}
    </button>
  );

  // Safety guard: if step is somehow out of range, reset to 1
  const safeStep = (step >= 1 && step <= 3) ? step : 1;
  if (safeStep !== step) { setStep(1); return null; }

  // If cart is empty or lab missing, show a friendly redirect
  if (!lab || cart.length === 0) {
    return (
      <div style={{ minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"#F5F7FF",fontFamily:"'Manrope',sans-serif" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:"3rem",marginBottom:12 }}>🧪</div>
          <div style={{ fontWeight:800,fontSize:"1.1rem",color:"#0D1117",marginBottom:8 }}>No tests selected</div>
          <div style={{ color:"#6B7280",marginBottom:20,fontSize:".88rem" }}>Please add tests to your cart before booking.</div>
          <button onClick={()=>navTo("labs")} style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"12px 28px",fontWeight:800,fontSize:".9rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>Browse Labs</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:"32px 0 60px",minHeight:"100vh",background:"#F5F7FF",fontFamily:"'Manrope',sans-serif" }}>
      <div style={{ maxWidth:600,margin:"0 auto",padding:"0 16px" }}>

        {/* Header */}
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
          <button onClick={()=>navTo(lab?"lab":"labs")} style={{ background:"none",border:"none",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,padding:0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
          </button>
          <div>
            <div style={{ fontWeight:800,fontSize:"1.1rem",color:"#0D1117" }}>Book Test</div>
            <div style={{ fontSize:".75rem",color:"#6B7280" }}>
              {lab?.name} &nbsp;·&nbsp; {cart.length} test{cart.length>1?"s":""} &nbsp;·&nbsp;
              <strong style={{ color:"#1158A6" }}>₹{total.toLocaleString()}</strong>
              {saving > 0 && <>&nbsp;·&nbsp;<span style={{ color:"#16A34A",fontWeight:700 }}>Save ₹{saving.toLocaleString()}</span></>}
            </div>
          </div>
        </div>

        {/* Step bar — 3 steps */}
        <div style={{ display:"flex",alignItems:"center",marginBottom:20,padding:"0 4px" }}>
          {steps.map((l,i)=>(
            <React.Fragment key={l}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:0 }}>
                <div style={{ width:30,height:30,borderRadius:50,background:step>i+1?"#16A34A":step===i+1?"#1158A6":"#E5E7EB",color:step>=i+1?"#fff":"#9CA3AF",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:".78rem",transition:"all .25s",flexShrink:0 }}>
                  {step>i+1?<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><polyline points="2,8 6,12 14,4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>:i+1}
                </div>
                <span style={{ fontSize:".6rem",fontWeight:700,color:step===i+1?"#1158A6":step>i+1?"#16A34A":"#9CA3AF",whiteSpace:"nowrap" }}>{l}</span>
              </div>
              {i<2&&<div style={{ flex:1,height:2,background:step>i+1?"#1158A6":"#E5E7EB",margin:"0 6px",marginBottom:14,borderRadius:99,transition:"background .25s" }}/>}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div style={{ background:"#fff",borderRadius:20,padding:"24px 20px",border:"1.5px solid #EEF2FF",boxShadow:"0 4px 20px rgba(17,88,166,.07)" }}>

          {/* ── STEP 1: Patient Info + Collection ── */}
          {step===1&&(
            <div style={{ animation:"slideUp .25s" }}>
              <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117",marginBottom:18 }}>Patient Details &amp; Collection</div>

              <div style={{ display:"grid",gap:13,marginBottom:18 }}>
                <BookingField label="Full Name" req placeholder="Patient's full name" value={loc.name} onChange={e=>sl("name",e.target.value)}/>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                  <BookingField label="Phone" req type="tel" placeholder="+91 XXXXXXXXXX" value={loc.phone} onChange={e=>sl("phone",e.target.value)}/>
                  <BookingField label="Email" req type="email" placeholder="email@example.com" value={loc.email} onChange={e=>sl("email",e.target.value)}/>
                </div>
                <BookingField label="Age &amp; Gender (optional)" placeholder="34 / Female" value={loc.age} onChange={e=>sl("age",e.target.value)}/>
              </div>

              {/* Collection toggle */}
              <div style={{ fontWeight:700,fontSize:".78rem",color:"#374151",marginBottom:10 }}>Sample Collection <span style={{color:"#EF4444"}}>*</span></div>
              <div style={{ display:"grid",gridTemplateColumns: lab?.homeCollection===false ? "1fr" : "1fr 1fr",gap:10,marginBottom:14 }}>
                {[["clinic","Walk-in","Visit the lab"],["home","Home Collection","We come to you"]]
                  .filter(([mode]) => !(mode==="home" && lab?.homeCollection===false))
                  .map(([mode,title,sub])=>{
                  const sel=loc.mode===mode;
                  return (
                    <div key={mode} onClick={()=>setLoc(f=>({...f,mode,address:mode==="clinic"?"":f.address}))}
                      style={{ borderRadius:14,border:`2px solid ${sel?"#1158A6":"#E5E7EB"}`,padding:"16px 12px",cursor:"pointer",background:sel?"#EFF6FF":"#FAFAFA",transition:"all .15s",textAlign:"center" }}>
                      <div style={{ fontWeight:800,fontSize:".85rem",color:sel?"#1158A6":"#0D1117" }}>{title}</div>
                      <div style={{ fontSize:".7rem",color:"#9CA3AF",marginTop:3 }}>{sub}</div>
                    </div>
                  );
                })}
              </div>

              {loc.mode==="home"&&(
                <div style={{ background:"#F5F7FF",border:"1.5px solid #DBEAFE",borderRadius:14,padding:"16px",marginBottom:4,animation:"slideUp .2s" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6,fontWeight:700,fontSize:".78rem",color:"#1158A6",marginBottom:12 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Pickup Address <span style={{color:"#EF4444"}}>*</span>
                  </div>
                  <div style={{ display:"grid",gap:10 }}>
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                      <BookingField label="House / Flat No." req placeholder="4B / Plot 12" value={loc.houseNo||""} onChange={e=>sl("houseNo",e.target.value)}/>
                      <BookingField label="Area / Street" req placeholder="Jubilee Hills" value={loc.area||""} onChange={e=>sl("area",e.target.value)}/>
                    </div>
                    <BookingField label="Nearby Landmark (optional)" placeholder="Near Apollo Hospital" value={loc.landmark||""} onChange={e=>sl("landmark",e.target.value)}/>
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                      <BookingField label="City" req placeholder="Hyderabad" value={loc.city||""} onChange={e=>sl("city",e.target.value)}/>
                      <BookingField label="Pincode" req placeholder="500 001" value={loc.pincode||""} onChange={e=>sl("pincode",e.target.value.replace(/\D/g,"").slice(0,6))} type="tel"/>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display:"flex",gap:10,marginTop:20 }}>
                <BtnNext disabled={!ok1} onClick={()=>{ setForm(loc); setStep(2); }}>Next: Pick Date &amp; Time →</BtnNext>
              </div>
            </div>
          )}

          {/* ── STEP 2: Date + Time ── */}
          {step===2&&(
            <div style={{ animation:"slideUp .25s" }}>
              <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117",marginBottom:18 }}>Date &amp; Time Slot</div>

              <label style={{ display:"block",fontWeight:700,fontSize:".78rem",marginBottom:10,color:"#374151" }}>Preferred Date <span style={{color:"#EF4444"}}>*</span></label>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginBottom:20 }}>
                {Array.from({length:14},(_,i)=>{
                  const d=new Date(); d.setDate(d.getDate()+i);
                  const val=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
                  const day=d.toLocaleDateString("en-IN",{weekday:"short"});
                  const date=d.toLocaleDateString("en-IN",{day:"numeric",month:"short"});
                  const sel=loc.date===val; const isToday=i===0;
                  return (
                    <button key={val} onClick={()=>setLoc(f=>({...f,date:val,slot:""}))}
                      style={{ padding:"8px 4px",borderRadius:10,border:`1.5px solid ${sel?"#1158A6":"#E5E7EB"}`,background:sel?"#1158A6":isToday?"#F0F6FF":"#fff",color:sel?"#fff":isToday?"#1158A6":"#374151",fontFamily:"'Manrope',sans-serif",cursor:"pointer",transition:"all .14s",display:"flex",flexDirection:"column",alignItems:"center",gap:2 }}>
                      <span style={{ fontSize:".58rem",fontWeight:600,opacity:.8 }}>{isToday?"Today":day}</span>
                      <span style={{ fontSize:".76rem",fontWeight:800 }}>{date}</span>
                    </button>
                  );
                })}
              </div>

              {(()=>{
                const displayTiming = isSunday && _effectiveSundayTiming ? _effectiveSundayTiming : _effectiveTiming;
                const query = bkSlotQuery || '';
                const filtered = LAB_SLOTS.filter(s => !query || s.toLowerCase().includes(query.toLowerCase()));
                const slotSelected = loc.slot && LAB_SLOTS.includes(loc.slot);
                return (
                  <div style={{ position:"relative" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                      <label style={{ fontWeight:700,fontSize:".78rem",color:"#374151" }}>Preferred Time <span style={{color:"#EF4444"}}>*</span></label>
                      {displayTiming&&<span style={{ fontSize:".66rem",fontWeight:700,color:"#1158A6",background:"#EFF6FF",borderRadius:6,padding:"2px 7px" }}>🕐 {isSunday?"Sun":"Weekday"}: {displayTiming}</span>}
                    </div>
                    <div style={{ position:"relative",display:"flex",alignItems:"center",marginBottom:4 }}>
                      <svg style={{ position:"absolute",left:11,pointerEvents:"none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <input type="text" placeholder="Type or tap a time slot…"
                        value={slotSelected?loc.slot:query}
                        onFocus={()=>{ setBkSlotFocus(true); if(slotSelected){ setBkSlotQuery(''); setLoc(f=>({...f,slot:''})); } }}
                        onBlur={()=>setTimeout(()=>setBkSlotFocus(false),160)}
                        onChange={e=>{ setBkSlotQuery(e.target.value); setLoc(f=>({...f,slot:''})); }}
                        style={{ width:"100%",padding:"11px 36px 11px 32px",borderRadius:10,border:`1.5px solid ${bkSlotFocus?"#1158A6":"#E5E7EB"}`,fontSize:".88rem",fontWeight:600,fontFamily:"'Manrope',sans-serif",outline:"none",background:"#F8FAFC",color:"#1F2937",boxSizing:"border-box" }}/>
                      {(query||slotSelected)&&<button onClick={()=>{ setBkSlotQuery(''); setLoc(f=>({...f,slot:''})); }} style={{ position:"absolute",right:10,background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",fontSize:"1rem" }}>✕</button>}
                    </div>
                    {bkSlotFocus&&(
                      <div style={{ position:"absolute",top:"calc(100% - 2px)",left:0,right:0,background:"#fff",border:"1.5px solid #E5E7EB",borderRadius:12,boxShadow:"0 8px 28px rgba(0,0,0,.12)",zIndex:999,maxHeight:210,overflowY:"auto" }}>
                        {filtered.length===0
                          ?<div style={{ padding:"14px 16px",fontSize:".83rem",color:"#9CA3AF",textAlign:"center" }}>No slots match</div>
                          :filtered.map((s,i)=>{
                            const act=loc.slot===s;
                            return <div key={s} onMouseDown={()=>{ setLoc(f=>({...f,slot:s})); setBkSlotQuery(''); setBkSlotFocus(false); }}
                              style={{ padding:"11px 16px",fontSize:".88rem",fontWeight:act?700:500,color:act?"#1158A6":"#374151",background:act?"#EFF6FF":"transparent",cursor:"pointer",borderBottom:i<filtered.length-1?"1px solid #F3F4F6":"none",display:"flex",alignItems:"center",gap:8 }}
                              onMouseEnter={e=>!act&&(e.currentTarget.style.background="#F8FAFC")}
                              onMouseLeave={e=>!act&&(e.currentTarget.style.background="transparent")}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={act?"#1158A6":"#9CA3AF"} strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {s}
                              {act&&<svg style={{marginLeft:"auto"}} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.8" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                            </div>;
                          })
                        }
                      </div>
                    )}
                  </div>
                );
              })()}

              <div style={{ display:"flex",gap:10,marginTop:22 }}>
                <BtnBack onClick={()=>setStep(1)}/>
                <BtnNext disabled={!ok2} onClick={()=>{ setForm(loc); setStep(3); }}>Review &amp; Pay →</BtnNext>
              </div>
            </div>
          )}

          {/* ── STEP 3: Review + Payment ── */}
          {step===3&&(
            <div style={{ animation:"slideUp .25s" }}>
              <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117",marginBottom:16 }}>Review &amp; Pay</div>

              {/* Booking summary */}
              <div style={{ background:"#F5F7FF",borderRadius:12,padding:"14px 16px",marginBottom:12,border:"1px solid #EEF2FF" }}>
                <div style={{ fontWeight:700,fontSize:".7rem",color:"#9CA3AF",letterSpacing:".07em",textTransform:"uppercase",marginBottom:10 }}>Booking Summary</div>
                {[["Patient",form.name],["Phone",form.phone],["Lab",lab?.name],["Date",form.date],["Time",form.slot],["Collection",form.mode==="home"?"Home Collection":"Walk-in"],form.mode==="home"&&["Address",[form.houseNo,form.area,form.landmark&&`Near ${form.landmark}`,form.city,form.pincode].filter(Boolean).join(', ')]].filter(Boolean).map(([l,v])=>(
                  <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #EEF2FF",fontSize:".82rem" }}>
                    <span style={{ color:"#9CA3AF",fontWeight:600 }}>{l}</span>
                    <span style={{ fontWeight:700,color:"#0D1117",maxWidth:"60%",textAlign:"right",wordBreak:"break-word" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Tests + total */}
              <div style={{ background:"#F5F7FF",borderRadius:12,padding:"14px 16px",marginBottom:16,border:"1px solid #EEF2FF" }}>
                <div style={{ fontWeight:700,fontSize:".7rem",color:"#9CA3AF",letterSpacing:".07em",textTransform:"uppercase",marginBottom:10 }}>Tests</div>
                {cart.map(item=>(
                  <div key={item.tid} style={{ display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:".82rem" }}>
                    <span style={{ color:"#374151",fontWeight:600,maxWidth:"65%" }}>{item.tname}</span>
                    <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                      {item.mrp > item.price && <span style={{ color:"#CBD5E1",textDecoration:"line-through",fontSize:".76rem" }}>₹{item.mrp}</span>}
                      <span style={{ fontWeight:800,color:"#1158A6" }}>₹{item.price}</span>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop:"1.5px dashed #DBEAFE",paddingTop:10,marginTop:8 }}>
                  {homeCollFee > 0 && (
                    <div style={{ display:"flex",justifyContent:"space-between",color:"#EA580C",fontSize:".79rem",marginBottom:3,fontWeight:600 }}>
                      <span>🏠 Home Collection Fee</span><span>+₹{homeCollFee.toLocaleString()}</span>
                    </div>
                  )}
                  {saving > 0 && <>
                    <div style={{ display:"flex",justifyContent:"space-between",color:"#9CA3AF",fontSize:".79rem",marginBottom:3 }}>
                      <span>MRP Total</span><span style={{ textDecoration:"line-through" }}>₹{mrpTotal.toLocaleString()}</span>
                    </div>
                    <div style={{ display:"flex",justifyContent:"space-between",color:"#16A34A",fontSize:".8rem",marginBottom:8,fontWeight:700 }}>
                      <span>You Save</span><span>−₹{saving.toLocaleString()}</span>
                    </div>
                  </>}
                  <div style={{ display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:"1rem",color:"#0D1117" }}>
                    <span>Total</span>
                    <span style={{ color:"#1158A6",fontSize:"1.15rem" }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment inline */}
              <PaymentSelector total={total} onPay={confirm} onBack={()=>setStep(2)} mode={loc.mode}/>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BookingPage;
