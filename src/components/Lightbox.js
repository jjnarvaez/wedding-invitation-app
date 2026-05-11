import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CoffeeBranchSVG from './CoffeeBranchSVG';
import SLIDES from '../slidesData';

function Lightbox({ startIdx, onClose }) {
  const [lbCur, setLbCur] = useState(startIdx);
  const [closing, setClosing] = useState(false);
  const lbStartX = useRef(0);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 280);
  }, [onClose]);

  const lbGoTo = (idx) => setLbCur((idx % SLIDES.length + SLIDES.length) % SLIDES.length);

  /* keyboard nav */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  lbGoTo(lbCur - 1);
      if (e.key === "ArrowRight") lbGoTo(lbCur + 1);
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lbCur, close]);

  /* lock body scroll while preserving the current scroll position
     (fixes iOS Safari drifting / "blank" overlay when opening from
      far down the page) */
  useEffect(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      const html = document.documentElement;
      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  /* touch swipe inside lightbox */
  const onLbTouchStart = (e) => { lbStartX.current = e.touches[0].pageX; };
  const onLbTouchEnd   = (e) => {
    const d = lbStartX.current - e.changedTouches[0].pageX;
    if (Math.abs(d) > 45) lbGoTo(d > 0 ? lbCur + 1 : lbCur - 1);
  };

  const s = SLIDES[lbCur];

  return createPortal(
    <div className={`lightbox-overlay${closing ? " closing" : ""}`} role="dialog" aria-modal="true">
      <div className="lightbox-backdrop" onClick={close} />

      <div className={`lightbox-panel${closing ? " closing" : ""}`}>
        {/* top bar */}
        <div className="lightbox-top">
          <span className="lightbox-counter">
            {String(lbCur + 1).padStart(2,"0")} / {String(SLIDES.length).padStart(2,"0")}
          </span>
          <button className="lightbox-close" onClick={close} aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* image area */}
        <div
          className="lightbox-img-wrap"
          onTouchStart={onLbTouchStart}
          onTouchEnd={onLbTouchEnd}
          style={{ background: s.img ? `url(${s.img})` : s.grad, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="lightbox-slide-inner">
            <div style={{ 
              width: '120px', 
              height: '120px',
              transform: 'rotate(-10deg)',
              opacity: 0.35,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CoffeeBranchSVG />
            </div>
            <p className="lightbox-caption">{s.caption}</p>
            <div style={{ 
              width: '80px', 
              height: '80px',
              transform: 'rotate(20deg)',
              opacity: 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CoffeeBranchSVG />
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <div className="lightbox-nav">
          <button className="lightbox-nav-btn" onClick={() => lbGoTo(lbCur - 1)} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="lightbox-dots">
            {SLIDES.map((_, i) => (
              <button key={i} className={`lightbox-dot${i===lbCur?" active":""}`} onClick={() => lbGoTo(i)} aria-label={`Foto ${i+1}`} />
            ))}
          </div>
          <button className="lightbox-nav-btn" onClick={() => lbGoTo(lbCur + 1)} aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Lightbox;