import React from 'react';
export const IBlood = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FEE2E2"/>
    {/* 3 test tubes in a rack */}
    <rect x="18" y="38" width="36" height="5" rx="2" fill="#FECACA" stroke="#1E293B" strokeWidth="1.2"/>
    {[22,32,42].map((x,i)=>(
      <g key={x}>
        <rect x={x} y={18} width={9} height={24} rx={4.5} fill="white" stroke="#1E293B" strokeWidth="1.2"/>
        <rect x={x} y={30} width={9} height={12} rx={4.5} fill={["#FCA5A5","#FB7185","#F87171"][i]}/>
        <line x1={x+4.5} y1={14} x2={x+4.5} y2={18} stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x={x-1} y={12} width={11} height={5} rx={2} fill="#475569" stroke="#1E293B" strokeWidth="0.8"/>
      </g>
    ))}
    {/* blood drop */}
    <path d="M58 18C58 18 55 22 55 24C55 26 56.2 27 58 27C59.8 27 61 26 61 24C61 22 58 18 58 18Z" fill="#EF4444" stroke="#1E293B" strokeWidth="1"/>
  </svg>
);
export const IThyroid = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FEF9C3"/>
    {/* neck */}
    <rect x="33" y="10" width="6" height="52" rx="3" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1.2"/>
    {/* left lobe */}
    <ellipse cx="22" cy="37" rx="11" ry="15" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.3" transform="rotate(-10 22 37)"/>
    {/* right lobe */}
    <ellipse cx="50" cy="37" rx="11" ry="15" fill="#FCD34D" stroke="#1E293B" strokeWidth="1.3" transform="rotate(10 50 37)"/>
    {/* isthmus */}
    <rect x="27" y="34" width="18" height="6" rx="3" fill="#F59E0B" stroke="#1E293B" strokeWidth="1"/>
    {/* T3/T4 labels */}
    <text x="22" y="39" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1E293B" fontFamily="sans-serif">T3</text>
    <text x="50" y="39" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1E293B" fontFamily="sans-serif">T4</text>
  </svg>
);
export const IDiabetes = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#DCFCE7"/>
    {/* glucometer body */}
    <rect x="14" y="22" width="36" height="28" rx="7" fill="white" stroke="#1E293B" strokeWidth="1.3"/>
    {/* screen */}
    <rect x="18" y="27" width="22" height="14" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1"/>
    <text x="29" y="37" textAnchor="middle" fontSize="9" fontWeight="900" fill="#16A34A" fontFamily="sans-serif">126</text>
    {/* button */}
    <circle cx="46" cy="34" r="4" fill="#86EFAC" stroke="#1E293B" strokeWidth="1"/>
    {/* strip slot */}
    <rect x="18" y="44" width="12" height="3" rx="1.5" fill="#BBF7D0" stroke="#1E293B" strokeWidth="0.8"/>
    {/* test strip */}
    <rect x="30" y="34" width="5" height="16" rx="2" fill="#FDE68A" stroke="#1E293B" strokeWidth="1"/>
    {/* blood drop */}
    <path d="M55 16C55 16 52 20 52 22C52 24 53.3 25 55 25C56.7 25 58 24 58 22C58 20 55 16 55 16Z" fill="#EF4444" stroke="#1E293B" strokeWidth="1"/>
  </svg>
);
export const ICardiac = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FFE4E6"/>
    {/* heart outline */}
    <path d="M36 58C36 58 13 45 13 30C13 21 19 16 26 16C30 16 34 18.5 36 22C38 18.5 42 16 46 16C53 16 59 21 59 30C59 45 36 58 36 58Z" fill="#FECDD3" stroke="#1E293B" strokeWidth="1.5"/>
    {/* ECG wave across heart */}
    <polyline points="16,33 22,33 26,24 30,42 33,30 35,34 37,34 41,26 45,34 56,34" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const IVitamin = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FFF7ED"/>
    {/* pill bottle */}
    <rect x="26" y="26" width="20" height="30" rx="5" fill="white" stroke="#1E293B" strokeWidth="1.3"/>
    {/* cap */}
    <rect x="23" y="18" width="26" height="11" rx="4" fill="#FB923C" stroke="#1E293B" strokeWidth="1.2"/>
    {/* label line */}
    <rect x="30" y="32" width="12" height="2.5" rx="1" fill="#FED7AA"/>
    <rect x="30" y="37" width="12" height="2.5" rx="1" fill="#FED7AA"/>
    {/* capsule pills */}
    <rect x="48" y="20" width="14" height="7" rx="3.5" fill="#FDE68A" stroke="#1E293B" strokeWidth="1"/>
    <line x1="55" y1="20" x2="55" y2="27" stroke="#1E293B" strokeWidth="0.8"/>
    <rect x="48" y="20" width="7" height="7" rx="3.5" fill="#4ADE80" stroke="#1E293B" strokeWidth="0.5"/>
    {/* sun rays (vitamins = sunshine) */}
    {[0,60,120,180,240,300].map((d,i)=>(
      <line key={i} x1="36" y1="52" x2={36+Math.cos((d-90)*Math.PI/180)*7} y2={52+Math.sin((d-90)*Math.PI/180)*7} stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
    ))}
    <circle cx="36" cy="52" r="4" fill="#FBBF24" stroke="#1E293B" strokeWidth="1"/>
  </svg>
);
export const IKidney = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#EDE9FE"/>
    {/* left kidney */}
    <path d="M20 16C12 16 9 26 11 34C13 42 20 48 26 40C29 35 27 25 24 19C23 16.5 21.5 16 20 16Z" fill="#C4B5FD" stroke="#1E293B" strokeWidth="1.3"/>
    {/* left kidney highlight */}
    <path d="M18 18C12 21 11 30 13 37" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* right kidney */}
    <path d="M52 16C60 16 63 26 61 34C59 42 52 48 46 40C43 35 45 25 48 19C49 16.5 50.5 16 52 16Z" fill="#8B5CF6" stroke="#1E293B" strokeWidth="1.3"/>
    <path d="M54 18C60 21 61 30 59 37" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* ureter connector */}
    <path d="M26 40 Q36 46 46 40" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="36" cy="47" rx="5" ry="3.5" fill="#DDD6FE" stroke="#1E293B" strokeWidth="1"/>
  </svg>
);
export const ILiver = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FCE7F3"/>
    {/* liver shape */}
    <path d="M11 29C9 21 17 12 27 14C31 9 45 11 49 21C55 26 53 39 46 42C41 44 29 47 21 43C13 39 12 33 11 29Z" fill="#FBCFE8" stroke="#1E293B" strokeWidth="1.3"/>
    {/* liver lobes division */}
    <path d="M30 15C33 22 34 32 33 40" stroke="rgba(30,41,59,.2)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* highlight */}
    <path d="M19 20C22 17 31 16 37 20C41 23 43 30 42 37" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* bile duct */}
    <path d="M37 39 Q40 51 37 59" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="37" cy="60" r="3" fill="#BE185D" stroke="#1E293B" strokeWidth="1"/>
  </svg>
);
export const IPackage = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#EFF6FF"/>
    {/* clipboard / report */}
    <rect x="18" y="16" width="36" height="44" rx="5" fill="white" stroke="#1E293B" strokeWidth="1.3"/>
    {/* clip */}
    <rect x="28" y="10" width="16" height="10" rx="4" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1.1"/>
    <rect x="30" y="12" width="12" height="6" rx="3" fill="#93C5FD"/>
    {/* checklist lines */}
    <circle cx="25" cy="30" r="3" fill="#BFDBFE" stroke="#1E293B" strokeWidth="1"/>
    <polyline points="23.5,30 25,31.5 27,28.5" stroke="#1158A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <rect x="30" y="29" width="18" height="2.5" rx="1" fill="#DBEAFE"/>
    <circle cx="25" cy="38" r="3" fill="#BFDBFE" stroke="#1E293B" strokeWidth="1"/>
    <polyline points="23.5,38 25,39.5 27,36.5" stroke="#1158A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <rect x="30" y="37" width="14" height="2.5" rx="1" fill="#DBEAFE"/>
    <circle cx="25" cy="46" r="3" fill="#F0FDF4" stroke="#1E293B" strokeWidth="1"/>
    <rect x="30" y="45" width="18" height="2.5" rx="1" fill="#E2E8F0"/>
    {/* shield badge */}
    <path d="M48 44L56 47.5L56 55C56 58 48 61 48 61C48 61 40 58 40 55L40 47.5Z" fill="#1158A6" stroke="#1E293B" strokeWidth="1"/>
    <polyline points="45,54 47.5,56.5 52,51" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const IRadiology = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth=".8"/><rect x="17" y="9" width="14" height="18" rx="7" fill="none" stroke="#475569" strokeWidth="1.8"/><line x1="24" y1="27" x2="24" y2="41" stroke="#475569" strokeWidth="1.8"/><line x1="18" y1="34" x2="30" y2="34" stroke="#475569" strokeWidth="1.4"/>{[32,36,40].map(y=><circle key={y} cx="24" cy={y} r="1.3" fill="#94A3B8"/>)}</svg>);
