import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import CoffeeLeaf from './CoffeeLeaf';
import Lightbox from './Lightbox';
import SLIDES from '../slidesData';

const N = SLIDES.length;
/* Render 3 copies of the slide list and start in the middle one. When the
   user drifts into the leading or trailing copy, we snap the track back to
   the equivalent slide in the middle copy without a transition, producing
   the illusion of an infinite loop. */
const COPIES = 3;
const RENDERED = Array.from({ length: COPIES }, () => SLIDES).flat();
const START = N;

function Carousel() {
  const [virtIdx, setVirtIdx] = useState(START);
  const [isDrag, setIsDrag] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const trackRef = useRef(null);
  const didDrag = useRef(false);

  const cur = ((virtIdx % N) + N) % N;

  /* Use real DOM offsets so vertical/horizontal slides (different widths)
     line up exactly after any number of loops. */
  const slideOffset = useCallback((idx) => {
    if (!trackRef.current) return 0;
    const c = trackRef.current.children[idx];
    return c ? c.offsetLeft : 0;
  }, []);

  const setTransform = useCallback((idx, animated) => {
    if (!trackRef.current) return;
    if (animated) {
      trackRef.current.style.transition = "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)";
    } else {
      trackRef.current.style.transition = "none";
      /* force reflow so the browser commits transition:none BEFORE the
         transform change below — otherwise the snap animates from copy 2
         back through every slide to copy 1, which looks awful */
      // eslint-disable-next-line no-unused-expressions
      trackRef.current.offsetWidth;
    }
    trackRef.current.style.transform = `translateX(-${slideOffset(idx)}px)`;
  }, [slideOffset]);

  const goTo = useCallback((idx) => {
    setVirtIdx(idx);
    setTransform(idx, true);
  }, [setTransform]);

  const onTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    let snap = null;
    if (virtIdx < N) snap = virtIdx + N;
    else if (virtIdx >= 2 * N) snap = virtIdx - N;
    if (snap !== null) {
      setVirtIdx(snap);
      setTransform(snap, false);
    }
  };

  /* place track in the middle copy BEFORE first paint (no initial flash) */
  useLayoutEffect(() => {
    setTransform(START, false);
  }, []);

  /* realign on resize using the latest virtIdx */
  const virtIdxRef = useRef(virtIdx);
  useEffect(() => { virtIdxRef.current = virtIdx; }, [virtIdx]);
  useEffect(() => {
    const onResize = () => setTransform(virtIdxRef.current, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setTransform]);

  /* preload all slide images on mount so later slides never appear blank */
  useEffect(() => {
    SLIDES.forEach((s) => {
      if (s.img) {
        const im = new Image();
        im.src = s.img;
      }
    });
  }, []);

  /* Auto-advance. Depend on `cur` (real slide) instead of `virtIdx` so the
     timer is NOT reset by the loop snap — otherwise the user waits an
     extra ~0.75s before the next image when the loop wraps around. */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isDrag && lightboxIdx === null) goTo(virtIdxRef.current + 1);
    }, 5600);
    return () => clearInterval(id);
  }, [cur, isDrag, lightboxIdx, goTo]);

  const onMouseDown = (e) => {
    setIsDrag(true);
    didDrag.current = false;
    startX.current = e.pageX;
    scrollStart.current = slideOffset(virtIdx);
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
    if (Math.abs(delta) > 60) goTo(delta > 0 ? virtIdx + 1 : virtIdx - 1);
    else goTo(virtIdx);
  };
  const onTouchStart = (e) => {
    didDrag.current = false;
    startX.current = e.touches[0].pageX;
    scrollStart.current = slideOffset(virtIdx);
    if (trackRef.current) trackRef.current.style.transition = "none";
  };
  const onTouchEnd = (e) => {
    const d = startX.current - e.changedTouches[0].pageX;
    if (Math.abs(d) > 5) didDrag.current = true;
    if (Math.abs(d) > 50) goTo(d > 0 ? virtIdx + 1 : virtIdx - 1);
    else goTo(virtIdx);
  };

  const openLightbox = (realIdx) => {
    if (!didDrag.current) setLightboxIdx(realIdx);
  };

  /* Jump to slide `real` in the copy we're currently in, so the visible
     transition is always short and predictable. */
  const goToReal = (real) => {
    const base = Math.floor(virtIdx / N) * N;
    goTo(base + real);
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
        <div
          className="carousel-track"
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTransitionEnd={onTransitionEnd}
        >
          {RENDERED.map((s, i) => {
            const real = i % N;
            const bg = s.img
              ? `url(${s.img}) center/cover, ${s.grad}`
              : s.grad;
            return (
              <div
                key={i}
                className={`carousel-slide${s.horizontal ? " horizontal" : ""}`}
                onClick={() => openLightbox(real)}
                style={{ cursor: "pointer" }}
              >
                <div className="slide-inner" style={{ background: bg }}>
                </div>

                <button
                  className="slide-expand-btn"
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(real); }}
                  aria-label="Ver en grande"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </button>

                <span className="slide-num">{String(real + 1).padStart(2,"0")} / {String(N).padStart(2,"0")}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => goTo(virtIdx - 1)} aria-label="Anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="carousel-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`carousel-dot${i === cur ? " active" : ""}`} onClick={() => goToReal(i)} aria-label={`Foto ${i+1}`} />
          ))}
        </div>
        <button className="carousel-btn" onClick={() => goTo(virtIdx + 1)} aria-label="Siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <p style={{textAlign:"center",fontSize:"10px",letterSpacing:"0.2em",color:"var(--cream-bg)",marginTop:"1rem",textTransform:"uppercase"}}>
        Toca o haz clic en una foto para verla en grande
      </p>

      {lightboxIdx !== null && (
        <Lightbox startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
}

export default Carousel;
