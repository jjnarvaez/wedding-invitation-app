import React, { useEffect, useRef, useState } from 'react';
import LogoSVG from './LogoSVG';

const FORCE_AUDIO_ON_ENTER_KEY = 'forceAudioAfterEnvelopeOpen';

export default function EnvelopeIntro({ onFinish }) {
  const flapRef = useRef(null);
  const waxRef = useRef(null);
  const sceneRef = useRef(null);
  const cntRef = useRef(null);
  const sealRef = useRef(null);
  const btnRef = useRef(null);

  const [stage, setStage] = useState('idle'); // idle | opening | done
  const [showDonePhoto, setShowDonePhoto] = useState(false);
  const [showDoneBtn, setShowDoneBtn] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  function spawnLeaves() {
    const scene = sceneRef.current;
    if (!scene) return;
    const positions = [{ l: '38%', d: 0 }, { l: '50%', d: 180 }, { l: '62%', d: 90 }, { l: '44%', d: 270 }, { l: '56%', d: 135 }];
    positions.forEach((p, i) => {
      const el = document.createElement('div');
      el.className = 'leaf-fly';
      el.style.cssText = `left:${p.l};bottom:55%;animation-delay:${i * 0.12}s;animation-duration:${1.4 + i * 0.18}s`;
      el.innerHTML = `<svg width="14" height="20" viewBox="0 0 40 56" fill="none">\n      <ellipse cx="20" cy="28" rx="14" ry="22" fill="#8B4513" transform="rotate(${p.d} 20 28)" opacity=".65"/>\n      <path d="M20 6 Q23 17 23 28 Q23 39 20 50" stroke="#EDD9A3" stroke-width="1" fill="none" transform="rotate(${p.d} 20 28)"/>\n    </svg>`;
      scene.appendChild(el);
      timers.current.push(setTimeout(() => el.remove(), 1800));
    });
  }

  function startCountdownAndDone() {
    let n = 3;
    if (cntRef.current) cntRef.current.textContent = n;
    const iv = setInterval(() => {
      n--;
      if (cntRef.current) cntRef.current.textContent = n;
      if (n <= 0) {
        clearInterval(iv);
        setStage('done');
        timers.current.push(setTimeout(() => {
          if (sealRef.current) sealRef.current.style.opacity = '1';
        }, 50));
        // wait for user to click the "Ver invitación completa" button to finish
      }
    }, 900);
    timers.current.push(iv);
  }

  function startOpen() {
    if (stage !== 'idle') return;
    const flap = flapRef.current;
    const wax = waxRef.current;

    if (wax) wax.style.display = 'none';
    if (flap) {
      flap.style.transition = 'transform 0.65s cubic-bezier(0.4,0,0.2,1)';
      flap.style.transform = 'rotateX(-180deg)';
      flap.style.transformOrigin = '50% 0%';
      flap.style.transformBox = 'fill-box';
    }
    spawnLeaves();

    timers.current.push(setTimeout(() => {
      startCountdownAndDone();
    }, 900));
  }

  useEffect(() => {
    if (stage === 'done') {
      setShowDonePhoto(true);
      const buttonTimer = setTimeout(() => {
        setShowDoneBtn(true);
        if (btnRef.current) {
          try { btnRef.current.focus(); } catch (e) {}
          btnRef.current.classList.add('pulse');
        }
      }, 800);
      timers.current.push(buttonTimer);

      return () => {
        clearTimeout(buttonTimer);
      };
    }
  }, [stage]);

  function finishNow() {
    try {
      sessionStorage.setItem(FORCE_AUDIO_ON_ENTER_KEY, 'true');
    } catch (_err) {
      // Ignore storage errors.
    }
    if (onFinish) onFinish();
  }

  // If user clicks the final button in done stage
  function goToInvite() {
    finishNow();
  }

  return (
    <div className="scene" id="scene" ref={sceneRef}>
      <style>{`
        /* CSS copied from envelope_intro_animation.html with minor JSX-friendly adjustments */
        *{box-sizing:border-box;margin:0;padding:0}
        .scene{min-height:100svh;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#F5EDD7;position:relative;overflow:hidden;border-radius:0;padding:2rem 1rem;font-family:'Raleway','Helvetica Neue',sans-serif}
        .scene::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;opacity:.45}
        .scene::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#5C2A08,#C06B32,#A07848,#5C2A08)}
        #s-idle{display:flex;flex-direction:column;align-items:center;gap:1.5rem}
        #s-done{display:none;flex-direction:column;align-items:center;gap:1.2rem}
        .env-wrap{position:relative;display:grid;place-items:center;width:280px;height:190px;cursor:pointer;filter:drop-shadow(0 8px 24px rgba(92,42,8,.18))}
        .env-wrap:hover .env-body{filter:brightness(1.04)}
        .env-wrap svg{width:100%;height:100%;overflow:visible}
        @keyframes openFlap{0%{transform:rotateX(0deg)}100%{transform:rotateX(-180deg)}}
        @keyframes shimmer{0%,100%{opacity:.55}50%{opacity:.85}}
        @keyframes floatLeaf{0%{transform:translateY(0) rotate(0deg);opacity:0}15%{opacity:1}100%{transform:translateY(-180px) rotate(60deg);opacity:0}}
        @keyframes fadeScene{0%{opacity:1}100%{opacity:0}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        @keyframes badgePop{0%{transform:scale(0) rotate(-15deg);opacity:0}70%{transform:scale(1.1) rotate(2deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}
        @keyframes wiggle{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
        .shimmer-hint{font-size:11px;letter-spacing:.35em;text-transform:uppercase;color:#A07848;animation:shimmer 2s ease-in-out infinite}
        .leaf-fly{position:absolute;pointer-events:none;animation:floatLeaf 1.6s ease-out forwards}
        .seal{width:80px;height:80px;border-radius:50%;background:#8B4513;display:flex;align-items:center;justify-content:center;animation:badgePop .5s cubic-bezier(.34,1.56,.64,1) forwards;opacity:0}
        .seal svg{width:44px;height:44px}
        .done-names{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:400;font-size:2rem;color:#3A1A06;line-height:1.1;text-align:center}
        .done-amp{color:#C06B32;font-size:1.4rem;display:block}
        .done-date{font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#A07848;margin:.4rem 0 1.2rem}
                .open-btn{background:rgba(139,69,19,0.6);color:#F5EDD7;border:none;padding:.8rem 2rem;font-family:inherit;font-size:11px;letter-spacing:.3em;text-transform:uppercase;cursor:pointer;transition:background .2s,transform .15s,opacity .2s;position:relative;z-index:11}
        .open-btn:hover{background:rgba(192,107,50,0.75);transform:scale(1.02)}
        .open-btn:active{transform:scale(.98)}
        @keyframes btnPulse{0%{transform:translateY(0) scale(1)}50%{transform:translateY(-4px) scale(1.03)}100%{transform:translateY(0) scale(1)}}
        .open-btn.pulse{animation:btnPulse 900ms ease-in-out infinite;box-shadow:0 8px 20px rgba(192,107,50,0.12)}
        .done-photo-wrapper{position:relative;width:100%;max-width:320px;overflow:hidden;border-radius:24px;box-shadow:0 16px 40px rgba(0,0,0,0.16);opacity:0;transform:translateY(12px);transition:opacity .8s ease,transform .8s ease}
        .done-photo-wrapper.show{opacity:1;transform:translateY(0)}
        .done-photo{width:100%;height:auto;display:block;object-fit:cover}
        .done-photo-overlay{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding:1rem;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.68) 100%);opacity:0;pointer-events:none;transition:opacity .8s ease}
        .done-photo-overlay.show{opacity:1;pointer-events:auto}
        .done-photo-overlay .open-btn{width:100%;max-width:260px}
        .wax{position:absolute;top:108px;transform:translate(-50%,-50%);width:44px;height:44px;background:#8B4513;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:3;animation:wiggle 2.5s ease-in-out infinite;box-shadow:0 2px 8px rgba(92,42,8,.35)}
        .wax svg{width:26px;height:26px}
        .counter{font-family:'DM Mono',monospace,sans-serif;font-size:14px;color:#A07848;letter-spacing:.12em;margin-top:.3rem}
        .sep-leaves{display:flex;gap:.6rem;align-items:center;opacity:.5}
        .sep-line{width:60px;height:1px;background:#C06B32;opacity:.4}
        .envelope-logo{width:min(140px,34vw);opacity:.65;line-height:0;filter:drop-shadow(0 8px 18px rgba(92,42,8,.12));margin-bottom:.25rem}
        .envelope-logo svg{width:100%;height:auto;display:block}
      `}</style>

      <div id="s-idle" style={{ opacity: stage === 'done' ? 0 : 1, transition: 'opacity .6s ease', pointerEvents: stage === 'done' ? 'none' : 'auto', display: stage === 'done' ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div className="envelope-logo" aria-hidden="true">
          <LogoSVG />
        </div>
        <div className="env-wrap" id="envWrap" onClick={startOpen}>
          <svg viewBox="0 0 280 190" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="envGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EDD9A3" />
                <stop offset="100%" stopColor="#C9A870" />
              </linearGradient>
              <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8CC90" />
                <stop offset="100%" stopColor="#C8A060" />
              </linearGradient>
              <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4B078" />
                <stop offset="100%" stopColor="#C09050" />
              </linearGradient>
            </defs>
            <rect x="4" y="50" width="272" height="140" rx="4" fill="url(#envGrad)" stroke="#8B4513" strokeWidth="1.2" />
            <path d="M4,50 L140,130 L276,50" fill="url(#innerGrad)" stroke="#8B4513" strokeWidth="0.8" opacity=".6" />
            <path d="M4,50 L4,190 L140,130 Z" fill="#D4B078" stroke="#8B4513" strokeWidth="0.6" opacity=".5" />
            <path d="M276,50 L276,190 L140,130 Z" fill="#C8A060" stroke="#8B4513" strokeWidth="0.6" opacity=".5" />

            <g id="flapGroup" ref={flapRef} style={{ transformOrigin: '140px 50px', transformBox: 'fill-box' }}>
              <path id="flapShape" d="M4,50 L140,125 L276,50 Z" fill="url(#flapGrad)" stroke="#8B4513" strokeWidth="1.2" />
              <line x1="140" y1="50" x2="140" y2="125" stroke="#8B4513" strokeWidth="0.5" opacity=".35" />
              <circle cx="100" cy="72" r="2" fill="#8B4513" opacity=".2" />
              <circle cx="180" cy="72" r="2" fill="#8B4513" opacity=".2" />
            </g>

            <g opacity=".55">
              <path d="M18,170 Q28,158 38,148" stroke="#7A3810" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M28,158 Q24,150 22,144" stroke="#7A3810" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M35,152 Q32,145 31,139" stroke="#7A3810" strokeWidth=".9" fill="none" strokeLinecap="round" />
              <g transform="translate(20,141) rotate(-45)">
                <path d="M0,8 C-4,4 -5,-1 -3,-5 C-1,-8 1,-8 3,-5 C5,-1 4,4 0,8Z" fill="#5C3010" opacity=".7" />
                <line x1="0" y1="7" x2="0" y2="-5" stroke="#3A1A06" strokeWidth=".4" opacity=".5" />
              </g>
            </g>

            <g opacity=".55">
              <path d="M262,170 Q252,158 242,148" stroke="#7A3810" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M252,158 Q256,150 258,144" stroke="#7A3810" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M245,152 Q248,145 249,139" stroke="#7A3810" strokeWidth=".9" fill="none" strokeLinecap="round" />
              <g transform="translate(260,141) rotate(45)">
                <path d="M0,8 C4,4 5,-1 3,-5 C1,-8 -1,-8 -3,-5 C-5,-1 -4,4 0,8Z" fill="#5C3010" opacity=".7" />
                <line x1="0" y1="7" x2="0" y2="-5" stroke="#3A1A06" strokeWidth=".4" opacity=".5" />
              </g>
            </g>

            <rect x="110" y="158" width="60" height="24" rx="2" fill="none" stroke="#8B4513" strokeWidth=".7" opacity=".3" />
            <text x="140" y="174" textAnchor="middle" fontFamily="'Playfair Display',Georgia,serif" fontStyle="italic" fontSize="9" fill="#8B4513" opacity=".5">J &amp; T · 2026</text>
          </svg>

          <div className="wax" id="waxSeal" ref={waxRef}>
            <svg viewBox="0 0 26 26" fill="none">
              <ellipse cx="13" cy="13" rx="9" ry="12" stroke="#EDD9A3" strokeWidth="1.2" />
              <path d="M13 1 Q15.5 7 15.5 13 Q15.5 19 13 25" stroke="#EDD9A3" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        <p className="shimmer-hint">Toca el sobre para abrir</p>
      </div>

      <div id="s-done" style={{ display: stage === 'done' ? 'flex' : 'none', opacity: stage === 'done' ? 1 : 0, transition: 'opacity .6s ease', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '1rem', gap: '1rem' }}>
        <div className={`done-photo-wrapper${showDonePhoto ? ' show' : ''}`}>
          <img className="done-photo" src={`${process.env.PUBLIC_URL}/assets/SaveTheDate.jpg`} alt="Foto importante" />
          <div className={`done-photo-overlay${showDoneBtn ? ' show' : ''}`}>
            <button type="button" ref={btnRef} className={`open-btn ${showDoneBtn ? 'pulse' : ''}`} onClick={goToInvite} aria-label="Abrir invitación">Ver invitación completa →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
