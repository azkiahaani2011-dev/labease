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
    @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes blobPulse{ 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.08) translate(10px,-10px)} }
    .hero-stat-card { transition: transform .2s; }
    @media (max-width: 600px) { .hero-stat-card { display: none !important; } }
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
      section[style*="padding:"52px 0"] { padding-top: 36px !important; padding-bottom: 32px !important; }
      section[style*="padding:"56px 0"] { padding-top: 40px !important; padding-bottom: 36px !important; }
      section[style*="padding:"60px 0"] { padding-top: 40px !important; padding-bottom: 36px !important; }
      section[style*="padding:"64px 0"] { padding-top: 44px !important; padding-bottom: 40px !important; }

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
      .cta-section { padding: 48px 20px !important; }

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
    .hero-section { min-height: 520px; }
    .hero-img-col { display: flex; }
    @media (max-width: 767px) {
      .hero-section { min-height: 0 !important; }
      .hero-img-col { display: none !important; }
      .hero-content {
        padding-top: 32px !important;
        padding-bottom: 28px !important;
        padding-left: 12px !important;
        padding-right: 12px !important;
        gap: 16px !important;
        grid-template-columns: 1fr !important;
      }
      .hero-content h1 { font-size: 1.5rem !important; margin-bottom: 8px !important; line-height: 1.2 !important; }
      .hero-content p  { font-size: .82rem !important; margin-bottom: 16px !important; line-height: 1.55 !important; }
      .trust-badges { gap: 10px !important; margin-top: 14px !important; }
      .trust-badges > div:nth-child(2) { display: none !important; } /* hide dividers */
      .trust-badges > div:nth-child(4) { display: none !important; }
      /* search bar compact */
      .hero-search-bar { border-radius: 14px !important; }
      .hero-search-input-field { padding: 11px 6px 11px 0 !important; font-size: .85rem !important; }
      .hero-search-icon { margin: 0 12px !important; }
      .hero-search-btn { padding: 9px 16px !important; font-size: .78rem !important; margin: 5px !important; border-radius: 10px !important; }
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
      gap: 20px;
      position: relative;
    }
    @media (min-width: 541px) {
      .hiw-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
    }
    @media (min-width: 768px) {
      .hiw-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
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

/* ─── MEDIBUDDY-STYLE FLAT CIRCULAR ICONS ───────────────────────────────────── */
/* All icons: thin dark outlines (#1E293B), flat fills, soft pastel circle bg   */
const IBlood = ({ s = 60 }) => (
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
const IThyroid = ({ s = 60 }) => (
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
const IDiabetes = ({ s = 60 }) => (
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
const ICardiac = ({ s = 60 }) => (
  <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="36" fill="#FFE4E6"/>
    {/* heart outline */}
    <path d="M36 58C36 58 13 45 13 30C13 21 19 16 26 16C30 16 34 18.5 36 22C38 18.5 42 16 46 16C53 16 59 21 59 30C59 45 36 58 36 58Z" fill="#FECDD3" stroke="#1E293B" strokeWidth="1.5"/>
    {/* ECG wave across heart */}
    <polyline points="16,33 22,33 26,24 30,42 33,30 35,34 37,34 41,26 45,34 56,34" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IVitamin = ({ s = 60 }) => (
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
const IKidney = ({ s = 60 }) => (
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
const ILiver = ({ s = 60 }) => (
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
const IPackage = ({ s = 60 }) => (
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
  { q:"Is home sample collection really free?", a:"Yes. Home collection is completely free for eligible tests at participating labs. A certified phlebotomist arrives at your doorstep at your chosen time slot." },
  { q:"How soon will I receive my reports?", a:"Routine blood tests are typically ready the same day or within 2–6 hours. Specialised tests may take 24–72 hours. Exact turnaround times are listed for every test on our platform." },
  { q:"Are there hidden charges?", a:"Never. The price shown on LabEase is the final price you pay — inclusive of all taxes. No convenience fees, no surprises." },
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
/* flat SVG icons per lab — MediBuddy style */
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

const LAB_META = [
  { id:1, short:"Apollo", accent:"#0066CC", bg:"#EBF3FF", city:"Bangalore", tag:"India's #1 Network", since:"Est. 2001" },
  { id:2, short:"SRL",    accent:"#E8380D", bg:"#FEF1EE", city:"Mumbai",    tag:"Pan-India Chain",   since:"Est. 1995" },
  { id:3, short:"Metropolis", accent:"#6B21A8", bg:"#F5F0FF", city:"Hyderabad", tag:"Highest Rated",  since:"Est. 1980" },
  { id:4, short:"Dr Lal", accent:"#047857", bg:"#ECFDF5", city:"Delhi",     tag:"75+ Years Legacy",  since:"Est. 1949" },
  { id:5, short:"Thyrocare", accent:"#B45309", bg:"#FFFBEB", city:"Chennai", tag:"Specialist Lab",   since:"Est. 1996" },
  { id:6, short:"Vijaya", accent:"#0369A1", bg:"#F0F9FF", icon:"V", city:"Hyderabad", tag:"Radiology Expert",  since:"Est. 1981" },
];

const LabsNearMeSection = ({ T, navTo }) => (
  <section style={{ padding:"60px 0 56px", background:"#fff", borderBottom:"1px solid #F1F5F9" }}>
    <div style={{ maxWidth:1600, margin:"0 auto", padding:"0 24px" }}>

      {/* heading row: microscope left + text + button right */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>

        {/* left: illustration + text */}
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          {/* Premium hand + test tube illustration */}
          <div style={{ flexShrink:0, width:110, height:110, borderRadius:20, background:"#EEF4FB", border:"1px solid #C7DFF5", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(17,88,166,.1)" }}>
            <svg viewBox="0 0 110 115" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:88,height:88}}>
              {/* soft cloud blobs */}
              <ellipse cx="55" cy="75" rx="44" ry="32" fill="#D6EAF8" opacity="0.65"/>
              <ellipse cx="32" cy="65" rx="20" ry="16" fill="#D6EAF8" opacity="0.5"/>
              <ellipse cx="80" cy="60" rx="17" ry="13" fill="#D6EAF8" opacity="0.45"/>

              {/* ── BASE ── */}
              <rect x="22" y="97" width="58" height="12" rx="6" fill="#F87171" stroke="#1C2333" strokeWidth="2.4"/>
              {/* base highlight */}
              <rect x="28" y="99" width="42" height="4" rx="2" fill="#FECACA" opacity="0.6"/>

              {/* ── STEM (vertical pillar, slightly tapered) ── */}
              <path d="M46 95 L46 72 Q46 68 50 68 L54 68 Q58 68 58 72 L58 95Z" fill="#FC9D9D" stroke="#1C2333" strokeWidth="2.2" strokeLinejoin="round"/>

              {/* ── CURVED ARM (the iconic arch of a microscope) ── */}
              {/* filled arch shape */}
              <path d="M50 68 Q50 40 72 28 L80 28 Q80 26 78 24 Q54 34 46 68Z" fill="#F87171" stroke="#1C2333" strokeWidth="2.2" strokeLinejoin="round"/>
              {/* inner arch highlight */}
              <path d="M54 66 Q54 44 74 33" stroke="#FECACA" strokeWidth="4" strokeLinecap="round" opacity="0.55"/>

              {/* ── STAGE / SPECIMEN PLATFORM ── */}
              <rect x="18" y="72" width="50" height="9" rx="4.5" fill="#F87171" stroke="#1C2333" strokeWidth="2.2"/>
              {/* glass slide */}
              <rect x="24" y="74" width="32" height="5" rx="2.5" fill="#DBEAFE" stroke="#1C2333" strokeWidth="1.5"/>
              {/* stage clip */}
              <rect x="20" y="74.5" width="8" height="4" rx="2" fill="#FC9D9D" stroke="#1C2333" strokeWidth="1.5"/>

              {/* ── OBJECTIVE LENS TUBE (blue, angled down from arm) ── */}
              <rect x="72" y="20" width="13" height="30" rx="5" fill="#38BDF8" stroke="#1C2333" strokeWidth="2.2"/>
              {/* band on tube */}
              <rect x="72" y="30" width="13" height="7" rx="1" fill="#0EA5E9" stroke="#1C2333" strokeWidth="1.5"/>
              {/* lens tip */}
              <ellipse cx="78.5" cy="50" rx="6.5" ry="3.5" fill="#BAE6FD" stroke="#1C2333" strokeWidth="2"/>
              {/* lens shine */}
              <ellipse cx="76" cy="48" rx="2" ry="1.2" fill="white" opacity="0.6"/>

              {/* ── EYEPIECE (top, dark) ── */}
              <rect x="74" y="8" width="9" height="15" rx="4" fill="#475569" stroke="#1C2333" strokeWidth="2.2"/>
              <rect x="76" y="5" width="5" height="7" rx="2.5" fill="#334155" stroke="#1C2333" strokeWidth="2"/>
              {/* eyepiece shine */}
              <circle cx="76" cy="11" r="1.2" fill="white" opacity="0.55"/>

              {/* ── FOCUS KNOB ── */}
              <circle cx="47" cy="76" r="5.5" fill="#FECACA" stroke="#1C2333" strokeWidth="2"/>
              <circle cx="47" cy="76" r="2.2" fill="#F87171"/>

              {/* ── DECORATIVE DOTS ── */}
              <circle cx="18" cy="40" r="3" fill="#A5B4FC" opacity="0.6"/>
              <circle cx="96" cy="30" r="2.5" fill="#FCA5A5" opacity="0.55"/>
              <circle cx="92" cy="92" r="2" fill="#6EE7B7" opacity="0.6"/>
            </svg>
          </div>
          {/* text */}
          <div>
            <p style={{ fontSize:".72rem",fontWeight:700,color:"#1158A6",letterSpacing:".12em",textTransform:"uppercase",marginBottom:8 }}>VERIFIED PARTNERS</p>
            <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.4rem,3vw,1.9rem)",fontWeight:900,color:"#0D1117",letterSpacing:"-.03em",lineHeight:1.15,marginBottom:6 }}>Our Trusted Labs</h2>
            <p style={{ color:"#64748B",fontSize:".88rem",lineHeight:1.6,maxWidth:420 }}>NABL-accredited diagnostic centres with verified pricing and free home collection across India.</p>
          </div>
        </div>

        {/* right: button */}
        <button onClick={()=>navTo("labs")}
          style={{ flexShrink:0,background:"transparent",color:"#1158A6",border:"1.5px solid #1158A6",borderRadius:50,padding:"12px 28px",fontWeight:700,fontSize:".86rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:8,transition:"all .18s",whiteSpace:"nowrap" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="#EFF6FF"; e.currentTarget.style.transform="translateY(-1px)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateY(0)"; }}>
          View All Labs
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </button>
      </div>

    </div>
  </section>
)


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
  const [labSugOpen, setLabSugOpen] = useState(false);
  const labSearchRef = React.useRef(null);

  React.useEffect(() => {
    const h = e => { if(labSearchRef.current && !labSearchRef.current.contains(e.target)) setLabSugOpen(false); };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);

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

  const labSuggestions = searchQ.trim().length < 1 ? [] :
    enriched.filter(l => l.name.toLowerCase().includes(searchQ.toLowerCase()) || (l.area||"").toLowerCase().includes(searchQ.toLowerCase())).slice(0,5);

  const filtered = enriched
    .filter(l => !filterOpen || l.open)
    .filter(l => !filterHome || l.homecoll)
    .filter(l => !filterNabl || l.nabl)
    .filter(l => !searchQ || l.name.toLowerCase().includes(searchQ.toLowerCase()) || l.address.toLowerCase().includes(searchQ.toLowerCase()))
    .sort((a,b) =>
      sortBy === "rating" ? b.rating - a.rating :
      sortBy === "price"  ? (a.tests?.length ? Math.min(...a.tests.map(t=>t.price)) : 9999) - (b.tests?.length ? Math.min(...b.tests.map(t=>t.price)) : 9999) :
      (parseFloat(a.dist) || 9999) - (parseFloat(b.dist) || 9999)
    );

  return (
    <div style={{ minHeight:"100vh", background:"#F5F7FA", fontFamily:"'Manrope',sans-serif" }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ background:"#fff", borderBottom:"1px solid var(--line)", padding:"20px 0" }}>
        <div style={{ ...T.wrap }}>
          <button onClick={()=>navTo("home")} style={{ background:"#EFF6FF",border:"1px solid #BFDBFE",color:"#1158A6",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",padding:"8px 16px",marginBottom:16,display:"inline-flex",alignItems:"center",gap:6,borderRadius:50 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>
            Back to Home
          </button>
          <div className="labs-header-row">
            <div>
              <h1 style={{ ...T.serif, fontSize:"clamp(1.4rem,3vw,1.9rem)", color:"var(--ink)", marginBottom:4, letterSpacing:"-.01em" }}>All Labs</h1>
              <p style={{ color:"var(--muted)", fontSize:".84rem" }}>
                {filtered.length} lab{filtered.length!==1?"s":""} found ·
                <span style={{ color:"#1158A6", fontWeight:700 }}> {enriched.filter(l=>l.open).length} open now</span>
              </p>
            </div>
            <div className="labs-sort-row">
              {/* sort — leftmost */}
              <span style={{ fontSize:".8rem",color:"var(--muted)",fontWeight:600 }}>Sort:</span>
              <div style={{ display:"flex", gap:"8px" }}>
                {[["rating","Rating"],["price","Price"],["dist","Distance"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setSortBy(v)}
                    style={{ background:sortBy===v?"var(--teal)":"#fff",color:sortBy===v?"#fff":"var(--muted)",border:`1px solid ${sortBy===v?"var(--teal)":"var(--line)"}`,borderRadius:20,padding:"5px 13px",fontSize:".76rem",fontWeight:700,cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }}>
                    {l}
                  </button>
                ))}
              </div>
              {/* divider */}
              <div style={{ width:1, height:22, background:"#E5E7EB", flexShrink:0 }}/>
              {/* search */}
              <div style={{ position:"relative" }} ref={labSearchRef}>
                <svg style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.7"/><path d="M13.5 13.5L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.7" strokeLinecap="round"/></svg>
                <input className="labs-search-input" value={searchQ} onChange={e=>{ setSearchQ(e.target.value); setLabSugOpen(true); }} placeholder="Search labs…" style={{ paddingLeft:28,paddingRight:12,paddingTop:8,paddingBottom:8,border:"1.5px solid #E5E7EB",borderRadius:50,fontSize:".82rem",fontFamily:"'Manrope',sans-serif",outline:"none",width:200,background:"#FAFAFA",color:"#111",boxShadow:"none" }}
                  onFocus={e=>{ e.target.style.border="1.5px solid #E5E7EB"; setLabSugOpen(true); }}
                  onBlur={e=>{ e.target.style.border="1.5px solid #E5E7EB"; }}/>
                {labSugOpen && searchQ.trim().length>0 && labSuggestions.length>0 && (
                  <div style={{ position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",borderRadius:12,border:"1px solid #E5E7EB",boxShadow:"0 8px 28px rgba(0,0,0,.1)",zIndex:200,overflow:"hidden" }}>
                    {labSuggestions.map((l,i)=>(
                      <button key={l.id} onClick={()=>{ setSearchQ(l.name); setLabSugOpen(false); }} style={{ display:"block",width:"100%",padding:"9px 14px",background:"none",border:"none",borderBottom:i<labSuggestions.length-1?"1px solid #F3F4F6":"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",textAlign:"left",fontSize:".84rem",fontWeight:600,color:"#111",transition:"background .1s" }} onMouseEnter={e=>e.currentTarget.style.background="#F0F6FF"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                        {l.name}
                        <span style={{ fontSize:".72rem",color:"#9CA3AF",fontWeight:400,marginLeft:6 }}>{l.area}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
  const [showAllTests, setShowAllTests] = React.useState(false);
  const TESTS_LIMIT = 6;
  React.useEffect(()=>{ setShowAllTests(false); }, [catF, testQ]);
  const visibleTests = showAllTests ? filtTests : filtTests.slice(0, TESTS_LIMIT);
  return (
  <div style={{ minHeight:"80vh" }}>
    {/* sticky header */}
    <div style={{ background:"#fff",borderBottom:"1px solid var(--line)",position:"sticky",top:64,zIndex:50 }}>
      <div style={{ ...T.wrap,padding:"18px 12px" }}>
        <button onClick={()=>navTo("labs")} style={{ background:"#EFF6FF",border:"1px solid #BFDBFE",color:"#1158A6",fontWeight:700,cursor:"pointer",fontSize:".84rem",fontFamily:"'Manrope',sans-serif",padding:"8px 16px",marginBottom:12,display:"inline-flex",alignItems:"center",gap:6,borderRadius:50 }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>← All Labs</button>
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

    <div style={{ ...T.wrap,padding:"26px 12px" }}>
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
        <div className="test-header" style={{ display:"grid",gridTemplateColumns:"1fr 100px 100px 110px",padding:"12px 20px",background:"#F8FAFC",borderBottom:"1px solid var(--line)",fontSize:".74rem",fontWeight:700,color:"var(--muted)",letterSpacing:".07em",textTransform:"uppercase",gap:16,alignItems:"center" }}>
          <span>Test Name</span>
          <span style={{ textAlign:"center" }}>Price</span>
          <span style={{ textAlign:"center" }}>MRP</span>
          <span style={{ textAlign:"center" }}>Action</span>
        </div>

        {filtTests.length===0 ? (
          <div style={{ padding:48,textAlign:"center",color:"#94A3B8" }}>
            <IBlood s={56}/><div style={{ marginTop:10 }}>No tests found.</div>
          </div>
        ) : visibleTests.map(t=>{
          const added=has(t.id); const d=pct(t.price,t.mrp); const Icon=ICONS[t.cat];
          return (
            <div key={t.id} className="test-row" style={{ display:"grid",gridTemplateColumns:"1fr auto auto auto",padding:"12px 16px",borderBottom:"1px solid #F9FAFB",alignItems:"center",gap:12,transition:"background .14s" }}>
              {/* Test name + cat */}
              <div style={{ display:"flex",alignItems:"center",gap:8,minWidth:0 }}>
                {Icon && <Icon s={26}/>}
                <div style={{ minWidth:0 }}>
                  <div style={{ fontWeight:700,color:"var(--ink)",fontSize:".92rem",marginBottom:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{t.name}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                    <span style={{ background:`${lab.color}18`,color:lab.color,borderRadius:20,padding:"1px 7px",fontSize:".62rem",fontWeight:700,whiteSpace:"nowrap" }}>{t.cat}</span>
                    <span style={{ fontSize:".62rem",color:"var(--muted)",whiteSpace:"nowrap" }}>{t.time}</span>
                  </div>
                </div>
              </div>
              {/* Price */}
              <div style={{ textAlign:"center",fontWeight:900,color:"var(--teal)",fontSize:"1.05rem",fontFamily:"'DM Serif Display',serif",whiteSpace:"nowrap" }}>₹{t.price}</div>
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
        {filtTests.length > TESTS_LIMIT && (
          <button onClick={()=>setShowAllTests(v=>!v)} style={{ display:"block",width:"100%",padding:"14px 20px",background:"#F8FAFC",border:"none",borderTop:"1px solid var(--line)",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".84rem",fontWeight:700,color:"#1158A6",textAlign:"center",transition:"background .14s" }} onMouseEnter={e=>e.currentTarget.style.background="#EFF6FF"} onMouseLeave={e=>e.currentTarget.style.background="#F8FAFC"}>
            {showAllTests ? "Show Less ↑" : `Show ${filtTests.length - TESTS_LIMIT} More Tests ↓`}
          </button>
        )}
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
    <section style={{ padding:"52px 0 48px", background:"#F8FAFC", borderTop:"1px solid #E2E8F0", borderBottom:"1px solid #E2E8F0" }}>
      <div style={{ maxWidth:1600, margin:"0 auto", padding:"0 24px" }}>
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

  const go = (text) => { if(!text.trim()) return; setQ(text); setLabQ(text); setOpen(false); navTo("labs"); };


  return (
    <div ref={wrapRef} style={{ position:"relative", maxWidth:580, width:"100%", margin:"0 auto" }}>
      {/* Search bar */}
      <div className="hero-search-bar" style={{ background:"#fff",borderRadius:50,display:"flex",alignItems:"center",boxShadow:"0 4px 24px rgba(17,88,166,.13)",overflow:"hidden" }}>
        <svg className="hero-search-icon" style={{ flexShrink:0,margin:"0 18px" }} width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="8.5" cy="8.5" r="5.75" stroke="#9CA3AF" strokeWidth="1.8"/>
          <path d="M13.5 13.5 L17.5 17.5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
          value={q}
          onChange={e=>{ setQ(e.target.value); setOpen(true); }}
          onFocus={()=>setOpen(true)}
          onKeyDown={e=>{ if(e.key==="Enter"){ go(q); } if(e.key==="Escape") setOpen(false); }}
          placeholder="Search tests, packages or labs…"
          className="hero-search-input-field"
          style={{ flex:1,border:"none",outline:"none",padding:"15px 8px 15px 0",fontSize:".95rem",color:"#111",fontFamily:"'Manrope',sans-serif",background:"transparent" }}
          autoComplete="off"
        />
        {q && (
          <button onClick={()=>{ setQ(""); setOpen(false); }}
            style={{ background:"none",border:"none",cursor:"pointer",padding:"0 8px",color:"#9CA3AF",fontSize:"1rem",display:"flex",alignItems:"center",flexShrink:0 }}>
            ✕
          </button>
        )}
        <button onClick={()=>go(q)} className="btn-anim hero-search-btn"
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
    wrap:{ maxWidth:1600,margin:"0 auto",padding:"0 24px" },
    card:{ background:"#fff",borderRadius:18,boxShadow:"var(--card-shadow)" },
    serif:{ fontFamily:"'DM Serif Display',serif" },
  };

  /* ═══════════════════════════════════════════════════════════════
     HOME PAGE
  ═══════════════════════════════════════════════════════════════ */
  const Home = () => {
    const [q,setQ]       = useState("");
    const [faq,setFaq]   = useState(null);
    const [gridCols, setGridCols] = useState(window.innerWidth <= 600 ? 2 : 3);
    useEffect(() => {
      const h = () => setGridCols(window.innerWidth <= 600 ? 2 : 3);
      window.addEventListener("resize", h);
      return () => window.removeEventListener("resize", h);
    }, []);

    return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-section" style={{ background:"linear-gradient(130deg,#F0F6FF 0%,#EBF3FB 45%,#E8F0FA 100%)", minHeight:520, position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
        {/* background geometric accents */}
        <div style={{ position:"absolute",right:-120,top:-120,width:480,height:480,borderRadius:"50%",background:"rgba(17,88,166,.05)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",left:-60,bottom:-80,width:320,height:320,borderRadius:"50%",background:"rgba(17,88,166,.04)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",right:180,top:30,width:14,height:14,borderRadius:"50%",background:"#1158A6",opacity:.12,pointerEvents:"none" }}/>
        <div style={{ position:"absolute",right:240,top:80,width:8,height:8,borderRadius:"50%",background:"#1158A6",opacity:.1,pointerEvents:"none" }}/>
        <div style={{ position:"absolute",left:80,top:50,width:10,height:10,borderRadius:"50%",background:"#059669",opacity:.15,pointerEvents:"none" }}/>

        <div className="hero-content" style={{ maxWidth:1600,margin:"0 auto",position:"relative",zIndex:2,paddingTop:72,paddingBottom:72,paddingLeft:24,paddingRight:24,width:"100%",boxSizing:"border-box",display:"grid",gridTemplateColumns:"1fr",alignItems:"center",gap:40 }}>
          {/* ── LEFT: text content ── */}
          <div style={{ maxWidth:580,width:"100%",boxSizing:"border-box",margin:"0 auto",textAlign:"center" }}>
            {/* eyebrow pill */}
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#fff",borderRadius:50,padding:"5px 16px 5px 8px",marginBottom:24,boxShadow:"0 2px 14px rgba(17,88,166,.1)",border:"1px solid #DBEAFE",maxWidth:"100%",flexWrap:"wrap" }}>
              <span style={{ background:"linear-gradient(90deg,#1158A6,#2563EB)",borderRadius:50,padding:"3px 12px",fontSize:".63rem",fontWeight:800,color:"#fff",letterSpacing:".07em",flexShrink:0 }}>NEW</span>
              <span style={{ color:"#1158A6",fontSize:".73rem",fontWeight:700 }}>Home sample collection now available 24/7</span>
            </div>

            {/* headline */}
            <h1 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.85rem,3.8vw,2.85rem)",color:"#0A1628",lineHeight:1.16,marginBottom:14,fontWeight:900,letterSpacing:"-.03em" }}>
              Book Lab Tests from<br/>
              <span style={{ background:"linear-gradient(90deg,#1158A6 0%,#2563EB 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Trusted Labs Near You</span>
            </h1>

            {/* sub */}
            <p style={{ color:"#5A6478",fontSize:".96rem",lineHeight:1.78,marginBottom:32,maxWidth:460,margin:"0 auto 32px" }}>
              Compare prices across 6 NABL-accredited labs. Free home collection, transparent pricing, digital reports in hours.
            </p>

            {/* ── SEARCH BAR with dropdown ── */}
            <HeroSearch q={q} setQ={setQ} setLabQ={setLabQ} navTo={navTo} T={T}/>

            {/* quick chips */}
            <div style={{ display:"flex",gap:8,marginTop:18,flexWrap:"wrap",alignItems:"center",justifyContent:"center" }}>
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

          </div>

          {/* ── RIGHT: hidden ── */}
          <div style={{ display:"none" }}>
            <svg viewBox="0 0 340 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",maxWidth:340}}>
              {/* soft background blob */}
              <ellipse cx="175" cy="240" rx="155" ry="188" fill="#EBF4FF"/>
              <ellipse cx="170" cy="250" rx="128" ry="158" fill="#F0F7FF" opacity="0.7"/>

              {/* floating icon circles */}
              {/* stethoscope */}
              <circle cx="298" cy="82" r="30" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5"/>
              <path d="M290 72 Q285 83 288 90 Q291 97 298 95 Q305 93 307 86 Q310 76 303 73" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <circle cx="303" cy="73" r="5" fill="none" stroke="#1E293B" strokeWidth="1.8"/>
              <circle cx="298" cy="95" r="6" fill="#1E293B"/>
              <circle cx="298" cy="95" r="2.5" fill="#94A3B8"/>
              {/* clipboard */}
              <circle cx="44" cy="105" r="28" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5"/>
              <rect x="34" y="93" width="20" height="26" rx="3" fill="none" stroke="#1E293B" strokeWidth="1.5"/>
              <rect x="39" y="89" width="10" height="7" rx="2" fill="#fff" stroke="#1E293B" strokeWidth="1"/>
              <line x1="38" y1="104" x2="50" y2="104" stroke="#CBD5E1" strokeWidth="1.5"/>
              <line x1="38" y1="110" x2="50" y2="110" stroke="#CBD5E1" strokeWidth="1.5"/>
              <line x1="38" y1="116" x2="46" y2="116" stroke="#CBD5E1" strokeWidth="1.5"/>
              {/* test tube */}
              <circle cx="302" cy="348" r="26" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5"/>
              <rect x="294" y="333" width="16" height="36" rx="8" fill="none" stroke="#1E293B" strokeWidth="1.5"/>
              <path d="M294 355 Q294 368 302 370 Q310 368 310 355 Z" fill="#93C5FD"/>
              <line x1="292" y1="333" x2="314" y2="333" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
              {/* DNA */}
              <circle cx="40" cy="348" r="24" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5"/>
              <path d="M31 338 Q40 344 49 338" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M31 348 Q40 354 49 348" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M31 358 Q40 364 49 358" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <line x1="36" y1="338" x2="36" y2="358" stroke="#CBD5E1" strokeWidth="1"/>
              <line x1="44" y1="338" x2="44" y2="358" stroke="#CBD5E1" strokeWidth="1"/>

              {/* PERSON */}
              {/* legs */}
              <rect x="138" y="360" width="28" height="62" rx="12" fill="#475569" stroke="#1E293B" strokeWidth="1.2"/>
              <rect x="172" y="360" width="28" height="62" rx="12" fill="#374151" stroke="#1E293B" strokeWidth="1.2"/>
              <ellipse cx="152" cy="420" rx="22" ry="9" fill="#1E293B"/>
              <ellipse cx="186" cy="420" rx="22" ry="9" fill="#1E293B"/>

              {/* lab coat body */}
              <path d="M106 205 Q106 182 170 178 Q234 182 234 205 L242 368 H98 Z" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
              {/* coat inner - blue shirt */}
              <path d="M158 181 L140 212 L170 224 L200 212 L182 181 Z" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1"/>
              {/* lapels */}
              <path d="M158 181 L138 208 L170 218" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M182 181 L202 208 L170 218" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

              {/* stethoscope on coat */}
              <path d="M152 196 Q133 248 137 272 Q141 294 170 288 Q199 282 203 258 Q207 230 190 208" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="190" cy="206" r="9" fill="none" stroke="#475569" strokeWidth="2"/>
              <circle cx="170" cy="288" r="10" fill="#475569"/>
              <circle cx="170" cy="288" r="4.5" fill="#94A3B8"/>

              {/* pocket */}
              <rect x="186" y="264" width="34" height="40" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1.5"/>
              <rect x="194" y="256" width="5" height="26" rx="2.5" fill="#1158A6" stroke="#1E293B" strokeWidth="0.5"/>
              <rect x="203" y="256" width="5" height="26" rx="2.5" fill="#EF4444" stroke="#1E293B" strokeWidth="0.5"/>

              {/* red cross badge */}
              <circle cx="122" cy="204" r="17" fill="#FEE2E2" stroke="#1E293B" strokeWidth="1.5"/>
              <rect x="119" y="197" width="6" height="14" rx="1" fill="#EF4444"/>
              <rect x="115" y="201" width="14" height="6" rx="1" fill="#EF4444"/>

              {/* right arm — test tube */}
              <path d="M232 216 Q266 235 262 282" stroke="white" strokeWidth="32" strokeLinecap="round" fill="none"/>
              <path d="M232 216 Q266 235 262 282" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <ellipse cx="260" cy="293" rx="15" ry="13" fill="#FDDCB5" stroke="#1E293B" strokeWidth="1"/>
              {/* test tube */}
              <rect x="267" y="268" width="16" height="48" rx="8" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
              <path d="M269 295 Q268 314 275 317 Q282 314 281 295 Z" fill="#93C5FD"/>
              <line x1="265" y1="268" x2="285" y2="268" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>

              {/* left arm — clipboard */}
              <path d="M108 216 Q78 246 76 280" stroke="white" strokeWidth="30" strokeLinecap="round" fill="none"/>
              <path d="M108 216 Q78 246 76 280" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              {/* clipboard */}
              <rect x="46" y="248" width="56" height="70" rx="8" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
              <rect x="60" y="240" width="28" height="14" rx="4" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1"/>
              <line x1="54" y1="270" x2="94" y2="270" stroke="#E2E8F0" strokeWidth="1.5"/>
              <line x1="54" y1="280" x2="94" y2="280" stroke="#E2E8F0" strokeWidth="1.5"/>
              <line x1="54" y1="290" x2="80" y2="290" stroke="#E2E8F0" strokeWidth="1.5"/>
              <rect x="54" y="298" width="12" height="9" rx="2" fill="#22C55E"/>

              {/* HEAD */}
              <circle cx="170" cy="130" r="55" fill="#FDDCB5" stroke="#1E293B" strokeWidth="1.5"/>
              {/* ears */}
              <ellipse cx="115" cy="132" rx="9" ry="13" fill="#FDDCB5" stroke="#1E293B" strokeWidth="1.2"/>
              <ellipse cx="225" cy="132" rx="9" ry="13" fill="#FDDCB5" stroke="#1E293B" strokeWidth="1.2"/>
              {/* hair */}
              <path d="M115 120 Q115 74 170 71 Q225 74 225 120 L221 106 Q204 78 170 76 Q136 78 119 106 Z" fill="#2C1A0E" stroke="#1E293B" strokeWidth="1"/>
              {/* eyes */}
              <ellipse cx="152" cy="130" rx="8" ry="9" fill="white" stroke="#1E293B" strokeWidth="1.2"/>
              <ellipse cx="188" cy="130" rx="8" ry="9" fill="white" stroke="#1E293B" strokeWidth="1.2"/>
              <circle cx="154" cy="132" r="5" fill="#1E293B"/>
              <circle cx="190" cy="132" r="5" fill="#1E293B"/>
              <circle cx="156" cy="130" r="2" fill="white"/>
              <circle cx="192" cy="130" r="2" fill="white"/>
              {/* eyebrows */}
              <path d="M143 119 Q152 114 161 119" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <path d="M179 119 Q188 114 197 119" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              {/* smile */}
              <path d="M158 147 Q170 157 182 147" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              {/* glasses */}
              <circle cx="152" cy="130" r="13" fill="none" stroke="#475569" strokeWidth="1.8"/>
              <circle cx="188" cy="130" r="13" fill="none" stroke="#475569" strokeWidth="1.8"/>
              <line x1="165" y1="130" x2="175" y2="130" stroke="#475569" strokeWidth="1.8"/>
              <line x1="139" y1="126" x2="128" y2="123" stroke="#475569" strokeWidth="1.8"/>
              <line x1="201" y1="126" x2="212" y2="123" stroke="#475569" strokeWidth="1.8"/>
            </svg>

            {/* floating badge: NABL */}
            <div style={{ position:"absolute",top:28,left:0,background:"#fff",borderRadius:12,padding:"9px 14px",boxShadow:"0 6px 20px rgba(0,0,0,.1)",display:"flex",alignItems:"center",gap:8,border:"1px solid #DCFCE7" }}>
              <div style={{ width:26,height:26,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6 5,9 10,3"/></svg>
              </div>
              <div><div style={{ fontWeight:800,fontSize:".7rem",color:"#0D1117",lineHeight:1 }}>NABL Certified</div><div style={{ fontSize:".6rem",color:"#6B7280",marginTop:1 }}>100% accuracy</div></div>
            </div>
            {/* floating badge: reports */}
            <div style={{ position:"absolute",bottom:36,left:0,background:"#fff",borderRadius:12,padding:"9px 14px",boxShadow:"0 6px 20px rgba(0,0,0,.1)",display:"flex",alignItems:"center",gap:8,border:"1px solid #DBEAFE" }}>
              <div style={{ width:26,height:26,borderRadius:"50%",background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1158A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div><div style={{ fontWeight:800,fontSize:".7rem",color:"#0D1117",lineHeight:1 }}>Reports in 6 hrs</div><div style={{ fontSize:".6rem",color:"#6B7280",marginTop:1 }}>via WhatsApp & email</div></div>
            </div>
            {/* floating badge: rating */}
            <div style={{ position:"absolute",bottom:36,right:0,background:"#1158A6",borderRadius:12,padding:"9px 14px",boxShadow:"0 6px 20px rgba(17,88,166,.3)",display:"flex",alignItems:"center",gap:6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#FCD34D" stroke="#FCD34D" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <div><div style={{ fontWeight:800,fontSize:".7rem",color:"#fff",lineHeight:1 }}>4.9 / 5 Rating</div><div style={{ fontSize:".6rem",color:"rgba(255,255,255,.75)",marginTop:1 }}>50,000+ patients</div></div>
            </div>
          </div>

        </div>

      </section>



      {/* ── TRUSTED LABS ─────────────────────────────────────────── */}
      <LabsNearMeSection T={T} navTo={navTo} setLab={setLab} setCatF={setCatF} setTestQ={setTestQ}/>

      {/* ── POPULAR TESTS ────────────────────────────────────────── */}
      <PopularTestsCarousel setCatF={setCatF} navTo={navTo}/>

      {/* ── FEATURED HEALTH CHECKUPS ─────────────────────────────── */}
      <section style={{ padding:"64px 0 60px",background:"#F8FAFC",borderBottom:"1px solid #F1F5F9" }}>
        <div style={T.wrap}>
          {/* Header */}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:12 }}>
            <div>
              <p style={{ fontSize:".72rem",fontWeight:700,color:"#1158A6",letterSpacing:".12em",textTransform:"uppercase",marginBottom:8 }}>HEALTH PACKAGES</p>
              <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.4rem,3vw,1.9rem)",fontWeight:900,color:"#0D1117",marginBottom:6,letterSpacing:"-.03em",lineHeight:1.15 }}>Featured Health Checkups</h2>
              <p style={{ color:"#64748B",fontSize:".88rem",lineHeight:1.6 }}>Curated by India's top doctors. Comprehensive screening at unbeatable prices.</p>
            </div>
            <button onClick={()=>navTo("labs")}
              style={{ background:"transparent",color:"#1158A6",border:"1.5px solid #1158A6",borderRadius:50,padding:"12px 28px",fontWeight:700,fontSize:".86rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",whiteSpace:"nowrap",transition:"all .18s",minHeight:44,display:"flex",alignItems:"center",gap:8 }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#0D1117"; e.currentTarget.style.transform="translateY(0)"; }}>
              View All Packages →
            </button>
          </div>

          {/* 6-card grid */}
          <div className="featured-grid" style={{ display:"grid", gridTemplateColumns:`repeat(${gridCols},1fr)`, gap:gridCols===2?10:16 }}>
            {[
              { title:"Full Body Checkup",  sub:"65+ Tests · NABL Certified",   price:1999, mrp:3499, off:43, badge:"Most Popular",  badgeColor:"#EF4444", img:"https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=700&q=85&auto=format&fit=crop" },
              { title:"Diabetes Care",      sub:"12 Tests · NABL Certified",    price:399,  mrp:899,  off:56, badge:"55% OFF",       badgeColor:"#EA580C", img:"https://images.unsplash.com/photo-1550831107-1553da8c8464?w=700&q=85&auto=format&fit=crop" },
              { title:"Heart Health",       sub:"22 Tests · NABL Certified",    price:1799, mrp:2999, off:40, badge:"Cardiology",    badgeColor:"#1158A6", img:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=85&auto=format&fit=crop" },
              { title:"Thyroid Profile",    sub:"T3, T4, TSH · NABL Certified", price:399,  mrp:799,  off:50, badge:"NABL",          badgeColor:"#0369A1", img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=85&auto=format&fit=crop" },
              { title:"Women's Wellness",   sub:"40+ Tests · NABL Certified",   price:2299, mrp:3999, off:43, badge:"For Women",     badgeColor:"#9333EA", img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85&auto=format&fit=crop" },
              { title:"Senior Citizen",     sub:"55+ Tests · NABL Certified",   price:2499, mrp:4499, off:44, badge:"45% OFF",       badgeColor:"#EA580C", img:"https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=700&q=85&auto=format&fit=crop" },
            ].map((pkg,i)=>(
              <div key={pkg.title}
                style={{ background:"#fff",borderRadius:20,overflow:"hidden",cursor:"pointer",display:"flex",flexDirection:"column",boxShadow:"0 2px 16px rgba(0,0,0,.06)",transition:"all .25s ease",border:"1px solid #F1F5F9" }}
                onClick={()=>navTo("labs")}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,.06)"; }}>
                <div style={{ position:"relative",height:gridCols===2?95:160,overflow:"hidden",flexShrink:0 }}>
                  <img src={pkg.img} alt={pkg.title}
                    style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .5s ease" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.07)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                    onError={e=>{ e.target.style.display="none"; e.target.parentNode.style.background=`linear-gradient(135deg,${pkg.badgeColor}22,${pkg.badgeColor}08)`; }}/>
                  <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.45) 0%,transparent 60%)" }}/>
                  <div style={{ position:"absolute",top:6,left:6,background:pkg.badgeColor,color:"#fff",borderRadius:6,padding:gridCols===2?"2px 5px":"3px 10px",fontSize:".55rem",fontWeight:800 }}>{gridCols===2?pkg.off+"% OFF":pkg.badge}</div>
                  <div style={{ position:"absolute",bottom:gridCols===2?6:12,left:gridCols===2?6:12,right:gridCols===2?6:12,fontWeight:800,fontSize:gridCols===2?".72rem":".95rem",color:"#fff",lineHeight:1.2,textShadow:"0 1px 4px rgba(0,0,0,.4)" }}>{pkg.title}</div>
                </div>
                <div style={{ padding:gridCols===2?"8px 8px 10px":"14px 16px 16px",flex:1,display:"flex",flexDirection:"column",gap:gridCols===2?4:8 }}>
                  <div style={{ fontSize:gridCols===2?".6rem":".74rem",color:"#64748B",fontWeight:600 }}>{pkg.sub}</div>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:gridCols===2?3:6,flexWrap:"wrap",gap:gridCols===2?4:8 }}>
                    <div style={{ display:"flex",alignItems:"baseline",gap:3 }}>
                      <span style={{ fontWeight:900,fontSize:gridCols===2?".82rem":"1.1rem",color:"#0D1117",fontFamily:"'Manrope',sans-serif" }}>₹{pkg.price.toLocaleString()}</span>
                      <span style={{ fontSize:gridCols===2?".6rem":".76rem",color:"#CBD5E1",textDecoration:"line-through" }}>₹{pkg.mrp.toLocaleString()}</span>
                    </div>
                    <button onClick={e=>{ e.stopPropagation(); navTo("labs"); }}
                      style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:7,padding:gridCols===2?"5px 8px":"8px 18px",fontWeight:700,fontSize:gridCols===2?".62rem":".8rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .15s",whiteSpace:"nowrap" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#0F2D6B"}
                      onMouseLeave={e=>e.currentTarget.style.background="#1158A6"}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{ padding:"60px 0 68px", background:"#fff", borderBottom:"1px solid #F1F5F9" }}>
        <div style={T.wrap}>

          {/* MediBuddy-style illustrated promo cards */}
          <div className="promo-grid">
            {/* Card 1 — Home Sample Pickup */}
            <div style={{ borderRadius:20,overflow:"hidden",background:"#F0FDF9",position:"relative",minHeight:200,display:"flex",alignItems:"stretch",boxShadow:"0 4px 20px rgba(16,185,129,.10)",border:"1px solid #A7F3D0" }}>
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
              <div className="promo-img-col" style={{ width:170,flexShrink:0,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:0 }}>
                <svg viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto"}}>
                  <ellipse cx="118" cy="135" rx="56" ry="70" fill="#D1FAE5" opacity="0.7"/>
                  <rect x="80" y="48" width="76" height="154" rx="4" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
                  <rect x="88" y="58" width="30" height="40" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1"/>
                  <rect x="122" y="58" width="26" height="40" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1"/>
                  <rect x="88" y="104" width="60" height="90" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1"/>
                  <circle cx="84" cy="142" r="5" fill="#6EE7B7" stroke="#1E293B" strokeWidth="1"/>
                  <rect x="72" y="198" width="92" height="8" rx="3" fill="#BBF7D0" stroke="#1E293B" strokeWidth="1"/>
                  <rect x="52" y="170" width="22" height="28" rx="3" fill="#A7F3D0" stroke="#1E293B" strokeWidth="1.2"/>
                  <ellipse cx="63" cy="170" rx="13" ry="6" fill="#6EE7B7" stroke="#1E293B" strokeWidth="1"/>
                  <path d="M63 164 Q55 150 48 140" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <ellipse cx="48" cy="138" rx="8" ry="5" fill="#34D399" stroke="#1E293B" strokeWidth="1" transform="rotate(-20 48 138)"/>
                  <path d="M63 162 Q70 148 76 140" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <ellipse cx="76" cy="138" rx="8" ry="5" fill="#34D399" stroke="#1E293B" strokeWidth="1" transform="rotate(20 76 138)"/>
                  <circle cx="46" cy="74" r="20" fill="#FDDCB5" stroke="#1E293B" strokeWidth="1.5"/>
                  <path d="M26 68 Q26 50 46 48 Q66 50 66 68 L64 60 Q54 46 46 46 Q38 46 28 60 Z" fill="#2C1A0E" stroke="#1E293B" strokeWidth="1"/>
                  <path d="M22 108 Q22 98 46 96 Q70 98 70 108 L74 198 H18 Z" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
                  <path d="M40 98 L32 116 L46 122" stroke="#1E293B" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M52 98 L60 116 L46 122" stroke="#1E293B" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="30" cy="112" r="10" fill="#FEE2E2" stroke="#1E293B" strokeWidth="1.2"/>
                  <rect x="27" y="107" width="6" height="10" rx="1" fill="#EF4444"/>
                  <rect x="24.5" y="109.5" width="11" height="5" rx="1" fill="#EF4444"/>
                  <path d="M70 112 Q84 126 80 156" stroke="white" strokeWidth="18" strokeLinecap="round" fill="none"/>
                  <path d="M70 112 Q84 126 80 156" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                  <rect x="67" y="150" width="28" height="22" rx="4" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1.5"/>
                  <rect x="77" y="146" width="8" height="8" rx="2" fill="#FDE68A" stroke="#1E293B" strokeWidth="1"/>
                  <line x1="78" y1="158" x2="88" y2="158" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="83" y1="153" x2="83" y2="163" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
                  <ellipse cx="39" cy="76" rx="4.5" ry="5" fill="white" stroke="#1E293B" strokeWidth="1"/>
                  <ellipse cx="53" cy="76" rx="4.5" ry="5" fill="white" stroke="#1E293B" strokeWidth="1"/>
                  <circle cx="40" cy="77" r="3" fill="#1E293B"/>
                  <circle cx="54" cy="77" r="3" fill="#1E293B"/>
                  <circle cx="41" cy="75.5" r="1.2" fill="white"/>
                  <circle cx="55" cy="75.5" r="1.2" fill="white"/>
                  <path d="M40 87 Q46 93 52 87" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M28 80 Q28 96 46 96 Q64 96 64 80 Q46 74 28 80Z" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1"/>
                </svg>
              </div>
            </div>

            {/* Card 2 — Fast Report Delivery */}
            <div style={{ borderRadius:20,overflow:"hidden",background:"#EFF6FF",position:"relative",minHeight:200,display:"flex",alignItems:"stretch",boxShadow:"0 4px 20px rgba(17,88,166,.10)",border:"1px solid #BFDBFE" }}>
              <div style={{ flex:1,padding:"28px 24px 24px",display:"flex",flexDirection:"column",justifyContent:"space-between",zIndex:1 }}>
                <div>
                  <div style={{ display:"inline-block",background:"#EFF6FF",border:"1px solid #93C5FD",borderRadius:50,padding:"3px 12px",fontSize:".66rem",fontWeight:800,color:"#1158A6",letterSpacing:".06em",textTransform:"uppercase",marginBottom:12 }}>Digital Reports</div>
                  <h3 style={{ fontFamily:"'Manrope',sans-serif",fontWeight:900,fontSize:"clamp(1rem,2.2vw,1.3rem)",color:"#1E3A5F",lineHeight:1.25,marginBottom:8 }}>Reports Delivered<br/>in 6 Hours!</h3>
                  <p style={{ fontSize:".78rem",color:"#1E40AF",lineHeight:1.6,maxWidth:200 }}>Secure digital reports on WhatsApp &amp; email. Ready in hours.</p>
                </div>
                <button onClick={()=>navTo("labs")}
                  style={{ alignSelf:"flex-start",marginTop:16,background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"9px 22px",fontWeight:800,fontSize:".8rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 14px rgba(17,88,166,.35)",transition:"all .18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; }}>
                  VIEW TESTS <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </button>
              </div>
              <div className="promo-img-col" style={{ width:170,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px 0" }}>
                <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto"}}>
                  <ellipse cx="100" cy="110" rx="72" ry="80" fill="#DBEAFE" opacity="0.6"/>
                  <rect x="52" y="30" width="92" height="130" rx="10" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
                  <rect x="76" y="26" width="44" height="10" rx="5" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1"/>
                  <rect x="62" y="54" width="72" height="6" rx="3" fill="#DBEAFE"/>
                  <rect x="62" y="66" width="56" height="5" rx="2.5" fill="#E2E8F0"/>
                  <rect x="62" y="78" width="64" height="5" rx="2.5" fill="#E2E8F0"/>
                  <rect x="62" y="94" width="14" height="36" rx="3" fill="#93C5FD"/>
                  <rect x="80" y="106" width="14" height="24" rx="3" fill="#BFDBFE"/>
                  <rect x="98" y="100" width="14" height="30" rx="3" fill="#60A5FA"/>
                  <rect x="116" y="110" width="14" height="20" rx="3" fill="#BFDBFE"/>
                  <rect x="62" y="136" width="72" height="14" rx="4" fill="#DCFCE7" stroke="#BBF7D0" strokeWidth="1"/>
                  <path d="M70 143 L74 147 L82 140" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="88" y1="143" x2="126" y2="143" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="100" y="148" width="60" height="36" rx="8" fill="#1158A6" stroke="#1E293B" strokeWidth="1"/>
                  <rect x="100" y="156" width="60" height="14" rx="0" fill="#1158A6"/>
                  <polygon points="108,184 116,184 112,192" fill="#1158A6" stroke="#1E293B" strokeWidth="0.5"/>
                  <circle cx="112" cy="158" r="5" fill="#DBEAFE"/>
                  <path d="M110 158 L112 160 L116 155" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="120" y1="156" x2="152" y2="156" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="120" y1="162" x2="146" y2="162" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="24" cy="80" r="7" fill="#BFDBFE" stroke="#1E293B" strokeWidth="1" opacity="0.8"/>
                  <circle cx="162" cy="55" r="5" fill="#93C5FD" stroke="#1E293B" strokeWidth="1" opacity="0.7"/>
                  <circle cx="22" cy="148" r="5" fill="#DBEAFE" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>

          {/* heading */}
          <div style={{ textAlign:"center", marginBottom:56, paddingTop:8 }}>
            <p style={{ fontSize:".72rem",fontWeight:700,color:"#1158A6",letterSpacing:".12em",textTransform:"uppercase",marginBottom:10 }}>HOW IT WORKS</p>
            <h2 style={{ fontFamily:"'Manrope',sans-serif",fontSize:"clamp(1.5rem,3.2vw,2rem)",fontWeight:900,color:"#0D1117",letterSpacing:"-.03em",lineHeight:1.15,marginBottom:10 }}>The LabEase Process</h2>
            <p style={{ color:"#64748B",fontSize:".9rem",maxWidth:460,margin:"0 auto",lineHeight:1.7 }}>Book a lab test in minutes and get accurate results delivered to your door — all from your phone.</p>
          </div>

          {/* 4-step row */}
          <div className="hiw-grid">
            {/* connector line */}
            <div className="hiw-connector" style={{ position:"absolute",top:53,left:"12.5%",right:"12.5%",height:2,background:"linear-gradient(90deg,#DBEAFE,#BAE6FD,#DDD6FE,#BBF7D0)",zIndex:0,borderRadius:99 }}/>

            {[
              {
                n:"01", label:"Search & Book", accent:"#1158A6", bg:"#EFF6FF",
                desc:"Browse tests and packages. Compare prices across 6 NABL-certified labs instantly.",
                icon:(
                  <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:88,height:96}}>
                    <ellipse cx="60" cy="118" rx="48" ry="10" fill="#BFDBFE" opacity="0.5"/>
                    <rect x="18" y="18" width="64" height="80" rx="8" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
                    <rect x="18" y="18" width="64" height="20" rx="8" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1.5"/>
                    <rect x="18" y="30" width="64" height="8" fill="#DBEAFE"/>
                    <rect x="28" y="50" width="44" height="5" rx="2" fill="#BFDBFE"/>
                    <rect x="28" y="61" width="36" height="4" rx="2" fill="#E2E8F0"/>
                    <rect x="28" y="71" width="40" height="4" rx="2" fill="#E2E8F0"/>
                    <rect x="28" y="81" width="28" height="4" rx="2" fill="#E2E8F0"/>
                    <circle cx="86" cy="96" r="22" fill="white" stroke="#1158A6" strokeWidth="2"/>
                    <circle cx="83" cy="93" r="11" fill="#DBEAFE" stroke="#1158A6" strokeWidth="1.6"/>
                    <line x1="91" y1="101" x2="103" y2="113" stroke="#1158A6" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="83" cy="93" r="5" fill="#93C5FD"/>
                  </svg>
                )
              },
              {
                n:"02", label:"Schedule Pickup", accent:"#0EA5E9", bg:"#F0F9FF",
                desc:"Pick a convenient date & time. Our phlebotomist comes to your doorstep — completely free.",
                icon:(
                  <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:88,height:96}}>
                    <ellipse cx="60" cy="118" rx="48" ry="10" fill="#BAE6FD" opacity="0.5"/>
                    <rect x="14" y="22" width="80" height="80" rx="10" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
                    <rect x="14" y="22" width="80" height="26" rx="10" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.5"/>
                    <rect x="14" y="40" width="80" height="8" fill="#BAE6FD"/>
                    <line x1="36" y1="14" x2="36" y2="30" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="84" y1="14" x2="84" y2="30" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/>
                    {[0,1,2].map(col=>[0,1,2].map(row=>(
                      <rect key={col*3+row} x={28+col*24} y={60+row*16} width="14" height="10" rx="3"
                        fill={col===1&&row===0?"#0EA5E9":col===2&&row===1?"#BAE6FD":"#E0F2FE"} stroke="#BAE6FD" strokeWidth="1"/>
                    )))}
                    <circle cx="94" cy="26" r="7" fill="#7DD3FC" stroke="#1E293B" strokeWidth="1.2"/>
                    <line x1="94" y1="22" x2="94" y2="26" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="94" y1="26" x2="97" y2="28" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )
              },
              {
                n:"03", label:"Sample Collection", accent:"#8B5CF6", bg:"#F5F3FF",
                desc:"A certified phlebotomist arrives with sterile kits and collects your sample safely.",
                icon:(
                  <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:88,height:96}}>
                    <ellipse cx="60" cy="118" rx="48" ry="10" fill="#DDD6FE" opacity="0.5"/>
                    <circle cx="60" cy="34" r="20" fill="#EDE9FE" stroke="#1E293B" strokeWidth="1.5"/>
                    <path d="M28 105 Q28 78 60 78 Q92 78 92 105" fill="#EDE9FE" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M34 82 L26 98 H94 L86 82" fill="white" stroke="#1E293B" strokeWidth="1.2"/>
                    <rect x="18" y="94" width="84" height="14" rx="4" fill="white" stroke="#1E293B" strokeWidth="1.2"/>
                    <rect x="26" y="97" width="20" height="8" rx="2" fill="#EDE9FE"/>
                    <rect x="50" y="97" width="20" height="8" rx="2" fill="#DDD6FE"/>
                    <rect x="74" y="97" width="14" height="8" rx="2" fill="#C4B5FD"/>
                    <rect x="76" y="56" width="10" height="30" rx="5" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1.4"/>
                    <path d="M76 78 Q76 88 81 90 Q86 88 86 78 Z" fill="#C4B5FD" opacity="0.8"/>
                    <line x1="72" y1="56" x2="90" y2="56" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
                    <ellipse cx="46" cy="28" rx="5" ry="6" fill="white" stroke="#1E293B" strokeWidth="1"/>
                    <ellipse cx="74" cy="28" rx="5" ry="6" fill="white" stroke="#1E293B" strokeWidth="1"/>
                    <circle cx="47" cy="29" r="3.5" fill="#1E293B"/>
                    <circle cx="75" cy="29" r="3.5" fill="#1E293B"/>
                    <circle cx="48" cy="27.5" r="1.2" fill="white"/>
                    <circle cx="76" cy="27.5" r="1.2" fill="white"/>
                    <path d="M52 44 Q60 50 68 44" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M38 44 Q38 54 60 54 Q82 54 82 44 Q60 38 38 44Z" fill="#BFDBFE" stroke="#1E293B" strokeWidth="1"/>
                  </svg>
                )
              },
              {
                n:"04", label:"Get Your Reports", accent:"#16A34A", bg:"#F0FDF4",
                desc:"Digital reports sent to your WhatsApp & email within hours. Download anytime.",
                icon:(
                  <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:88,height:96}}>
                    <ellipse cx="60" cy="118" rx="48" ry="10" fill="#BBF7D0" opacity="0.5"/>
                    <rect x="22" y="10" width="66" height="90" rx="8" fill="white" stroke="#1E293B" strokeWidth="1.5"/>
                    <rect x="40" y="6" width="30" height="12" rx="5" fill="#DCFCE7" stroke="#1E293B" strokeWidth="1.2"/>
                    <rect x="32" y="28" width="46" height="5" rx="2" fill="#DCFCE7"/>
                    <rect x="32" y="38" width="36" height="4" rx="2" fill="#E2E8F0"/>
                    <rect x="32" y="48" width="42" height="4" rx="2" fill="#E2E8F0"/>
                    <rect x="32" y="62" width="8" height="24" rx="2" fill="#4ADE80"/>
                    <rect x="44" y="70" width="8" height="16" rx="2" fill="#86EFAC"/>
                    <rect x="56" y="56" width="8" height="30" rx="2" fill="#22C55E"/>
                    <rect x="68" y="66" width="8" height="20" rx="2" fill="#BBF7D0"/>
                    <rect x="22" y="90" width="66" height="10" rx="0 0 8 8" fill="#DCFCE7" stroke="#1E293B" strokeWidth="1"/>
                    <path d="M34 95 L38 99 L46 92" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <line x1="52" y1="95" x2="78" y2="95" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="62" y="96" width="48" height="28" rx="7" fill="#16A34A" stroke="#1E293B" strokeWidth="1"/>
                    <circle cx="74" cy="108" r="5" fill="#BBF7D0"/>
                    <path d="M72 108 L74 110 L78 105" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <line x1="84" y1="104" x2="102" y2="104" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="84" y1="110" x2="98" y2="110" stroke="#86EFAC" strokeWidth="1.2" strokeLinecap="round"/>
                    <polygon points="70,124 78,124 74,132" fill="#16A34A" stroke="#1E293B" strokeWidth="0.5"/>
                  </svg>
                )
              },
            ].map((s,i)=>(
              <div key={s.n} style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px", position:"relative", zIndex:1 }}>
                <div style={{ width:130,height:130,borderRadius:24,background:s.bg,border:`1.5px solid ${s.accent}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,boxShadow:`0 8px 28px ${s.accent}14`,transition:"transform .2s,box-shadow .2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 16px 40px ${s.accent}28`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 8px 28px ${s.accent}14`; }}>
                  {s.icon}
                </div>
                <div style={{ fontSize:".68rem",fontWeight:800,color:s.accent,letterSpacing:".1em",marginBottom:8,textTransform:"uppercase" }}>Step {s.n}</div>
                <h3 style={{ fontFamily:"'Manrope',sans-serif",fontWeight:800,fontSize:"1rem",color:"#0D1117",marginBottom:10,textAlign:"center",lineHeight:1.3 }}>{s.label}</h3>
                <p style={{ color:"#64748B",fontSize:".82rem",textAlign:"center",lineHeight:1.7,maxWidth:180,margin:0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center",marginTop:52 }}>
            <button onClick={()=>navTo("labs")}
              style={{ background:"#1158A6",color:"#fff",border:"none",borderRadius:50,padding:"14px 36px",fontWeight:800,fontSize:".92rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",boxShadow:"0 6px 24px rgba(17,88,166,.28)",transition:"all .2s",display:"inline-flex",alignItems:"center",gap:10 }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#0F2D6B"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#1158A6"; e.currentTarget.style.transform="translateY(0)"; }}>
              Book a Test Now
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </button>
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
          <div className="why-grid" style={{ display:"grid", gridTemplateColumns:`repeat(${gridCols},1fr)`, gap:gridCols===2?10:20 }}>
            {[
              {Icon:IAutoimmune,t:"NABL Accredited",d:"All partner labs meet the highest national quality standards.",color:"#EEF4FF",ic:"#1158A6"},
              {Icon:IPackage,   t:"Transparent Pricing",d:"The price you see is the price you pay — no hidden fees.",color:"#FFF7ED",ic:"#EA580C"},
              {Icon:IBlood,     t:"Free Home Collection",d:"Certified phlebotomists collect samples from your doorstep.",color:"#FEF2F2",ic:"#DC2626"},
              {Icon:ICardiac,   t:"Fast Reports",d:"Urgent tests returned in as little as 6 hours to your inbox.",color:"#EFF6FF",ic:"#1158A6"},
              {Icon:IThyroid,   t:"Data Security",d:"End-to-end encrypted health data. Never shared or sold.",color:"#FDF4FF",ic:"#9333EA"},
              {Icon:IDiabetes,  t:"24/7 Support",d:"Expert help available round the clock via chat or phone.",color:"#ECFDF5",ic:"#0D9488"},
            ].map(w=>(
              <div key={w.t} style={{ background:"#fff",borderRadius:gridCols===2?12:16,padding:gridCols===2?"14px 10px":"28px 18px",border:"1px solid #F1F5F9",boxShadow:"0 1px 6px rgba(0,0,0,.04)",transition:"all .18s",textAlign:"center" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 6px 24px rgba(17,88,166,.1)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,.04)"; e.currentTarget.style.transform="translateY(0)"; }}>
                <div style={{ width:gridCols===2?44:60,height:gridCols===2?44:60,borderRadius:gridCols===2?11:16,background:w.color,display:"flex",alignItems:"center",justifyContent:"center",margin:gridCols===2?"0 auto 8px":"0 auto 14px" }}>
                  <w.Icon s={gridCols===2?24:36}/>
                </div>
                <div style={{ fontWeight:800,color:"#0D1117",marginBottom:gridCols===2?3:6,fontSize:gridCols===2?".72rem":".88rem" }}>{w.t}</div>
                <div style={{ color:"#9CA3AF",fontSize:gridCols===2?".63rem":".79rem",lineHeight:1.5 }}>{w.d}</div>
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
        </div>
      </section>

      {/* ── PREMIUM FOOTER ───────────────────────────────────────── */}
      <footer style={{ background:"#0A0F1E",color:"#94A3B8",fontFamily:"'Manrope',sans-serif" }}>
        {/* Top band */}
        <div style={{ borderBottom:"1px solid rgba(255,255,255,.07)",padding:"56px 0 48px" }}>
          <div className="footer-grid" style={{ maxWidth:1600,margin:"0 auto",padding:"0 24px" }}>
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
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 12px" }}>
                {["Book a Lab Test","Home Sample Collection","Upload Prescription","Compare Lab Prices","Track Reports"].map(l=>(
                  <div key={l} style={{ fontSize:".83rem",color:"#64748B",cursor:"pointer",transition:"color .14s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#E2E8F0"}
                    onMouseLeave={e=>e.currentTarget.style.color="#64748B"}>{l}</div>
                ))}
              </div>
            </div>
            {/* Company */}
            <div>
              <div style={{ fontSize:".72rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:"#475569",marginBottom:18 }}>Company</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 12px" }}>
                {["About Us","Partner With Us","Careers","Blog","Press"].map(l=>(
                  <div key={l} style={{ fontSize:".83rem",color:"#64748B",cursor:"pointer",transition:"color .14s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#E2E8F0"}
                    onMouseLeave={e=>e.currentTarget.style.color="#64748B"}>{l}</div>
                ))}
              </div>
            </div>
            {/* Support */}
            <div>
              <div style={{ fontSize:".72rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:"#475569",marginBottom:18 }}>Support</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 12px" }}>
                {["Help & Support","Contact Us","Privacy Policy","Terms of Service","Refund Policy"].map(l=>(
                  <div key={l} style={{ fontSize:".83rem",color:"#64748B",cursor:"pointer",transition:"color .14s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#E2E8F0"}
                    onMouseLeave={e=>e.currentTarget.style.color="#64748B"}>{l}</div>
                ))}
              </div>
              {/* Contact info */}
              <div style={{ marginTop:20,paddingTop:20,borderTop:"1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize:".76rem",color:"#4B5563",marginBottom:7 }}>📞 1800-103-0001</div>
                <div style={{ fontSize:".76rem",color:"#4B5563" }}>✉ support@labease.in</div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom band */}
        <div style={{ maxWidth:1600,margin:"0 auto",padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
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

        <div className="booking-grid" style={{ ...T.wrap,padding:"24px 16px" }}>

          {/* ── LEFT FILTER SIDEBAR ── */}
          <div className="booking-sidebar" style={{ position:"sticky",top:80,display:"flex",flexDirection:"column",gap:14 }}>

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
      <nav style={{ background:"#fff",borderBottom:"1px solid var(--line)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",position:"fixed",top:0,left:0,right:0,zIndex:200,boxShadow:"0 1px 8px rgba(0,0,0,.05)" }}>
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
        {/* Right: person icon + menu button */}
        <div style={{ display:"flex",alignItems:"center",gap:18 }}>
          {cart.length>0&&<button onClick={()=>setCartOpen(true)} className="btn-anim" style={{ ...T.btn("#F59E0B"),borderRadius:50,padding:"8px 16px",fontSize:".84rem" }}>Cart ({cart.length}) · ₹{total.toLocaleString()}</button>}
          {/* Person icon */}
          <div style={{ position:"relative" }}>
            <button onClick={()=>{ setProfileDrop(o=>!o); setSideMenu(false); }} style={{ width:44,height:44,background:"none",border:"none",borderRadius:50,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"opacity .15s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".7"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {user
                ? <div style={{ width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#1158A6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ color:"#fff",fontWeight:800,fontSize:".74rem" }}>{user.name.charAt(0).toUpperCase()}</span></div>
                : <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            </button>
            {profileDrop&&<div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,background:"#fff",borderRadius:16,border:"1px solid #E8EEFF",boxShadow:"0 12px 40px rgba(0,0,0,.14)",minWidth:180,zIndex:300,overflow:"hidden" }}>
              {user&&<div style={{ padding:"12px 15px",background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",borderBottom:"1px solid #DBEAFE" }}><div style={{ fontWeight:800,fontSize:".85rem",color:"#0D1117" }}>{user.name}</div><div style={{ fontSize:".72rem",color:"#64748B",marginTop:2 }}>{user.email}</div></div>}
              {!user&&[["Log In",()=>{ setProfileDrop(false); openAuth("login"); },"#374151"],["Sign Up",()=>{ setProfileDrop(false); openAuth("signup"); },"#1158A6"]].map(([lbl,fn,clr])=>(
                <button key={lbl} onClick={fn} style={{ display:"block",width:"100%",padding:"11px 15px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".86rem",fontWeight:700,color:clr,textAlign:"left",minHeight:44 }} onMouseEnter={e=>e.currentTarget.style.background="#F8FAFF"} onMouseLeave={e=>e.currentTarget.style.background="none"}>{lbl}</button>
              ))}
              {user&&<div style={{ borderTop:"1px solid #F1F5F9" }}><button onClick={()=>{ setProfileDrop(false); handleLogout(); }} style={{ display:"block",width:"100%",padding:"11px 15px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".86rem",fontWeight:700,color:"#DC2626",textAlign:"left",minHeight:44 }} onMouseEnter={e=>e.currentTarget.style.background="#FEF2F2"} onMouseLeave={e=>e.currentTarget.style.background="none"}>Sign Out</button></div>}
            </div>}
          </div>
          {/* Menu (hamburger) button */}
          <div style={{ position:"relative" }}>
            <button onClick={()=>{ setSideMenu(o=>!o); setProfileDrop(false); }} style={{ width:44,height:44,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5.5,transition:"opacity .15s",padding:0 }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".7"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {[0,1,2].map(i=><span key={i} style={{ display:"block",width:22,height:2.5,borderRadius:99,background:"#374151",transition:"transform .25s,opacity .2s",transform:sideMenu&&i===0?"rotate(45deg) translate(5px,8px)":sideMenu&&i===2?"rotate(-45deg) translate(5px,-8px)":"none",opacity:sideMenu&&i===1?0:1 }}/>)}
            </button>
            {sideMenu&&<div style={{ position:"fixed",top:72,right:20,background:"#fff",borderRadius:16,border:"1px solid #E8EEFF",boxShadow:"0 12px 40px rgba(0,0,0,.14)",minWidth:220,zIndex:300,overflow:"hidden",animation:"slideUp .18s" }}>
              {[
                ["Home",()=>{ navTo("home"); setSideMenu(false); }],
                ["Tests",()=>{ navTo("labs"); setSideMenu(false); }],
                ["Labs",()=>{ navTo("labs"); setSideMenu(false); }],
                ["Health Packages",()=>{ navTo("labs"); setSideMenu(false); }],
                ["Reports",()=>{ setSideMenu(false); }],
                ["About Us",()=>{ setSideMenu(false); }],
                ["Contact Us",()=>{ setSideMenu(false); }],
              ].map(([lbl,fn])=>(
                <button key={lbl} onClick={fn} style={{ display:"block",width:"100%",padding:"13px 20px",background:"none",border:"none",borderBottom:"1px solid #F8FAFC",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".9rem",fontWeight:600,color:"#1F2937",textAlign:"left",minHeight:46 }} onMouseEnter={e=>{ e.currentTarget.style.background="#F0F6FF"; e.currentTarget.style.color="#1158A6"; }} onMouseLeave={e=>{ e.currentTarget.style.background="none"; e.currentTarget.style.color="#1F2937"; }}>
                  {lbl}
                </button>
              ))}
              <div style={{ padding:"10px 16px",borderTop:"1px solid #E5E7EB",display:"flex",gap:8 }}>
                <button onClick={()=>{ setSideMenu(false); openAuth("login"); }} style={{ flex:1,background:"transparent",border:"1.5px solid #BFDBFE",borderRadius:50,padding:"8px",fontWeight:700,fontSize:".8rem",color:"#1158A6",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .14s" }} onMouseEnter={e=>e.currentTarget.style.background="#EFF6FF"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Log In</button>
                <button onClick={()=>{ setSideMenu(false); openAuth("signup"); }} style={{ flex:1,background:"#1158A6",border:"none",borderRadius:50,padding:"8px",fontWeight:700,fontSize:".8rem",color:"#fff",cursor:"pointer",fontFamily:"'Manrope',sans-serif" }}>Sign Up</button>
              </div>
            </div>}
          </div>
        </div>
      </nav>
      <div style={{height:64}}/>{/* spacer for fixed navbar */}

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
