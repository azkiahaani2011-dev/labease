import React, { useEffect, useRef } from 'react';

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

export default _CarouselDots;
