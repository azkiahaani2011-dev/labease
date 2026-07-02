import React from 'react';
import { pct, Modal } from './ui/index';

function DesktopCartPanel({ cart, total, mrpTotal, saving, delCart, setCartOpen, navTo }) {
  return (
    <div style={{ position:"sticky", top:72, width:420, flexShrink:0, background:"#fff", borderRadius:16, border:"1px solid #E5E7EB", boxShadow:"0 4px 28px rgba(17,88,166,.11)", fontFamily:"'Manrope',sans-serif", overflow:"hidden", maxHeight:"calc(100vh - 88px)", display:"flex", flexDirection:"column" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(90deg,#EEF4FF,#F0F9FF)", borderBottom:"1px solid #DBEAFE", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"#1158A6", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </div>
          <div>
            <div style={{ fontWeight:900, fontSize:"1.05rem", color:"#0D1117" }}>Your Cart</div>
            <div style={{ fontSize:".71rem", color:"#6B7280", fontWeight:500 }}>{cart.length === 0 ? "No items yet" : `${cart.length} test${cart.length>1?"s":""} selected`}</div>
          </div>
        </div>
        {cart.length > 0 && <span style={{ background:"#1158A6", color:"#fff", borderRadius:50, padding:"3px 12px", fontSize:".76rem", fontWeight:700 }}>{cart.length}</span>}
      </div>

      {/* Scrollable body */}
      <div style={{ flex:1, overflowY:"auto", minHeight:0 }}>
        {cart.length === 0 ? (
          <div style={{ padding:"56px 24px", textAlign:"center" }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom:16 }}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <div style={{ fontWeight:700, color:"#374151", marginBottom:8, fontSize:"1rem" }}>No items in cart</div>
            <div style={{ fontSize:".82rem", color:"#9CA3AF", lineHeight:1.7 }}>Add tests from the list<br/>to see them here</div>
          </div>
        ) : (
          <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:14 }}>
            {cart.map(item => {
              const info = getTestInfo(item.tname);
              return (
                <div key={item.tid} style={{ borderRadius:12, border:"1px solid #E5E7EB", overflow:"hidden", background:"#fff" }}>
                  {/* Test name + price + remove */}
                  <div style={{ padding:"12px 14px", display:"flex", alignItems:"flex-start", gap:10, background:"#F8FAFC", borderBottom:"1px solid #F1F5F9" }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:800, fontSize:".92rem", color:"#0D1117", lineHeight:1.3, marginBottom:3 }}>{item.tname}</div>
                      <div style={{ fontSize:".73rem", color:"#6B7280" }}>{item.lname}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0 }}>
                      <span style={{ fontWeight:900, fontSize:"1rem", color:"#0D1117" }}>₹{item.price.toLocaleString()}</span>
                      <button onClick={()=>delCart(item.tid)}
                        style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:6, cursor:"pointer", padding:"2px 9px", color:"#EF4444", fontSize:".71rem", fontWeight:700, fontFamily:"'Manrope',sans-serif" }}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Test info — only when single item in cart */}
                  {cart.length === 1 && info && (
                    <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:10 }}>
                      <div style={{ display:"flex", gap:9 }}>
                        <div style={{ width:3, borderRadius:4, background:"#BFDBFE", flexShrink:0, marginTop:2 }}/>
                        <div>
                          <div style={{ fontWeight:700, fontSize:".69rem", color:"#1158A6", marginBottom:3, textTransform:"uppercase", letterSpacing:".06em" }}>What is this test?</div>
                          <div style={{ fontSize:".8rem", color:"#4B5563", lineHeight:1.7 }}>{info.what}</div>
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:9 }}>
                        <div style={{ width:3, borderRadius:4, background:"#6EE7B7", flexShrink:0, marginTop:2 }}/>
                        <div>
                          <div style={{ fontWeight:700, fontSize:".69rem", color:"#059669", marginBottom:3, textTransform:"uppercase", letterSpacing:".06em" }}>Why is this test done?</div>
                          <div style={{ fontSize:".8rem", color:"#4B5563", lineHeight:1.7 }}>{info.why}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer — totals + checkout */}
      {cart.length > 0 && (
        <div style={{ borderTop:"1px solid #E5E7EB", flexShrink:0, background:"#fff" }}>
          <div style={{ padding:"12px 18px", display:"flex", flexDirection:"column", gap:6 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:".82rem", color:"#9CA3AF" }}>
              <span>MRP Total</span>
              <span style={{ textDecoration:"line-through" }}>₹{mrpTotal.toLocaleString()}</span>
            </div>
            {saving > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:".82rem", color:"#16A34A", fontWeight:700 }}>
                <span>You Save</span>
                <span>−₹{saving.toLocaleString()}</span>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:"1.05rem", color:"#0D1117", borderTop:"1px solid #F1F5F9", paddingTop:8, marginTop:2 }}>
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ padding:"0 16px 16px" }}>
            <button onClick={()=>navTo("cart")} className="btn-anim"
              style={{ width:"100%", background:"#1158A6", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontWeight:800, fontSize:".95rem", cursor:"pointer", fontFamily:"'Manrope',sans-serif", boxShadow:"0 4px 16px rgba(17,88,166,.3)" }}>
              Book Now →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopCartPanel;
