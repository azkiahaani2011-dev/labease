import React from 'react';

const LabIcon = ({ id, s=44 }) => {
  const icons = {
    1: <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="12" r="8" fill="#FDDCB5" stroke="#1E293B" strokeWidth="1.2"/>
        <path d="M10 44 Q10 30 22 28 Q34 30 34 44" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1.2"/>
        <path d="M14 28 Q12 34 13 38 Q14 42 22 40 Q30 42 31 38 Q32 34 30 28" fill="white" stroke="#1E293B" strokeWidth="1.1"/>
        <path d="M16 30 Q13 36 15 38 Q17 40 22 39 Q27 40 29 38 Q31 36 28 30" stroke="#0066CC" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <circle cx="16" cy="32" r="2.5" fill="none" stroke="#0066CC" strokeWidth="1.2"/>
        <circle cx="28" cy="32" r="2.5" fill="none" stroke="#0066CC" strokeWidth="1.2"/>
        <circle cx="22" cy="38" r="3" fill="#0066CC" stroke="#1E293B" strokeWidth="0.8"/>
        <circle cx="22" cy="38" r="1.5" fill="#93C5FD"/>
      </svg>,
    2: <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
        <rect x="8" y="30" width="26" height="4" rx="2" fill="#FECACA" stroke="#1E293B" strokeWidth="1"/>
        {[10,19,28].map((x,i)=>(
          <g key={x}>
            <rect x={x} y={10} width={7} height={22} rx={3.5} fill="white" stroke="#1E293B" strokeWidth="1.2"/>
            <rect x={x} y={22} width={7} height={10} rx={3.5} fill={["#FCA5A5","#FB7185","#F87171"][i]}/>
            <rect x={x-1} y={7} width={9} height={4} rx={2} fill="#475569" stroke="#1E293B" strokeWidth="0.8"/>
          </g>
        ))}
        <path d="M37 8C37 8 34.5 12 34.5 14C34.5 15.8 35.5 17 37 17C38.5 17 39.5 15.8 39.5 14C39.5 12 37 8 37 8Z" fill="#EF4444" stroke="#1E293B" strokeWidth="1"/>
      </svg>,
    3: <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
        <rect x="18" y="6" width="8" height="14" rx="3" fill="#DDD6FE" stroke="#1E293B" strokeWidth="1.2"/>
        <rect x="15" y="18" width="14" height="5" rx="2" fill="#C4B5FD" stroke="#1E293B" strokeWidth="1.1"/>
        <path d="M22 23 L22 32" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="12" y="32" width="20" height="4" rx="2" fill="#8B5CF6" stroke="#1E293B" strokeWidth="1"/>
        <path d="M26 27 Q34 25 36 29" stroke="#1E293B" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <circle cx="36" cy="29" r="4" fill="#EDE9FE" stroke="#1E293B" strokeWidth="1"/>
        <circle cx="36" cy="29" r="2" fill="#8B5CF6"/>
        <line x1="22" y1="6" x2="22" y2="3" stroke="#1E293B" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="22" cy="3" r="2.5" fill="#C4B5FD" stroke="#1E293B" strokeWidth="0.8"/>
      </svg>,
    4: <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
        <rect x="8" y="6" width="26" height="32" rx="5" fill="white" stroke="#1E293B" strokeWidth="1.2"/>
        <rect x="15" y="2" width="12" height="8" rx="3" fill="#BBF7D0" stroke="#1E293B" strokeWidth="1"/>
        <line x1="12" y1="18" x2="30" y2="18" stroke="#DCFCE7" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="23" x2="27" y2="23" stroke="#DCFCE7" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="28" x2="24" y2="28" stroke="#DCFCE7" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="30" cy="32" r="8" fill="#16A34A" stroke="#1E293B" strokeWidth="1.2"/>
        <polyline points="27,32 29.5,34.5 33.5,29" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>,
    5: <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
        <rect x="20" y="6" width="4" height="32" rx="2" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1"/>
        <ellipse cx="13" cy="22" rx="7" ry="11" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.2" transform="rotate(-8 13 22)"/>
        <ellipse cx="31" cy="22" rx="7" ry="11" fill="#FCD34D" stroke="#1E293B" strokeWidth="1.2" transform="rotate(8 31 22)"/>
        <rect x="16" y="20" width="12" height="5" rx="2.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="1"/>
        <text x="13" y="24" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1E293B" fontFamily="sans-serif">T3</text>
        <text x="31" y="24" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1E293B" fontFamily="sans-serif">T4</text>
      </svg>,
    6: <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
        <rect x="6" y="8" width="32" height="24" rx="5" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.2"/>
        <rect x="10" y="12" width="24" height="16" rx="3" fill="white" stroke="#1E293B" strokeWidth="1"/>
        <line x1="10" y1="18" x2="34" y2="18" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="10" y1="24" x2="34" y2="24" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 2"/>
        <ellipse cx="22" cy="17" rx="4" ry="5" fill="#BAE6FD"/>
        <path d="M16 28 Q16 22 22 21 Q28 22 28 28" fill="#BAE6FD"/>
        <rect x="8" y="32" width="28" height="4" rx="2" fill="#0369A1" stroke="#1E293B" strokeWidth="1"/>
        <rect x="18" y="36" width="8" height="5" rx="1" fill="#0EA5E9" stroke="#1E293B" strokeWidth="0.8"/>
      </svg>,
  };
  return icons[id] || null;
};

export default LabIcon;
