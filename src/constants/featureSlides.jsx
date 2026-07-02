import React from 'react';

const FEATURE_SLIDES = [
  {
    type: "features",
    items: [
      { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label:"Home Collection", desc:"Phlebotomist at your doorstep" },
      { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:"Fast Reports", desc:"Results in as little as 6 hours" },
      { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, label:"Digital Reports", desc:"WhatsApp & email delivery" },
      { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, label:"Verified Partner", desc:"All partner labs accredited" },
      { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, label:"Best Prices", desc:"Transparent, no hidden fees" },
      { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, label:"24/7 Support", desc:"Expert help round the clock" },
    ]
  },
  {
    type: "stats",
    items: [
      { value:"50K+", label:"Happy Patients", color:"#1158A6" },
      { value:"200+", label:"Partner Labs", color:"#059669" },
      { value:"1500+", label:"Tests Available", color:"#7C3AED" },
      { value:"6 Hrs", label:"Fastest Report", color:"#DC2626" },
    ]
  }
];

export default FEATURE_SLIDES;
