import React from 'react';
export const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Manrope', sans-serif; background: #F8FAFC; color: #111; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.7; }

    :root {
      --teal: #1158A6;
      --teal-light: #1D4ED8;
      --teal-pale: #EFF6FF;
      --sky: #2563EB;
      --gold: #C5973A;
      --ink: #0D1117;
      --muted: #6B7280;
      --line: #EBEBEB;
      --bg: #FAFAFA;
      --white: #FFFFFF;
      --card-shadow: 0 2px 20px rgba(0,0,0,.06);
      --card-shadow-hover: 0 12px 40px rgba(0,0,0,.13);
    }

    /* Keyframes */
    @keyframes floatA   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes floatB   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes floatC   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes spinR    { to{transform:rotate(-360deg)} }
    @keyframes pulse    { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
    @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:.15} }
    @keyframes ecgDraw  { 0%{stroke-dashoffset:500} 100%{stroke-dashoffset:0} }
    @keyframes beat     { 0%,100%{transform:scale(1)} 20%{transform:scale(1.2)} 40%{transform:scale(1)} 60%{transform:scale(1.13)} }
    @keyframes drop     { 0%{transform:translateY(-6px);opacity:0} 60%{opacity:1} 100%{transform:translateY(10px);opacity:0} }
    @keyframes slideUp       { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideInRight  { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
    @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes blobPulse{ 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.08) translate(10px,-10px)} }
    .hero-stat-card { transition: transform .2s; }
    @media (max-width: 600px) { .hero-stat-card { display: none !important; } }
    @keyframes shimmer  { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes marquee  { from{transform:translateX(-50%)} to{transform:translateX(0)} }
    @keyframes orb1     { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,-20px)} 66%{transform:translate(-20px,15px)} }
    @keyframes orb2     { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-25px,20px)} 66%{transform:translate(20px,-10px)} }
    @keyframes countIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes revealUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }

    /* Hero content fades in on load (no scroll needed) */
    .hero-content { animation: revealUp .7s cubic-bezier(.22,1,.36,1) both; }
    .hero-content-delay-1 { animation-delay:.1s; }
    .hero-content-delay-2 { animation-delay:.2s; }
    .hero-content-delay-3 { animation-delay:.32s; }
    .hero-content-delay-4 { animation-delay:.44s; }

    /* ── Premium skeleton shimmer ── */
    @keyframes skWave {
      0%   { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }
    .sk {
      background: linear-gradient(90deg, #F0F4F8 0%, #E2E8F0 30%, #F8FAFC 60%, #F0F4F8 100%);
      background-size: 1200px 100%;
      animation: skWave 1.6s ease-in-out infinite;
      border-radius: 8px;
    }

    /* ── Page transition bar ── */
    /* ── Page enter ── */
    @keyframes pageEnter { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    .page-enter { animation: pageEnter .38s cubic-bezier(.22,1,.36,1) both; }
    @keyframes slideUpFull { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
    .lab-detail-enter { animation: slideUpFull .45s cubic-bezier(.22,1,.36,1) both; }

    /* ── Booking steps slide-in from right ── */
    @keyframes slideFromRight { from{opacity:0;transform:translateX(48px)} to{opacity:1;transform:translateX(0)} }
    .step-slide { animation: slideFromRight .7s cubic-bezier(.25,.46,.45,.94) both; }

    /* ── After first load: kill ALL entrance animations instantly ── */
    .app-ready .page-enter        { animation: none !important; }
    .app-ready .hero-content      { animation: none !important; opacity: 1 !important; transform: none !important; }

    /* ── Image blur-up lazy load ── */
    .img-lazy { transition: filter .45s ease, opacity .45s ease; filter: blur(8px); opacity: 0; }
    .img-lazy.loaded { filter: blur(0); opacity: 1; }

    /* Interactions */
    .hover-lift { transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s; }
    .hover-lift:hover { transform: translateY(-4px); box-shadow: var(--card-shadow-hover) !important; }
    .hover-scale { transition: transform .18s; }
    .hover-scale:hover { transform: scale(1.03); }
    .btn-anim { transition: all .18s cubic-bezier(.34,1.56,.64,1); }
    .btn-anim:hover { transform: translateY(-2px); filter: brightness(1.08); }
    .chip { transition: all .14s; }
    .chip:hover { background: var(--teal) !important; color: #fff !important; border-color: var(--teal) !important; }
    .nav-a:hover { color: var(--teal) !important; }
    .faq-q:hover { background: #f7faf9 !important; }
    .test-row:hover { background: #f7faf9 !important; }
    .cat-tile:hover { border-color: var(--teal) !important; }
    .cat-tile:hover .cat-label { color: var(--teal) !important; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
    ::-webkit-scrollbar-track { background: transparent; }

    input:focus, textarea:focus {
      outline: none;
    }
    .hero-search-bar:focus-within {
      box-shadow: 0 6px 32px rgba(17,88,166,.22), 0 2px 8px rgba(0,0,0,.08) !important;
    }
    html, body { overflow-x: hidden; }
    button { min-height: 44px; }
    .nav-desk { display: flex !important; }
    .ham-btn  { display: none   !important; }
    .nav-mob  { display: none  !important; }
    @media (max-width: 768px) {
      .nav-desk { display: none  !important; }
      .nav-mob  { display: flex  !important; }
    }
    div[style*="scrollSnapType"]::-webkit-scrollbar { display: none; }

    /* ═══════════════════════════════════════════════════════════════════
       PREMIUM UI SYSTEM — Google Stitch aesthetic
       Mobile-first (9:16). Pure CSS. Zero functionality changes.
       Base: 390px width (iPhone 14 Pro). Scales up cleanly.
    ═══════════════════════════════════════════════════════════════════ */

    /* ── TYPOGRAPHY — Manrope system ─────────────────────────────── */
    body {
      font-size: 15px;
      line-height: 1.6;
      letter-spacing: -.01em;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    h1, h2, h3, h4 {
      font-family: 'Manrope', sans-serif;
      text-rendering: optimizeLegibility;
      letter-spacing: -.02em;
    }

    /* ── COLOUR TOKENS ───────────────────────────────────────────── */
    :root {
      --surface-0: #FFFFFF;
      --surface-1: #F7F9FC;
      --surface-2: #EEF2F8;
      --border:    rgba(17,88,166,.1);
      --shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
      --shadow-md: 0 4px 16px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.04);
      --shadow-lg: 0 12px 40px rgba(17,88,166,.14), 0 4px 12px rgba(0,0,0,.06);
      --shadow-xl: 0 24px 64px rgba(17,88,166,.18), 0 8px 24px rgba(0,0,0,.08);
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-xl: 28px;
    }

    /* ── NAVBAR — frosted glass, premium sticky ──────────────────── */
    nav {
      background: rgba(255,255,255,.92) !important;
      backdrop-filter: saturate(200%) blur(24px) !important;
      -webkit-backdrop-filter: saturate(200%) blur(24px) !important;
      border-bottom: 1px solid rgba(17,88,166,.07) !important;
      box-shadow: var(--shadow-sm) !important;
    }

    /* ── SECTIONS — precise rhythm ───────────────────────────────── */
    section { position: relative; overflow: visible; }
    section:not(.hero-section) { overflow: hidden; }

    /* ── CARDS ───────────────────────────────────────────────────── */
    .hover-lift {
      box-shadow: var(--shadow-sm) !important;
      transition: transform .26s cubic-bezier(.34,1.2,.64,1),
                  box-shadow .26s ease !important;
      border-radius: var(--radius-lg) !important;
    }
    .hover-lift:hover {
      transform: translateY(-6px) !important;
      box-shadow: var(--shadow-xl) !important;
    }

    /* ── BUTTONS — layered depth ─────────────────────────────────── */
    .btn-anim {
      position: relative;
      overflow: hidden;
      will-change: transform;
    }
    .btn-anim::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg,rgba(255,255,255,.15),rgba(255,255,255,0));
      opacity: 1;
      pointer-events: none;
      border-radius: inherit;
    }
    .btn-anim:hover { transform: translateY(-2px) !important; filter: brightness(1.06) !important; }
    .btn-anim:active { transform: translateY(0) scale(.98) !important; }

    /* ── POPULAR TESTS CAROUSEL TILES ───────────────────────────── */
    .pt-tile {
      transition: transform .22s cubic-bezier(.34,1.56,.64,1) !important;
    }
    .pt-tile:hover { transform: translateY(-6px) !important; }
    .pt-tile > div:first-child {
      transition: box-shadow .22s ease !important;
    }
    .pt-tile:hover > div:first-child {
      box-shadow: 0 12px 32px rgba(17,88,166,.22) !important;
    }

    /* ── FAQ ─────────────────────────────────────────────────────── */
    .faq-q {
      border-radius: var(--radius-md) !important;
      transition: background .15s ease !important;
    }
    .faq-q:hover { background: #EFF6FF !important; }

    /* ── TEST ROWS ───────────────────────────────────────────────── */
    .test-row {
      transition: background .12s ease !important;
    }
    .test-row:hover { background: #F7F9FF !important; }

    /* ── INPUT FOCUS ─────────────────────────────────────────────── */
    input:focus, textarea:focus, select:focus {
      outline: none;
    }
    button:focus-visible {
      outline: 2px solid #1158A6;
      outline-offset: 3px;
    }

    /* ── TEXT SELECTION ──────────────────────────────────────────── */
    ::selection { background: #DBEAFE; color: #1158A6; }

    /* ── SCROLLBAR ───────────────────────────────────────────────── */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
    div[style*="scrollSnapType"]::-webkit-scrollbar { display: none !important; }

    /* ════════════════════════════════════════════════════════════════
       MOBILE-FIRST — 9:16 viewport (320px–430px)
    ════════════════════════════════════════════════════════════════ */
    @media (max-width: 430px) {

      /* ── Hero: breathe on small screens ── */
      div[style*="paddingTop:72"] {
        padding-top: 40px !important;
        padding-bottom: 40px !important;
        padding-left: 16px !important;
        padding-right: 16px !important;
      }

      /* ── Hero search bar: comfortable full-width ── */
      div[style*="borderRadius:50"][style*="boxShadow"][style*="DBEAFE"] {
        border-radius: 16px !important;
        flex-wrap: wrap !important;
        padding: 8px !important;
        gap: 0 !important;
      }
      div[style*="borderRadius:50"][style*="boxShadow"][style*="DBEAFE"] input {
        padding: 13px 10px 13px 0 !important;
        font-size: .93rem !important;
        min-width: 0 !important;
        flex: 1 !important;
      }
      div[style*="borderRadius:50"][style*="boxShadow"][style*="DBEAFE"] > button:last-child {
        width: 100% !important;
        border-radius: 10px !important;
        margin: 6px 0 0 0 !important;
        padding: 12px !important;
        justify-content: center !important;
        font-size: .88rem !important;
      }

      /* ── Section headers: tighter on mobile ── */
      div[style*="maxWidth:1400"] {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }

      /* ── Lab list cards: priority layout ── */
      div[style*="minWidth:110,flexShrink:0"] {
        min-width: 96px !important;
      }
      div[style*="minWidth:110,flexShrink:0"] button {
        padding: 8px 10px !important;
        font-size: .77rem !important;
        white-space: nowrap !important;
      }

      /* ── Test table: hide MRP, keep name + price + add ── */
      .test-header > span:nth-child(3),
      .test-row    > div:nth-child(3)  { display: none !important; }
      div[style*="gridTemplateColumns:"1fr auto auto auto""] {
        grid-template-columns: 1fr auto auto !important;
        padding: 10px 12px !important;
        gap: 8px !important;
      }

      /* ── Booking form: full bleed ── */
      div[style*="maxWidth:680"] {
        padding-left: 14px !important;
        padding-right: 14px !important;
      }

      /* ── HIW steps: no card overflow ── */
      div[style*="maxWidth:560,margin:"0 auto",display:"flex",flexDirection:"column""] {
        max-width: 100% !important;
      }
    }

    /* ════════════════════════════════════════════════════════════════
       TABLET — 430px–900px
    ════════════════════════════════════════════════════════════════ */
    @media (min-width: 431px) and (max-width: 900px) {
      div[style*="maxWidth:1400"] {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
    }

    /* ════════════════════════════════════════════════════════════════
       FOOTER — responsive columns
    ════════════════════════════════════════════════════════════════ */
    @media (max-width: 900px) {
      footer div[style*="gridTemplateColumns"] {
        grid-template-columns: 1fr 1fr !important;
        gap: 32px !important;
      }
    }
    @media (max-width: 480px) {
      footer div[style*="gridTemplateColumns"] {
        grid-template-columns: 1fr !important;
        gap: 28px !important;
      }
      footer div[style*="justifyContent:"space-between""] {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 10px !important;
      }
    }

    /* ════════════════════════════════════════════════════════════════
       WIDE DESKTOP — ≥1280px
    ════════════════════════════════════════════════════════════════ */
    @media (min-width: 1600px) {
      div[style*="max-width: 1600px"] {
        padding-left: 32px !important;
        padding-right: 32px !important;
      }
    }

    /* ── Print ── */
    @media print {
      nav, footer, .btn-anim, section:last-of-type { display: none !important; }
    }

    @media(max-width:640px){
      .test-header { display:none !important; }
      .test-row { grid-template-columns:1fr auto !important; gap:8px !important; }
      .test-row > div:nth-child(2), .test-row > div:nth-child(3) { display:none !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       HERO — premium depth & atmosphere
    ════════════════════════════════════════════════════════════════ */
    /* Subtle noise texture on hero using pseudo-element */
    section[style*="linear-gradient(135deg,#EBF3FB"] {
      background:
        linear-gradient(135deg,#EAF2FB 0%,#EFF7FF 55%,#E6F3FA 100%) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       SECTION EYEBROW PILLS — consistent across all sections
    ════════════════════════════════════════════════════════════════ */
    /* All eyebrow pills get a consistent box-shadow */
    div[style*="background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:50"] {
      box-shadow: 0 2px 8px rgba(17,88,166,.1) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       LAB CARD — homepage banner
    ════════════════════════════════════════════════════════════════ */
    /* Trusted Labs banner card */
    div[style*="borderRadius:18,border:"1.5px solid #DBEAFE""][style*="flexWrap:"wrap""] {
      transition: box-shadow .22s, transform .22s, border-color .22s !important;
    }

    /* ════════════════════════════════════════════════════════════════
       POPULAR TEST TILES — refined
    ════════════════════════════════════════════════════════════════ */
    .pt-tile {
      border-radius: 16px;
      padding: 18px 8px 16px !important;
    }
    .pt-tile > div:last-child {
      /* "Book Now" text */
      letter-spacing: .04em;
    }

    /* ════════════════════════════════════════════════════════════════
       HOW IT WORKS STEPS — card polish
    ════════════════════════════════════════════════════════════════ */
    /* Step cards */
    div[style*="background:"#fff",border:"1.5px solid"][style*="borderRadius:16,padding:"18px 20px""] {
      box-shadow: 0 2px 16px rgba(0,0,0,.04) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       TESTIMONIAL CARDS — refined shadows
    ════════════════════════════════════════════════════════════════ */
    /* Applied via .hover-lift which now uses the shadow token system */

    /* ════════════════════════════════════════════════════════════════
       WHY LABEASE CARDS — consistent icon treatment
    ════════════════════════════════════════════════════════════════ */
    div[style*="background:"#fff",borderRadius:16,padding:"24px 18px",border:"1px solid #F1F5F9""] {
      box-shadow: 0 1px 6px rgba(0,0,0,.04) !important;
      transition: box-shadow .22s, transform .22s !important;
    }
    div[style*="background:"#fff",borderRadius:16,padding:"24px 18px",border:"1px solid #F1F5F9""]:hover {
      box-shadow: 0 8px 32px rgba(17,88,166,.12) !important;
      transform: translateY(-3px) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       FAQ — accordion polish
    ════════════════════════════════════════════════════════════════ */
    div[style*="background:"#F5F7FF",borderRadius:14,border:"1px solid #EEF2FF""] {
      transition: border-color .18s, box-shadow .18s !important;
    }
    div[style*="background:"#F5F7FF",borderRadius:14,border:"1px solid #EEF2FF""]:hover {
      border-color: #DBEAFE !important;
      box-shadow: 0 4px 16px rgba(17,88,166,.06) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       LABS LIST PAGE — card system
    ════════════════════════════════════════════════════════════════ */
    /* Lab cards on list page */
    div[style*="background:"#fff",borderRadius:16,border:"1px solid var(--line)",overflow:"hidden",boxShadow"] {
      border-color: #EEF2FF !important;
      transition: box-shadow .24s, transform .24s, border-color .24s !important;
    }
    div[style*="background:"#fff",borderRadius:16,border:"1px solid var(--line)",overflow:"hidden",boxShadow"]:hover {
      border-color: #BFDBFE !important;
      box-shadow: 0 12px 40px rgba(17,88,166,.12) !important;
      transform: translateY(-3px) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       BOOKING PAGE — step progress bar
    ════════════════════════════════════════════════════════════════ */
    /* Step connector line */
    div[style*="height:2,background:"#E5E7EB",flex:1"] {
      border-radius: 99px !important;
    }
    /* Active step connector */
    div[style*="height:2,background:"#1A3A6B",flex:1"] {
      background: linear-gradient(90deg,#1158A6,#3B82F6) !important;
      border-radius: 99px !important;
    }

    /* ════════════════════════════════════════════════════════════════
       CONFIRM PAGE — success state
    ════════════════════════════════════════════════════════════════ */
    div[style*="background:"#fff",maxWidth:520"][style*="borderRadius:24"] {
      box-shadow: 0 24px 64px rgba(17,88,166,.14) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       PAYMENT SELECTOR — method tiles
    ════════════════════════════════════════════════════════════════ */
    div[style*="borderRadius:14,border"][style*="cursor:"pointer",transition:"all .15s""] {
      transition: box-shadow .18s, border-color .18s, background .15s !important;
    }
    div[style*="borderRadius:14,border"][style*="cursor:"pointer",transition:"all .15s""]:hover {
      box-shadow: 0 4px 16px rgba(17,88,166,.1) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       MODAL — auth modal polish
    ════════════════════════════════════════════════════════════════ */
    div[style*="background:"#fff",borderRadius:20,border:"1px solid var(--line)",boxShadow:"0 24px"] {
      border: none !important;
      box-shadow: 0 32px 80px rgba(0,0,0,.18), 0 8px 24px rgba(0,0,0,.1) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       CART MODAL — polish
    ════════════════════════════════════════════════════════════════ */
    /* Cart items hover */
    div[style*="alignItems:"center",padding:"11px 0",borderBottom:"1px solid #F9FAFB""] {
      transition: background .12s !important;
      border-radius: 8px !important;
      padding: 10px 8px !important;
      margin: 0 -8px !important;
    }
    div[style*="alignItems:"center",padding:"11px 0",borderBottom:"1px solid #F9FAFB""]:hover {
      background: #F8FAFF !important;
    }

    /* ════════════════════════════════════════════════════════════════
       DRAWER — premium panel
    ════════════════════════════════════════════════════════════════ */
    /* Drawer panel itself */
    div[style*="position:"fixed",top:0,left:0,bottom:0,zIndex:400"] {
      box-shadow: 8px 0 40px rgba(0,0,0,.18), 2px 0 8px rgba(0,0,0,.08) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       NEAR ME PAGE — map-style list
    ════════════════════════════════════════════════════════════════ */

    /* ════════════════════════════════════════════════════════════════
       IMAGES — where SVG images are used, give them subtle treatments
    ════════════════════════════════════════════════════════════════ */
    /* Category icon circles in Popular Tests */
    .pt-tile > div:first-child {
      background: transparent !important;
      /* Icon itself has the colored circle background baked in */
    }

    /* ════════════════════════════════════════════════════════════════
       MICRO-INTERACTIONS — hover states for all interactive elements
    ════════════════════════════════════════════════════════════════ */
    /* Nav links */
    .nav-a {
      position: relative;
    }
    .nav-a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      right: 50%;
      height: 2px;
      background: #1158A6;
      border-radius: 99px;
      transition: left .2s, right .2s;
    }
    .nav-a:hover::after,
    .nav-a[style*="var(--teal-pale)"]::after {
      left: 12px;
      right: 12px;
    }

    /* Chip hover */
    .chip {
      transition: all .16s cubic-bezier(.34,1.56,.64,1) !important;
    }

    /* ════════════════════════════════════════════════════════════════
       MOBILE 9:16 — comprehensive phone-first layout
       Target: 360px–430px (the majority of Android & iPhone screens)
    ════════════════════════════════════════════════════════════════ */
    @media (max-width: 430px) {

      /* ── Hero 2-col → 1-col on mobile ── */
      .hero-img-col { display: flex !important; }
      @media (max-width: 768px) {
        .hero-img-col { display: none !important; }
      }
      @media (max-width: 700px) {
        section[style*="0F2D6B"] div[style*="justifyContent:"center""] { display: none !important; }
      }

      /* ── hero-img-col: hidden on mobile ── */
      .hero-img-col { display: block !important; }
      @media (max-width: 768px) {
        .hero-img-col { display: none !important; }
      }

      /* Compress all T.wrap padding to 16px on mobile */
      @media (max-width: 767px) {
        div[style*="maxWidth:1400"] {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }
      }

      /* Hero text */
      div[style*="paddingTop:72"] {
        padding-top: 40px !important;
        padding-bottom: 36px !important;
        padding-left: 16px !important;
        padding-right: 16px !important;
      }

      /* Search bar — comfortable stacked layout */
      div[style*="borderRadius:50"][style*="DBEAFE"][style*="overflow:"hidden""] {
        border-radius: 16px !important;
        flex-wrap: wrap !important;
        padding: 8px !important;
        gap: 0 !important;
        overflow: visible !important;
      }
      div[style*="borderRadius:50"][style*="DBEAFE"][style*="overflow:"hidden""] input {
        font-size: .94rem !important;
        padding: 12px 8px 12px 0 !important;
      }
      div[style*="borderRadius:50"][style*="DBEAFE"][style*="overflow:"hidden""] > button:last-child {
        width: 100% !important;
        border-radius: 10px !important;
        margin: 6px 0 0 !important;
        padding: 12px !important;
      }

      /* Section vertical padding */
      section[style*="padding:"52px 0"] { padding-top: 22px !important; padding-bottom: 20px !important; }
      section[style*="padding:"56px 0"] { padding-top: 24px !important; padding-bottom: 20px !important; }
      section[style*="padding:"60px 0"] { padding-top: 24px !important; padding-bottom: 20px !important; }
      section[style*="padding:"64px 0"] { padding-top: 26px !important; padding-bottom: 22px !important; }

      /* Partner marquee: smaller text */
      div[style*="animation:"marquee"] div div {
        padding: 0 20px !important;
      }

      /* Test table: 3-col (hide MRP) */
      .test-header > span:nth-child(3),
      .test-row    > div:nth-child(3) { display: none !important; }
      .test-header { grid-template-columns: 1fr auto auto !important; padding: 10px 14px !important; gap: 8px !important; }
      .test-row    { grid-template-columns: 1fr auto auto !important; padding: 10px 12px !important; gap: 8px !important; }

      /* Footer columns */
      .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }

      /* Booking layout: sidebar stacks below content on mobile */
      .booking-grid { grid-template-columns: 1fr !important; }
      .booking-sidebar { position: static !important; }

      /* CTA section padding */
      .cta-section { padding: 28px 20px !important; }

      /* Booking form */
      div[style*="maxWidth:680"] {
        padding-left: 14px !important;
        padding-right: 14px !important;
      }

      /* Floating book now bar */
      div[style*="position:"fixed",bottom:28,left:"50%""] {
        left: 12px !important;
        right: 12px !important;
        bottom: 16px !important;
        transform: none !important;
      }
      div[style*="position:"fixed",bottom:28,left:"50%""] button {
        width: 100% !important;
        border-radius: 14px !important;
      }
    }

    /* ════════════════════════════════════════════════════════════════
       TABLET — 431px–900px
    ════════════════════════════════════════════════════════════════ */
    @media (min-width: 431px) and (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       WIDE DESKTOP — ≥1600px: extra padding
    ════════════════════════════════════════════════════════════════ */
    @media (min-width: 1600px) {
      .featured-grid { grid-template-columns: repeat(3,1fr) !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       FOOTER
    ════════════════════════════════════════════════════════════════ */
    @media (max-width: 900px) {
      footer div[style*="gridTemplateColumns"] {
        grid-template-columns: 1fr 1fr !important;
        gap: 32px !important;
      }
    }
    @media (max-width: 480px) {
      footer div[style*="justifyContent:"space-between""] {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 10px !important;
      }
    }

    @media print {
      nav, footer, .btn-anim, section:last-of-type { display: none !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       UTILITY RESPONSIVE CLASSES
    ════════════════════════════════════════════════════════════════ */
    @media (max-width: 767px) {
      .hide-mobile  { display: none !important; }
      .stack-mobile { flex-direction: column !important; }
      .full-mobile  { width: 100% !important; min-width: 0 !important; }
      .wrap-mobile  { flex-wrap: wrap !important; }
      .center-mobile { text-align: center !important; justify-content: center !important; }
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      .hide-tablet  { display: none !important; }
    }
    @media (min-width: 1024px) {
      .hide-desktop { display: none !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       HERO — mobile compact
    ════════════════════════════════════════════════════════════════ */
    .hero-section { min-height: 340px; }
    .hero-img-col { display: flex; }
    @media (max-width: 767px) {
      .hero-section { min-height: 0 !important; overflow: visible !important; max-width: 100vw !important; }
      .hero-img-col { display: none !important; }
      .hero-content {
        padding-top: 32px !important;
        padding-bottom: 28px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
        gap: 16px !important;
        grid-template-columns: 1fr !important;
        width: 100% !important;
        max-width: 100vw !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }
      .hero-content > div {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }
      .hero-content > div > div {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .hero-content h1 { font-size: 1.5rem !important; margin-bottom: 8px !important; line-height: 1.2 !important; }
      .hero-content p  { font-size: .82rem !important; margin-bottom: 16px !important; line-height: 1.55 !important; }
      .trust-badges { gap: 10px !important; margin-top: 14px !important; }
      .trust-badges > div:nth-child(2) { display: none !important; } /* hide dividers */
      .trust-badges > div:nth-child(4) { display: none !important; }
      /* search bar compact */
      .hero-search-bar { border-radius: 14px !important; width: 100% !important; box-sizing: border-box !important; }
      .hero-search-input-field { padding: 11px 6px 11px 0 !important; font-size: .85rem !important; min-width: 0 !important; }
      .hero-search-icon { margin: 0 12px !important; flex-shrink: 0 !important; }
      .hero-search-btn { padding: 9px 16px !important; font-size: .78rem !important; margin: 5px !important; border-radius: 10px !important; flex-shrink: 0 !important; }
    }
    @media (max-width: 430px) {
      .hero-content { padding-top: 24px !important; padding-bottom: 20px !important; }
      .hero-content h1 { font-size: 1.3rem !important; }
      /* hide eyebrow pill */
      .hero-content > div > div:first-child { display: none !important; }
      /* hide sub-description to save space */
      .hero-content > div > p { display: none !important; }
      /* quick chips tighter */
      .hero-content > div > div:nth-child(5) { gap: 5px !important; margin-top: 10px !important; }
      .trust-badges { margin-top: 10px !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       HOW IT WORKS — 4-step responsive grid
    ════════════════════════════════════════════════════════════════ */
    .hiw-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      position: relative;
    }
    @media (min-width: 541px) {
      .hiw-grid { grid-template-columns: repeat(2, 1fr); gap: 36px; }
    }
    @media (min-width: 768px) {
      .hiw-grid { grid-template-columns: repeat(4, 1fr); gap: 42px; }
      .hiw-connector { display: block; }
    }
    @media (max-width: 767px) {
      .hiw-connector { display: none !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       PROMO CARDS (HOW IT WORKS intro) — 2-col → 1-col
    ════════════════════════════════════════════════════════════════ */
    .promo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 72px;
    }
    @media (max-width: 640px) {
      .promo-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 40px; }
      .promo-img-col { display: none !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       WHY LABEASE — grid responsive
    ════════════════════════════════════════════════════════════════ */
    .why-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    @media (max-width: 900px) {
      .why-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
    }
    @media (max-width: 480px) {
      .why-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
    }
    /* ════════════════════════════════════════════════════════════════
       FEATURED CHECKUPS GRID
    ════════════════════════════════════════════════════════════════ */
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 900px) {
      .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 480px) {
      .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }

    /* ── Navbar right icons: tighter gap on mobile ── */
    @media (max-width: 768px) {
      .nav-right { gap: 4px !important; }
    }
    /* ── Cart button: full on desktop, icon-only on mobile ── */
    @media (max-width: 768px) {
      .cart-desktop { display: none !important; }
      .cart-mobile  { display: flex !important; }
    }
    /* ── Why LabEase cards: 2-col compact on mobile ── */
    @media (max-width: 600px) {
      .why-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
      .why-grid > div { padding: 14px 10px !important; border-radius: 12px !important; }
      .why-grid > div > div:first-child { width: 44px !important; height: 44px !important; border-radius: 11px !important; margin-bottom: 10px !important; }
      .why-grid > div > div:first-child svg { width: 24px !important; height: 24px !important; }
      .why-grid > div > div:nth-child(2) { font-size: .73rem !important; margin-bottom: 4px !important; }
      .why-grid > div > div:nth-child(3) { font-size: .65rem !important; line-height: 1.45 !important; }
    }

    /* ── Featured cards: 2-col compact on mobile ── */
    @media (max-width: 600px) {
      .featured-grid { gap: 10px !important; }
      .featured-grid > div > div:first-child { height: 100px !important; }
      .featured-grid > div > div:last-child { padding: 9px 8px 10px !important; gap: 5px !important; }
      .featured-grid > div > div:last-child > div:first-child { font-size: .62rem !important; }
      .featured-grid > div > div:last-child > div:last-child { flex-direction: column !important; align-items: flex-start !important; gap: 5px !important; }
      .featured-grid > div > div:last-child > div:last-child > div { font-size: .75rem !important; }
      .featured-grid > div > div:last-child > div:last-child button { width: 100% !important; padding: 6px 8px !important; font-size: .68rem !important; border-radius: 7px !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       LABS PAGE HEADER — search + sort row
    ════════════════════════════════════════════════════════════════ */
    .labs-header-row {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding-bottom: 4px;
    }
    .labs-sort-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .labs-search-input {
      width: 200px;
    }
    @media (max-width: 640px) {
      .labs-header-row { flex-direction: column; align-items: stretch; }
      .labs-sort-row { width: 100%; justify-content: flex-start; }
      .labs-search-input { width: 100% !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       LAB DETAIL — 3-col layout stacks on mobile
    ════════════════════════════════════════════════════════════════ */
    .lab-detail-layout {
      display: flex;
      gap: 24px;
    }
    @media (max-width: 768px) {
      .lab-detail-layout { flex-direction: column; }
      .lab-detail-sidebar { display: none !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       HERO TRUST BADGES — wrap on mobile
    ════════════════════════════════════════════════════════════════ */
    .trust-badges {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    @media (max-width: 640px) {
      .trust-badges { gap: 10px; }
      .trust-badges > * { flex: 1 1 auto; min-width: 120px; }
    }

    /* ════════════════════════════════════════════════════════════════
       HERO SECTION — 2-col → 1-col
    ════════════════════════════════════════════════════════════════ */
    .hero-img-col {
      display: flex;
    }
    @media (max-width: 768px) {
      .hero-img-col { display: none !important; }
    }


    /* ════════════════════════════════════════════════════════════════
       FOOTER GRID — 4-col desktop → 2-col tablet → 1-col mobile
    ════════════════════════════════════════════════════════════════ */
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
    }
    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    }
    @media (max-width: 540px) {
      .footer-grid { grid-template-columns: 1fr; gap: 28px; }
    }

    /* ════════════════════════════════════════════════════════════════
       BOOKING PAGE — sidebar + form stacks on mobile
    ════════════════════════════════════════════════════════════════ */
    .booking-grid {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 768px) {
      .booking-grid { grid-template-columns: 1fr; }
      .booking-sidebar { position: static !important; }
    }

    /* ════════════════════════════════════════════════════════════════
       TESTIMONIALS GRID
    ════════════════════════════════════════════════════════════════ */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
      gap: 20px;
    }
    @media (max-width: 540px) {
      .testimonials-grid { grid-template-columns: 1fr; gap: 14px; }
    }

    /* ════════════════════════════════════════════════════════════════
       GENERAL NAV RESPONSIVENESS
    ════════════════════════════════════════════════════════════════ */
    @media (max-width: 1023px) {
      .nav-right-btns { gap: 6px !important; }
      .nav-right-btns .hide-tablet { display: none !important; }
    }
  `}</style>
);