export const IHormone = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FDF4FF" stroke="#E879F9" strokeWidth=".8"/><circle cx="24" cy="9" r="4.5" fill="#A855F7" opacity=".85"/><circle cx="37" cy="31" r="4.5" fill="#C026D3" opacity=".85"/><circle cx="11" cy="31" r="4.5" fill="#7C3AED" opacity=".85"/><line x1="24" y1="13.5" x2="33.5" y2="27" stroke="#D8B4FE" strokeWidth="1.4"/><line x1="24" y1="13.5" x2="14.5" y2="27" stroke="#D8B4FE" strokeWidth="1.4"/><line x1="14.5" y1="27" x2="33.5" y2="27" stroke="#D8B4FE" strokeWidth="1.4"/><circle cx="24" cy="24" r="3.5" fill="#7C3AED"/></svg>);
export const IInfectious = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#F0FDF4" stroke="#86EFAC" strokeWidth=".8"/>{[0,60,120,180,240,300].map((d,i)=>(<g key={i} transform={`rotate(${d} 24 24)`}><line x1="24" y1="9" x2="24" y2="5.5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round"/><circle cx="24" cy="4.5" r="2.2" fill="#4ADE80"/></g>))}<circle cx="24" cy="24" r="9" fill="#16A34A" opacity=".85"/></svg>);
export const ICovid = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth=".8"/>{[0,45,90,135,180,225,270,315].map((d,i)=>(<g key={i} transform={`rotate(${d} 24 24)`}><line x1="24" y1="12" x2="24" y2="7.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round"/><circle cx="24" cy="6" r="2.8" fill="#FB7185"/></g>))}<circle cx="24" cy="24" r="9" fill="#F43F5E" opacity=".85"/></svg>);
export const IAllergy = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FEFCE8" stroke="#FEF08A" strokeWidth=".8"/><circle cx="18" cy="22" r="8.5" fill="#FACC15" opacity=".85"/><circle cx="26" cy="19" r="6.5" fill="#FBBF24" opacity=".85"/><circle cx="32" cy="23" r="5.5" fill="#F59E0B" opacity=".85"/></svg>);
export const IAutoimmune = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#F0F9FF" stroke="#7DD3FC" strokeWidth=".8"/><path d="M24 9L38 15L38 27C38 35 24 43 24 43C24 43 10 35 10 27L10 15Z" fill="#0284C7" opacity=".85"/><polyline points="18,25 22,29 30,21" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const ICancer = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FDF2F8" stroke="#F0ABFC" strokeWidth=".8"/><path d="M24 11C24 11 18 15 18 19C18 23 24 25 24 25C24 25 30 23 30 19C30 15 24 11 24 11Z" fill="#A21CAF" opacity=".85"/><path d="M24 25L18 35L22 33L24 39L26 33L30 35Z" fill="#A21CAF" opacity=".85"/></svg>);
export const IUrine = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FEFCE8" stroke="#FEF08A" strokeWidth=".8"/><rect x="20" y="9" width="8" height="26" rx="4" fill="#EAB308" opacity=".75"/><rect x="20" y="24" width="8" height="11" rx="4" fill="#CA8A04" opacity=".85"/><rect x="18" y="7" width="12" height="4.5" rx="2" fill="#78716C"/></svg>);
export const ILock = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="12" y="22" width="24" height="18" rx="4" fill="#7C3AED" opacity=".85"/><rect x="12" y="22" width="24" height="18" rx="4" fill="url(#lg1)"/><defs><linearGradient id="lg1" x1="12" y1="22" x2="36" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#6D28D9"/></linearGradient></defs><path d="M17 22V17a7 7 0 0114 0v5" stroke="#5B21B6" strokeWidth="2.2" fill="none" strokeLinecap="round"/><circle cx="24" cy="31" r="3" fill="#fff" opacity=".9"/><rect x="23" y="31" width="2" height="4" rx="1" fill="#fff" opacity=".9"/></svg>);
export const IHeadset = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M12 26v-2a12 12 0 0124 0v2" stroke="#059669" strokeWidth="2.2" fill="none" strokeLinecap="round"/><rect x="10" y="25" width="6" height="10" rx="3" fill="#059669" opacity=".85"/><rect x="32" y="25" width="6" height="10" rx="3" fill="#059669" opacity=".85"/><path d="M36 35v2a4 4 0 01-4 4h-4" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="28" cy="41" r="2.5" fill="#059669" opacity=".85"/><circle cx="24" cy="22" r="3" fill="#5EEAD4" opacity=".7"/></svg>);
export const IBooking = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="8" y="12" width="32" height="30" rx="4" stroke="#059669" strokeWidth="2.2" fill="none"/><path d="M16 8v8M32 8v8M8 22h32" stroke="#059669" strokeWidth="2.2" strokeLinecap="round"/><polyline points="18,30 22,34 30,26" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const IGeneral = ({ s = 60 }) => (<svg width={s} height={s} viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="#EFF6FF"/><rect x="26" y="52" width="20" height="4" rx="2" fill="#93C5FD" stroke="#1E293B" strokeWidth="1"/><rect x="33" y="44" width="6" height="10" rx="1" fill="#60A5FA" stroke="#1E293B" strokeWidth="1"/><path d="M36 44 L36 28 L28 28" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/><rect x="22" y="24" width="12" height="6" rx="3" fill="#BFDBFE" stroke="#1E293B" strokeWidth="1.2"/><circle cx="38" cy="38" r="7" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1.2"/><circle cx="38" cy="38" r="3.5" fill="#93C5FD" stroke="#1E293B" strokeWidth="1"/><circle cx="50" cy="22" r="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1"/></svg>);

export const ICONS = { Blood:IBlood, Thyroid:IThyroid, Diabetes:IDiabetes, Cardiac:ICardiac, Vitamins:IVitamin, Kidney:IKidney, Liver:ILiver, Packages:IPackage, Radiology:IRadiology, Hormones:IHormone, Infectious:IInfectious, COVID:ICovid, Allergy:IAllergy, Autoimmune:IAutoimmune, "Cancer Markers":ICancer, Urine:IUrine, General:IGeneral };
