import React, { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Manrope', sans-serif; background: #FAFAFA; color: #111; -webkit-font-smoothing: antialiased; }

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
    @keyframes slideUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
    @keyframes shimmer  { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes orb1     { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,-20px)} 66%{transform:translate(-20px,15px)} }
    @keyframes orb2     { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-25px,20px)} 66%{transform:translate(20px,-10px)} }
    @keyframes countIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

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
      border-color: var(--teal) !important;
      box-shadow: 0 0 0 3px rgba(17,88,166,.12) !important;
    }
    html, body { overflow-x: hidden; }
    button { min-height: 44px; }
    .nav-desk { display: flex !important; }
    .ham-btn  { display: none   !important; }
    .nav-mob  { display: none  !important; }
    @media (max-width: 768px) {
      .nav-desk { display: none  !important; }
      .ham-btn  { display: flex  !important; }
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
    section { position: relative; overflow: hidden; }

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
      border-color: #1158A6 !important;
      box-shadow: 0 0 0 3px rgba(17,88,166,.12) !important;
    }
    button:focus-visible {
      outline: 2px solid #1158A6 !important;
      outline-offset: 3px !important;
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
      div[style*="maxWidth:1140"] {
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
      div[style*="maxWidth:1140"] {
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
    @media (min-width: 1280px) {
      div[style*="maxWidth:1140"] {
        max-width: 1200px !important;
      }
    }

    /* ── Print ── */
    @media print {
      nav, footer, .btn-anim, section:last-of-type { display: none !important; }
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
    div[style*="background:"#F8FAFF",borderRadius:14,border:"1px solid #EEF2FF""] {
      transition: border-color .18s, box-shadow .18s !important;
    }
    div[style*="background:"#F8FAFF",borderRadius:14,border:"1px solid #EEF2FF""]:hover {
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
    div[style*="height:2,background:"#1158A6",flex:1"] {
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

      /* ── Featured Health Checkups: 3-col → 2-col → 1-col ── */
      @media (max-width: 900px) {
        div[style*="gridTemplateColumns:"repeat(3,1fr)",gap:20"] {
          grid-template-columns: repeat(2,1fr) !important;
        }
      }
      @media (max-width: 540px) {
        div[style*="gridTemplateColumns:"repeat(3,1fr)",gap:20"] {
          grid-template-columns: 1fr !important;
        }
      }

      /* Compress all T.wrap padding to 16px */
      div[style*="maxWidth:1140"] {
        padding-left: 16px !important;
        padding-right: 16px !important;
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
      section[style*="padding:"52px 0"] { padding-top: 36px !important; padding-bottom: 32px !important; }
      section[style*="padding:"56px 0"] { padding-top: 40px !important; padding-bottom: 36px !important; }
      section[style*="padding:"60px 0"] { padding-top: 40px !important; padding-bottom: 36px !important; }
      section[style*="padding:"64px 0"] { padding-top: 44px !important; padding-bottom: 40px !important; }

      /* Partner marquee: smaller text */
      div[style*="animation:"marquee"] div div {
        padding: 0 20px !important;
      }

      /* Testimonial cards: full bleed on mobile */
      div[style*="gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px)"] {
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }

      /* Why section cards */
      div[style*="gridTemplateColumns:"repeat(auto-fill,minmax(200px"] {
        grid-template-columns: 1fr 1fr !important;
        gap: 12px !important;
      }
      div[style*="gridTemplateColumns:"repeat(auto-fill,minmax(200px"] > div {
        padding: 18px 14px !important;
      }

      /* Test table: 3-col (hide MRP) */
      .test-header > span:nth-child(3),
      .test-row    > div:nth-child(3) { display: none !important; }
      div[style*="gridTemplateColumns:"1fr auto auto auto""] {
        grid-template-columns: 1fr auto auto !important;
        padding: 10px 14px !important;
        gap: 8px !important;
      }

      /* Lab list right price column */
      div[style*="minWidth:110,flexShrink:0"] {
        min-width: 92px !important;
      }
      div[style*="minWidth:110,flexShrink:0"] > button {
        padding: 8px 10px !important;
        font-size: .76rem !important;
      }

      /* Booking form */
      div[style*="maxWidth:680"] {
        padding-left: 14px !important;
        padding-right: 14px !important;
      }

      /* HIW steps full width */
      div[style*="maxWidth:560,margin:"0 auto""] {
        max-width: 100% !important;
        padding: 0 4px !important;
      }

      /* Trusted labs banner card content */
      div[style*="borderRadius:18,border:"1.5px solid #DBEAFE""][style*="flexWrap:"wrap""] > div[style*="flex-end"] {
        display: none !important; /* hide "Explore Labs" arrow on very small screens */
      }

      /* Footer columns */
      footer div[style*="gridTemplateColumns"] {
        grid-template-columns: 1fr !important;
        gap: 28px !important;
      }

      /* CTA section */
      section[style*="padding:"80px 24px""] {
        padding: 48px 20px !important;
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
      div[style*="maxWidth:1140"] {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      div[style*="gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px)"] {
        grid-template-columns: repeat(2,1fr) !important;
      }
      footer div[style*="gridTemplateColumns"] {
        grid-template-columns: 1fr 1fr !important;
        gap: 32px !important;
      }
    }

    /* ════════════════════════════════════════════════════════════════
       WIDE DESKTOP — ≥1280px
    ════════════════════════════════════════════════════════════════ */
    @media (min-width: 1280px) {
      div[style*="maxWidth:1140"] {
        max-width: 1200px !important;
      }
      div[style*="gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px)"] {
        grid-template-columns: repeat(3,1fr) !important;
      }
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
  `}</style>
);

/* ─── PRACTO-STYLE FLAT CIRCULAR ICONS ─────────────────────────────────────── */
const IBlood = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FEE2E2"/>
    {[13,27,41].map((x,i)=>(<g key={x}>
      <rect x={x} y={20} width={9} height={26} rx={4.5} fill={["#C7D2FE","#A5B4FC","#818CF8"][i]}/>
      <rect x={x} y={33} width={9} height={13} rx={4.5} fill={["#EF4444","#F87171","#FCA5A5"][i]} opacity=".9"/>
      <rect x={x-1} y={17} width={11} height={6} rx={2.5} fill="#4B5563"/>
    </g>))}
    <rect x={10} y={46} width={52} height={4} rx={2} fill="#E0E7FF"/>
    <path d="M60 18C60 18 57 22 57 24C57 26.2 58.3 27 60 27C61.7 27 63 26.2 63 24C63 22 60 18 60 18Z" fill="#EF4444" opacity=".8"/>
  </svg>
);
const IThyroid = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FEF3C7"/>
    <rect x="33" y="10" width="6" height="52" rx="3" fill="#FEF9C3" stroke="#FDE68A" strokeWidth="1"/>
    <ellipse cx="22" cy="36" rx="11" ry="16" fill="#FBBF24" opacity=".9" transform="rotate(-12 22 36)"/>
    <ellipse cx="22" cy="29" rx="6" ry="9" fill="#FCD34D" opacity=".6" transform="rotate(-12 22 29)"/>
    <ellipse cx="50" cy="36" rx="11" ry="16" fill="#F59E0B" opacity=".9" transform="rotate(12 50 36)"/>
    <ellipse cx="50" cy="29" rx="6" ry="9" fill="#FBBF24" opacity=".6" transform="rotate(12 50 29)"/>
    <rect x="27" y="34" width="18" height="6" rx="3" fill="#D97706" opacity=".85"/>
    {[[17,28],[17,44],[55,28],[55,44]].map(([cx,cy],i)=>(<circle key={i} cx={cx} cy={cy} r="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1"/>))}
  </svg>
);
const IDiabetes = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#DCFCE7"/>
    <rect x="12" y="22" width="40" height="30" rx="8" fill="#fff" stroke="#86EFAC" strokeWidth="1.5"/>
    <rect x="16" y="26" width="24" height="14" rx="3.5" fill="#F0FDF4"/>
    <text x="18" y="37" fontSize="10" fontWeight="900" fill="#16A34A" fontFamily="monospace">98</text>
    <text x="33" y="37" fontSize="7" fill="#4ADE80" fontFamily="monospace">mg</text>
    <circle cx="50" cy="27" r="3" fill="#4ADE80"/>
    <rect x="50" y="33" width="5" height="10" rx="2.5" fill="#86EFAC"/>
    <rect x="16" y="43" width="12" height="4" rx="2" fill="#BFDBFE"/>
    <path d="M58 14C58 14 55 18 55 20C55 22.2 56.3 23 58 23C59.7 23 61 22.2 61 20C61 18 58 14 58 14Z" fill="#EF4444" opacity=".8"/>
  </svg>
);
const ICardiac = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FFE4E6"/>
    <path d="M36 60C36 60 14 47 14 32C14 23 20 17 27 17C31 17 35 19.5 36 23C37 19.5 41 17 45 17C52 17 58 23 58 32C58 47 36 60 36 60Z" fill="#FB7185" opacity=".9"/>
    <polyline points="16,36 22,36 26,28 30,44 33,33 35,37 36,36 56,36" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="36" cy="36" r="3" fill="white" opacity=".9"/>
  </svg>
);
const IVitamin = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FFF7ED"/>
    <rect x="24" y="24" width="24" height="34" rx="6" fill="#fff" stroke="#FED7AA" strokeWidth="1.5"/>
    <rect x="21" y="16" width="30" height="11" rx="5" fill="#F97316"/>
    <rect x="23" y="18" width="26" height="6" rx="3" fill="#FB923C"/>
    <ellipse cx="36" cy="36" rx="7" ry="3" fill="#FCD34D" opacity=".9"/>
    <ellipse cx="36" cy="44" rx="7" ry="3" fill="#FDE68A" opacity=".8"/>
    <line x1="36" y1="18" x2="36" y2="24" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="33" y1="21" x2="39" y2="21" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <rect x="52" y="18" width="13" height="6" rx="3" fill="#A3E635" opacity=".9"/>
    <rect x="52" y="18" width="6.5" height="6" rx="3" fill="#4ADE80" opacity=".9"/>
  </svg>
);
const IKidney = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#EDE9FE"/>
    <path d="M22 14C14 14 11 24 13 32C15 40 22 46 28 38C31 33 29 23 26 17C25 14.5 23.5 14 22 14Z" fill="#8B5CF6" opacity=".85"/>
    <path d="M22 14C14 17 13 26 15 33" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M50 14C58 14 61 24 59 32C57 40 50 46 44 38C41 33 43 23 46 17C47 14.5 48.5 14 50 14Z" fill="#7C3AED" opacity=".85"/>
    <path d="M50 14C58 17 59 26 57 33" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" strokeLinecap="round"/>
    <ellipse cx="36" cy="36" rx="6" ry="4" fill="#DDD6FE" opacity=".9"/>
  </svg>
);
const ILiver = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FCE7F3"/>
    <path d="M12 28C10 20 18 11 28 13C32 8 46 10 50 20C56 25 54 38 47 41C42 43 30 46 22 42C14 38 13 32 12 28Z" fill="#EC4899" opacity=".85"/>
    <path d="M20 19C23 16 32 15 38 19C42 22 44 29 43 36" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M38 38 Q41 50 38 58" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <circle cx="38" cy="58" r="3" fill="#BE185D" opacity=".8"/>
  </svg>
);
const IPackage = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#EFF6FF"/>
    <rect x="16" y="18" width="40" height="44" rx="5" fill="#fff" stroke="#BFDBFE" strokeWidth="1.5"/>
    <rect x="28" y="12" width="16" height="10" rx="5" fill="#1158A6"/>
    <rect x="30" y="14" width="12" height="6" rx="3" fill="#93C5FD"/>
    {[28,36,44].map((y,i)=>(<g key={y}>
      <rect x={24} y={y} width={24} height={3} rx={1.5} fill={i===2?"#DBEAFE":"#EFF6FF"}/>
      {i<2&&<polyline points={`24,${y+1.5} 27,${y+4.5} 32,${y-1}`} stroke="#1158A6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>}
    </g>))}
    <path d="M48 44 L56 47.5 L56 55C56 58 48 61 48 61C48 61 40 58 40 55L40 47.5Z" fill="#1158A6" opacity=".9"/>
    <polyline points="45,54 47.5,56.5 52,51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IRadiology = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth=".8"/><rect x="17" y="9" width="14" height="18" rx="7" fill="none" stroke="#475569" strokeWidth="1.8"/><line x1="24" y1="27" x2="24" y2="41" stroke="#475569" strokeWidth="1.8"/><line x1="18" y1="34" x2="30" y2="34" stroke="#475569" strokeWidth="1.4"/>{[32,36,40].map(y=><circle key={y} cx="24" cy={y} r="1.3" fill="#94A3B8"/>)}</svg>);
const IHormone = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FDF4FF" stroke="#E879F9" strokeWidth=".8"/><circle cx="24" cy="9" r="4.5" fill="#A855F7" opacity=".85"/><circle cx="37" cy="31" r="4.5" fill="#C026D3" opacity=".85"/><circle cx="11" cy="31" r="4.5" fill="#7C3AED" opacity=".85"/><line x1="24" y1="13.5" x2="33.5" y2="27" stroke="#D8B4FE" strokeWidth="1.4"/><line x1="24" y1="13.5" x2="14.5" y2="27" stroke="#D8B4FE" strokeWidth="1.4"/><line x1="14.5" y1="27" x2="33.5" y2="27" stroke="#D8B4FE" strokeWidth="1.4"/><circle cx="24" cy="24" r="3.5" fill="#7C3AED"/></svg>);
const IInfectious = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#F0FDF4" stroke="#86EFAC" strokeWidth=".8"/>{[0,60,120,180,240,300].map((d,i)=>(<g key={i} transform={`rotate(${d} 24 24)`}><line x1="24" y1="9" x2="24" y2="5.5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round"/><circle cx="24" cy="4.5" r="2.2" fill="#4ADE80"/></g>))}<circle cx="24" cy="24" r="9" fill="#16A34A" opacity=".85"/></svg>);
const ICovid = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth=".8"/>{[0,45,90,135,180,225,270,315].map((d,i)=>(<g key={i} transform={`rotate(${d} 24 24)`}><line x1="24" y1="12" x2="24" y2="7.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round"/><circle cx="24" cy="6" r="2.8" fill="#FB7185"/></g>))}<circle cx="24" cy="24" r="9" fill="#F43F5E" opacity=".85"/></svg>);
const IAllergy = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FEFCE8" stroke="#FEF08A" strokeWidth=".8"/><circle cx="18" cy="22" r="8.5" fill="#FACC15" opacity=".85"/><circle cx="26" cy="19" r="6.5" fill="#FBBF24" opacity=".85"/><circle cx="32" cy="23" r="5.5" fill="#F59E0B" opacity=".85"/></svg>);
const IAutoimmune = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#F0F9FF" stroke="#7DD3FC" strokeWidth=".8"/><path d="M24 9L38 15L38 27C38 35 24 43 24 43C24 43 10 35 10 27L10 15Z" fill="#0284C7" opacity=".85"/><polyline points="18,25 22,29 30,21" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const ICancer = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FDF2F8" stroke="#F0ABFC" strokeWidth=".8"/><path d="M24 11C24 11 18 15 18 19C18 23 24 25 24 25C24 25 30 23 30 19C30 15 24 11 24 11Z" fill="#A21CAF" opacity=".85"/><path d="M24 25L18 35L22 33L24 39L26 33L30 35Z" fill="#A21CAF" opacity=".85"/></svg>);
const IUrine = ({ s = 48 }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#FEFCE8" stroke="#FEF08A" strokeWidth=".8"/><rect x="20" y="9" width="8" height="26" rx="4" fill="#EAB308" opacity=".75"/><rect x="20" y="24" width="8" height="11" rx="4" fill="#CA8A04" opacity=".85"/><rect x="18" y="7" width="12" height="4.5" rx="2" fill="#78716C"/></svg>);

const ICONS = { Blood:IBlood, Thyroid:IThyroid, Diabetes:IDiabetes, Cardiac:ICardiac, Vitamins:IVitamin, Kidney:IKidney, Liver:ILiver, Packages:IPackage, Radiology:IRadiology, Hormones:IHormone, Infectious:IInfectious, COVID:ICovid, Allergy:IAllergy, Autoimmune:IAutoimmune, "Cancer Markers":ICancer, Urine:IUrine };

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const LABS = [
  { id:1, name:"Apollo Diagnostics", rating:4.8, reviews:2340, city:"Bangalore", address:"12 MG Road, Bangalore", distance:"1.2 km", timing:"6:00 AM – 10:00 PM", homeCollection:true, nabl:true, color:"#1158A6", founded:"2001",
    tests:[
      {id:"a1",name:"Complete Blood Count (CBC)",price:299,mrp:499,cat:"Blood",time:"Same Day"},
      {id:"a2",name:"Lipid Profile",price:499,mrp:799,cat:"Blood",time:"Same Day"},
      {id:"a3",name:"Thyroid Profile (T3,T4,TSH)",price:649,mrp:999,cat:"Thyroid",time:"24 hrs"},
      {id:"a4",name:"HbA1c (Diabetes)",price:399,mrp:599,cat:"Diabetes",time:"Same Day"},
      {id:"a5",name:"Liver Function Test",price:549,mrp:849,cat:"Liver",time:"Same Day"},
      {id:"a6",name:"Kidney Function Test",price:549,mrp:849,cat:"Kidney",time:"Same Day"},
      {id:"a7",name:"Vitamin D (25-OH)",price:899,mrp:1299,cat:"Vitamins",time:"48 hrs"},
      {id:"a8",name:"Vitamin B12",price:699,mrp:999,cat:"Vitamins",time:"48 hrs"},
      {id:"a9",name:"Full Body Checkup",price:1999,mrp:3499,cat:"Packages",time:"24 hrs"},
      {id:"a10",name:"COVID Antibody Test",price:799,mrp:1199,cat:"COVID",time:"6 hrs"},
      {id:"a11",name:"Iron Studies",price:449,mrp:699,cat:"Blood",time:"Same Day"},
      {id:"a12",name:"CRP (Inflammation)",price:349,mrp:599,cat:"Blood",time:"Same Day"},
    ]},
  { id:2, name:"SRL Diagnostics", rating:4.7, reviews:1890, city:"Mumbai", address:"45 Park Street, Mumbai", distance:"0.8 km", timing:"7:00 AM – 9:00 PM", homeCollection:true, nabl:true, color:"#1158A6", founded:"1995",
    tests:[
      {id:"b1",name:"Complete Blood Count (CBC)",price:279,mrp:499,cat:"Blood",time:"Same Day"},
      {id:"b2",name:"Blood Sugar Fasting",price:99,mrp:199,cat:"Diabetes",time:"2 hrs"},
      {id:"b3",name:"Blood Sugar Post-Prandial",price:99,mrp:199,cat:"Diabetes",time:"2 hrs"},
      {id:"b4",name:"Urine Routine & Microscopy",price:149,mrp:299,cat:"Urine",time:"Same Day"},
      {id:"b5",name:"TSH (Thyroid Stimulating)",price:299,mrp:499,cat:"Thyroid",time:"24 hrs"},
      {id:"b6",name:"Iron Studies",price:449,mrp:699,cat:"Blood",time:"Same Day"},
      {id:"b7",name:"HbA1c",price:349,mrp:599,cat:"Diabetes",time:"Same Day"},
      {id:"b8",name:"Dengue NS1 Antigen",price:699,mrp:999,cat:"Infectious",time:"6 hrs"},
      {id:"b9",name:"Comprehensive Health Package",price:2499,mrp:4199,cat:"Packages",time:"48 hrs"},
      {id:"b10",name:"Lipid Profile",price:449,mrp:799,cat:"Blood",time:"Same Day"},
      {id:"b11",name:"Urine Culture & Sensitivity",price:499,mrp:799,cat:"Urine",time:"48 hrs"},
      {id:"b12",name:"HIV 1 & 2 Antibody",price:299,mrp:549,cat:"Infectious",time:"Same Day"},
    ]},
  { id:3, name:"Metropolis Healthcare", rating:4.9, reviews:3102, city:"Hyderabad", address:"78 Jubilee Hills, Hyderabad", distance:"2.1 km", timing:"5:30 AM – 11:00 PM", homeCollection:true, nabl:true, color:"#1158A6", founded:"1980",
    tests:[
      {id:"c1",name:"Complete Blood Count (CBC)",price:259,mrp:499,cat:"Blood",time:"Same Day"},
      {id:"c2",name:"Liver Function Test",price:499,mrp:849,cat:"Liver",time:"Same Day"},
      {id:"c3",name:"Kidney Function Test",price:499,mrp:849,cat:"Kidney",time:"Same Day"},
      {id:"c4",name:"Thyroid Profile",price:599,mrp:999,cat:"Thyroid",time:"24 hrs"},
      {id:"c5",name:"Vitamin D3",price:849,mrp:1299,cat:"Vitamins",time:"48 hrs"},
      {id:"c6",name:"Vitamin B12",price:649,mrp:999,cat:"Vitamins",time:"48 hrs"},
      {id:"c7",name:"PSA Total (Prostate)",price:799,mrp:1199,cat:"Cancer Markers",time:"24 hrs"},
      {id:"c8",name:"CA-125 (Ovarian)",price:1099,mrp:1699,cat:"Cancer Markers",time:"24 hrs"},
      {id:"c9",name:"Wellness 360 Package",price:2999,mrp:5499,cat:"Packages",time:"48 hrs"},
      {id:"c10",name:"Allergy Panel (40 Allergens)",price:1999,mrp:3499,cat:"Allergy",time:"72 hrs"},
      {id:"c11",name:"Rheumatoid Arthritis Panel",price:899,mrp:1499,cat:"Autoimmune",time:"24 hrs"},
      {id:"c12",name:"ANA (Autoimmune Screen)",price:749,mrp:1199,cat:"Autoimmune",time:"48 hrs"},
    ]},
  { id:4, name:"Dr. Lal PathLabs", rating:4.6, reviews:4210, city:"Delhi", address:"22 Connaught Place, Delhi", distance:"0.5 km", timing:"6:00 AM – 9:00 PM", homeCollection:true, nabl:true, color:"#1158A6", founded:"1949",
    tests:[
      {id:"d1",name:"Complete Blood Count (CBC)",price:249,mrp:499,cat:"Blood",time:"Same Day"},
      {id:"d2",name:"Blood Sugar Random",price:79,mrp:199,cat:"Diabetes",time:"2 hrs"},
      {id:"d3",name:"HbA1c",price:329,mrp:599,cat:"Diabetes",time:"Same Day"},
      {id:"d4",name:"Lipid Profile",price:399,mrp:799,cat:"Blood",time:"Same Day"},
      {id:"d5",name:"Urine Culture & Sensitivity",price:499,mrp:799,cat:"Urine",time:"48 hrs"},
      {id:"d6",name:"Stool Examination",price:149,mrp:299,cat:"Urine",time:"Same Day"},
      {id:"d7",name:"Malaria Antigen Test",price:399,mrp:699,cat:"Infectious",time:"4 hrs"},
      {id:"d8",name:"Widal Test (Typhoid)",price:199,mrp:399,cat:"Infectious",time:"Same Day"},
      {id:"d9",name:"Heart Health Package",price:1799,mrp:2999,cat:"Packages",time:"24 hrs"},
      {id:"d10",name:"Senior Citizen Package",price:2299,mrp:3999,cat:"Packages",time:"48 hrs"},
      {id:"d11",name:"Testosterone Total",price:599,mrp:999,cat:"Hormones",time:"24 hrs"},
      {id:"d12",name:"Prolactin",price:499,mrp:799,cat:"Hormones",time:"24 hrs"},
    ]},
  { id:5, name:"Thyrocare Technologies", rating:4.5, reviews:1560, city:"Chennai", address:"5 Anna Salai, Chennai", distance:"3.4 km", timing:"7:00 AM – 8:00 PM", homeCollection:true, nabl:false, color:"#1158A6", founded:"1996",
    tests:[
      {id:"e1",name:"Aarogyam 1.3 (Full Body)",price:999,mrp:2499,cat:"Packages",time:"48 hrs"},
      {id:"e2",name:"Aarogyam C (Comprehensive)",price:1499,mrp:3499,cat:"Packages",time:"48 hrs"},
      {id:"e3",name:"Thyroid Panel (T3,T4,TSH)",price:399,mrp:799,cat:"Thyroid",time:"24 hrs"},
      {id:"e4",name:"Complete Blood Count",price:199,mrp:499,cat:"Blood",time:"Same Day"},
      {id:"e5",name:"Vitamin Panel (D3 + B12)",price:999,mrp:1799,cat:"Vitamins",time:"48 hrs"},
      {id:"e6",name:"Hormone Panel",price:1299,mrp:2299,cat:"Hormones",time:"48 hrs"},
      {id:"e7",name:"Fertility Panel (Female)",price:1999,mrp:3499,cat:"Hormones",time:"48 hrs"},
      {id:"e8",name:"Fertility Panel (Male)",price:1499,mrp:2499,cat:"Hormones",time:"48 hrs"},
      {id:"e9",name:"COVID RT-PCR",price:499,mrp:999,cat:"COVID",time:"6 hrs"},
      {id:"e10",name:"Lipid Profile",price:349,mrp:799,cat:"Blood",time:"Same Day"},
      {id:"e11",name:"Cortisol (Stress Hormone)",price:449,mrp:799,cat:"Hormones",time:"24 hrs"},
      {id:"e12",name:"DHEA-S",price:549,mrp:899,cat:"Hormones",time:"24 hrs"},
    ]},
  { id:6, name:"Vijaya Diagnostics", rating:4.7, reviews:987, city:"Hyderabad", address:"33 Banjara Hills, Hyderabad", distance:"1.9 km", timing:"6:30 AM – 10:30 PM", homeCollection:false, nabl:true, color:"#1158A6", founded:"1981",
    tests:[
      {id:"f1",name:"Complete Blood Count (CBC)",price:269,mrp:499,cat:"Blood",time:"Same Day"},
      {id:"f2",name:"Liver Function Test",price:519,mrp:849,cat:"Liver",time:"Same Day"},
      {id:"f3",name:"Kidney Panel",price:519,mrp:849,cat:"Kidney",time:"Same Day"},
      {id:"f4",name:"2D Echo (Cardiac)",price:1499,mrp:2499,cat:"Cardiac",time:"Immediate"},
      {id:"f5",name:"ECG (12-Lead)",price:299,mrp:499,cat:"Cardiac",time:"Immediate"},
      {id:"f6",name:"X-Ray Chest (PA View)",price:399,mrp:699,cat:"Radiology",time:"Immediate"},
      {id:"f7",name:"Ultrasound Abdomen",price:899,mrp:1499,cat:"Radiology",time:"Immediate"},
      {id:"f8",name:"MRI Brain with Contrast",price:5999,mrp:9999,cat:"Radiology",time:"2 hrs"},
      {id:"f9",name:"CT Scan Chest",price:4499,mrp:7999,cat:"Radiology",time:"2 hrs"},
      {id:"f10",name:"Full Body Checkup Premium",price:3499,mrp:5999,cat:"Packages",time:"48 hrs"},
      {id:"f11",name:"Bone Density (DEXA Scan)",price:1299,mrp:2199,cat:"Radiology",time:"Immediate"},
      {id:"f12",name:"PFT (Pulmonary Function)",price:799,mrp:1399,cat:"Cardiac",time:"Immediate"},
    ]},
];

const NEAR_ME = [
  { name:"Apollo Diagnostics", area:"Indiranagar", dist:"0.4 km", open:true,  rating:4.8, homecoll:true  },
  { name:"SRL Diagnostics",    area:"Koramangala", dist:"1.1 km", open:true,  rating:4.7, homecoll:true  },
  { name:"Metropolis",         area:"HSR Layout",  dist:"1.8 km", open:true,  rating:4.9, homecoll:true  },
  { name:"Dr. Lal PathLabs",   area:"BTM Layout",  dist:"2.3 km", open:false, rating:4.6, homecoll:true  },
  { name:"Thyrocare",          area:"JP Nagar",    dist:"2.9 km", open:true,  rating:4.5, homecoll:true  },
  { name:"Vijaya Diagnostics", area:"Jayanagar",   dist:"3.5 km", open:true,  rating:4.7, homecoll:false },
];

const FAQS = [
  { q:"How do I book a lab test on LabEase?", a:"Browse our partner labs, choose your tests, add them to cart, and complete the 4-step booking: patient info, date & slot, collection mode, and confirmation. You'll receive a booking ID instantly via email." },
  { q:"Is home sample collection really free?", a:"Yes. Home collection is completely free for eligible tests at participating labs. A certified phlebotomist arrives at your doorstep at your chosen time slot. Look for the 'Home Collection' indicator on each lab." },
  { q:"How soon will I receive my reports?", a:"Routine blood tests are typically ready the same day or within 2–6 hours. Specialised tests may take 24–72 hours. Exact turnaround times are listed for every test on our platform so you always know what to expect." },
  { q:"Are the labs NABL accredited?", a:"Most of our partner labs hold NABL (National Accreditation Board for Testing and Calibration Laboratories) certification — the gold standard for lab quality in India. You can filter exclusively for NABL-certified labs using our search filters." },
  { q:"How are reports delivered?", a:"Reports are delivered digitally to your registered email. You can also download them directly from your booking confirmation at any time using your unique booking reference ID." },
  { q:"Can I cancel or reschedule a booking?", a:"Yes. Cancellations and reschedules are accepted up to 2 hours before your appointment, free of charge. Reach our 24/7 support team via chat or phone for immediate assistance." },
  { q:"Are there hidden charges?", a:"Never. The price shown on LabEase is the final price you pay — inclusive of all taxes. No convenience fees, no surprises." },
  { q:"What if the collection professional is late?", a:"We guarantee on-time service. If our phlebotomist is more than 30 minutes late, you are entitled to a full refund or complimentary rescheduling — no questions asked." },
];

const TIME_SLOTS = ["6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"];
const TODAY = new Date().toISOString().split("T")[0];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const Stars = ({ r }) => (
  <span style={{ color:"#F59E0B", fontSize:".82rem", letterSpacing:"1px" }}>
    {"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}
  </span>
);
const pct = (p,m) => Math.round((1-p/m)*100);

const Pill = ({ children, bg="#EFF6FF", fg="#1158A6", style={} }) => (
  <span style={{ background:bg, color:fg, borderRadius:20, padding:"3px 10px", fontSize:".68rem", fontWeight:700, letterSpacing:".04em", display:"inline-flex", alignItems:"center", gap:3, ...style }}>{children}</span>
);

const Modal = ({ children, onClose }) => (
  <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)",animation:"fadeIn .18s" }}>
    <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:24,maxWidth:680,width:"100%",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(0,0,0,.22)",animation:"scaleIn .22s cubic-bezier(.34,1.56,.64,1)" }}>
      {children}
    </div>
  </div>
);

const Toast = ({ msg, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"var(--teal)",color:"#fff",borderRadius:50,padding:"12px 24px",fontWeight:700,fontSize:".86rem",zIndex:9999,boxShadow:"0 8px 28px rgba(17,88,166,.38)",animation:"slideUp .25s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:10,fontFamily:"'Manrope',sans-serif" }}>
      <span style={{ width:20,height:20,borderRadius:"50%",background:"#60A5FA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".72rem",flexShrink:0 }}>✓</span>
      {msg}
    </div>
  );
};



/* ─── UPLOAD PRESCRIPTION COMPONENT ─────────────────────────────────────── */
const UploadPrescription = () => {
  const [sheet,   setSheet]   = useState(false); // source picker sheet
  const [modal,   setModal]   = useState(false); // upload review modal
  const [file,    setFile]    = useState(null);
  const [preview, setPreview] = useState(null);
  const [status,  setStatus]  = useState("idle"); // idle | uploading | done
  const [pct,     setPct]     = useState(0);
  const galleryRef = useRef(null);
  const cameraRef  = useRef(null);

  const MAX_MB = 10;

  const ingest = f => {
    if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) { alert(`File must be under ${MAX_MB} MB.`); return; }
    setFile(f);
    setPct(0); setStatus("idle");
    if (f.type.startsWith("image/")) {
      const r = new FileReader();
      r.onload = e => setPreview(e.target.result);
      r.readAsDataURL(f);
    } else setPreview(null);
    setSheet(false);
    setModal(true);
  };

  const handleChange = e => ingest(e.target.files?.[0]);

  const startUpload = () => {
    setStatus("uploading"); setPct(0);
    const iv = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(iv); setStatus("done"); return 100; }
        return p + Math.random() * 14 + 4;
      });
    }, 180);
  };

  const close = () => {
    setModal(false); setSheet(false);
    setFile(null); setPreview(null); setStatus("idle"); setPct(0);
    if (galleryRef.current) galleryRef.current.value = "";
    if (cameraRef.current)  cameraRef.current.value  = "";
  };

  const fmt = b => b > 1024*1024 ? (b/1024/1024).toFixed(1)+" MB" : Math.round(b/1024)+" KB";
  const isPdf = file?.type === "application/pdf";

  return (
    <>
      {/* ── TRIGGER BUTTON ── */}
      <button onClick={() => setSheet(true)} className="nav-a"
        style={{ background:"transparent",border:"none",cursor:"pointer",color:"var(--muted)",fontWeight:700,fontSize:".86rem",padding:"7px 6px",borderRadius:8,fontFamily:"'Manrope',sans-serif",transition:"color .15s" }}>
        Upload Prescription
      </button>

      {/* hidden file inputs */}
      <input ref={galleryRef} type="file" accept="image/*,application/pdf" style={{ display:"none" }} onChange={handleChange}/>
      <input ref={cameraRef}  type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={handleChange}/>

      {/* ── SOURCE PICKER SHEET ── */}
      {sheet && (
        <div onClick={close} style={{ position:"fixed",inset:0,zIndex:4000,background:"rgba(13,17,25,.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)",animation:"fadeIn .15s" }}>
          <div onClick={e=>e.stopPropagation()}
            style={{ background:"#fff",width:"100%",maxWidth:480,borderRadius:"28px 28px 0 0",padding:"0 0 env(safe-area-inset-bottom,24px)",fontFamily:"'Manrope',sans-serif",animation:"slideUp .26s cubic-bezier(.22,1,.36,1)",boxShadow:"0 -8px 40px rgba(0,0,0,.18)" }}>

            {/* handle bar */}
            <div style={{ width:40,height:4,borderRadius:99,background:"#D1D5DB",margin:"14px auto 0" }}/>

            {/* header section */}
            <div style={{ padding:"20px 24px 18px",borderBottom:"1px solid #F1F5F9" }}>
              <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#1158A6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 4px 14px rgba(17,88,166,.3)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:"1.08rem",color:"#0D1117",letterSpacing:"-.01em" }}>Upload Prescription</div>
                  <div style={{ fontSize:".78rem",color:"#9CA3AF",marginTop:2 }}>JPG · PNG · PDF &nbsp;·&nbsp; Max 10 MB</div>
                </div>
              </div>
            </div>

            {/* option buttons */}
            <div style={{ padding:"16px 20px",display:"flex",flexDirection:"column",gap:10 }}>

              {/* Take Photo */}
              <button
                onClick={() => { cameraRef.current?.click(); }}
                style={{ display:"flex",alignItems:"center",gap:14,background:"#F0F6FF",border:"1.5px solid #BFDBFE",borderRadius:18,padding:"14px 16px",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",width:"100%",transition:"all .18s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 1px 4px rgba(17,88,166,.06)" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#1158A6"; e.currentTarget.style.background="#EFF6FF"; e.currentTarget.style.transform="scale(1.01)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(17,88,166,.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#BFDBFE"; e.currentTarget.style.background="#F0F6FF"; e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(17,88,166,.06)"; }}>
                <div style={{ width:50,height:50,borderRadius:15,background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid #BFDBFE" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:".95rem",color:"#0D1117",marginBottom:3,letterSpacing:"-.005em" }}>Take a Photo</div>
                  <div style={{ fontSize:".76rem",color:"#6B7280",lineHeight:1.5 }}>Open camera to photograph your prescription</div>
                </div>
                <div style={{ width:28,height:28,borderRadius:9,background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12l4-4-4-4"/></svg>
                </div>
              </button>

              {/* Choose from Gallery / Files */}
              <button
                onClick={() => { galleryRef.current?.click(); }}
                style={{ display:"flex",alignItems:"center",gap:14,background:"#F8F8FF",border:"1.5px solid #D0D4F7",borderRadius:18,padding:"14px 16px",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",width:"100%",transition:"all .18s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 1px 4px rgba(99,102,241,.06)" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#6366F1"; e.currentTarget.style.background="#EEEEFD"; e.currentTarget.style.transform="scale(1.01)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(99,102,241,.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#D0D4F7"; e.currentTarget.style.background="#F8F8FF"; e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(99,102,241,.06)"; }}>
                <div style={{ width:50,height:50,borderRadius:15,background:"linear-gradient(135deg,#EDEDFE,#DFE0FB)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid #C4C7F5" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2.5"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:".95rem",color:"#0D1117",marginBottom:3,letterSpacing:"-.005em" }}>Choose from Gallery</div>
                  <div style={{ fontSize:".76rem",color:"#6B7280",lineHeight:1.5 }}>Pick an image or PDF from your device</div>
                </div>
                <div style={{ width:28,height:28,borderRadius:9,background:"#EDEDFE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#6366F1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12l4-4-4-4"/></svg>
                </div>
              </button>
            </div>

            {/* security note */}
            <div style={{ margin:"0 20px 8px",background:"#FAFAFA",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:9,border:"1px solid #F1F5F9" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize:".72rem",color:"#9CA3AF",lineHeight:1.4 }}>Your prescription is encrypted and shared only with your chosen lab</span>
            </div>

            <div style={{ padding:"4px 20px 28px" }}>
              <button onClick={close} style={{ width:"100%",background:"#F3F4F6",border:"none",color:"#374151",fontWeight:700,fontSize:".88rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",padding:"13px",borderRadius:14,transition:"background .14s" }}
                onMouseEnter={e=>e.currentTarget.style.background="#E5E7EB"}
                onMouseLeave={e=>e.currentTarget.style.background="#F3F4F6"}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── REVIEW & UPLOAD MODAL ── */}
      {modal && file && (
        <div onClick={e=>{ if(e.target===e.currentTarget) close(); }}
          style={{ position:"fixed",inset:0,zIndex:4000,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)",animation:"fadeIn .15s" }}>
          <div style={{ background:"#fff",borderRadius:22,maxWidth:480,width:"100%",fontFamily:"'Manrope',sans-serif",boxShadow:"0 32px 80px rgba(0,0,0,.28)",animation:"scaleIn .22s cubic-bezier(.34,1.56,.64,1)",overflow:"hidden" }}>

            {/* header */}
            <div style={{ padding:"20px 22px 16px",borderBottom:"1px solid #F1F5F9",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <div>
                <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117" }}>Review Prescription</div>
                <div style={{ fontSize:".73rem",color:"#9CA3AF",marginTop:2 }}>Verify the file looks correct before uploading</div>
              </div>
              <button onClick={close} style={{ width:32,height:32,borderRadius:"50%",background:"#F1F5F9",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",flexShrink:0,fontSize:"1rem" }}>✕</button>
            </div>

            <div style={{ padding:"20px 22px 22px" }}>

              {/* image preview */}
              {preview ? (
                <div style={{ borderRadius:14,overflow:"hidden",marginBottom:16,border:"1px solid #E5E7EB",background:"#F8FAFC",display:"flex",alignItems:"center",justifyContent:"center",minHeight:180 }}>
                  <img src={preview} alt="Prescription" style={{ maxHeight:240,maxWidth:"100%",objectFit:"contain",display:"block" }}/>
                </div>
              ) : (
                <div style={{ borderRadius:14,border:"1px solid #E5E7EB",background:"#FEF2F2",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 16px",marginBottom:16,gap:8 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <div style={{ fontWeight:700,fontSize:".86rem",color:"#DC2626" }}>PDF Document</div>
                </div>
              )}

              {/* file chip */}
              <div style={{ display:"flex",alignItems:"center",gap:12,background:"#F8FAFC",borderRadius:11,padding:"11px 14px",border:"1px solid #E9EEF2",marginBottom:16 }}>
                <div style={{ width:36,height:36,borderRadius:9,background:isPdf?"#FEE2E2":"#DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  {isPdf
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  }
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontWeight:700,fontSize:".84rem",color:"#0D1117",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{file.name}</div>
                  <div style={{ fontSize:".72rem",color:"#9CA3AF",marginTop:1 }}>{fmt(file.size)} · {isPdf?"PDF Document":"Image"}</div>
                </div>
                {status === "done" && (
                  <div style={{ width:24,height:24,borderRadius:"50%",background:"#1158A6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 4.5,9 10.5,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>

              {/* progress bar */}
              {status === "uploading" && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",fontSize:".72rem",fontWeight:600,color:"#6B7280",marginBottom:6 }}>
                    <span>Uploading…</span><span>{Math.min(100,Math.round(pct))}%</span>
                  </div>
                  <div style={{ height:5,background:"#F1F5F9",borderRadius:99,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${Math.min(100,pct)}%`,background:"linear-gradient(90deg,#1158A6,#2563EB)",borderRadius:99,transition:"width .2s linear" }}/>
                  </div>
                </div>
              )}

              {/* success */}
              {status === "done" && (
                <div style={{ background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:11,padding:"12px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"flex-start" }}>
                  <div style={{ width:22,height:22,borderRadius:"50%",background:"#1158A6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 4.5,9 10.5,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:".84rem",color:"#1158A6" }}>Uploaded successfully!</div>
                    <div style={{ fontSize:".73rem",color:"#6B7280",marginTop:1 }}>Our team will review your prescription and reach out within 2 hours.</div>
                  </div>
                </div>
              )}

              {/* actions */}
              {status === "done" ? (
                <button onClick={close} style={{ width:"100%",background:"#1158A6",color:"#fff",border:"none",borderRadius:11,padding:"12px",fontWeight:700,fontSize:".9rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>Done</button>
              ) : (
                <div style={{ display:"flex",gap:10 }}>
                  <button onClick={close} style={{ flex:1,background:"transparent",color:"#6B7280",border:"1.5px solid #E5E7EB",borderRadius:11,padding:"12px",fontWeight:700,cursor:"pointer",fontSize:".86rem",fontFamily:"'Manrope',sans-serif" }}>Cancel</button>
                  <button onClick={startUpload} disabled={status==="uploading"}
                    style={{ flex:2,background:status==="uploading"?"#BFDBFE":"#1158A6",color:"#fff",border:"none",borderRadius:11,padding:"12px",fontWeight:700,cursor:status==="uploading"?"default":"pointer",fontSize:".88rem",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"background .18s" }}>
                    {status === "uploading"
                      ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" style={{ animation:"spin .85s linear infinite",transformOrigin:"12px 12px" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Uploading…</>
                      : <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                          Upload Prescription
                        </>
                    }
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── TRUSTED LABS SECTION ────────────────────────────────────────────────── */
const LAB_META = [
  { id:1, short:"Apollo", accent:"#0066CC", bg:"#EBF3FF", icon:"A", city:"Bangalore", tag:"India's #1 Network", since:"Est. 2001" },
  { id:2, short:"SRL",    accent:"#E8380D", bg:"#FEF1EE", icon:"S", city:"Mumbai",    tag:"Pan-India Chain",   since:"Est. 1995" },
  { id:3, short:"Metropolis", accent:"#6B21A8", bg:"#F5F0FF", icon:"M", city:"Hyderabad", tag:"Highest Rated",  since:"Est. 1980" },
  { id:4, short:"Dr Lal", accent:"#047857", bg:"#ECFDF5", icon:"L", city:"Delhi",     tag:"75+ Years Legacy",  since:"Est. 1949" },
  { id:5, short:"Thyrocare", accent:"#B45309", bg:"#FFFBEB", icon:"T", city:"Chennai", tag:"Specialist Lab",   since:"Est. 1996" },
  { id:6, short:"Vijaya", accent:"#0369A1", bg:"#F0F9FF", icon:"V", city:"Hyderabad", tag:"Radiology Expert",  since:"Est. 1981" },
];

const LabsNearMeSection = ({ T, navTo, setLab, setCatF, setTestQ }) => (
  <section style={{ padding:"64px 0 60px", background:"#fff", borderBottom:"1px solid #F1F5F9" }}>
    <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>

      {/* header */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:12 }}>
        <div>
          <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:50,padding:"4px 14px",marginBottom:12 }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#1158A6",display:"inline-block",flexShrink:0 }}/>
            <span style={{ fontSize:".68rem",fontWeight:800,color:"#1158A6",letterSpacing:".1em",textTransform:"uppercase" }}>Verified Partners</span>
          </div>
          <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.4rem,3vw,1.9rem)",fontWeight:800,color:"#0D1117",marginBottom:6,letterSpacing:"-.02em",lineHeight:1.2 }}>Trusted Diagnostic Labs</h2>
          <p style={{ color:"#6B7280",fontSize:".86rem" }}>All labs are NABL-accredited with verified pricing and real-time availability.</p>
        </div>
        <button onClick={()=>navTo("labs")}
          style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"11px 26px",fontWeight:700,fontSize:".86rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(17,88,166,.28)",transition:"all .18s",display:"flex",alignItems:"center",gap:8 }}
          onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-1px)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; }}>
          View All Labs →
        </button>
      </div>

      {/* 3-column lab card grid */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
        {LABS.map((lab,i)=>{
          const meta = LAB_META.find(m=>m.id===lab.id)||LAB_META[0];
          const minPrice = Math.min(...lab.tests.map(t=>t.price));
          const discount = Math.round((1 - minPrice / Math.min(...lab.tests.map(t=>t.mrp)))*100);
          return (
            <div key={lab.id}
              onClick={()=>{ setLab(lab); setCatF("All"); setTestQ(""); navTo("lab"); }}
              style={{ background:"#fff",borderRadius:18,border:"1px solid #EEF2FF",overflow:"hidden",cursor:"pointer",display:"flex",flexDirection:"column",transition:"all .22s",boxShadow:"0 2px 12px rgba(17,88,166,.06)" }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 12px 36px rgba(17,88,166,.14)"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor=meta.accent+"44"; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 12px rgba(17,88,166,.06)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#EEF2FF"; }}>

              {/* coloured top strip */}
              <div style={{ height:5,background:`linear-gradient(90deg,${meta.accent},${meta.accent}99)` }}/>

              <div style={{ padding:"20px 20px 16px",flex:1,display:"flex",flexDirection:"column",gap:0 }}>

                {/* row 1: logo + name + city */}
                <div style={{ display:"flex",alignItems:"flex-start",gap:14,marginBottom:14 }}>
                  {/* logo avatar */}
                  <div style={{ width:52,height:52,borderRadius:14,background:meta.bg,border:`1.5px solid ${meta.accent}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontFamily:"'Manrope',sans-serif",fontWeight:900,fontSize:"1.4rem",color:meta.accent }}>{meta.icon}</span>
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontWeight:800,fontSize:".98rem",color:"#0D1117",lineHeight:1.2,marginBottom:3 }}>{lab.name}</div>
                    <div style={{ fontSize:".72rem",color:"#9CA3AF",fontWeight:600 }}>📍 {meta.city} · {meta.since}</div>
                    <div style={{ marginTop:5,display:"flex",gap:5,flexWrap:"wrap" }}>
                      {lab.nabl && <span style={{ background:"#DCFCE7",color:"#15803D",fontWeight:700,fontSize:".66rem",padding:"2px 8px",borderRadius:50 }}>✓ NABL</span>}
                      {lab.homeCollection && <span style={{ background:"#EFF6FF",color:"#1158A6",fontWeight:700,fontSize:".66rem",padding:"2px 8px",borderRadius:50 }}>🏠 Home</span>}
                      <span style={{ background:meta.bg,color:meta.accent,fontWeight:700,fontSize:".66rem",padding:"2px 8px",borderRadius:50 }}>{meta.tag}</span>
                    </div>
                  </div>
                </div>

                {/* divider */}
                <div style={{ height:1,background:"#F3F4F6",marginBottom:14 }}/>

                {/* stats row */}
                <div style={{ display:"flex",gap:0,marginBottom:16 }}>
                  {[
                    { label:"Rating", value:`${lab.rating}★`, color:meta.accent },
                    { label:"Reviews", value:lab.reviews.toLocaleString() },
                    { label:"Tests From", value:`₹${minPrice}` },
                    { label:"Upto Off", value:`${discount}%` },
                  ].map((s,si,arr)=>(
                    <div key={s.label} style={{ flex:1,textAlign:"center",borderRight:si<arr.length-1?"1px solid #F3F4F6":"none",padding:"0 4px" }}>
                      <div style={{ fontFamily:"'Manrope',sans-serif",fontWeight:900,fontSize:".92rem",color:s.color||"#0D1117",lineHeight:1 }}>{s.value}</div>
                      <div style={{ fontSize:".62rem",color:"#9CA3AF",fontWeight:600,marginTop:3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* timing */}
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:16 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span style={{ fontSize:".75rem",color:"#6B7280",fontWeight:600 }}>{lab.timing}</span>
                </div>

                {/* CTA */}
                <button
                  onClick={e=>{ e.stopPropagation(); setLab(lab); setCatF("All"); setTestQ(""); navTo("lab"); }}
                  style={{ width:"100%",background:meta.bg,color:meta.accent,border:`1.5px solid ${meta.accent}33`,borderRadius:10,padding:"10px",fontWeight:800,fontSize:".83rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .18s",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=meta.accent; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor=meta.accent; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=meta.bg; e.currentTarget.style.color=meta.accent; e.currentTarget.style.borderColor=`${meta.accent}33`; }}>
                  View Tests & Prices
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* bottom trust strip */}
      <div style={{ marginTop:36,background:"linear-gradient(135deg,#F8FAFF,#EFF6FF)",borderRadius:16,padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,border:"1px solid #DBEAFE" }}>
        <div style={{ display:"flex",gap:28,flexWrap:"wrap" }}>
          {[["✓ NABL Accredited","All 6 labs verified"],["🏠 Free Home Collection","Available at 5 labs"],["📊 500+ Tests","Across all labs"],["⚡ Same Day Reports","For select tests"]].map(([h,s])=>(
            <div key={h}>
              <div style={{ fontWeight:800,fontSize:".8rem",color:"#0D1117" }}>{h}</div>
              <div style={{ fontSize:".72rem",color:"#6B7280",marginTop:2 }}>{s}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>navTo("labs")}
          style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"10px 24px",fontWeight:700,fontSize:".82rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",boxShadow:"0 4px 14px rgba(17,88,166,.28)",transition:"all .18s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; }}>
          Compare All Labs →
        </button>
      </div>
    </div>
  </section>
);


/* ─── MODULE-LEVEL REPLACEMENTS FOR LabCard, LabsPage, LabDetail ────────────
   Placed outside App() so React uses a stable function reference on every
   render. This fixes Add/Book buttons losing click handlers on cart updates.
────────────────────────────────────────────────────────────────────────── */

function LabCardML({ l, T, setLab, setCatF, setTestQ, navTo }) {
  return (
    <div className="hover-lift" style={{ ...T.card,border:"1px solid var(--line)",cursor:"pointer",overflow:"hidden" }}
      onClick={()=>{ setLab(l); setCatF("All"); setTestQ(""); navTo("lab"); }}>
      {/* top colour strip */}
      <div style={{ height:8,background:"#E5E7EB" }}/>
      <div style={{ padding:22 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
          <div>
            <h3 style={{ fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:4,lineHeight:1.2 }}>{l.name}</h3>
            <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
              {l.nabl && <Pill>✓ NABL</Pill>}
              {l.homeCollection && <Pill bg="#E0F2FE" fg="#0369A1">🏠 Home</Pill>}
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontWeight:900,fontSize:"1.15rem",color:"var(--ink)",fontFamily:"'DM Serif Display',serif" }}>₹{Math.min(...l.tests.map(t=>t.price))}</div>
            <div style={{ fontSize:".67rem",color:"var(--muted)",fontWeight:500 }}>tests from</div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:6 }}>
          <Stars r={l.rating}/>
          <span style={{ fontWeight:700,fontSize:".82rem" }}>{l.rating}</span>
          <span style={{ color:"#9CA3AF",fontSize:".75rem" }}>({l.reviews.toLocaleString()})</span>
        </div>
        <div style={{ color:"var(--muted)",fontSize:".79rem",marginBottom:2 }}>📍 {l.address}</div>
        <div style={{ color:"var(--muted)",fontSize:".79rem",marginBottom:18 }}>🕐 {l.timing}</div>
        <button className="btn-anim" style={{ ...T.btn(l.color),width:"100%",justifyContent:"center",borderRadius:9,padding:"11px" }}>View Tests & Prices →</button>
      </div>
    </div>
  );
}
  

function LabsPageML({ T, catF, setCatF, setLab, setTestQ, navTo, cart }) {
  const [sortBy,     setSortBy]     = useState("rating");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterHome, setFilterHome] = useState(false);
  const [filterNabl, setFilterNabl] = useState(false);
  const [searchQ,    setSearchQ]    = useState("");

  const specialties = [
    ["Blood Tests","Blood"],["Thyroid","Thyroid"],["Diabetes","Diabetes"],
    ["Vitamin Tests","Vitamins"],["Full Body Package","Packages"],
    ["Cardiac","Cardiac"],["Kidney","Kidney"],["Liver","Liver"],
    ["Hormones","Hormones"],["Radiology","Radiology"],
  ];
  const tagMap = {
    1:["Blood Tests","Packages","Home Collection"],
    2:["Pathology","Urine","Thyroid"],
    3:["Full Body","Cancer Markers","Allergy"],
    4:["Blood Sugar","Infectious","Packages"],
    5:["Hormones","Thyroid","Fertility"],
    6:["Radiology","Echo","MRI"],
  };

  // Merge LABS with NEAR_ME metadata
  const enriched = LABS.map((l,i) => {
    const nm = NEAR_ME.find(x => l.name.startsWith(x.name.split(" ")[0]));
    return { ...l, open: nm?.open ?? true, dist: nm?.dist ?? "—", area: nm?.area ?? l.city, homecoll: nm?.homecoll ?? l.homeCollection, tags: tagMap[l.id] || ["Blood Tests","Packages"] };
  });

  const filtered = enriched
    .filter(l => !filterOpen || l.open)
    .filter(l => !filterHome || l.homecoll)
    .filter(l => !filterNabl || l.nabl)
    .filter(l => !searchQ || l.name.toLowerCase().includes(searchQ.toLowerCase()) || l.address.toLowerCase().includes(searchQ.toLowerCase()))
    .sort((a,b) =>
      sortBy === "rating" ? b.rating - a.rating :
      sortBy === "price"  ? Math.min(...a.tests.map(t=>t.price)) - Math.min(...b.tests.map(t=>t.price)) :
      parseFloat(a.dist) - parseFloat(b.dist)
    );

  return (
    <div style={{ minHeight:"100vh", background:"#F5F7FA", fontFamily:"'Manrope',sans-serif" }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ background:"#fff", borderBottom:"1px solid var(--line)", padding:"20px 0" }}>
        <div style={{ ...T.wrap }}>
          <button onClick={()=>navTo("home")} style={{ background:"none",border:"none",color:"var(--teal)",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",padding:0,marginBottom:14,display:"flex",alignItems:"center",gap:5 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>
            Home
          </button>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12 }}>
            <div>
              <h1 style={{ ...T.serif, fontSize:"clamp(1.4rem,3vw,1.9rem)", color:"var(--ink)", marginBottom:4, letterSpacing:"-.01em" }}>All Labs</h1>
              <p style={{ color:"var(--muted)", fontSize:".84rem" }}>
                {filtered.length} lab{filtered.length!==1?"s":""} found ·
                <span style={{ color:"#1158A6", fontWeight:700 }}> {enriched.filter(l=>l.open).length} open now</span>
              </p>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:6 }}>
              {/* search */}
              <div style={{ position:"relative" }}>
                <svg style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.7"/><path d="M13.5 13.5L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.7" strokeLinecap="round"/></svg>
                <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search labs…" style={{ paddingLeft:34,paddingRight:12,paddingTop:8,paddingBottom:8,border:"1.5px solid #E5E7EB",borderRadius:50,fontSize:".82rem",fontFamily:"'Manrope',sans-serif",outline:"none",width:180,background:"#FAFAFA",color:"#111" }}
                  onFocus={e=>e.target.style.borderColor="#1158A6"}
                  onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>
              </div>
              {/* sort */}
              <span style={{ fontSize:".8rem",color:"var(--muted)",fontWeight:600,marginLeft:4 }}>Sort:</span>
              {[["rating","Rating"],["price","Price"],["dist","Distance"]].map(([v,l])=>(
                <button key={v} onClick={()=>setSortBy(v)}
                  style={{ background:sortBy===v?"var(--teal)":"#fff",color:sortBy===v?"#fff":"var(--muted)",border:`1px solid ${sortBy===v?"var(--teal)":"var(--line)"}`,borderRadius:20,padding:"5px 13px",fontSize:".76rem",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY: FULL WIDTH LAB LIST ── */}
      <div style={{ ...T.wrap, padding:"16px 16px" }}>
        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          {filtered.length===0 && (
            <div style={{ background:"#fff",borderRadius:16,border:"1px solid var(--line)",padding:48,textAlign:"center",color:"var(--muted)" }}>
              <div style={{ fontSize:"2.5rem",marginBottom:10 }}>🔬</div>
              No labs match your filters.
            </div>
          )}
          {filtered.map(l => {
            const minPrice = Math.min(...l.tests.map(t=>t.price));
            const initials = l.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
            return (
              <div key={l.id} className="hover-lift"
                style={{ background:"#fff",borderRadius:16,border:"1px solid var(--line)",overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.05)",cursor:"pointer" }}
                onClick={()=>{ setLab(l); setCatF("All"); setTestQ(""); navTo("lab"); }}>

                <div style={{ display:"flex" }}>
                  <div style={{ flex:1,padding:"16px 16px 14px" }}>
                    <div style={{ display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap" }}>
                      <div style={{ width:52,height:52,borderRadius:12,background:"#EEF4FF",border:"1.5px solid #DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <span style={{ fontFamily:"'DM Serif Display',serif",fontWeight:700,fontSize:"1.3rem",color:"#1158A6" }}>{initials}</span>
                      </div>
                      <div style={{ flex:1,minWidth:180 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:5 }}>
                          <span style={{ fontWeight:800,fontSize:"1.05rem",color:"var(--ink)" }}>{l.name}</span>
                          {l.nabl && <span style={{ background:"#EFF6FF",color:"#1158A6",borderRadius:20,padding:"2px 9px",fontSize:".64rem",fontWeight:700 }}>✓ NABL</span>}
                        </div>
                        <div style={{ display:"flex",alignItems:"center",gap:5,color:"var(--muted)",fontSize:".8rem",marginBottom:8 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {l.area}, Bangalore &nbsp;·&nbsp; <strong style={{ color:"var(--ink)" }}>{l.dist} away</strong>
                        </div>
                        <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:10 }}>
                          {l.tags.map(t=>(
                            <span key={t} style={{ background:"#F1F5F9",color:"#374151",borderRadius:6,padding:"3px 9px",fontSize:".7rem",fontWeight:600 }}>{t}</span>
                          ))}
                          {l.homecoll && <span style={{ background:"#E0F2FE",color:"#0369A1",borderRadius:6,padding:"3px 9px",fontSize:".7rem",fontWeight:600 }}>🏠 Home Collection</span>}
                        </div>
                        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:4,background:"#EEF4FF",borderRadius:7,padding:"3px 9px",fontSize:".75rem",fontWeight:800 }}>
                            <span style={{ color:"#1158A6" }}>★</span>
                            <span style={{ color:"#0D1117" }}>{l.rating}</span>
                          </div>
                          <span style={{ fontSize:".75rem",color:"var(--muted)",fontWeight:500 }}>
                            {l.rating>=4.8?"Excellent":l.rating>=4.6?"Very Good":"Good"} · {l.reviews.toLocaleString()} reviews
                          </span>
                        </div>
                      </div>
                      <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:10,minWidth:140,flexShrink:0 }}>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:".7rem",color:"var(--muted)",fontWeight:500 }}>Tests starting from</div>
                          <div style={{ fontFamily:"'DM Serif Display',serif",fontWeight:700,fontSize:"1.4rem",color:"var(--ink)",lineHeight:1.1 }}>₹ {minPrice}</div>
                        </div>
                        <button onClick={e=>{ e.stopPropagation(); setLab(l); setCatF("All"); setTestQ(""); navTo("lab"); }}
                          style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:9,padding:"10px 22px",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",width:"100%",transition:"filter .15s",boxShadow:"0 2px 8px rgba(17,88,166,.25)" }}
                          onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.1)"}
                          onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}>
                          Book Now
                        </button>
                        <button onClick={e=>{ e.stopPropagation(); setLab(l); setCatF("All"); setTestQ(""); navTo("lab"); }}
                          style={{ background:"#F1F5F9",color:"#374151",border:"none",borderRadius:9,padding:"9px 22px",fontWeight:700,cursor:"pointer",fontSize:".82rem",fontFamily:"'Manrope',sans-serif",width:"100%",transition:"filter .15s" }}
                          onMouseEnter={e=>e.currentTarget.style.filter="brightness(.95)"}
                          onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}>
                          View Tests & Prices
                        </button>
                      </div>
                    </div>
                    <div style={{ display:"flex",gap:20,marginTop:14,paddingTop:12,borderTop:"1px solid #F1F5F9",flexWrap:"wrap" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:".75rem",color:"var(--muted)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {l.timing}
                      </div>
                      <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:".75rem",color:"#065F46",fontWeight:600 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Reports in {l.id===1?"Same Day":l.id===2?"2–6 hrs":"24 hrs"}
                      </div>
                      <div style={{ fontSize:".75rem",color:"var(--muted)" }}>{l.tests.length}+ tests available</div>
                      {l.nabl && <div style={{ fontSize:".75rem",color:"#1158A6",fontWeight:600 }}>NABL Accredited · Est. {l.founded}</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


function LabDetailML({ lab, T, cart, total, testQ, setTestQ, catF, setCatF, filtTests, addCart, delCart, has, pct, navTo, setCartOpen }) {
  if (!lab) return null;
  const cats = ["All",...new Set(lab.tests.map(t=>t.cat))];
  return (
  <div style={{ minHeight:"80vh" }}>
    {/* sticky header */}
    <div style={{ background:"#fff",borderBottom:"1px solid var(--line)",position:"sticky",top:64,zIndex:50 }}>
      <div style={{ ...T.wrap,padding:"18px 24px" }}>
        <button onClick={()=>navTo("labs")} style={{ background:"none",border:"none",color:"var(--teal)",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",marginBottom:10,padding:0 }}>← All Labs</button>
        <div style={{ display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap" }}>
          <div style={{ width:56,height:56,borderRadius:12,background:`${lab.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <div style={{ width:24,height:24,borderRadius:"50%",background:lab.color }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4 }}>
              <h1 style={{ ...T.serif,fontSize:"1.35rem",color:"var(--ink)" }}>{lab.name}</h1>
              {lab.nabl && <Pill>✓ NABL</Pill>}
              {lab.homeCollection && <Pill bg="#E0F2FE" fg="#0369A1">🏠 Home Collection</Pill>}
            </div>
            <div style={{ display:"flex",gap:6,alignItems:"center",marginBottom:3 }}>
              <Stars r={lab.rating}/>
              <b style={{ fontSize:".84rem" }}>{lab.rating}</b>
              <span style={{ color:"#9CA3AF",fontSize:".75rem" }}>({lab.reviews.toLocaleString()} reviews)</span>
            </div>
            <div style={{ color:"var(--muted)",fontSize:".79rem" }}>📍 {lab.address} · {lab.distance} &nbsp;|&nbsp; 🕐 {lab.timing}</div>
          </div>
          {cart.length>0 && (
            <button onClick={()=>setCartOpen(true)} className="btn-anim" style={{ ...T.btn("#F59E0B"),borderRadius:50,padding:"9px 18px",flexShrink:0,fontSize:".84rem" }}>
              Cart ({cart.length}) · ₹{total.toLocaleString()}
            </button>
          )}
        </div>
      </div>
    </div>

    <div style={{ ...T.wrap,padding:"26px 24px" }}>
      {/* search */}
      <div style={{ position:"relative",marginBottom:14,maxWidth:400 }}>
        <svg style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)" }} width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.7"/><path d="M13.5 13.5 L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.7" strokeLinecap="round"/></svg>
        <input style={{ ...T.inp,paddingLeft:36 }} placeholder="Search tests…" value={testQ} onChange={e=>setTestQ(e.target.value)}/>
      </div>

      {/* category chips */}
      <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom:10,marginBottom:20 }}>
        {cats.map(c=>{
          const Icon=ICONS[c];
          return (
            <button key={c} className="chip" onClick={()=>setCatF(c)}
              style={{ background:catF===c?lab.color:"#fff",color:catF===c?"#fff":"var(--muted)",border:`1.5px solid ${catF===c?lab.color:"var(--line)"}`,borderRadius:50,padding:"7px 16px",fontWeight:600,cursor:"pointer",fontSize:".77rem",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",flexShrink:0,display:"flex",alignItems:"center",gap:5,transition:"all .14s" }}>
              {Icon && c!=="All" ? <Icon s={16}/> : null}
              {c}
            </button>
          );
        })}
      </div>

      {/* test table */}
      <div style={{ ...T.card,borderRadius:16,border:"1px solid var(--line)" }}>
        <div className="test-header" style={{ display:"grid",gridTemplateColumns:"1fr auto auto auto",padding:"10px 16px",background:"#F8FAFC",borderBottom:"1px solid var(--line)",fontSize:".68rem",fontWeight:700,color:"var(--muted)",letterSpacing:".07em",textTransform:"uppercase",gap:12,alignItems:"center" }}>
          <span>Test Name</span>
          <span style={{ textAlign:"center" }}>Price</span>
          <span style={{ textAlign:"center" }}>MRP</span>
          <span style={{ textAlign:"center" }}>Action</span>
        </div>

        {filtTests.length===0 ? (
          <div style={{ padding:48,textAlign:"center",color:"#94A3B8" }}>
            <IBlood s={56}/><div style={{ marginTop:10 }}>No tests found.</div>
          </div>
        ) : filtTests.map(t=>{
          const added=has(t.id); const d=pct(t.price,t.mrp); const Icon=ICONS[t.cat];
          return (
            <div key={t.id} className="test-row" style={{ display:"grid",gridTemplateColumns:"1fr auto auto auto",padding:"12px 16px",borderBottom:"1px solid #F9FAFB",alignItems:"center",gap:12,transition:"background .14s" }}>
              {/* Test name + cat */}
              <div style={{ display:"flex",alignItems:"center",gap:8,minWidth:0 }}>
                {Icon && <Icon s={26}/>}
                <div style={{ minWidth:0 }}>
                  <div style={{ fontWeight:700,color:"var(--ink)",fontSize:".84rem",marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{t.name}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                    <span style={{ background:`${lab.color}18`,color:lab.color,borderRadius:20,padding:"1px 7px",fontSize:".62rem",fontWeight:700,whiteSpace:"nowrap" }}>{t.cat}</span>
                    <span style={{ fontSize:".62rem",color:"var(--muted)",whiteSpace:"nowrap" }}>{t.time}</span>
                  </div>
                </div>
              </div>
              {/* Price */}
              <div style={{ textAlign:"center",fontWeight:900,color:"var(--teal)",fontSize:".95rem",fontFamily:"'DM Serif Display',serif",whiteSpace:"nowrap" }}>₹{t.price}</div>
              {/* MRP + discount stacked */}
              <div style={{ textAlign:"center",whiteSpace:"nowrap" }}>
                <div style={{ color:"#9CA3AF",textDecoration:"line-through",fontSize:".76rem" }}>₹{t.mrp}</div>
                <div style={{ color:"#2563EB",fontSize:".62rem",fontWeight:700 }}>{d}% off</div>
              </div>
              {/* Add / Added */}
              <div style={{ textAlign:"center" }}>
                {added ? (
                  <button onClick={()=>delCart(t.id)} style={{ background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:8,padding:"7px 10px",fontWeight:700,cursor:"pointer",fontSize:".73rem",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",minHeight:36 }}>✓ Added</button>
                ) : (
                  <button className="btn-anim" onClick={()=>addCart(lab,t)} style={{ background:lab.color,color:"#fff",border:"none",borderRadius:8,padding:"7px 10px",fontWeight:700,cursor:"pointer",fontSize:".73rem",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",minHeight:36 }}>+ Add</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {cart.length>0 && (
      <div style={{ position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:200 }}>
        <button onClick={()=>navTo("booking")} className="btn-anim"
          style={{ ...T.btn(),borderRadius:50,padding:"13px 32px",fontSize:".95rem",boxShadow:"0 12px 40px rgba(17,88,166,.42)",animation:"slideUp .28s" }}>
          {cart.length} test{cart.length>1?"s":""} · ₹{total.toLocaleString()} → Book Now
        </button>
      </div>
    )}
  </div>
  );
};



/* ─── POPULAR TESTS CAROUSEL ─────────────────────────────────────────────── */
const POPULAR_CATS = [
  { cat:"Blood",    label:"Blood Tests",  Icon:IBlood    },
  { cat:"Thyroid",  label:"Thyroid",      Icon:IThyroid  },
  { cat:"Diabetes", label:"Diabetes",     Icon:IDiabetes },
  { cat:"Cardiac",  label:"Heart Health", Icon:ICardiac  },
  { cat:"Vitamins", label:"Vitamins",     Icon:IVitamin  },
  { cat:"Kidney",   label:"Kidney",       Icon:IKidney   },
  { cat:"Liver",    label:"Liver",        Icon:ILiver    },
  { cat:"Packages", label:"Full Body",    Icon:IPackage  },
];

function PopularTestsCarousel({ setCatF, navTo }) {
  const trackRef = React.useRef(null);
  const [canLeft,  setCanLeft]  = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const onScroll = () => {
    const el = trackRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };
  const scroll = dir => {
    const el = trackRef.current; if (!el) return;
    const w = el.querySelector(".pt-tile")?.offsetWidth || 120;
    el.scrollBy({ left: dir * w * 2, behavior:"smooth" });
  };
  const arrStyle = v => ({
    position:"absolute", top:"50%", transform:"translateY(-50%)",
    width:36, height:36, borderRadius:"50%", background:"#fff",
    border:"1.5px solid #E0EAFF", boxShadow:"0 2px 12px rgba(17,88,166,.14)",
    display:"flex", alignItems:"center", justifyContent:"center",
    cursor:"pointer", zIndex:10,
    opacity:v?1:0, pointerEvents:v?"all":"none", transition:"opacity .2s",
  });

  return (
    <section style={{ padding:"52px 0 48px", background:"#fff", borderBottom:"1px solid #F1F5F9" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32, flexWrap:"wrap", gap:12 }}>
          <div>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.45rem", fontWeight:800, color:"#0D1117", marginBottom:6, letterSpacing:"-.01em" }}>Popular Tests</h2>
            <p style={{ color:"#6B7280", fontSize:".85rem" }}>Compare prices across all certified labs and book instantly</p>
          </div>
          <button onClick={()=>navTo("labs")}
            style={{ background:"transparent", border:"1.5px solid #1158A6", borderRadius:50, padding:"9px 22px", fontWeight:700, fontSize:".84rem", color:"#1158A6", cursor:"pointer", fontFamily:"'Manrope',sans-serif", transition:"all .16s", whiteSpace:"nowrap", minHeight:44, flexShrink:0 }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1158A6"; }}>
            View All Specialities →
          </button>
        </div>
        <div style={{ position:"relative" }}>

          <div ref={trackRef} onScroll={onScroll}
            style={{ display:"flex", gap:8, overflowX:"auto", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", scrollbarWidth:"none", msOverflowStyle:"none", paddingBottom:4, paddingTop:4 }}>
            {POPULAR_CATS.map(({ cat, label, Icon }) => (
              <div key={cat} className="pt-tile"
                onClick={()=>{ setCatF(cat); navTo("labs"); }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"18px 10px 16px", minWidth:110, maxWidth:130, flexShrink:0, scrollSnapAlign:"start", cursor:"pointer", borderRadius:16, transition:"transform .22s cubic-bezier(.34,1.56,.64,1),background .18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.background="#F0F6FF"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.background="transparent"; }}>
                <div style={{ width:86, height:86, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, flexShrink:0, boxShadow:"0 2px 14px rgba(0,0,0,.09)", transition:"box-shadow .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(17,88,166,.2)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,.09)"}>
                  <Icon s={86}/>
                </div>
                <div style={{ fontWeight:700, color:"#1F2937", fontSize:".8rem", textAlign:"center", lineHeight:1.3, marginBottom:5 }}>{label}</div>
                <div style={{ fontSize:".68rem", fontWeight:800, color:"#1158A6", letterSpacing:".05em", textTransform:"uppercase" }}>Book Now</div>
              </div>
            ))}
          </div>



        </div>
        <_CarouselDots trackRef={trackRef} total={POPULAR_CATS.length}/>
      </div>
    </section>
  );
}


/* ─── HERO SEARCH with live dropdown ───────────────────────────────────────
   Builds a flat deduplicated suggestion list from LABS data.
   Shows: matching tests, matching lab names, category chips.
   All at module level so it never remounts.
────────────────────────────────────────────────────────────────────────── */

// Build search index once at module level
const SEARCH_INDEX = (() => {
  const items = [];
  // Tests from all labs (deduplicated by name)
  const seen = new Set();
  LABS.forEach(lab => {
    lab.tests.forEach(t => {
      if (!seen.has(t.name)) {
        seen.add(t.name);
        items.push({ type:"test", label:t.name, sub:`${t.cat} · from ₹${t.price}`, cat:t.cat });
      }
    });
    items.push({ type:"lab", label:lab.name, sub:`${lab.city} · ${lab.tests.length} tests`, cat:"" });
  });
  // Category names
  ["Blood Tests","Thyroid","Diabetes","Heart Health","Vitamins","Kidney","Liver","Full Body Packages","Cancer Markers","Hormones"].forEach(cat => {
    items.push({ type:"category", label:cat, sub:"Category", cat });
  });
  return items;
})();

function HeroSearch({ q, setQ, setLabQ, navTo, T }) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  // Build up to 5 suggestions: prioritise tests, then labs, then categories
  const suggestions = q.trim().length < 1 ? [] : (() => {
    const qlo = q.toLowerCase();
    const match = item => item.label.toLowerCase().includes(qlo);
    const tests = SEARCH_INDEX.filter(i=>i.type==="test"     && match(i)).slice(0,3);
    const labs  = SEARCH_INDEX.filter(i=>i.type==="lab"      && match(i)).slice(0,1);
    const cats  = SEARCH_INDEX.filter(i=>i.type==="category" && match(i)).slice(0,1);
    // Fill remaining slots up to 5 from any type not yet included
    const picked = new Set([...tests,...labs,...cats].map(x=>x.label));
    const extra  = SEARCH_INDEX.filter(i=>match(i)&&!picked.has(i.label)).slice(0,5-tests.length-labs.length-cats.length);
    return [...tests,...labs,...cats,...extra].slice(0,5);
  })();

  // Close on outside click
  React.useEffect(() => {
    const handler = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (text) => { setQ(text); setLabQ(text); setOpen(false); navTo("labs"); };


  return (
    <div ref={wrapRef} style={{ position:"relative", maxWidth:580, width:"100%" }}>
      {/* Search bar */}
      <div style={{ background:"#fff",borderRadius:50,display:"flex",alignItems:"center",boxShadow:"0 4px 24px rgba(17,88,166,.15)",overflow:"hidden",border:`1.5px solid ${open && suggestions.length ? "#1158A6" : "#DBEAFE"}`,transition:"border-color .15s" }}>
        <svg style={{ flexShrink:0,margin:"0 18px" }} width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.8"/>
          <path d="M13.5 13.5 L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
          value={q}
          onChange={e=>{ setQ(e.target.value); setOpen(true); }}
          onFocus={()=>setOpen(true)}
          onKeyDown={e=>{ if(e.key==="Enter"){ go(q); } if(e.key==="Escape") setOpen(false); }}
          placeholder="Search tests, packages or labs…"
          style={{ flex:1,border:"none",outline:"none",padding:"15px 8px 15px 0",fontSize:".95rem",color:"#111",fontFamily:"'Manrope',sans-serif",background:"transparent" }}
          autoComplete="off"
        />
        {q && (
          <button onClick={()=>{ setQ(""); setOpen(false); }}
            style={{ background:"none",border:"none",cursor:"pointer",padding:"0 8px",color:"#9CA3AF",fontSize:"1rem",display:"flex",alignItems:"center",flexShrink:0 }}>
            ✕
          </button>
        )}
        <button onClick={()=>go(q)} className="btn-anim"
          style={{ background:"#1158A6",color:"#fff",border:"none",margin:6,borderRadius:50,padding:"11px 28px",flexShrink:0,fontSize:".86rem",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .18s" }}
          onMouseEnter={e=>e.currentTarget.style.background="#0F2D6B"}
          onMouseLeave={e=>e.currentTarget.style.background="#1158A6"}>
          Search
        </button>
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div style={{ position:"absolute",top:"calc(100% + 8px)",left:0,right:0,minWidth:"min(100vw - 32px, 580px)",background:"#fff",borderRadius:12,border:"1px solid #E5E7EB",boxShadow:"0 8px 32px rgba(0,0,0,.12)",zIndex:500,overflow:"hidden" }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={()=>go(s.label)}
              style={{ display:"block",width:"100%",padding:"10px 18px",background:"none",border:"none",borderBottom:i<suggestions.length-1?"1px solid #F3F4F6":"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",fontSize:".88rem",fontWeight:600,color:"#111",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",transition:"background .1s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#F0F6FF"}
              onMouseLeave={e=>e.currentTarget.style.background="none"}>
              {s.label}
            </button>
          ))}
          <div style={{ padding:"9px 18px",borderTop:"1px solid #F3F4F6" }}>
            <button onClick={()=>go(q)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:".8rem",fontWeight:700,color:"#1158A6",fontFamily:"'Manrope',sans-serif",padding:0 }}>
              See all results for &ldquo;{q}&rdquo; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CAROUSEL DOTS — dynamic, reflects actual visible pages ─────────────── */
function _CarouselDots({ trackRef, total }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const update = () => {
      const tileW = el.querySelector(".pt-tile")?.offsetWidth || 110;
      const visible = Math.max(1, Math.floor(el.clientWidth / tileW));
      const pages = Math.ceil(total / visible);
      const pg = Math.min(pages - 1, Math.round(el.scrollLeft / (tileW * visible)));
      setActive(pg);
    };
    el.addEventListener("scroll", update, { passive:true });
    window.addEventListener("resize", update);
    update();
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [trackRef, total]);

  // Compute how many dots to show based on current viewport
  const [pages, setPages] = React.useState(3);
  React.useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const calc = () => {
      const tileW = el.querySelector(".pt-tile")?.offsetWidth || 110;
      const visible = Math.max(1, Math.floor(el.clientWidth / tileW));
      setPages(Math.ceil(total / visible));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [trackRef, total]);

  if (pages <= 1) return null;
  return (
    <div style={{ display:"flex",justifyContent:"center",gap:6,marginTop:16 }}>
      {Array.from({ length: pages }).map((_,i) => (
        <div key={i} style={{ width: i===active ? 18 : 6, height:6, borderRadius:99, background:i===active?"#1158A6":"#DBEAFE", transition:"width .25s,background .25s" }}/>
      ))}
    </div>
  );
}


/* ─── PAYMENT SELECTOR (module-level) ───────────────────────────────────────
   Clean payment method selector. UPI / Card / Net Banking / Pay at Lab.
   No actual payment processing — UI only (connect UPI when ready).
────────────────────────────────────────────────────────────────────────── */
function PaymentSelector({ total, onPay, onBack }) {
  const [method, setMethod] = React.useState("");
  const [upi, setUpi]       = React.useState("");
  const [paying, setPaying] = React.useState(false);

  const methods = [
    { id:"upi",      icon:"📱", label:"UPI",            sub:"Google Pay, PhonePe, Paytm & more" },
    { id:"card",     icon:"💳", label:"Credit / Debit Card", sub:"Visa, Mastercard, RuPay" },
    { id:"netbank",  icon:"🏦", label:"Net Banking",     sub:"All major banks supported"        },
    { id:"paylater", icon:"🏥", label:"Pay at Lab",      sub:"Pay cash or card at the centre"   },
  ];

  const handlePay = () => {
    if (!method) return;
    setPaying(true);
    setTimeout(() => { setPaying(false); onPay(); }, 900);
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
            {m.id==="paylater"&&<span style={{ fontSize:".68rem",fontWeight:700,color:"#16A34A",background:"#DCFCE7",borderRadius:20,padding:"2px 9px",flexShrink:0 }}>FREE</span>}
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
              style={{ flex:1,border:"1.5px solid #DBEAFE",borderRadius:10,padding:"11px 14px",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",outline:"none",color:"#111",background:"#FAFAFA" }}
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
        <button onClick={onBack}
          style={{ flex:1,background:"#F8FAFF",color:"#1158A6",border:"1.5px solid #DBEAFE",borderRadius:50,padding:"13px",fontWeight:700,fontSize:".88rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>
          ← Back
        </button>
        <button onClick={handlePay} disabled={!method||paying}
          style={{ flex:2,background:method?(paying?"#4B8DE0":"#1158A6"):"#94A3B8",color:"#fff",border:"none",borderRadius:50,padding:"13px",fontWeight:800,fontSize:".92rem",cursor:method?"pointer":"not-allowed",fontFamily:"'Manrope',sans-serif",boxShadow:method?"0 4px 14px rgba(17,88,166,.3)":"none",transition:"all .18s",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
          {paying
            ? <><span style={{ width:16,height:16,border:"2px solid rgba(255,255,255,.4)",borderTop:"2px solid #fff",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite" }}/> Processing…</>
            : <>{method==="paylater"?"Confirm & Reserve Slot":`Pay ₹${total.toLocaleString()}`}</>
          }
        </button>
      </div>
    </div>
  );
}

/* ─── BOOKING FIELD (top-level so it never remounts on parent re-render) ─── */
const BookingField = ({ label, req, ...p }) => (
  <div>
    <label style={{ display:"block",fontWeight:700,fontSize:".78rem",marginBottom:6,color:"#374151",letterSpacing:".01em" }}>{label}{req&&<span style={{color:"#EF4444"}}> *</span>}</label>
    <input style={{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"12px 14px",fontSize:".88rem",fontFamily:"'Manrope',sans-serif",background:"#fff",color:"#111",display:"block",outline:"none",transition:"border-color .15s",boxSizing:"border-box" }}
      onFocus={e=>e.target.style.borderColor="#1158A6"}
      onBlur={e=>e.target.style.borderColor="#E5E7EB"}
      {...p}/>
  </div>
);

/* ─── BOOKING PAGE (top-level so typing doesn't lose focus) ─────────────── */
function BookingPage({ form, setForm, step, setStep, cart, total, mrpTotal, saving, lab, navTo, confirm }) {
  const [loc, setLoc] = useState(form);
  const sl = (k,v) => setLoc(f=>({...f,[k]:v}));
  const ok1 = loc.name && loc.phone.length>=10 && loc.email.includes("@");
  const ok2 = loc.date && loc.slot;
  const ok3 = loc.mode==="clinic" || (loc.mode==="home" && loc.address);
  const steps = ["Patient","Schedule","Collection","Review","Payment"];

  return (
    <div style={{ padding:"40px 0 80px",minHeight:"100vh",background:"#F5F7FA",fontFamily:"'Manrope',sans-serif" }}>
      <div style={{ maxWidth:680,margin:"0 auto",padding:"0 20px" }}>

        <button onClick={()=>navTo("lab")} style={{ background:"none",border:"none",color:"#1158A6",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",marginBottom:20,padding:0,display:"flex",alignItems:"center",gap:5 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>
          Back to Tests
        </button>

        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontWeight:800,fontSize:"1.5rem",color:"#0D1117",marginBottom:4 }}>Complete Your Booking</h1>
          <p style={{ color:"#9CA3AF",fontSize:".86rem" }}>
            {cart.length} test{cart.length>1?"s":""} &nbsp;·&nbsp;
            <strong style={{ color:"#1158A6" }}>₹{total.toLocaleString()}</strong>
            &nbsp;·&nbsp; <span style={{ color:"#1158A6",fontWeight:700 }}>You save ₹{saving.toLocaleString()}</span>
          </p>
        </div>

        {/* STEP BAR */}
        <div style={{ background:"#fff",borderRadius:16,padding:"18px 24px",marginBottom:20,border:"1.5px solid #EEF2FF",boxShadow:"0 2px 10px rgba(17,88,166,.06)",display:"flex",alignItems:"center" }}>
          {steps.map((l,i)=>(
            <div key={l} style={{ display:"flex",alignItems:"center",flex:i<3?1:"none" }}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
                <div style={{ width:34,height:34,borderRadius:50,background:step>i+1?"#1158A6":step===i+1?"#1158A6":"#F1F5F9",color:step>=i+1?"#fff":"#9CA3AF",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:".8rem",transition:"all .28s",boxShadow:step===i+1?"0 3px 10px rgba(17,88,166,.3)":"none" }}>
                  {step>i+1?<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><polyline points="2,8 6,12 14,4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>:i+1}
                </div>
                <span style={{ fontSize:".65rem",fontWeight:700,color:step===i+1?"#1158A6":step>i+1?"#1158A6":"#9CA3AF",whiteSpace:"nowrap" }}>{l}</span>
              </div>
              {i<3&&<div style={{ flex:1,height:2,background:step>i+1?"#1158A6":"#E5E7EB",margin:"0 6px",marginBottom:18,borderRadius:99,transition:"background .28s" }}/>}
            </div>
          ))}
        </div>

        {/* STEP CARD */}
        <div style={{ background:"#fff",borderRadius:18,padding:"28px 28px",border:"1.5px solid #EEF2FF",boxShadow:"0 4px 20px rgba(17,88,166,.07)" }}>

          {/* STEP 1 — Patient */}
          {step===1&&(
            <div style={{ animation:"slideUp .28s" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"#EEF4FF",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117" }}>Patient Information</div>
                  <div style={{ fontSize:".75rem",color:"#9CA3AF" }}>Step 1 of 4</div>
                </div>
              </div>
              <div style={{ display:"grid",gap:14 }}>
                <BookingField label="Full Name" req placeholder="Patient's full name" value={loc.name} onChange={e=>sl("name",e.target.value)}/>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                  <BookingField label="Phone" req type="tel" placeholder="+91 XXXXXXXXXX" value={loc.phone} onChange={e=>sl("phone",e.target.value)}/>
                  <BookingField label="Email" req type="email" placeholder="email@example.com" value={loc.email} onChange={e=>sl("email",e.target.value)}/>
                </div>
                <BookingField label="Age & Gender (optional)" placeholder="e.g. 34 / Female" value={loc.age} onChange={e=>sl("age",e.target.value)}/>
              </div>
              <button disabled={!ok1} onClick={()=>{ setForm(loc); setStep(2); }}
                style={{ marginTop:22,width:"100%",background:ok1?"#1158A6":"#E5E7EB",color:ok1?"#fff":"#9CA3AF",border:"none",borderRadius:50,padding:"14px",fontWeight:800,fontSize:".92rem",cursor:ok1?"pointer":"not-allowed",fontFamily:"'Manrope',sans-serif",transition:"all .18s",boxShadow:ok1?"0 4px 14px rgba(17,88,166,.3)":"none" }}
                onMouseEnter={e=>ok1&&(e.currentTarget.style.background="#0F2D6B")}
                onMouseLeave={e=>ok1&&(e.currentTarget.style.background="#1158A6")}>
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 — Schedule */}
          {step===2&&(
            <div style={{ animation:"slideUp .28s" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"#EEF4FF",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117" }}>Date & Time Slot</div>
                  <div style={{ fontSize:".75rem",color:"#9CA3AF" }}>Step 2 of 4</div>
                </div>
              </div>
              <div style={{ marginBottom:18 }}>
                <label style={{ display:"block",fontWeight:700,fontSize:".78rem",marginBottom:6,color:"#374151" }}>Preferred Date <span style={{color:"#EF4444"}}>*</span></label>
                <input type="date" min={TODAY} style={{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"12px 14px",fontSize:".88rem",fontFamily:"'Manrope',sans-serif",background:"#fff",color:"#111",outline:"none",boxSizing:"border-box" }} value={loc.date} onChange={e=>sl("date",e.target.value)}/>
              </div>
              <div>
                <label style={{ display:"block",fontWeight:700,fontSize:".78rem",marginBottom:10,color:"#374151" }}>Time Slot <span style={{color:"#EF4444"}}>*</span></label>
                <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                  {TIME_SLOTS.map(s=>(
                    <button key={s} onClick={()=>setLoc(f=>({...f,slot:s}))}
                      style={{ padding:"9px 16px",borderRadius:50,border:`1.5px solid ${loc.slot===s?"#1158A6":"#E5E7EB"}`,background:loc.slot===s?"#1158A6":"#F8FAFF",color:loc.slot===s?"#fff":"#374151",fontWeight:700,fontSize:".8rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex",gap:10,marginTop:22 }}>
                <button onClick={()=>setStep(1)} style={{ flex:1,background:"#F8FAFF",color:"#1158A6",border:"1.5px solid #DBEAFE",borderRadius:50,padding:"13px",fontWeight:700,fontSize:".88rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>← Back</button>
                <button disabled={!ok2} onClick={()=>{ setForm(loc); setStep(3); }}
                  style={{ flex:2,background:ok2?"#1158A6":"#E5E7EB",color:ok2?"#fff":"#9CA3AF",border:"none",borderRadius:50,padding:"13px",fontWeight:800,fontSize:".88rem",cursor:ok2?"pointer":"not-allowed",fontFamily:"'Manrope',sans-serif",transition:"all .18s",boxShadow:ok2?"0 4px 14px rgba(17,88,166,.3)":"none" }}
                  onMouseEnter={e=>ok2&&(e.currentTarget.style.background="#0F2D6B")}
                  onMouseLeave={e=>ok2&&(e.currentTarget.style.background="#1158A6")}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Collection */}
          {step===3&&(
            <div style={{ animation:"slideUp .28s" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"#EEF4FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1.5px solid #DBEAFE" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117" }}>Sample Collection</div>
                  <div style={{ fontSize:".75rem",color:"#9CA3AF" }}>Step 3 of 4 · How would you like your sample collected?</div>
                </div>
              </div>

              <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:20 }}>

                {/* Visit Lab — Labs Near Me style */}
                <div onClick={()=>setLoc(f=>({...f,mode:"clinic"}))}
                  style={{ background:"#fff",borderRadius:18,border:`1.5px solid ${loc.mode==="clinic"?"#1158A6":"#DBEAFE"}`,padding:"22px 28px",display:"flex",alignItems:"center",gap:20,boxShadow:loc.mode==="clinic"?"0 4px 18px rgba(17,88,166,.13)":"0 2px 16px rgba(17,88,166,.07)",cursor:"pointer",transition:"all .2s",width:"100%" }}
                  onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 28px rgba(17,88,166,.13)"; e.currentTarget.style.borderColor="#1158A6"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.boxShadow=loc.mode==="clinic"?"0 4px 18px rgba(17,88,166,.13)":"0 2px 10px rgba(17,88,166,.06)"; e.currentTarget.style.borderColor=loc.mode==="clinic"?"#1158A6":"#DBEAFE"; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ width:52,height:52,borderRadius:14,background:"#EEF4FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1.5px solid #DBEAFE" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800,fontSize:".97rem",color:"#0D1117",marginBottom:6 }}>Walk-in at the Lab</div>
                    <div style={{ display:"flex",gap:7,flexWrap:"wrap",alignItems:"center" }}>
                      <span style={{ background:"#EEF4FF",color:"#1158A6",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:50 }}>Always available</span>
                      <span style={{ background:"#F0FDF4",color:"#15803D",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:50 }}>No extra charge</span>
                      <span style={{ background:"#EEF4FF",color:"#1158A6",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:50 }}>On-site collection</span>
                    </div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    {loc.mode==="clinic"&&<span style={{ fontWeight:700,fontSize:".8rem",color:"#1158A6" }}>Selected</span>}
                    <div style={{ width:38,height:38,borderRadius:50,background:"#1158A6",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(17,88,166,.3)" }}>
                      {loc.mode==="clinic"
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="1.5,7 5,10.5 12.5,3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                      }
                    </div>
                  </div>
                </div>

                {/* Home Collection — Labs Near Me style */}
                <div onClick={()=>lab?.homeCollection&&setLoc(f=>({...f,mode:"home"}))}
                  style={{ background:"#fff",borderRadius:18,border:`1.5px solid ${loc.mode==="home"?"#1158A6":"#DBEAFE"}`,padding:"22px 28px",display:"flex",alignItems:"center",gap:20,boxShadow:loc.mode==="home"?"0 4px 18px rgba(17,88,166,.13)":"0 2px 16px rgba(17,88,166,.07)",cursor:lab?.homeCollection?"pointer":"not-allowed",opacity:lab?.homeCollection?1:.5,transition:"all .2s",width:"100%" }}
                  onMouseEnter={e=>{ if(!lab?.homeCollection)return; e.currentTarget.style.boxShadow="0 8px 28px rgba(17,88,166,.13)"; e.currentTarget.style.borderColor="#1158A6"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.boxShadow=loc.mode==="home"?"0 4px 18px rgba(17,88,166,.13)":"0 2px 10px rgba(17,88,166,.06)"; e.currentTarget.style.borderColor=loc.mode==="home"?"#1158A6":"#DBEAFE"; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ width:52,height:52,borderRadius:14,background:"#EEF4FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1.5px solid #DBEAFE" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800,fontSize:".97rem",color:"#0D1117",marginBottom:6 }}>Home Sample Collection</div>
                    <div style={{ display:"flex",gap:7,flexWrap:"wrap",alignItems:"center" }}>
                      {lab?.homeCollection ? (<>
                        <span style={{ background:"#DCFCE7",color:"#15803D",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:50 }}>● Free service</span>
                        <span style={{ background:"#EEF4FF",color:"#1158A6",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:50 }}>Certified phlebotomist</span>
                        <span style={{ background:"#FFF7ED",color:"#EA580C",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:50 }}>🏠 Doorstep pickup</span>
                      </>) : (
                        <span style={{ background:"#FEE2E2",color:"#DC2626",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:50 }}>Not available for this lab</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    {loc.mode==="home"&&<span style={{ fontWeight:700,fontSize:".8rem",color:"#1158A6" }}>Selected</span>}
                    <div style={{ width:38,height:38,borderRadius:50,background:"#1158A6",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(17,88,166,.3)" }}>
                      {loc.mode==="home"
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="1.5,7 5,10.5 12.5,3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Address input */}
              {loc.mode==="home"&&(
                <div style={{ background:"#F8FAFF",border:"1.5px solid #DBEAFE",borderRadius:14,padding:"18px 20px",marginBottom:16,animation:"slideUp .2s" }}>
                  <label style={{ display:"flex",alignItems:"center",gap:7,fontWeight:700,fontSize:".82rem",color:"#1158A6",marginBottom:10 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Pickup Address <span style={{color:"#EF4444",marginLeft:2}}>*</span>
                  </label>
                  <textarea rows={3}
                    style={{ width:"100%",border:"1.5px solid #DBEAFE",borderRadius:10,padding:"11px 14px",fontSize:".87rem",fontFamily:"'Manrope',sans-serif",background:"#fff",color:"#111",outline:"none",resize:"vertical",boxSizing:"border-box",transition:"border-color .15s" }}
                    placeholder="Flat / house no., building, street, area, city…"
                    value={loc.address}
                    onChange={e=>sl("address",e.target.value)}
                    onFocus={e=>e.target.style.borderColor="#1158A6"}
                    onBlur={e=>e.target.style.borderColor="#DBEAFE"}
                  />
                  <div style={{ display:"flex",alignItems:"center",gap:6,marginTop:8 }}>
                    <span style={{ background:"#DCFCE7",color:"#15803D",fontWeight:700,fontSize:".7rem",padding:"3px 10px",borderRadius:50 }}>● Collector arrives within 30 min of your slot</span>
                  </div>
                </div>
              )}

              <div style={{ display:"flex",gap:10,marginTop:6 }}>
                <button onClick={()=>setStep(2)} style={{ flex:1,background:"#F8FAFF",color:"#1158A6",border:"1.5px solid #DBEAFE",borderRadius:50,padding:"13px",fontWeight:700,fontSize:".88rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#EFF6FF"}
                  onMouseLeave={e=>e.currentTarget.style.background="#F8FAFF"}>← Back</button>
                <button disabled={!ok3} onClick={()=>{ setForm(loc); setStep(4); }}
                  style={{ flex:2,background:ok3?"#1158A6":"#E5E7EB",color:ok3?"#fff":"#9CA3AF",border:"none",borderRadius:50,padding:"13px",fontWeight:800,fontSize:".88rem",cursor:ok3?"pointer":"not-allowed",fontFamily:"'Manrope',sans-serif",transition:"all .18s",boxShadow:ok3?"0 4px 14px rgba(17,88,166,.3)":"none" }}
                  onMouseEnter={e=>ok3&&(e.currentTarget.style.background="#0F2D6B")}
                  onMouseLeave={e=>ok3&&(e.currentTarget.style.background="#1158A6")}>
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Review */}
          {step===4&&(
            <div style={{ animation:"slideUp .28s" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"#EEF4FF",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117" }}>Review & Confirm</div>
                  <div style={{ fontSize:".75rem",color:"#9CA3AF" }}>Step 4 of 5</div>
                </div>
              </div>
              <div style={{ background:"#F8FAFF",borderRadius:12,padding:"14px 18px",marginBottom:12,border:"1px solid #EEF2FF" }}>
                <div style={{ fontWeight:700,fontSize:".75rem",color:"#9CA3AF",letterSpacing:".06em",textTransform:"uppercase",marginBottom:10 }}>Booking Details</div>
                {[["Patient",form.name],["Phone",form.phone],["Email",form.email],["Lab",lab?.name],["Date",form.date],["Time",form.slot],["Mode",form.mode==="home"?"Home Collection":"Visit Lab"],form.mode==="home"&&["Address",form.address]].filter(Boolean).map(([l,v])=>(
                  <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #EEF2FF",fontSize:".83rem" }}>
                    <span style={{ color:"#9CA3AF",fontWeight:600 }}>{l}</span>
                    <span style={{ fontWeight:700,color:"#0D1117",maxWidth:"58%",textAlign:"right" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:"#F8FAFF",borderRadius:12,padding:"14px 18px",marginBottom:18,border:"1px solid #EEF2FF" }}>
                <div style={{ fontWeight:700,fontSize:".75rem",color:"#9CA3AF",letterSpacing:".06em",textTransform:"uppercase",marginBottom:10 }}>Selected Tests</div>
                {cart.map(item=>(
                  <div key={item.tid} style={{ display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:".83rem" }}>
                    <span style={{ color:"#374151",fontWeight:600 }}>{item.tname}</span>
                    <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                      <span style={{ color:"#CBD5E1",textDecoration:"line-through",fontSize:".78rem" }}>₹{item.mrp}</span>
                      <span style={{ fontWeight:800,color:"#1158A6" }}>₹{item.price}</span>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop:"1.5px dashed #DBEAFE",paddingTop:10,marginTop:8 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",color:"#9CA3AF",fontSize:".8rem",marginBottom:3 }}>
                    <span>MRP Total</span><span style={{ textDecoration:"line-through" }}>₹{mrpTotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",color:"#2563EB",fontSize:".82rem",marginBottom:8,fontWeight:700 }}>
                    <span>You Save</span><span>−₹{saving.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:"1rem",color:"#0D1117" }}>
                    <span>Total Payable</span>
                    <span style={{ color:"#1158A6",fontSize:"1.2rem",fontWeight:800 }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <button onClick={()=>setStep(3)} style={{ flex:1,background:"#F8FAFF",color:"#1158A6",border:"1.5px solid #DBEAFE",borderRadius:50,padding:"13px",fontWeight:700,fontSize:".88rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>← Back</button>
                <button onClick={()=>setStep(5)}
                  style={{ flex:2,background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"13px",fontWeight:800,fontSize:".92rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",boxShadow:"0 4px 14px rgba(17,88,166,.3)",transition:"all .18s",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; }}>
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 — Payment */}
          {step===5&&(
            <div style={{ animation:"slideUp .28s" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"#F0FDF4",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:"1rem",color:"#0D1117" }}>Choose Payment Method</div>
                  <div style={{ fontSize:".75rem",color:"#9CA3AF" }}>Step 5 of 5 · Secure checkout</div>
                </div>
              </div>

              {/* Amount summary strip */}
              <div style={{ background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",borderRadius:14,padding:"14px 18px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid #BFDBFE" }}>
                <div>
                  <div style={{ fontSize:".72rem",color:"#6B7280",fontWeight:600 }}>Amount Payable</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif",fontWeight:700,fontSize:"1.6rem",color:"#0D1117",lineHeight:1 }}>₹{total.toLocaleString()}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:".7rem",color:"#16A34A",fontWeight:700 }}>You save ₹{saving.toLocaleString()}</div>
                  <div style={{ fontSize:".69rem",color:"#6B7280" }}>MRP ₹{mrpTotal.toLocaleString()}</div>
                </div>
              </div>

              {/* Payment methods */}
              <PaymentSelector total={total} onPay={confirm} onBack={()=>setStep(4)}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [page,   setPage]   = useState("home");
  const [lab,    setLab]    = useState(null);
  const [cart,   setCart]   = useState([]);
  const [catF,   setCatF]   = useState("All");
  const [testQ,  setTestQ]  = useState("");
  const [labQ,   setLabQ]   = useState("");
  const [homeF,  setHomeF]  = useState(false);
  const [nablF,  setNablF]  = useState(false);
  const [step,   setStep]   = useState(1);
  const [form,   setForm]   = useState({ name:"",phone:"",email:"",age:"",date:"",slot:"",mode:"clinic",address:"" });
  const [done,   setDone]   = useState(null);
  const [toast,  setToast]  = useState(null);
  const [cartOpen,    setCartOpen]   = useState(false);
  const [sideMenu,    setSideMenu]   = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [user,     setUser]     = useState(null);
  const [authForm, setAuthForm] = useState({ name:"", email:"", phone:"", password:"" });
  const [authErr,  setAuthErr]  = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const sf = (k,v) => setForm(f => ({...f,[k]:v}));
  const total    = cart.reduce((s,x) => s+x.price,0);
  const mrpTotal = cart.reduce((s,x) => s+x.mrp,0);
  const saving   = mrpTotal-total;

  const addCart = (l,t) => {
    if (cart.find(x=>x.tid===t.id)) return;
    setCart(c => [...c,{lid:l.id,lname:l.name,tid:t.id,tname:t.name,price:t.price,mrp:t.mrp}]);
    setToast(`"${t.name}" added`);
  };
  const delCart = tid => setCart(c=>c.filter(x=>x.tid!==tid));
  const has     = tid => !!cart.find(x=>x.tid===tid);
  const navTo   = p  => { setPage(p); window.scrollTo(0,0); };

  const openAuth = (mode="login") => { setAuthMode(mode); setAuthErr(""); setAuthForm({name:"",email:"",phone:"",password:""}); setAuthOpen(true); };
  const closeAuth = () => { setAuthOpen(false); setAuthErr(""); };
  const handleAuth = () => {
    const { name, email, phone, password } = authForm;
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setAuthErr("Please enter a valid email address."); return; }
    if (!password || password.length < 6) { setAuthErr("Password must be at least 6 characters."); return; }
    if (authMode === "signup") {
      if (!name.trim()) { setAuthErr("Please enter your full name."); return; }
      if (!phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(phone)) { setAuthErr("Please enter a valid phone number."); return; }
    }
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      if (authMode === "login") {
        const saved = JSON.parse(localStorage.getItem("le_user") || "null");
        if (!saved || saved.email !== email || saved.password !== password) { setAuthErr("Invalid email or password."); return; }
        setUser(saved); closeAuth(); setToast(`Welcome back, ${saved.name}!`);
      } else {
        const newUser = { name, email, phone, password };
        localStorage.setItem("le_user", JSON.stringify(newUser));
        setUser(newUser); closeAuth(); setToast(`Account created! Welcome, ${name}!`);
      }
    }, 900);
  };
  const handleLogout = () => { setUser(null); setToast("Signed out successfully."); };

  const confirm = () => {
    const id = "LB"+Math.random().toString(36).slice(2,8).toUpperCase();
    setDone({...form,id,cart:[...cart],total,saving});
    setCart([]); setStep(1);
    setForm({name:"",phone:"",email:"",age:"",date:"",slot:"",mode:"clinic",address:""});
    navTo("confirm");
  };

  const filtLabs = LABS.filter(l=>{
    const q=labQ.toLowerCase();
    if(q && !l.name.toLowerCase().includes(q) && !l.address.toLowerCase().includes(q)) return false;
    if(homeF && !l.homeCollection) return false;
    if(nablF && !l.nabl) return false;
    return true;
  });

  const filtTests = lab ? lab.tests.filter(t=>{
    if(testQ && !t.name.toLowerCase().includes(testQ.toLowerCase())) return false;
    if(catF!=="All" && t.cat!==catF) return false;
    return true;
  }) : [];

  /* ─── shared tokens ─── */
  const T = {
    btn:(bg="var(--teal)",fg="#fff")=>({ background:bg,color:fg,border:"none",borderRadius:10,padding:"12px 26px",fontWeight:700,cursor:"pointer",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",display:"inline-flex",alignItems:"center",gap:8 }),
    out:{ background:"transparent",color:"var(--teal)",border:"1.5px solid var(--teal)",borderRadius:10,padding:"11px 22px",fontWeight:700,cursor:"pointer",fontSize:".88rem",fontFamily:"'Manrope',sans-serif" },
    inp:{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"12px 16px",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",background:"#FAFAFA",color:"#111",display:"block" },
    wrap:{ maxWidth:1140,margin:"0 auto",padding:"0 24px" },
    card:{ background:"#fff",borderRadius:18,boxShadow:"var(--card-shadow)" },
    serif:{ fontFamily:"'DM Serif Display',serif" },
  };

  /* ═══════════════════════════════════════════════════════════════
     HOME PAGE
  ═══════════════════════════════════════════════════════════════ */
  const Home = () => {
    const [q,setQ]       = useState("");
    const [faq,setFaq]   = useState(null);

    return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ background:"linear-gradient(130deg,#F0F6FF 0%,#EBF3FB 45%,#E8F0FA 100%)", minHeight:520, position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
        {/* background geometric accents */}
        <div style={{ position:"absolute",right:-120,top:-120,width:480,height:480,borderRadius:"50%",background:"rgba(17,88,166,.05)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",left:-60,bottom:-80,width:320,height:320,borderRadius:"50%",background:"rgba(17,88,166,.04)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",right:180,top:30,width:14,height:14,borderRadius:"50%",background:"#1158A6",opacity:.12,pointerEvents:"none" }}/>
        <div style={{ position:"absolute",right:240,top:80,width:8,height:8,borderRadius:"50%",background:"#1158A6",opacity:.1,pointerEvents:"none" }}/>
        <div style={{ position:"absolute",left:80,top:50,width:10,height:10,borderRadius:"50%",background:"#059669",opacity:.15,pointerEvents:"none" }}/>

        <div style={{ ...T.wrap,position:"relative",zIndex:2,paddingTop:64,paddingBottom:64,display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",gap:40 }}>
          {/* ── LEFT: text content ── */}
          <div style={{ maxWidth:580 }}>
            {/* eyebrow pill */}
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#fff",borderRadius:50,padding:"5px 16px 5px 8px",marginBottom:24,boxShadow:"0 2px 14px rgba(17,88,166,.1)",border:"1px solid #DBEAFE" }}>
              <span style={{ background:"linear-gradient(90deg,#1158A6,#2563EB)",borderRadius:50,padding:"3px 12px",fontSize:".63rem",fontWeight:800,color:"#fff",letterSpacing:".07em" }}>NEW</span>
              <span style={{ color:"#1158A6",fontSize:".73rem",fontWeight:700 }}>Home sample collection now available 24/7</span>
            </div>

            {/* headline */}
            <h1 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.85rem,3.8vw,2.85rem)",color:"#0A1628",lineHeight:1.16,marginBottom:14,fontWeight:900,letterSpacing:"-.03em" }}>
              Book Lab Tests from<br/>
              <span style={{ background:"linear-gradient(90deg,#1158A6 0%,#2563EB 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Trusted Labs Near You</span>
            </h1>

            {/* sub */}
            <p style={{ color:"#5A6478",fontSize:".96rem",lineHeight:1.78,marginBottom:32,maxWidth:460 }}>
              Compare prices across 6 NABL-accredited labs. Free home collection, transparent pricing, digital reports in hours.
            </p>

            {/* ── SEARCH BAR with dropdown ── */}
            <HeroSearch q={q} setQ={setQ} setLabQ={setLabQ} navTo={navTo} T={T}/>

            {/* quick chips */}
            <div style={{ display:"flex",gap:8,marginTop:18,flexWrap:"wrap",alignItems:"center" }}>
              <span style={{ fontSize:".72rem",color:"#9CA3AF",fontWeight:600 }}>Popular:</span>
              {["CBC","Thyroid","Vitamin D","Diabetes","Lipid Profile"].map(t=>(
                <button key={t} onClick={()=>{ setLabQ(t); navTo("labs"); }}
                  style={{ background:"#fff",border:"1px solid #DBEAFE",borderRadius:50,padding:"5px 14px",fontSize:".73rem",fontWeight:700,color:"#1158A6",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#1158A6"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#1158A6"; e.currentTarget.style.borderColor="#DBEAFE"; }}>
                  {t}
                </button>
              ))}
            </div>

            {/* trust stats bar */}
            <div style={{ display:"flex",gap:0,marginTop:36,background:"#fff",borderRadius:14,padding:"14px 0",boxShadow:"0 2px 16px rgba(17,88,166,.08)",border:"1px solid #EEF4FF",overflow:"hidden" }}>
              {[["50K+","Happy Patients","#1158A6"],["6","NABL Labs","#059669"],["4.9★","Avg Rating","#F59E0B"],["₹199","Tests from","#8B5CF6"]].map(([n,l,c],i,arr)=>(
                <div key={l} style={{ flex:1,textAlign:"center",padding:"0 12px",borderRight:i<arr.length-1?"1px solid #EEF2FF":"none" }}>
                  <div style={{ fontWeight:900,fontSize:"1.1rem",color:c,fontFamily:"'Manrope',sans-serif",letterSpacing:"-.02em",lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:".68rem",color:"#9CA3AF",fontWeight:600,marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Doctor photo with premium frame ── */}
          <div style={{ flexShrink:0,width:320,position:"relative",height:420 }}>
            {/* decorative blob behind image */}
            <div style={{ position:"absolute",inset:0,borderRadius:"60% 40% 55% 45% / 50% 50% 50% 50%",background:"linear-gradient(135deg,#DBEAFE 0%,#EFF6FF 100%)",zIndex:0 }}/>

            {/* main doctor photo */}
            <div style={{ position:"absolute",left:16,top:16,right:0,bottom:0,borderRadius:28,overflow:"hidden",boxShadow:"0 24px 60px rgba(17,88,166,.18)",zIndex:1 }}>
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=90&auto=format&fit=crop&crop=top"
                alt="Trusted doctor"
                style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block" }}
                onError={e=>{ e.target.style.display="none"; e.target.parentNode.style.background="linear-gradient(135deg,#DBEAFE,#1158A6)"; }}
              />
              {/* subtle bottom gradient for readability */}
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:80,background:"linear-gradient(to top,rgba(17,88,166,.18),transparent)",pointerEvents:"none" }}/>
            </div>

            {/* NABL badge — top left */}
            <div style={{ position:"absolute",top:12,left:0,zIndex:3,background:"#fff",borderRadius:12,padding:"9px 14px",boxShadow:"0 6px 20px rgba(0,0,0,.12)",display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6 5,9 10,3"/></svg>
              </div>
              <div>
                <div style={{ fontWeight:800,fontSize:".72rem",color:"#0D1117",lineHeight:1 }}>NABL Certified</div>
                <div style={{ fontSize:".62rem",color:"#6B7280",marginTop:1 }}>100% accuracy</div>
              </div>
            </div>

            {/* Reports badge — bottom left */}
            <div style={{ position:"absolute",bottom:24,left:0,zIndex:3,background:"#fff",borderRadius:12,padding:"9px 14px",boxShadow:"0 6px 20px rgba(0,0,0,.12)",display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <div style={{ fontWeight:800,fontSize:".72rem",color:"#0D1117",lineHeight:1 }}>Reports in 6 hrs</div>
                <div style={{ fontSize:".62rem",color:"#6B7280",marginTop:1 }}>via email & WhatsApp</div>
              </div>
            </div>

            {/* Rating badge — bottom right */}
            <div style={{ position:"absolute",bottom:24,right:-10,zIndex:3,background:"#1158A6",borderRadius:12,padding:"9px 14px",boxShadow:"0 6px 20px rgba(17,88,166,.35)",display:"flex",alignItems:"center",gap:6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FCD34D" stroke="#FCD34D" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <div>
                <div style={{ fontWeight:800,fontSize:".72rem",color:"#fff",lineHeight:1 }}>4.9 / 5 Rating</div>
                <div style={{ fontSize:".62rem",color:"rgba(255,255,255,.75)",marginTop:1 }}>50,000+ patients</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── ACCREDITATION STRIP ──────────────────────────────────── */}
      <div style={{ background:"#F9FAFB",borderBottom:"1px solid #EEF2FF",padding:"14px 0" }}>
        <div style={{ maxWidth:1140,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",gap:32,flexWrap:"wrap",justifyContent:"center" }}>
          <span style={{ fontSize:".68rem",fontWeight:800,color:"#9CA3AF",letterSpacing:".1em",textTransform:"uppercase",whiteSpace:"nowrap" }}>Accredited &amp; Trusted by</span>
          {["NABL","ISO 15189","CAP","ICMR","WHO-GMP","DPDP Compliant"].map(b=>(
            <div key={b} style={{ display:"flex",alignItems:"center",gap:5 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6 5,9 10,3"/></svg>
              <span style={{ fontSize:".78rem",fontWeight:700,color:"#374151",whiteSpace:"nowrap" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>


      {/* ── TRUSTED LABS ─────────────────────────────────────────── */}
      <LabsNearMeSection T={T} navTo={navTo} setLab={setLab} setCatF={setCatF} setTestQ={setTestQ}/>

      {/* ── FEATURED HEALTH CHECKUPS ─────────────────────────────── */}
      <section style={{ padding:"60px 0 56px",background:"#fff",borderBottom:"1px solid #F1F5F9" }}>
        <div style={T.wrap}>
          {/* Header */}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32,flexWrap:"wrap",gap:12 }}>
            <div>
              <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:50,padding:"4px 14px",marginBottom:12 }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:"#1158A6",display:"inline-block",flexShrink:0 }}/>
                <span style={{ fontSize:".68rem",fontWeight:800,color:"#1158A6",letterSpacing:".1em",textTransform:"uppercase" }}>Best Sellers</span>
              </div>
              <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.4rem,3vw,1.9rem)",fontWeight:800,color:"#0D1117",marginBottom:6,letterSpacing:"-.02em",lineHeight:1.2 }}>Featured Health Checkups</h2>
              <p style={{ color:"#6B7280",fontSize:".86rem" }}>Curated by India's top doctors. Comprehensive screening at unbeatable prices.</p>
            </div>
            <button onClick={()=>navTo("labs")}
              style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"11px 26px",fontWeight:700,fontSize:".86rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(17,88,166,.28)",transition:"all .18s",minHeight:44,display:"flex",alignItems:"center",gap:8 }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; }}>
              View All Packages →
            </button>
          </div>

          {/* 6-card grid */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
            {[
              { title:"Full Body Checkup",    sub:"65+ Tests · NABL Certified",    price:1999, mrp:3499, off:43, badge:"Most Popular",   badgeColor:"#EF4444",  img:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=85&auto=format&fit=crop" },
              { title:"Diabetes Care",         sub:"12 Tests · NABL Certified",     price:399,  mrp:899,  off:56, badge:"55% OFF",        badgeColor:"#EA580C",  img:"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=85&auto=format&fit=crop" },
              { title:"Heart Health",          sub:"22 Tests · NABL Certified",     price:1799, mrp:2999, off:40, badge:"Top Doctors",    badgeColor:"#1158A6",  img:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=85&auto=format&fit=crop" },
              { title:"Thyroid Profile",       sub:"T3, T4, TSH · NABL Certified",  price:399,  mrp:799,  off:50, badge:"NABL",           badgeColor:"#1158A6",  img:"https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=600&q=85&auto=format&fit=crop" },
              { title:"Women's Wellness",      sub:"40+ Tests · NABL Certified",    price:2299, mrp:3999, off:43, badge:"Women Special",  badgeColor:"#9333EA",  img:"https://images.unsplash.com/photo-1571772996211-2f02974a8439?w=600&q=85&auto=format&fit=crop" },
              { title:"Senior Citizen",        sub:"55+ Tests · NABL Certified",    price:2499, mrp:4499, off:44, badge:"45% OFF",        badgeColor:"#EA580C",  img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=85&auto=format&fit=crop" },
            ].map((pkg,i)=>(
              <div key={pkg.title} className="hover-lift"
                style={{ background:"#fff",borderRadius:16,border:"1px solid #EEF2FF",overflow:"hidden",cursor:"pointer",display:"flex",flexDirection:"column" }}
                onClick={()=>navTo("labs")}>
                {/* Image */}
                <div style={{ position:"relative",height:160,overflow:"hidden",flexShrink:0 }}>
                  <img
                    src={pkg.img}
                    alt={pkg.title}
                    style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .4s ease" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                    onError={e=>{ e.target.style.display="none"; e.target.parentNode.style.background=`linear-gradient(135deg,${pkg.badgeColor}22,${pkg.badgeColor}11)`; }}
                  />
                  {/* Top-left badge */}
                  <div style={{ position:"absolute",top:12,left:12,background:pkg.badgeColor,color:"#fff",borderRadius:6,padding:"4px 10px",fontSize:".66rem",fontWeight:800,letterSpacing:".02em" }}>
                    {pkg.badge}
                  </div>
                  {/* Bottom-right discount */}
                  <div style={{ position:"absolute",bottom:10,right:10,background:"rgba(0,0,0,.72)",color:"#fff",borderRadius:6,padding:"3px 8px",fontSize:".66rem",fontWeight:800 }}>
                    {pkg.off}% OFF
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding:"16px 16px 14px",flex:1,display:"flex",flexDirection:"column",gap:6 }}>
                  <div style={{ fontWeight:800,fontSize:".95rem",color:"#0D1117",lineHeight:1.2 }}>{pkg.title}</div>
                  <div style={{ fontSize:".76rem",color:"#9CA3AF",fontWeight:600 }}>{pkg.sub}</div>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:12 }}>
                    <div style={{ display:"flex",alignItems:"baseline",gap:7 }}>
                      <span style={{ fontWeight:900,fontSize:"1.1rem",color:"#0D1117",fontFamily:"'Manrope',sans-serif" }}>₹{pkg.price.toLocaleString()}</span>
                      <span style={{ fontSize:".8rem",color:"#9CA3AF",textDecoration:"line-through",fontWeight:500 }}>₹{pkg.mrp.toLocaleString()}</span>
                    </div>
                    <button onClick={e=>{ e.stopPropagation(); navTo("labs"); }}
                      style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:8,padding:"8px 20px",fontWeight:700,fontSize:".82rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"filter .15s",minHeight:36 }}
                      onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.12)"}
                      onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TESTS carousel ─────────────────────────────── */}
      <PopularTestsCarousel setCatF={setCatF} navTo={navTo}/>
      {/* ── HOW HOME SAMPLE COLLECTION WORKS ─────────────────────── */}
      <section style={{ padding:"60px 0 56px",background:"#F8FAFF",borderBottom:"1px solid #E0EAFF" }}>
        <div style={T.wrap}>
          {/* MediBuddy-style illustrated promo cards */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:48 }}>
            {/* Card 1 — Home Sample Pickup */}
            <div style={{ borderRadius:20,overflow:"hidden",background:"linear-gradient(135deg,#D1FAE5 0%,#A7F3D0 100%)",position:"relative",minHeight:200,display:"flex",alignItems:"stretch",boxShadow:"0 8px 32px rgba(16,185,129,.15)" }}>
              <div style={{ flex:1,padding:"28px 24px 24px",display:"flex",flexDirection:"column",justifyContent:"space-between",zIndex:1 }}>
                <div>
                  <div style={{ display:"inline-block",background:"#ECFDF5",border:"1px solid #6EE7B7",borderRadius:50,padding:"3px 12px",fontSize:".66rem",fontWeight:800,color:"#059669",letterSpacing:".06em",textTransform:"uppercase",marginBottom:12 }}>Free Home Visit</div>
                  <h3 style={{ fontFamily:"'Manrope',sans-serif",fontWeight:900,fontSize:"clamp(1rem,2.2vw,1.3rem)",color:"#064E3B",lineHeight:1.25,marginBottom:8 }}>Sample Pickup<br/>in Just 2 Hrs!</h3>
                  <p style={{ fontSize:".78rem",color:"#065F46",lineHeight:1.6,maxWidth:200 }}>Certified phlebotomist visits your home at your chosen slot. Sterile, safe &amp; quick.</p>
                </div>
                <button onClick={()=>navTo("labs")}
                  style={{ alignSelf:"flex-start",marginTop:16,background:"#059669",color:"#fff",border:"none",borderRadius:50,padding:"9px 22px",fontWeight:800,fontSize:".8rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 14px rgba(5,150,105,.35)",transition:"all .18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#047857"; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#059669"; e.currentTarget.style.transform="translateY(0)"; }}>
                  BOOK NOW <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </button>
              </div>
              {/* Card 1 illustration — phlebotomist at door */}
              <div style={{ width:170,flexShrink:0,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:0 }}>
                <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto"}}>
                  {/* mint blob bg */}
                  <ellipse cx="120" cy="130" rx="55" ry="68" fill="#6EE7B7" opacity="0.35"/>
                  {/* door frame */}
                  <rect x="82" y="52" width="72" height="140" rx="5" fill="white" stroke="#D1FAE5" strokeWidth="2"/>
                  {/* door panel details */}
                  <rect x="88" y="60" width="28" height="38" rx="3" fill="#ECFDF5"/>
                  <rect x="120" y="60" width="28" height="38" rx="3" fill="#ECFDF5"/>
                  <rect x="88" y="104" width="60" height="80" rx="3" fill="#ECFDF5"/>
                  {/* door knob */}
                  <circle cx="87" cy="138" r="5" fill="#6EE7B7"/>
                  {/* door step */}
                  <rect x="74" y="188" width="88" height="8" rx="3" fill="#D1FAE5"/>
                  {/* plant pot */}
                  <rect x="56" y="168" width="20" height="24" rx="3" fill="#A7F3D0"/>
                  <ellipse cx="66" cy="168" rx="12" ry="6" fill="#6EE7B7"/>
                  <path d="M66 162 Q58 148 52 140" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <ellipse cx="52" cy="138" rx="7" ry="5" fill="#34D399" transform="rotate(-20 52 138)"/>
                  <path d="M66 160 Q72 146 78 138" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <ellipse cx="78" cy="136" rx="7" ry="5" fill="#34D399" transform="rotate(20 78 136)"/>

                  {/* person — phlebotomist */}
                  {/* head */}
                  <circle cx="50" cy="80" r="22" fill="#FBBF85"/>
                  {/* hair */}
                  <path d="M28 74 Q28 54 50 52 Q72 54 72 74 L70 66 Q58 50 50 50 Q42 50 30 66 Z" fill="#2C1A0E"/>
                  {/* body — white coat */}
                  <path d="M24 114 Q24 105 50 102 Q76 105 76 114 L80 196 H20 Z" fill="white"/>
                  {/* coat collar */}
                  <path d="M44 104 L36 120 L50 126 Z" fill="#ECFDF5"/>
                  <path d="M56 104 L64 120 L50 126 Z" fill="#ECFDF5"/>
                  {/* red cross badge */}
                  <circle cx="33" cy="115" r="10" fill="#EF4444"/>
                  <rect x="30" y="110" width="6" height="10" rx="1" fill="white"/>
                  <rect x="28" y="112" width="10" height="6" rx="1" fill="white"/>
                  {/* arm holding bag */}
                  <path d="M76 115 Q88 128 85 158" stroke="white" strokeWidth="20" strokeLinecap="round" fill="none"/>
                  {/* medical bag */}
                  <rect x="72" y="152" width="30" height="24" rx="5" fill="#FBBF24"/>
                  <rect x="82" y="148" width="10" height="8" rx="3" fill="#F59E0B"/>
                  <rect x="81" y="160" width="12" height="2" rx="1" fill="white"/>
                  <rect x="86" y="155" width="2" height="12" rx="1" fill="white"/>
                  {/* face */}
                  <ellipse cx="43" cy="82" rx="5" ry="6" fill="white"/>
                  <ellipse cx="57" cy="82" rx="5" ry="6" fill="white"/>
                  <circle cx="44" cy="83" r="3.5" fill="#2C1A0E"/>
                  <circle cx="58" cy="83" r="3.5" fill="#2C1A0E"/>
                  <circle cx="45" cy="81.5" r="1.2" fill="white"/>
                  <circle cx="59" cy="81.5" r="1.2" fill="white"/>
                  <path d="M44 93 Q50 99 56 93" stroke="#C0856B" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  {/* face mask */}
                  <path d="M32 85 Q32 100 50 100 Q68 100 68 85" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="1.5"/>
                  <path d="M32 85 Q50 78 68 85" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1"/>
                  {/* floating dots */}
                  <circle cx="18" cy="50" r="5" fill="#6EE7B7" opacity="0.6"/>
                  <circle cx="165" cy="60" r="4" fill="#A7F3D0" opacity="0.6"/>
                </svg>
              </div>
            </div>

            {/* Card 2 — Fast Report Delivery */}
            <div style={{ borderRadius:20,overflow:"hidden",background:"linear-gradient(135deg,#DBEAFE 0%,#BFDBFE 100%)",position:"relative",minHeight:200,display:"flex",alignItems:"stretch",boxShadow:"0 8px 32px rgba(17,88,166,.15)" }}>
              <div style={{ flex:1,padding:"28px 24px 24px",display:"flex",flexDirection:"column",justifyContent:"space-between",zIndex:1 }}>
                <div>
                  <div style={{ display:"inline-block",background:"#EFF6FF",border:"1px solid #93C5FD",borderRadius:50,padding:"3px 12px",fontSize:".66rem",fontWeight:800,color:"#1158A6",letterSpacing:".06em",textTransform:"uppercase",marginBottom:12 }}>Digital Reports</div>
                  <h3 style={{ fontFamily:"'Manrope',sans-serif",fontWeight:900,fontSize:"clamp(1rem,2.2vw,1.3rem)",color:"#1E3A5F",lineHeight:1.25,marginBottom:8 }}>Reports Delivered<br/>in 6 Hours!</h3>
                  <p style={{ fontSize:".78rem",color:"#1E40AF",lineHeight:1.6,maxWidth:200 }}>Get authenticated reports on WhatsApp &amp; email. Download anytime, share instantly.</p>
                </div>
                <button onClick={()=>navTo("labs")}
                  style={{ alignSelf:"flex-start",marginTop:16,background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"9px 22px",fontWeight:800,fontSize:".8rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 14px rgba(17,88,166,.35)",transition:"all .18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; }}>
                  VIEW TESTS <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </button>
              </div>
              {/* Card 2 illustration — scooter / report delivery */}
              <div style={{ width:170,flexShrink:0,display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
                <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto"}}>
                  {/* blue blob bg */}
                  <ellipse cx="100" cy="120" rx="72" ry="75" fill="#93C5FD" opacity="0.3"/>
                  {/* road / ground */}
                  <rect x="10" y="172" width="165" height="6" rx="3" fill="#BFDBFE" opacity="0.7"/>
                  {/* motion lines */}
                  <line x1="8" y1="148" x2="28" y2="148" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="4" y1="160" x2="20" y2="160" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="136" x2="26" y2="136" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round"/>

                  {/* scooter body */}
                  {/* rear wheel */}
                  <circle cx="62" cy="168" r="22" fill="#1F2937"/>
                  <circle cx="62" cy="168" r="14" fill="#374151"/>
                  <circle cx="62" cy="168" r="6" fill="#9CA3AF"/>
                  {/* front wheel */}
                  <circle cx="148" cy="168" r="20" fill="#1F2937"/>
                  <circle cx="148" cy="168" r="12" fill="#374151"/>
                  <circle cx="148" cy="168" r="5" fill="#9CA3AF"/>
                  {/* scooter chassis */}
                  <path d="M62 148 Q90 135 118 138 L140 148 Q148 158 148 168" stroke="#1E40AF" strokeWidth="14" strokeLinecap="round" fill="none"/>
                  <path d="M62 148 L56 155" stroke="#1E40AF" strokeWidth="10" strokeLinecap="round"/>
                  {/* scooter body platform */}
                  <path d="M74 142 Q100 130 126 136 L130 148 L70 148 Z" fill="#2563EB"/>
                  {/* handlebar */}
                  <path d="M138 130 L148 142 L152 138" stroke="#374151" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* front fairing */}
                  <path d="M138 128 Q150 122 155 132 Q158 140 148 142" fill="#3B82F6" stroke="#2563EB" strokeWidth="1"/>
                  {/* headlight */}
                  <ellipse cx="153" cy="136" rx="5" ry="4" fill="#FDE68A"/>
                  {/* mudguard */}
                  <path d="M50 150 Q55 140 62 148" stroke="#1E40AF" strokeWidth="6" strokeLinecap="round" fill="none"/>

                  {/* delivery box on back */}
                  <rect x="72" y="106" width="44" height="38" rx="7" fill="white" stroke="#BFDBFE" strokeWidth="2"/>
                  {/* cross on box */}
                  <rect x="90" y="112" width="8" height="26" rx="2" fill="#EF4444"/>
                  <rect x="83" y="119" width="22" height="8" rx="2" fill="#EF4444"/>
                  {/* box strap */}
                  <line x1="72" y1="125" x2="116" y2="125" stroke="#DBEAFE" strokeWidth="2" strokeDasharray="4 2"/>

                  {/* rider — person on scooter */}
                  {/* body */}
                  <path d="M98 100 Q98 90 118 88 Q138 90 138 100 L136 140 L100 140 Z" fill="#EFF6FF"/>
                  {/* legs */}
                  <path d="M100 138 L98 160 L116 160 L120 140" fill="#374151"/>
                  <path d="M136 138 L140 158 L148 150 L138 135" fill="#374151"/>
                  {/* arm / handlebar reach */}
                  <path d="M135 108 Q146 118 148 128" stroke="#EFF6FF" strokeWidth="14" strokeLinecap="round" fill="none"/>
                  {/* head */}
                  <circle cx="118" cy="74" r="20" fill="#FBBF85"/>
                  {/* helmet */}
                  <path d="M98 72 Q98 52 118 50 Q138 52 138 72 L136 68 Q124 54 118 54 Q112 54 100 68 Z" fill="#2563EB"/>
                  <rect x="98" y="68" width="40" height="10" rx="4" fill="#1D4ED8"/>
                  {/* visor */}
                  <path d="M100 74 Q118 70 136 74" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  {/* face */}
                  <ellipse cx="111" cy="76" rx="4" ry="5" fill="white"/>
                  <ellipse cx="125" cy="76" rx="4" ry="5" fill="white"/>
                  <circle cx="112" cy="77" r="3" fill="#2C1A0E"/>
                  <circle cx="126" cy="77" r="3" fill="#2C1A0E"/>
                  <path d="M112 86 Q118 91 124 86" stroke="#C0856B" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  {/* floating dots */}
                  <circle cx="168" cy="52" r="6" fill="#93C5FD" opacity="0.6"/>
                  <circle cx="30" cy="100" r="4" fill="#BFDBFE" opacity="0.6"/>
                </svg>
              </div>
            </div>
          </div>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:50,padding:"5px 16px",marginBottom:14 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#1158A6",flexShrink:0,display:"inline-block" }}/>
              <span style={{ fontSize:".7rem",fontWeight:800,color:"#1158A6",letterSpacing:".1em",textTransform:"uppercase" }}>Simple Process</span>
            </div>
            <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.45rem,3vw,1.85rem)",fontWeight:800,color:"#0D1117",marginBottom:10,lineHeight:1.2 }}>How Home Sample Collection Works</h2>
            <p style={{ color:"#6B7280",fontSize:".88rem",maxWidth:460,margin:"0 auto",lineHeight:1.8 }}>A seamless, four-step process designed for your convenience — from test selection to report delivery.</p>
          </div>
          <div style={{ maxWidth:560,margin:"0 auto",display:"flex",flexDirection:"column" }}>
            {[
              { n:"01",accent:"#1158A6",bg:"#EFF6FF",border:"#DBEAFE",label:"Search & Compare",desc:"Browse diagnostic tests and health packages by name, category, or condition. View real-time pricing from multiple NABL-accredited laboratories.",icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
              { n:"02",accent:"#0EA5E9",bg:"#F0F9FF",border:"#BAE6FD",label:"Schedule Collection",desc:"Select a preferred date and time slot. Choose between a laboratory visit or a doorstep sample collection at no additional charge.",icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
              { n:"03",accent:"#8B5CF6",bg:"#F5F3FF",border:"#DDD6FE",label:"Sample Collection",desc:"A trained phlebotomist arrives at your location within the confirmed window, equipped with sterile, single-use collection kits compliant with ICMR guidelines.",icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { n:"04",accent:"#16A34A",bg:"#F0FDF4",border:"#BBF7D0",label:"Receive Reports",desc:"Authenticated diagnostic reports are delivered directly to your registered email and WhatsApp. Access and download them at any time through your booking reference.",icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg> },
            ].map((s,i,arr)=>(
              <div key={s.n} style={{ display:"flex",gap:0,alignItems:"stretch" }}>
                <div style={{ display:"flex",flexDirection:"column",alignItems:"center",marginRight:22,flexShrink:0 }}>
                  <div style={{ width:54,height:54,borderRadius:"50%",background:s.bg,border:`2px solid ${s.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1 }}>{s.icon}</div>
                  {i<arr.length-1&&<div style={{ width:2,flex:1,minHeight:28,background:`linear-gradient(to bottom,${s.border},${arr[i+1].border})`,borderRadius:99,margin:"5px 0" }}/>}
                </div>
                <div style={{ flex:1,paddingBottom:i<arr.length-1?26:0 }}>
                  <div style={{ background:"#fff",border:`1.5px solid ${s.border}`,borderRadius:16,padding:"18px 20px",boxShadow:"0 2px 12px rgba(0,0,0,.05)",transition:"box-shadow .2s,border-color .2s,transform .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.1)"; e.currentTarget.style.transform="translateX(4px)"; e.currentTarget.style.borderColor=s.accent; }}
                    onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.05)"; e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.borderColor=s.border; }}>
                    <span style={{ fontSize:".62rem",fontWeight:900,letterSpacing:".1em",color:s.accent,background:s.bg,border:`1px solid ${s.border}`,borderRadius:50,padding:"2px 10px",textTransform:"uppercase",display:"inline-block",marginBottom:8 }}>Step {s.n}</span>
                    <h3 style={{ fontFamily:"'Manrope',sans-serif",fontWeight:800,fontSize:"1rem",color:"#0D1117",marginBottom:7,lineHeight:1.3 }}>{s.label}</h3>
                    <p style={{ color:"#6B7280",fontSize:".83rem",lineHeight:1.72,margin:0 }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:44 }}>
            <button onClick={()=>navTo("labs")}
              style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"14px 36px",fontWeight:800,fontSize:".92rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",boxShadow:"0 6px 24px rgba(17,88,166,.3)",transition:"all .2s",display:"inline-flex",alignItems:"center",gap:10,minHeight:48 }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(17,88,166,.42)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(17,88,166,.3)"; }}>
              Explore All Labs & Tests
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </button>
            <p style={{ color:"#9CA3AF",fontSize:".74rem",marginTop:14 }}>6 NABL-certified labs · Free home collection · Reports delivered in hours</p>
          </div>
        </div>
      </section>


      {/* ── WHY LABEASE ───────────────────────────────────────────── */}
      <section style={{ padding:"56px 0",background:"#F8FAFF" }}>
        <div style={T.wrap}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:50,padding:"5px 16px",marginBottom:14 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#1158A6",flexShrink:0,display:"inline-block" }}/>
              <span style={{ fontSize:".7rem",fontWeight:800,color:"#1158A6",letterSpacing:".1em",textTransform:"uppercase" }}>Why LabEase</span>
            </div>
            <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.35rem,3vw,1.7rem)",fontWeight:800,color:"#0D1117",marginBottom:10,lineHeight:1.2 }}>Built Around Your Wellbeing</h2>
            <p style={{ color:"#6B7280",fontSize:".88rem",maxWidth:440,margin:"0 auto" }}>Every feature is designed to make diagnostics transparent, accessible, and stress-free.</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16 }}>
            {[
              {Icon:IAutoimmune,t:"NABL Accredited",d:"All partner labs meet the highest national quality standards.",color:"#EEF4FF",ic:"#1158A6"},
              {Icon:IPackage,   t:"Transparent Pricing",d:"The price you see is the price you pay — no hidden fees.",color:"#FFF7ED",ic:"#EA580C"},
              {Icon:IBlood,     t:"Free Home Collection",d:"Certified phlebotomists collect samples from your doorstep.",color:"#FEF2F2",ic:"#DC2626"},
              {Icon:ICardiac,   t:"Fast Reports",d:"Urgent tests returned in as little as 6 hours to your inbox.",color:"#EFF6FF",ic:"#1158A6"},
              {Icon:IThyroid,   t:"Data Security",d:"End-to-end encrypted health data. Never shared or sold.",color:"#FDF4FF",ic:"#9333EA"},
              {Icon:IDiabetes,  t:"24/7 Support",d:"Expert help available round the clock via chat or phone.",color:"#ECFDF5",ic:"#0D9488"},
            ].map(w=>(
              <div key={w.t} style={{ background:"#fff",borderRadius:16,padding:"24px 18px",border:"1px solid #F1F5F9",boxShadow:"0 1px 6px rgba(0,0,0,.04)",transition:"all .18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 6px 24px rgba(17,88,166,.1)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,.04)"; e.currentTarget.style.transform="translateY(0)"; }}>
                <div style={{ width:46,height:46,borderRadius:12,background:w.color,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14 }}>
                  <w.Icon s={28}/>
                </div>
                <div style={{ fontWeight:800,color:"#0D1117",marginBottom:6,fontSize:".88rem" }}>{w.t}</div>
                <div style={{ color:"#9CA3AF",fontSize:".79rem",lineHeight:1.65 }}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section style={{ padding:"60px 0 56px",background:"#fff",borderBottom:"1px solid #F1F5F9" }}>
        <div style={T.wrap}>
          <div style={{ textAlign:"center",marginBottom:44 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:50,padding:"5px 16px",marginBottom:14 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#1158A6",flexShrink:0,display:"inline-block" }}/>
              <span style={{ fontSize:".7rem",fontWeight:800,color:"#1158A6",letterSpacing:".1em",textTransform:"uppercase" }}>Patient Stories</span>
            </div>
            <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.4rem,3vw,1.85rem)",fontWeight:800,color:"#0D1117",marginBottom:10,lineHeight:1.2 }}>What Our Patients Say</h2>
            <p style={{ color:"#6B7280",fontSize:".88rem",maxWidth:440,margin:"0 auto",lineHeight:1.75 }}>Real experiences from 50,000+ patients who trust LabEase for their health diagnostics.</p>
          </div>

          {/* Featured large testimonial */}
          <div style={{ background:"linear-gradient(135deg,#EBF3FB 0%,#F0F7FF 100%)",borderRadius:20,padding:"0",overflow:"hidden",marginBottom:28,display:"flex",minHeight:220,border:"1px solid #DBEAFE" }}>
            <div style={{ width:260,flexShrink:0,position:"relative",overflow:"hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=85&auto=format&fit=crop"
                alt="Happy patient"
                style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",minHeight:220 }}
                onError={e=>{ e.target.style.display="none"; e.target.parentNode.style.background="#DBEAFE"; }}
              />
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right,transparent 60%,#EBF3FB)" }}/>
            </div>
            <div style={{ flex:1,padding:"32px 36px",display:"flex",flexDirection:"column",justifyContent:"center" }}>
              <div style={{ display:"flex",gap:2,marginBottom:14 }}>
                {[1,2,3,4,5].map(i=><span key={i} style={{ color:"#F59E0B",fontSize:"1rem" }}>★</span>)}
              </div>
              <p style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.05rem,2vw,1.25rem)",color:"#0D1117",lineHeight:1.65,marginBottom:20,fontStyle:"italic" }}>
                "LabEase completely changed how I manage my health. I booked a full body checkup at midnight, a phlebotomist arrived the next morning, and my reports were in my inbox by 2 PM. The prices were 40% cheaper than my usual lab!"
              </p>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div>
                  <div style={{ fontWeight:800,fontSize:".92rem",color:"#0D1117" }}>Priya Sharma</div>
                  <div style={{ fontSize:".76rem",color:"#6B7280",fontWeight:500 }}>Marketing Manager · Bangalore · Full Body Checkup</div>
                </div>
                <div style={{ marginLeft:"auto",background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:8,padding:"4px 12px",fontSize:".7rem",fontWeight:700,color:"#1158A6" }}>Verified Booking</div>
              </div>
            </div>
          </div>

          {/* 3-column testimonial cards */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px),1fr)",gap:18 }}>
            {[
              {
                name:"Rahul Mehta", city:"Mumbai", test:"Diabetes Care Package",
                text:"Booked at 10 PM and the technician was at my door by 7 AM. Reports in 4 hours. Truly impressed!",
                rating:5, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&face"
              },
              {
                name:"Ananya Krishnan", city:"Hyderabad", test:"Thyroid Profile",
                text:"As someone with thyroid issues I get tested often. LabEase saves me so much time and about 50% on costs.",
                rating:5, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop"
              },
              {
                name:"Dr. Suresh Iyer", city:"Chennai", test:"Heart Health Package",
                text:"I recommend LabEase to my patients regularly. NABL certification, fast reports, and transparent billing.",
                rating:5, img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80&auto=format&fit=crop"
              },
              {
                name:"Meera Joshi", city:"Delhi", test:"Women's Wellness",
                text:"The home collection service is a game changer for working women. Reports were detailed and on time.",
                rating:5, img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop"
              },
              {
                name:"Arjun Nair", city:"Kochi", test:"Kidney Function Test",
                text:"Price comparison feature is amazing. Got the same test for ₹299 that was quoted ₹700 at a walk-in lab.",
                rating:5, img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop"
              },
              {
                name:"Sunita Agarwal", city:"Pune", test:"Senior Citizen Package",
                text:"Booked for my 70-year-old mother. The phlebotomist was professional and gentle. Highly recommended.",
                rating:5, img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop"
              },
            ].map((t,i)=>(
              <div key={i} className="hover-lift" style={{ background:"#fff",borderRadius:16,border:"1px solid #EEF2FF",padding:"22px 20px",display:"flex",flexDirection:"column",gap:14 }}>
                <div style={{ display:"flex",gap:2 }}>
                  {[1,2,3,4,5].map(j=><span key={j} style={{ color:"#F59E0B",fontSize:".85rem" }}>★</span>)}
                </div>
                <p style={{ color:"#374151",fontSize:".84rem",lineHeight:1.72,flex:1,margin:0 }}>"{t.text}"</p>
                <div style={{ display:"flex",alignItems:"center",gap:10,paddingTop:12,borderTop:"1px solid #F1F5F9" }}>
                  <img
                    src={t.img}
                    alt={t.name}
                    style={{ width:40,height:40,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:"2px solid #DBEAFE" }}
                    onError={e=>{ e.target.style.display="none"; e.target.parentNode.insertAdjacentHTML("afterbegin",`<div style="width:40px;height:40px;border-radius:50%;background:#EFF6FF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.85rem;color:#1158A6;flex-shrink:0">${t.name[0]}</div>`); }}
                  />
                  <div>
                    <div style={{ fontWeight:700,fontSize:".83rem",color:"#0D1117",lineHeight:1.2 }}>{t.name}</div>
                    <div style={{ fontSize:".7rem",color:"#9CA3AF",fontWeight:500 }}>{t.city} · {t.test}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section style={{ padding:"56px 0",background:"#fff" }}>
        <div style={{ ...T.wrap,maxWidth:780 }}>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:50,padding:"5px 16px",marginBottom:14 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#1158A6",flexShrink:0,display:"inline-block" }}/>
              <span style={{ fontSize:".7rem",fontWeight:800,color:"#1158A6",letterSpacing:".1em",textTransform:"uppercase" }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.35rem,3vw,1.7rem)",fontWeight:800,color:"#0D1117",marginBottom:10,lineHeight:1.2 }}>Frequently Asked Questions</h2>
            <p style={{ color:"#6B7280",fontSize:".88rem",maxWidth:400,margin:"0 auto" }}>Everything you need to know before booking your first test.</p>
          </div>
          <div style={{ display:"grid",gap:8 }}>
            {FAQS.map((item,i)=>(
              <div key={i} style={{ background:"#F8FAFF",borderRadius:14,border:"1px solid #EEF2FF",overflow:"hidden",transition:"all .18s" }}>
                <button className="faq-q" onClick={()=>setFaq(faq===i?null:i)}
                  style={{ width:"100%",background:"none",border:"none",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",transition:"background .18s" }}>
                  <span style={{ fontWeight:700,fontSize:".9rem",color:"#0D1117",lineHeight:1.4,flex:1,marginRight:14 }}>{item.q}</span>
                  <span style={{ flexShrink:0,width:28,height:28,borderRadius:50,background:faq===i?"#1158A6":"#fff",color:faq===i?"#fff":"#1158A6",border:"1.5px solid #DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",fontWeight:700,transition:"all .22s",lineHeight:1 }}>
                    {faq===i?"−":"+"}
                  </span>
                </button>
                {faq===i && (
                  <div style={{ padding:"0 20px 16px",color:"#6B7280",fontSize:".86rem",lineHeight:1.78,borderTop:"1px solid #EEF2FF",paddingTop:12,animation:"slideUp .2s" }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section style={{ background:"linear-gradient(135deg,#0A1628 0%,#1158A6 50%,#1D3461 100%)",padding:"80px 24px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        {/* Subtle grid overlay */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none" }}/>
        {/* Glow orbs */}
        <div style={{ position:"absolute",top:"10%",left:"20%",width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(96,165,250,.15),transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",bottom:"5%",right:"15%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.1),transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ position:"relative",zIndex:1,maxWidth:600,margin:"0 auto" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",borderRadius:50,padding:"5px 16px",marginBottom:22 }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ADE80",flexShrink:0,display:"inline-block" }}/>
            <span style={{ fontSize:".7rem",fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:".1em",textTransform:"uppercase" }}>NABL Certified · Available 24/7</span>
          </div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:700,color:"#fff",marginBottom:14,lineHeight:1.18,letterSpacing:"-.01em" }}>
            Your Health, Simplified.
          </h2>
          <p style={{ color:"rgba(255,255,255,.6)",marginBottom:36,fontSize:".95rem",lineHeight:1.75,maxWidth:440,margin:"0 auto 36px" }}>
            Transparent pricing · Free doorstep collection · Digital reports in hours. Trusted by 50,000+ patients.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <button onClick={()=>navTo("labs")} className="btn-anim"
              style={{ background:"#fff",color:"#1158A6",border:"none",borderRadius:50,padding:"14px 36px",fontWeight:800,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".92rem",boxShadow:"0 8px 32px rgba(0,0,0,.25)",transition:"all .2s",display:"inline-flex",alignItems:"center",gap:8 }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(0,0,0,.3)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.25)"; }}>
              Book a Test Now
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </button>
            <button onClick={()=>navTo("labs")} className="btn-anim"
              style={{ background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,.25)",borderRadius:50,padding:"14px 32px",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".9rem",transition:"all .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.borderColor="rgba(255,255,255,.5)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(255,255,255,.25)"; }}>
              View Lab Packages
            </button>
          </div>
          {/* Trust indicators */}
          <div style={{ display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap",marginTop:36,paddingTop:32,borderTop:"1px solid rgba(255,255,255,.08)" }}>
            {[["50,000+","Patients Served"],["6","NABL Labs"],["4.9★","Avg. Rating"],["2 hrs","Fastest Reports"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'DM Serif Display',serif",fontWeight:700,fontSize:"1.3rem",color:"#fff",lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:".68rem",color:"rgba(255,255,255,.45)",fontWeight:600,marginTop:4,textTransform:"uppercase",letterSpacing:".06em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM FOOTER ───────────────────────────────────────── */}
      <footer style={{ background:"#0A0F1E",color:"#94A3B8",fontFamily:"'Manrope',sans-serif" }}>
        {/* Top band */}
        <div style={{ borderBottom:"1px solid rgba(255,255,255,.07)",padding:"56px 0 48px" }}>
          <div style={{ maxWidth:1140,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,flexWrap:"wrap" }}>
            {/* Brand column */}
            <div>
              <div style={{ display:"flex",alignItems:"baseline",gap:2,marginBottom:16 }}>
                <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.7rem",color:"#60A5FA",lineHeight:1 }}>Lab</span>
                <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.7rem",color:"#fff",lineHeight:1 }}>Ease</span>
                <sup style={{ fontSize:".5rem",color:"#4B5563",fontWeight:600,marginLeft:2 }}>™</sup>
              </div>
              <p style={{ fontSize:".84rem",lineHeight:1.75,color:"#64748B",marginBottom:20,maxWidth:240 }}>
                India's most transparent diagnostic booking platform. Compare prices across NABL-certified labs and book in under 2 minutes.
              </p>
              {/* Badges */}
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                {[["✓","NABL Accredited"],["✓","ISO 15189"]].map(([ic,t])=>(
                  <span key={t} style={{ display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:6,padding:"4px 10px",fontSize:".68rem",fontWeight:700,color:"#94A3B8" }}>
                    <span style={{ color:"#4ADE80" }}>{ic}</span>{t}
                  </span>
                ))}
              </div>
            </div>
            {/* Services */}
            <div>
              <div style={{ fontSize:".72rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:"#475569",marginBottom:18 }}>Services</div>
              {["Book a Lab Test","Home Sample Collection","Upload Prescription","Compare Lab Prices","Track Reports"].map(l=>(
                <div key={l} style={{ fontSize:".83rem",color:"#64748B",marginBottom:11,cursor:"pointer",transition:"color .14s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#E2E8F0"}
                  onMouseLeave={e=>e.currentTarget.style.color="#64748B"}>{l}</div>
              ))}
            </div>
            {/* Company */}
            <div>
              <div style={{ fontSize:".72rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:"#475569",marginBottom:18 }}>Company</div>
              {["About Us","Partner With Us","Careers","Blog","Press"].map(l=>(
                <div key={l} style={{ fontSize:".83rem",color:"#64748B",marginBottom:11,cursor:"pointer",transition:"color .14s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#E2E8F0"}
                  onMouseLeave={e=>e.currentTarget.style.color="#64748B"}>{l}</div>
              ))}
            </div>
            {/* Support */}
            <div>
              <div style={{ fontSize:".72rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:"#475569",marginBottom:18 }}>Support</div>
              {["Help & Support","Contact Us","Privacy Policy","Terms of Service","Refund Policy"].map(l=>(
                <div key={l} style={{ fontSize:".83rem",color:"#64748B",marginBottom:11,cursor:"pointer",transition:"color .14s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#E2E8F0"}
                  onMouseLeave={e=>e.currentTarget.style.color="#64748B"}>{l}</div>
              ))}
              {/* Contact info */}
              <div style={{ marginTop:20,paddingTop:20,borderTop:"1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize:".76rem",color:"#4B5563",marginBottom:7 }}>📞 1800-103-0001</div>
                <div style={{ fontSize:".76rem",color:"#4B5563" }}>✉ support@labease.in</div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom band */}
        <div style={{ maxWidth:1140,margin:"0 auto",padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <div style={{ fontSize:".73rem",color:"#334155" }}>© 2026 LabEase Diagnostics Pvt. Ltd. All rights reserved. · CIN: U85110KA2024PTC123456</div>
          <div style={{ display:"flex",gap:16,alignItems:"center" }}>
            {["Privacy","Terms","Cookies"].map(l=>(
              <span key={l} style={{ fontSize:".73rem",color:"#334155",cursor:"pointer",transition:"color .14s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#94A3B8"}
                onMouseLeave={e=>e.currentTarget.style.color="#334155"}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
    );
  };

  /* ─── SHARED LAB CARD — shim ─────────────────────────────────── */
  const LabCard = ({ l }) => (
    <LabCardML l={l} T={T} setLab={setLab} setCatF={setCatF} setTestQ={setTestQ} navTo={navTo}/>
  );

  /* ═══════════════════════════════════════════════════════════════
     LABS LIST PAGE — shim
  ═══════════════════════════════════════════════════════════════ */
  const LabsPage = () => (
    <LabsPageML T={T} catF={catF} setCatF={setCatF} setLab={setLab}
      setTestQ={setTestQ} navTo={navTo} cart={cart}/>
  );

  /* ═══════════════════════════════════════════════════════════════
     LAB DETAIL PAGE — shim
  ═══════════════════════════════════════════════════════════════ */
  const LabDetail = () => (
    <LabDetailML lab={lab} T={T} cart={cart} total={total}
      testQ={testQ} setTestQ={setTestQ} catF={catF} setCatF={setCatF}
      filtTests={filtTests} addCart={addCart} delCart={delCart}
      has={has} pct={pct} navTo={navTo} setCartOpen={setCartOpen}/>
  );

  /* ═══════════════════════════════════════════════════════════════
     BOOKING PAGE
  ═══════════════════════════════════════════════════════════════ */
  const Booking = () => <BookingPage form={form} setForm={setForm} step={step} setStep={setStep} cart={cart} total={total} mrpTotal={mrpTotal} saving={saving} lab={lab} navTo={navTo} confirm={confirm}/>;

  /* ═══════════════════════════════════════════════════════════════
     CONFIRM PAGE
  ═══════════════════════════════════════════════════════════════ */
  const Confirm = () => (
    <div style={{ minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"#F8FAFF",fontFamily:"'Manrope',sans-serif" }}>
      <div style={{ background:"#fff",maxWidth:520,width:"100%",padding:"40px 36px",textAlign:"center",animation:"scaleIn .35s cubic-bezier(.34,1.56,.64,1)",borderRadius:24,border:"1.5px solid #EEF2FF",boxShadow:"0 8px 40px rgba(17,88,166,.1)" }}>

        {/* success icon */}
        <div style={{ width:72,height:72,borderRadius:50,background:"linear-gradient(135deg,#1158A6,#0F2D6B)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",boxShadow:"0 8px 28px rgba(17,88,166,.35)" }}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><polyline points="5,16 12,23 27,9" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <h2 style={{ fontWeight:800,fontSize:"1.6rem",color:"#0D1117",marginBottom:6 }}>Booking Confirmed!</h2>
        <p style={{ color:"#9CA3AF",marginBottom:24,lineHeight:1.7,fontSize:".88rem" }}>Details sent to <strong style={{color:"#0D1117"}}>{done?.email}</strong>. You'll receive a WhatsApp notification shortly.</p>

        {/* booking ID */}
        <div style={{ background:"#EEF4FF",border:"1.5px solid #DBEAFE",borderRadius:14,padding:"16px 20px",marginBottom:18 }}>
          <div style={{ fontWeight:700,color:"#9CA3AF",fontSize:".68rem",letterSpacing:".1em",marginBottom:6,textTransform:"uppercase" }}>Booking Reference</div>
          <div style={{ fontWeight:800,fontSize:"1.8rem",color:"#1158A6",letterSpacing:".12em",fontFamily:"'Manrope',sans-serif" }}>{done?.id}</div>
        </div>

        {/* summary */}
        <div style={{ background:"#F8FAFF",borderRadius:12,padding:"14px 18px",textAlign:"left",marginBottom:22,border:"1px solid #EEF2FF" }}>
          {[["Patient",done?.name],["Lab",lab?.name],["Date & Time",`${done?.date} at ${done?.slot}`],["Mode",done?.mode==="home"?"Home Collection":"Visit Lab"],["Tests",`${done?.cart?.length} test(s)`],["Total Paid",`₹${done?.total?.toLocaleString()}`]].map(([l,v])=>(
            <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #EEF2FF",fontSize:".83rem" }}>
              <span style={{ color:"#9CA3AF",fontWeight:600 }}>{l}</span>
              <span style={{ fontWeight:700,color:"#0D1117" }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ display:"flex",gap:10 }}>
          <button onClick={()=>{ navTo("labs"); setDone(null); }}
            style={{ flex:1,background:"#F8FAFF",color:"#1158A6",border:"1.5px solid #DBEAFE",borderRadius:50,padding:"12px",fontWeight:700,fontSize:".86rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#EEF4FF"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="#F8FAFF"; }}>
            Book More
          </button>
          <button onClick={()=>navTo("home")}
            style={{ flex:1,background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"12px",fontWeight:800,fontSize:".86rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",boxShadow:"0 4px 14px rgba(17,88,166,.3)",transition:"all .18s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; }}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════
     LABS NEAR ME PAGE  – Practo-style
  ═══════════════════════════════════════════════════════════════ */
  const NearMePage = () => {
    const [filterOpen,  setFilterOpen]  = useState(false);  // open now
    const [filterHome,  setFilterHome]  = useState(false);  // home collection
    const [filterNabl,  setFilterNabl]  = useState(false);  // nabl
    const [sortBy,      setSortBy]      = useState("dist"); // dist | rating | price

    const labsList = NEAR_ME.map((l,i)=>{
      const full = LABS.find(x=>x.name.startsWith(l.name.split(" ")[0]));
      return { ...l, full, idx:i };
    })
    .filter(l => filterOpen ? l.open : true)
    .filter(l => filterHome ? l.homecoll : true)
    .filter(l => filterNabl ? (l.full?.nabl ?? false) : true)
    .sort((a,b)=> sortBy==="rating" ? b.rating-a.rating : sortBy==="price" ? (a.full?Math.min(...a.full.tests.map(t=>t.price)):99999)-(b.full?Math.min(...b.full.tests.map(t=>t.price)):99999) : parseFloat(a.dist)-parseFloat(b.dist));

    const specialties = [["Blood Tests","Blood"],["Thyroid","Thyroid"],["Diabetes","Diabetes"],["Vitamin Tests","Vitamins"],["Full Body","Packages"],["Cardiac","Cardiac"],["Radiology","Radiology"]];
    const colors = ["#1158A6","#1158A6","#1158A6","#1158A6","#1158A6","#1158A6"];
    const tagMap = [
      ["Blood Tests","Packages","Home Collection"],
      ["Pathology","Urine","Thyroid"],
      ["Full Body","Cancer Markers","Allergy"],
      ["Blood Sugar","Infectious","Packages"],
      ["Hormones","Thyroid","Fertility"],
      ["Radiology","Echo","MRI"],
    ];

    return (
      <div style={{ minHeight:"100vh",background:"#F5F7FA",fontFamily:"'Manrope',sans-serif" }}>
        {/* ── page header ── */}
        <div style={{ background:"#fff",borderBottom:"1px solid var(--line)",padding:"20px 0" }}>
          <div style={{ ...T.wrap }}>
            <button onClick={()=>navTo("home")} style={{ background:"none",border:"none",color:"var(--teal)",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",padding:0,marginBottom:14,display:"flex",alignItems:"center",gap:5 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>
              Home
            </button>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:10 }}>
              <div>
                <h1 style={{ ...T.serif,fontSize:"1.7rem",color:"var(--ink)",marginBottom:4 }}>Diagnostic Labs in Bangalore</h1>
                <p style={{ color:"var(--muted)",fontSize:".84rem" }}>
                  {labsList.length} lab{labsList.length!==1?"s":""} found · 
                  <span style={{ color:"#065F46",fontWeight:700 }}> {NEAR_ME.filter(l=>l.open).length} open now</span>
                </p>
              </div>
              {/* sort */}
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <span style={{ fontSize:".8rem",color:"var(--muted)",fontWeight:600 }}>Sort:</span>
                {[["dist","Distance"],["rating","Rating"],["price","Price"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setSortBy(v)}
                    style={{ background:sortBy===v?"var(--teal)":"#fff",color:sortBy===v?"#fff":"var(--muted)",border:`1px solid ${sortBy===v?"var(--teal)":"var(--line)"}`,borderRadius:20,padding:"5px 12px",fontSize:".76rem",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...T.wrap,padding:"24px 24px",display:"grid",gridTemplateColumns:"220px 1fr",gap:24,alignItems:"start" }}>

          {/* ── LEFT FILTER SIDEBAR ── */}
          <div style={{ position:"sticky",top:80,display:"flex",flexDirection:"column",gap:14 }}>

            {/* Availability */}
            <div style={{ background:"#fff",borderRadius:14,border:"1px solid var(--line)",padding:"18px 16px" }}>
              <div style={{ fontWeight:800,fontSize:".85rem",color:"var(--ink)",marginBottom:12 }}>Availability</div>
              <label style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer",marginBottom:8 }}>
                <input type="checkbox" checked={filterOpen} onChange={e=>setFilterOpen(e.target.checked)} style={{ accentColor:"var(--teal)",width:15,height:15 }}/>
                <span style={{ fontSize:".84rem",fontWeight:600,color:filterOpen?"var(--teal)":"var(--muted)" }}>Open Now</span>
              </label>
              <label style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer" }}>
                <input type="checkbox" checked={filterHome} onChange={e=>setFilterHome(e.target.checked)} style={{ accentColor:"var(--teal)",width:15,height:15 }}/>
                <span style={{ fontSize:".84rem",fontWeight:600,color:filterHome?"var(--teal)":"var(--muted)" }}>Home Collection</span>
              </label>
            </div>

            {/* Accreditation */}
            <div style={{ background:"#fff",borderRadius:14,border:"1px solid var(--line)",padding:"18px 16px" }}>
              <div style={{ fontWeight:800,fontSize:".85rem",color:"var(--ink)",marginBottom:12 }}>Accreditation</div>
              <label style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer" }}>
                <input type="checkbox" checked={filterNabl} onChange={e=>setFilterNabl(e.target.checked)} style={{ accentColor:"var(--teal)",width:15,height:15 }}/>
                <span style={{ fontSize:".84rem",fontWeight:600,color:filterNabl?"var(--teal)":"var(--muted)" }}>NABL Accredited</span>
              </label>
            </div>

            {/* Test categories */}
            <div style={{ background:"#fff",borderRadius:14,border:"1px solid var(--line)",padding:"18px 16px" }}>
              <div style={{ fontWeight:800,fontSize:".85rem",color:"var(--ink)",marginBottom:12 }}>Test Categories</div>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {specialties.map(([label,cat])=>(
                  <button key={cat} onClick={()=>{setCatF(cat);navTo("labs");}}
                    style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontWeight:600,fontSize:".82rem",color:"var(--muted)",textAlign:"left",padding:"4px 0",display:"flex",alignItems:"center",gap:7,transition:"color .14s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="var(--teal)"}
                    onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}>
                    <svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2.5" fill="#CBD5E1"/></svg>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* location */}
            <div style={{ background:"#EFF6FF",borderRadius:14,border:"1px solid #BFDBFE",padding:"14px 16px",display:"flex",gap:8,alignItems:"flex-start" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0,marginTop:1 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <div style={{ fontWeight:700,fontSize:".78rem",color:"#1158A6",marginBottom:2 }}>Your Location</div>
                <div style={{ fontSize:".75rem",color:"#1D4ED8" }}>Bangalore, Karnataka</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT – LAB CARDS ── */}
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            {labsList.length === 0 && (
              <div style={{ background:"#fff",borderRadius:16,border:"1px solid var(--line)",padding:48,textAlign:"center",color:"var(--muted)" }}>
                <div style={{ fontSize:"2.5rem",marginBottom:10 }}>🔬</div>
                No labs match your filters.
              </div>
            )}
            {labsList.map((l)=>{
              const col   = colors[l.idx % colors.length];
              const tags  = tagMap[l.idx] || ["Blood Tests","Packages"];
              const initials = l.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
              const minPrice = l.full ? Math.min(...l.full.tests.map(t=>t.price)) : null;
              return (
                <div key={l.idx} className="hover-lift"
                  style={{ background:"#fff",borderRadius:16,border:"1px solid var(--line)",overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.05)",cursor:"pointer" }}
                  onClick={()=>{ if(l.full){setLab(l.full);setCatF("All");setTestQ("");navTo("lab");} }}>

                  <div style={{ display:"flex",gap:0 }}>
                    {/* left accent bar */}
                    <div style={{ width:5,background:"#E5E7EB",flexShrink:0 }}/>

                    <div style={{ flex:1,padding:"22px 22px 18px" }}>
                      <div style={{ display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap" }}>

                        {/* avatar */}
                        <div style={{ width:68,height:68,borderRadius:16,background:"#F1F5F9",border:"2px solid #E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                          <span style={{ fontFamily:"'DM Serif Display',serif",fontWeight:700,fontSize:"1.3rem",color:"#374151" }}>{initials}</span>
                        </div>

                        {/* main info */}
                        <div style={{ flex:1,minWidth:0 }}>
                          {/* name + badges */}
                          <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5 }}>
                            <span style={{ fontWeight:800,fontSize:"1rem",color:"var(--ink)" }}>{l.name}</span>
                            {l.full?.nabl && <span style={{ background:"#EFF6FF",color:"#1158A6",borderRadius:20,padding:"2px 8px",fontSize:".64rem",fontWeight:700 }}>✓ NABL</span>}
                            <span style={{ fontSize:".64rem",fontWeight:700,padding:"2px 8px",borderRadius:20,background:l.open?"#DCFCE7":"#FEE2E2",color:l.open?"#15803D":"#DC2626" }}>
                              {l.open?"● Open Now":"● Closed"}
                            </span>
                          </div>

                          {/* area + distance */}
                          <div style={{ display:"flex",alignItems:"center",gap:5,color:"var(--muted)",fontSize:".8rem",marginBottom:8 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {l.area}, Bangalore &nbsp;·&nbsp; <strong style={{ color:"var(--ink)" }}>{l.dist} away</strong>
                          </div>

                          {/* tag chips */}
                          <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:10 }}>
                            {tags.map(t=>(
                              <span key={t} style={{ background:"#F1F5F9",color:"#374151",borderRadius:6,padding:"3px 9px",fontSize:".7rem",fontWeight:600 }}>{t}</span>
                            ))}
                            {l.homecoll && <span style={{ background:"#E0F2FE",color:"#0369A1",borderRadius:6,padding:"3px 9px",fontSize:".7rem",fontWeight:600 }}>🏠 Home Collection</span>}
                          </div>

                          {/* rating bar */}
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <div style={{ display:"flex",alignItems:"center",gap:4,background:l.rating>=4.8?"#1158A6":l.rating>=4.6?"#1D4ED8":"#2563EB",color:"#fff",borderRadius:7,padding:"3px 9px",fontSize:".75rem",fontWeight:800 }}>
                              ★ {l.rating}
                            </div>
                            <span style={{ fontSize:".75rem",color:"var(--muted)",fontWeight:500 }}>
                              {l.rating>=4.8?"Excellent · ":l.rating>=4.6?"Very Good · ":"Good · "}
                              {l.full?.reviews?.toLocaleString()} reviews
                            </span>
                          </div>
                        </div>

                        {/* right: price + cta */}
                        <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,minWidth:110,flexShrink:0 }}>
                          {minPrice && (
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontSize:".7rem",color:"var(--muted)",fontWeight:500 }}>Tests starting from</div>
                              <div style={{ fontFamily:"'DM Serif Display',serif",fontWeight:700,fontSize:"1.35rem",color:"var(--ink)",lineHeight:1.1 }}>₹ {minPrice}</div>
                            </div>
                          )}
                          <button onClick={e=>{e.stopPropagation();if(l.full){setLab(l.full);setCatF("All");setTestQ("");navTo("lab");}}}
                            style={{ background:"#F1F5F9",color:"#374151",border:"none",borderRadius:9,padding:"10px 22px",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",width:"100%",transition:"filter .15s" }}
                            onMouseEnter={e=>e.currentTarget.style.filter="brightness(.95)"}
                            onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}>
                            Book Now
                          </button>
                          <button onClick={e=>{e.stopPropagation();if(l.full){setLab(l.full);setCatF("All");setTestQ("");navTo("lab");}}}
                            style={{ background:col,color:"#fff",border:"none",borderRadius:9,padding:"8px 22px",fontWeight:700,cursor:"pointer",fontSize:".82rem",fontFamily:"'Manrope',sans-serif",width:"100%",transition:"filter .15s" }}
                            onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.1)"}
                            onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}>
                            View Tests & Prices
                          </button>
                        </div>
                      </div>

                      {/* bottom info strip */}
                      <div style={{ display:"flex",gap:20,marginTop:14,paddingTop:12,borderTop:"1px solid #F1F5F9",flexWrap:"wrap" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:".75rem",color:"var(--muted)" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {l.full?.timing || "6:00 AM – 9:00 PM"}
                        </div>
                        <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:".75rem",color:"#065F46",fontWeight:600 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Reports in {l.idx===0?"Same Day":l.idx===1?"2-6 hrs":"24 hrs"}
                        </div>
                        {l.full && (
                          <div style={{ fontSize:".75rem",color:"var(--muted)" }}>
                            {l.full.tests.length}+ tests available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     NAV + SHELL
  ═══════════════════════════════════════════════════════════════ */
  return (
    <div style={{ fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#FAFAFA" }}>
      <G/>

      {(sideMenu||profileDrop)&&<div onClick={()=>{setSideMenu(false);setProfileDrop(false);}} style={{ position:"fixed",inset:0,zIndex:198,background:"transparent" }}/>}
      <nav style={{ background:"#fff",borderBottom:"1px solid var(--line)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",position:"sticky",top:0,zIndex:200,boxShadow:"0 1px 8px rgba(0,0,0,.05)" }}>
        {/* Left zone: hamburger (mobile only) + logo */}
        <div style={{ display:"flex",alignItems:"center",gap:4,flexShrink:0 }}>
          {/* ☰ hamburger — only visible on mobile via CSS */}
          <button className="ham-btn" onClick={()=>{ setSideMenu(o=>!o); setProfileDrop(false); }}
            style={{ display:"none",width:44,height:44,background:"none",border:"none",cursor:"pointer",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:0,flexShrink:0 }}>
            {[0,1,2].map(i=><span key={i} style={{ display:"block",width:20,height:2.5,borderRadius:99,background:"#374151",transition:"transform .25s,opacity .2s",transform:sideMenu&&i===0?"rotate(45deg) translate(5px,5.5px)":sideMenu&&i===2?"rotate(-45deg) translate(5px,-5.5px)":"none",opacity:sideMenu&&i===1?0:1 }}/>)}
          </button>
          {/* Logo */}
          <div onClick={()=>{ navTo("home"); setSideMenu(false); setProfileDrop(false); }} style={{ cursor:"pointer",display:"flex",alignItems:"baseline",gap:1 }}>
            <span style={{ ...T.serif,fontSize:"1.6rem",color:"#60A5FA" }}>Lab</span>
            <span style={{ ...T.serif,fontSize:"1.6rem",color:"#1E3A8A" }}>Ease</span>
            <sup style={{ fontSize:".58rem",color:"#9CA3AF",fontWeight:500,marginLeft:1 }}>™</sup>
          </div>
        </div>
        <div className="nav-desk" style={{ display:"flex",gap:4,alignItems:"center" }}>
          {[["home","Home"],["labs","Labs"]].map(([p,l])=>(<button key={p} className="nav-a" onClick={()=>navTo(p)} style={{ background:page===p?"var(--teal-pale)":"transparent",border:"none",cursor:"pointer",color:page===p?"var(--teal)":"var(--muted)",fontWeight:700,fontSize:".86rem",padding:"7px 15px",borderRadius:8,fontFamily:"'Manrope',sans-serif",transition:"color .15s,background .15s" }}>{l}</button>))}
          <UploadPrescription T={T}/>
          {user ? (<div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ display:"flex",alignItems:"center",gap:7,background:"#EFF6FF",borderRadius:50,padding:"5px 12px 5px 7px",border:"1.5px solid #BFDBFE" }}>
              <div style={{ width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#1158A6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><span style={{ color:"#fff",fontWeight:800,fontSize:".72rem" }}>{user.name.charAt(0).toUpperCase()}</span></div>
              <span style={{ fontWeight:700,fontSize:".82rem",color:"#1158A6",maxWidth:90,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{user.name.split(" ")[0]}</span>
            </div>
            <button onClick={handleLogout} className="btn-anim" style={{ background:"transparent",border:"1.5px solid #E5E7EB",borderRadius:50,padding:"6px 14px",fontWeight:700,fontSize:".78rem",color:"#6B7280",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s",whiteSpace:"nowrap" }} onMouseEnter={e=>{ e.currentTarget.style.background="#FEE2E2"; e.currentTarget.style.borderColor="#FCA5A5"; e.currentTarget.style.color="#DC2626"; }} onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="#E5E7EB"; e.currentTarget.style.color="#6B7280"; }}>Sign Out</button>
          </div>) : (<div style={{ display:"flex",gap:6,alignItems:"center" }}>
            <button onClick={()=>openAuth("login")} className="btn-anim" style={{ background:"transparent",border:"1.5px solid #BFDBFE",borderRadius:50,padding:"7px 16px",fontWeight:700,fontSize:".82rem",color:"#1158A6",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s",whiteSpace:"nowrap" }} onMouseEnter={e=>{ e.currentTarget.style.background="#EFF6FF"; e.currentTarget.style.borderColor="#1158A6"; }} onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="#BFDBFE"; }}>Log In</button>
            <button onClick={()=>openAuth("signup")} className="btn-anim" style={{ background:"#1158A6",border:"none",borderRadius:50,padding:"8px 18px",fontWeight:700,fontSize:".82rem",color:"#fff",cursor:"pointer",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",boxShadow:"0 2px 10px rgba(17,88,166,.25)" }}>Sign Up</button>
          </div>)}
          {cart.length>0&&<button onClick={()=>setCartOpen(true)} className="btn-anim" style={{ ...T.btn("#F59E0B"),borderRadius:50,padding:"8px 16px",fontSize:".84rem",marginLeft:4 }}>Cart ({cart.length}) · ₹{total.toLocaleString()}</button>}
        </div>
        <div className="nav-mob" style={{ display:"none",alignItems:"center",gap:4 }}>
          <div style={{ position:"relative" }}>
            <button onClick={()=>{ setProfileDrop(o=>!o); setSideMenu(false); }} style={{ width:44,height:44,background:profileDrop?"#EFF6FF":"none",border:profileDrop?"1.5px solid #DBEAFE":"none",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s" }}>
              {user ? <div style={{ width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#1158A6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ color:"#fff",fontWeight:800,fontSize:".74rem" }}>{user.name.charAt(0).toUpperCase()}</span></div>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            </button>
            {profileDrop&&<div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,background:"#fff",borderRadius:16,border:"1px solid #E8EEFF",boxShadow:"0 12px 40px rgba(0,0,0,.14)",minWidth:190,zIndex:300,overflow:"hidden" }}>
              {user&&<div style={{ padding:"13px 15px",background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",borderBottom:"1px solid #DBEAFE" }}><div style={{ fontWeight:800,fontSize:".87rem",color:"#0D1117" }}>{user.name}</div><div style={{ fontSize:".73rem",color:"#64748B",marginTop:2 }}>{user.email}</div></div>}
              {!user&&[["🔑","Log In",()=>{ setProfileDrop(false); openAuth("login"); }],["✨","Sign Up",()=>{ setProfileDrop(false); openAuth("signup"); }]].map(([ic,lbl,fn])=>(
                <button key={lbl} onClick={fn} style={{ display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 15px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".86rem",fontWeight:700,color:lbl==="Sign Up"?"#1158A6":"#374151",textAlign:"left",minHeight:44 }} onMouseEnter={e=>e.currentTarget.style.background="#F8FAFF"} onMouseLeave={e=>e.currentTarget.style.background="none"}><span>{ic}</span>{lbl}</button>
              ))}
              {[["📋","My Bookings"],["📄","My Reports"],["👤","Profile"]].map(([ic,lbl])=>(
                <button key={lbl} onClick={()=>setProfileDrop(false)} style={{ display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 15px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".86rem",fontWeight:600,color:"#374151",textAlign:"left",minHeight:44 }} onMouseEnter={e=>e.currentTarget.style.background="#F8FAFF"} onMouseLeave={e=>e.currentTarget.style.background="none"}><span>{ic}</span>{lbl}</button>
              ))}
              {user&&<div style={{ borderTop:"1px solid #F1F5F9" }}><button onClick={()=>{ setProfileDrop(false); handleLogout(); }} style={{ display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 15px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".86rem",fontWeight:700,color:"#DC2626",textAlign:"left",minHeight:44 }} onMouseEnter={e=>e.currentTarget.style.background="#FEF2F2"} onMouseLeave={e=>e.currentTarget.style.background="none"}><span>🚪</span>Sign Out</button></div>}
            </div>}
          </div>

        </div>
      </nav>
      <div style={{ position:"fixed",inset:0,zIndex:299,background:"rgba(0,0,0,.4)",backdropFilter:"blur(4px)",opacity:sideMenu?1:0,pointerEvents:sideMenu?"all":"none",transition:"opacity .28s ease" }} onClick={()=>setSideMenu(false)}/>
      <div style={{ position:"fixed",top:0,left:0,bottom:0,zIndex:400,width:"min(82vw,300px)",background:"#fff",boxShadow:"6px 0 32px rgba(0,0,0,.16)",display:"flex",flexDirection:"column",transform:sideMenu?"translateX(0)":"translateX(-100%)",transition:"transform .3s cubic-bezier(.22,1,.36,1)",overflowY:"auto" }}>
        <div style={{ padding:"18px 20px 14px",background:"linear-gradient(135deg,#1158A6,#0F2D6B)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0 }}>
          <div style={{ display:"flex",alignItems:"baseline",gap:2 }}><span style={{ ...T.serif,fontSize:"1.3rem",color:"#93C5FD",lineHeight:1 }}>Lab</span><span style={{ ...T.serif,fontSize:"1.3rem",color:"#fff",lineHeight:1 }}>Ease</span></div>
          <button onClick={()=>setSideMenu(false)} style={{ background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",color:"#fff",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ padding:"8px 0",flex:1 }}>
          {[["Home",()=>{ navTo("home"); setSideMenu(false); }],["Browse Labs",()=>{ navTo("labs"); setSideMenu(false); }],["Labs Near Me",()=>{ navTo("nearme"); setSideMenu(false); }],["Home Collection",()=>{ navTo("labs"); setSideMenu(false); }]].map(([lbl,fn])=>(
            <button key={lbl} onClick={fn} style={{ display:"block",width:"100%",padding:"13px 20px",background:"transparent",border:"none",borderLeft:"3px solid transparent",fontWeight:600,fontSize:".9rem",color:"#1F2937",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",transition:"all .12s",minHeight:48 }} onMouseEnter={e=>{ e.currentTarget.style.background="#F0F6FF"; e.currentTarget.style.borderLeftColor="#1158A6"; }} onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderLeftColor="transparent"; }}>{lbl}</button>
          ))}
          <div style={{ margin:"8px 16px",height:1,background:"#F1F5F9" }}/>
          {["Partner With Us","Contact Us","Help & Support","About Us"].map(lbl=>(
            <button key={lbl} onClick={()=>setSideMenu(false)} style={{ display:"block",width:"100%",padding:"11px 20px",background:"transparent",border:"none",fontWeight:500,fontSize:".84rem",color:"#6B7280",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",transition:"all .12s",minHeight:44 }} onMouseEnter={e=>{ e.currentTarget.style.color="#1158A6"; e.currentTarget.style.background="#F8FAFF"; }} onMouseLeave={e=>{ e.currentTarget.style.color="#6B7280"; e.currentTarget.style.background="transparent"; }}>{lbl}</button>
          ))}
        </div>
        <div style={{ padding:"14px 18px",borderTop:"1px solid #F1F5F9",flexShrink:0,display:"flex",flexDirection:"column",gap:10 }}>
          {user ? (<>
            <div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"#EFF6FF",borderRadius:12,border:"1px solid #DBEAFE" }}>
              <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#1158A6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><span style={{ color:"#fff",fontWeight:800,fontSize:".8rem" }}>{user.name.charAt(0).toUpperCase()}</span></div>
              <div><div style={{ fontWeight:700,color:"#1158A6",fontSize:".83rem" }}>{user.name}</div><div style={{ fontSize:".71rem",color:"#64748B" }}>{user.email}</div></div>
            </div>
            <button onClick={()=>{ handleLogout(); setSideMenu(false); }} style={{ width:"100%",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:10,padding:"11px",fontWeight:700,fontSize:".88rem",color:"#DC2626",cursor:"pointer",fontFamily:"'Manrope',sans-serif",minHeight:46 }}>Sign Out</button>
          </>) : (<>
            <button onClick={()=>{ openAuth("login"); setSideMenu(false); }} style={{ width:"100%",background:"transparent",border:"1.5px solid #1158A6",borderRadius:10,padding:"11px",fontWeight:700,fontSize:".9rem",color:"#1158A6",cursor:"pointer",fontFamily:"'Manrope',sans-serif",minHeight:46 }}>Log In</button>
            <button onClick={()=>{ openAuth("signup"); setSideMenu(false); }} style={{ width:"100%",background:"#1158A6",border:"none",borderRadius:10,padding:"11px",fontWeight:700,fontSize:".9rem",color:"#fff",cursor:"pointer",fontFamily:"'Manrope',sans-serif",boxShadow:"0 4px 14px rgba(17,88,166,.28)",minHeight:46 }}>Sign Up — Free</button>
          </>)}
        </div>
      </div>

      {page==="home"    && <Home/>}
      {page==="labs"    && <LabsPage/>}
      {page==="nearme"  && <NearMePage/>}
      {page==="lab"     && <LabDetail/>}
      {page==="booking" && <Booking/>}
      {page==="confirm" && <Confirm/>}

      {/* CART MODAL */}
      {cartOpen && (
        <Modal onClose={()=>setCartOpen(false)}>
          <div style={{ padding:26 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
              <h3 style={{ ...T.serif,fontSize:"1.25rem",color:"var(--ink)" }}>Your Cart ({cart.length})</h3>
              <button onClick={()=>setCartOpen(false)} style={{ background:"#F1F5F9",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:".95rem" }}>✕</button>
            </div>
            {cart.length===0 ? (
              <div style={{ textAlign:"center",padding:36,color:"#9CA3AF" }}>
                <IPackage s={56}/><div style={{ marginTop:10 }}>Cart is empty</div>
              </div>
            ) : (
              <>
                {cart.map(item=>(
                  <div key={item.tid} style={{ display:"flex",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #F9FAFB",gap:12 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,fontSize:".88rem",marginBottom:2 }}>{item.tname}</div>
                      <div style={{ color:"var(--muted)",fontSize:".75rem" }}>{item.lname}</div>
                    </div>
                    <div style={{ textAlign:"right",marginRight:8 }}>
                      <div style={{ fontWeight:900,color:"var(--teal)",fontSize:".98rem",fontFamily:"'DM Serif Display',serif" }}>₹{item.price}</div>
                      <div style={{ color:"#9CA3AF",fontSize:".74rem",textDecoration:"line-through" }}>₹{item.mrp}</div>
                    </div>
                    <button onClick={()=>delCart(item.tid)} style={{ background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,padding:"5px 11px",cursor:"pointer",fontSize:".76rem",fontFamily:"'Manrope',sans-serif",fontWeight:700 }}>Remove</button>
                  </div>
                ))}
                <div style={{ paddingTop:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",color:"#9CA3AF",fontSize:".82rem",marginBottom:3 }}>
                    <span>MRP Total</span><span style={{ textDecoration:"line-through" }}>₹{mrpTotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",color:"#1158A6",fontSize:".82rem",marginBottom:8,fontWeight:700 }}>
                    <span>You Save</span><span>−₹{saving.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:"1.08rem",marginBottom:18 }}>
                    <span>Total</span><span style={{ color:"var(--teal)",fontFamily:"'DM Serif Display',serif",fontSize:"1.22rem" }}>₹{total.toLocaleString()}</span>
                  </div>
                  <button onClick={()=>{ setCartOpen(false); navTo("booking"); }} className="btn-anim" style={{ ...T.btn(),width:"100%",justifyContent:"center",borderRadius:10 }}>
                    Proceed to Book →
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* AUTH MODAL */}
      {authOpen && (
        <div onClick={closeAuth} style={{ position:"fixed",inset:0,zIndex:5000,background:"rgba(13,17,25,.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(12px)",animation:"fadeIn .18s" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:24,width:"100%",maxWidth:420,fontFamily:"'Manrope',sans-serif",boxShadow:"0 32px 80px rgba(0,0,0,.28)",animation:"scaleIn .22s cubic-bezier(.34,1.56,.64,1)",overflow:"hidden" }}>

            {/* header */}
            <div style={{ background:"linear-gradient(135deg,#1158A6,#2563EB)",padding:"28px 28px 24px",position:"relative" }}>
              <button onClick={closeAuth} style={{ position:"absolute",top:16,right:16,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.18)",border:"none",cursor:"pointer",color:"#fff",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700 }}>✕</button>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
                <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.4rem",color:"#90C3F5" }}>Lab</span>
                <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.4rem",color:"#fff" }}>Ease</span>
                <sup style={{ fontSize:".52rem",color:"rgba(255,255,255,.5)",fontWeight:500 }}>™</sup>
              </div>
              <div style={{ color:"#fff",fontWeight:800,fontSize:"1.3rem",marginBottom:4 }}>{authMode==="login"?"Welcome back!":"Create your account"}</div>
              <div style={{ color:"rgba(255,255,255,.75)",fontSize:".83rem" }}>{authMode==="login"?"Sign in to manage bookings & reports":"Join thousands booking smarter"}</div>
              {/* tab switcher */}
              <div style={{ display:"flex",gap:0,background:"rgba(255,255,255,.15)",borderRadius:50,padding:4,marginTop:18,width:"fit-content" }}>
                {[["login","Log In"],["signup","Sign Up"]].map(([m,l])=>(
                  <button key={m} onClick={()=>{ setAuthMode(m); setAuthErr(""); }} style={{ background:authMode===m?"#fff":"transparent",color:authMode===m?"#1158A6":"rgba(255,255,255,.85)",border:"none",borderRadius:50,padding:"7px 22px",fontWeight:700,fontSize:".82rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .18s" }}>{l}</button>
                ))}
              </div>
            </div>

            {/* form */}
            <div style={{ padding:"24px 28px 28px" }}>
              {authMode==="signup" && (
                <>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:"block",fontWeight:700,fontSize:".78rem",color:"#374151",marginBottom:6 }}>Full Name</label>
                    <input value={authForm.name} onChange={e=>setAuthForm(f=>({...f,name:e.target.value}))} placeholder="Priya Sharma" style={{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"11px 14px",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",background:"#FAFAFA",color:"#111",display:"block",boxSizing:"border-box" }}/>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:"block",fontWeight:700,fontSize:".78rem",color:"#374151",marginBottom:6 }}>Phone Number</label>
                    <input value={authForm.phone} onChange={e=>setAuthForm(f=>({...f,phone:e.target.value}))} placeholder="+91 98765 43210" style={{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"11px 14px",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",background:"#FAFAFA",color:"#111",display:"block",boxSizing:"border-box" }}/>
                  </div>
                </>
              )}
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block",fontWeight:700,fontSize:".78rem",color:"#374151",marginBottom:6 }}>Email Address</label>
                <input type="email" value={authForm.email} onChange={e=>setAuthForm(f=>({...f,email:e.target.value}))} placeholder="you@example.com" style={{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"11px 14px",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",background:"#FAFAFA",color:"#111",display:"block",boxSizing:"border-box" }}/>
              </div>
              <div style={{ marginBottom:authErr?10:20 }}>
                <label style={{ display:"block",fontWeight:700,fontSize:".78rem",color:"#374151",marginBottom:6 }}>Password</label>
                <input type="password" value={authForm.password} onChange={e=>setAuthForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleAuth()} placeholder="Min 6 characters" style={{ width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"11px 14px",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",background:"#FAFAFA",color:"#111",display:"block",boxSizing:"border-box" }}/>
              </div>

              {authErr && (
                <div style={{ background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:9,padding:"9px 14px",marginBottom:16,color:"#DC2626",fontSize:".81rem",fontWeight:600,display:"flex",alignItems:"center",gap:7 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {authErr}
                </div>
              )}

              <button onClick={handleAuth} disabled={authLoading} className="btn-anim" style={{ width:"100%",background:authLoading?"#93C5FD":"#1158A6",color:"#fff",border:"none",borderRadius:12,padding:"13px",fontWeight:800,fontSize:".95rem",cursor:authLoading?"not-allowed":"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"background .2s",boxShadow:"0 4px 14px rgba(17,88,166,.3)" }}>
                {authLoading ? (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation:"spin .7s linear infinite",transformOrigin:"12px 12px" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Processing…</>
                ) : (
                  <>{authMode==="login"?"Sign In →":"Create Account →"}</>
                )}
              </button>

              <div style={{ textAlign:"center",marginTop:16,fontSize:".8rem",color:"#9CA3AF" }}>
                {authMode==="login" ? (
                  <>Don't have an account?{" "}<button onClick={()=>{ setAuthMode("signup"); setAuthErr(""); }} style={{ background:"none",border:"none",color:"#1158A6",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".8rem",padding:0 }}>Sign Up free</button></>
                ) : (
                  <>Already have an account?{" "}<button onClick={()=>{ setAuthMode("login"); setAuthErr(""); }} style={{ background:"none",border:"none",color:"#1158A6",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".8rem",padding:0 }}>Log In</button></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast} onDone={()=>setToast(null)}/>}
    </div>
  );
}
