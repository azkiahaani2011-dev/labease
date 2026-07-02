import React, { useEffect, useRef } from 'react';

function LazyImg({ src, alt, style, className="" }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => { if (ref.current) ref.current.classList.add("loaded"); };
  }, [src]);
  return (
    <img ref={ref} src={src} alt={alt||""} className={`img-lazy ${className}`} style={style}/>
  );
}

export default LazyImg;
