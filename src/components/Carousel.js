import React, { useState, useCallback, useEffect, useRef } from 'react';
import CoffeeLeaf from './CoffeeLeaf';
import Lightbox from './Lightbox';

const SLIDES = [
  { id: 1, caption: "El primer encuentro",  horizontal: false, grad: "linear-gradient(150deg,#1E150D,#2E2014 55%,#1A130B)" },
  { id: 2, caption: "Nuestro primer café",  horizontal: true,  grad: "linear-gradient(150deg,#1C130A,#2C1F13 55%,#180F08)" },
  { id: 3, caption: "Nuestra aventura",     horizontal: false, grad: "linear-gradient(150deg,#21170D,#332218 55%,#1B130A)" },
  { id: 4, caption: "La propuesta",         horizontal: true,  grad: "linear-gradient(150deg,#1B140C,#2A1E14 55%,#170F09)" },
  { id: 5, caption: "Para siempre",         horizontal: false, grad: "linear-gradient(150deg,#1E140B,#301F13 55%,#180F08)" },
];

function Carousel() {
  const [cur, setCur] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const trackRef = useRef(null);
  const didDrag = useRef(false); // distinguish click vs drag

  const slideWidth = useCallback(() => {
    if (!trackRef.current) return 300;
    const slide = trackRef.current.children[0];
    return slide ? slide.offsetWidth + 16 : 300;
  }, []);

  const goTo = useCallback((idx) => {
    const n = Math.max(0, Math.min(idx, SLIDES.length - 1));
    setCur(n);
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)";
      trackRef.current.style.transform = `translateX(-${n * slideWidth()}px)`;
    }
  }, [slideWidth]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!isDrag && lightboxIdx === null) goTo((cur + 1) % SLIDES.length);
    }, 5600);
    return () => clearInterval(id);
  }, [cur, isDrag, lightboxIdx, goTo]);

  const onMouseDown = (e) => {
    setIsDrag(true);
    didDrag.current = false;
    startX.current = e.pageX;
    scrollStart.current = cur * slideWidth();
    if (trackRef.current) trackRef.current.style.transition = "none";
  };
  const onMouseMove = (e) => {
    if (!isDrag) return;
    const moved = Math.abs(startX.current - e.pageX);
    if (moved > 5) didDrag.current = true;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(-${scrollStart.current + (startX.current - e.pageX)}px)`;
  };
  const onMouseUp = (e) => {
    if (!isDrag) return;
    setIsDrag(false);
    const delta = startX.current - e.pageX;
    Math.abs(delta) > 60 ? goTo(delta > 0 ? cur + 1 : cur - 1) : goTo(cur);
  };
  const onTouchStart = (e) => {
    didDrag.current = false;
    startX.current = e.touches[0].pageX;
    scrollStart.current = cur * slideWidth();
    if (trackRef.current) trackRef.current.style.transition = "none";
  };
  const onTouchEnd = (e) => {
    const d = startX.current - e.changedTouches[0].pageX;
    if (Math.abs(d) > 5) didDrag.current = true;
    Math.abs(d) > 50 ? goTo(d > 0 ? cur + 1 : cur - 1) : goTo(cur);
  };

  const openLightbox = (i) => {
    if (!didDrag.current) setLightboxIdx(i);
  };

  return (
    <>
      <div
        className="carousel-track-wrap"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="carousel-track" ref={trackRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={`carousel-slide${s.horizontal ? " horizontal" : ""}`}
              onClick={() => openLightbox(i)}
              style={{ cursor: "pointer" }}
            >
              <div className="slide-inner" style={{ background: s.grad }}>
                <CoffeeLeaf size={s.horizontal ? 30 : 38} color="rgba(171,119,67,0.45)" rotate={i % 2 === 0 ? -15 : 15} />
                <p className="slide-caption">{s.caption}</p>
              </div>

              {/* expand icon button */}
              <button
                className="slide-expand-btn"
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                aria-label="Ver en grande"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </button>

              <span className="slide-num">{String(i+1).padStart(2,"0")} / {String(SLIDES.length).padStart(2,"0")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => goTo(cur - 1)} aria-label="Anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="carousel-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`carousel-dot${i===cur?" active":""}`} onClick={() => goTo(i)} aria-label={`Foto ${i+1}`} />
          ))}
        </div>
        <button className="carousel-btn" onClick={() => goTo(cur + 1)} aria-label="Siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <p style={{textAlign:"center",fontSize:"10px",letterSpacing:"0.2em",color:"#84593D",marginTop:"1rem",textTransform:"uppercase"}}>
        Toca o haz clic en una foto para verla en grande
      </p>

      {/* Lightbox portal */}
      {lightboxIdx !== null && (
        <Lightbox startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
}

export default Carousel;