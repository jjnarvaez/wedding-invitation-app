import React, { useEffect } from 'react';
import CoffeePlantSVG from './CoffeePlantSVG';
import CoffeeLeaf from './CoffeeLeaf';
import CoffeeBranchSVG from './CoffeeBranchSVG';
import Carousel from './Carousel';
import useReveal from '../hooks/useReveal';
import useCountdown from '../hooks/useCountdown';
import useGuests from '../hooks/useGuests';

export default function BodaJuniorTatiana() {
  useReveal();
  const { d, h, m, s } = useCountdown();
  const { g1, g2 } = useGuests();

  /* parallax hero corners */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const tl = document.querySelector(".hero-corner.tl");
        const br = document.querySelector(".hero-corner.br");
        if (tl) tl.style.transform = `translateY(${y * 0.09}px)`;
        if (br) br.style.transform = `rotate(180deg) translateY(${y * 0.07}px)`;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const guestLabel = g2 ? `${g1} & ${g2}` : g1;
  const inviteGuest = g2
    ? <><strong style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15em",fontStyle:"italic",color:"#AB7743"}}>{g1} &amp; {g2}</strong></>
    : <><strong style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15em",fontStyle:"italic",color:"#AB7743"}}>{g1}</strong></>;

  return (
    <>
      {/* ── FIXED WATERMARK PLANTS ── */}
      <div className="coffee-watermark">
        <CoffeePlantSVG color="#6D3914" />
      </div>
      <div className="coffee-watermark-left">
        <CoffeePlantSVG color="#6D3914" />
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="hero-inner-frame" />
        <div className="hero-bg-pattern" />
        <div className="hero-corner tl"><CoffeeBranchSVG /></div>
        <div className="hero-corner br" style={{transform:"rotate(180deg)"}}><CoffeeBranchSVG /></div>
        <div className="hero-corner tr"><CoffeeBranchSVG /></div>
        <div className="hero-corner bl"><CoffeeBranchSVG /></div>

        {g1 && (
          <p className="hero-guest anim-up" style={{animationDelay:"0.05s"}} dangerouslySetInnerHTML={{__html:`Para: ${guestLabel}`}} />
        )}

        <p className="hero-label anim-up" style={{animationDelay:"0.2s"}}>Con amor los invitamos a nuestra boda</p>

        <div className="hero-names anim-up" style={{animationDelay:"0.4s"}}>
          Junior
          <span className="hero-amp">&amp;</span>
          Tatiana
        </div>

        <div className="hero-rule anim-in" style={{animationDelay:"0.6s"}} />

        <div className="hero-date anim-up" style={{animationDelay:"0.7s"}}>
          <span>04</span>
          <div className="dot" />
          <span>Septiembre</span>
          <div className="dot" />
          <span>2026</span>
        </div>

        <div className="hero-leaf-row anim-in" style={{animationDelay:"1s"}}>
          <CoffeeLeaf size={18} color="#AB7743" rotate={-20} />
          <CoffeeLeaf size={22} color="#84593D" rotate={0} />
          <CoffeeLeaf size={18} color="#AB7743" rotate={20} />
        </div>

        <div className="scroll-hint anim-in" style={{animationDelay:"1.6s"}}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="countdown-section">
        <div className="cd-ring1" /><div className="cd-ring2" />
        <div className="section-inner">
          <span className="section-label reveal" style={{color:"#84593D"}}>Cuenta regresiva</span>
          <h2 className="section-title reveal" style={{color:"#F5EDD7"}}>El gran día se acerca</h2>
          <div className="countdown-grid stagger">
            {[{v:d,l:"Días"},{v:h,l:"Horas"},{v:m,l:"Minutos"},{v:s,l:"Segundos"}].map(({v,l},i,arr) => (
              <>
                <div key={l} className="count-block reveal">
                  <span className="count-number">{v}</span>
                  <span className="count-bar" />
                  <span className="count-label">{l}</span>
                </div>
                {i < arr.length - 1 && <div key={`sep${i}`} className="count-sep reveal">:</div>}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVITATION ── */}
      <section className="invite-section">
        <div className="invite-left-bar" /><div className="invite-right-bar" />
        <div className="section-inner">
          <span className="section-label reveal">La invitación</span>
          <div className="divider reveal"><div className="divider-line" /><span className="divider-dot">✦</span><div className="divider-line" /></div>
          <p className="invite-body reveal">
            Con la bendición de nuestras familias<br/>
            y la alegría en el corazón,<br/><br/>
            <strong style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45em",fontWeight:400,fontStyle:"italic",color:"var(--text-dark)"}}>Junior &amp; Tatiana</strong>
            <br/><br/>
            {g1 ? <>{`tienen el honor de invitar especialmente a`}<br/>{inviteGuest}<br/><br/></> : null}
            {`${g1 ? "" : "tienen el honor de invitarlos\n"}a celebrar juntos el inicio\nde su vida en matrimonio`.split('\n').map((line, i) => (
              <span key={i}>{line}<br/></span>
            ))}
          </p>
          <div className="divider reveal"><div className="divider-line" /><span className="divider-dot">✦</span><div className="divider-line" /></div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section className="details-section">
        <div className="section-inner">
          <span className="section-label reveal">Los detalles</span>
          <h2 className="section-title reveal">Todo lo que necesitas saber</h2>
          <div className="details-cards stagger">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label:"Fecha", val:"4 de Septiembre", sub:"Viernes · 2026" },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:"Horario", val:"4:00 PM", sub:"Recepción 7:00 PM" },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, label:"Etiqueta", val:"Formal", sub:"Tonos tierra y neutros" },
            ].map(({icon,label,val,sub}) => (
              <div key={label} className="detail-card reveal-scale">
                <div className="detail-card-icon">{icon}</div>
                <span className="detail-card-label">{label}</span>
                <span className="detail-card-value">{val}</span>
                <span className="detail-card-sub">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COFFEE QUOTE ── */}
      <div className="coffee-break reveal">
        <div className="coffee-bg-beans" />
        <p className="coffee-quote">
          <span className="coffee-open-quote">"</span>
          Como el primer sorbo de café por la mañana,<br/>
          así es nuestro amor: cálido, profundo y nuestro.
        </p>
        <span className="coffee-author">Junior &amp; Tatiana · Amantes del buen café</span>
        <div className="coffee-leaves-row">
          {[{ s:20, r:-25 },{ s:26, r:-10 },{ s:32, r:0 },{ s:26, r:10 },{ s:20, r:25 }].map(({s,r},i) => (
            <CoffeeLeaf key={i} size={s} color="#B7957f" rotate={r} />
          ))}
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <section className="carousel-section">
        <div className="section-inner">
          <span className="section-label reveal">Nuestra historia</span>
          <h2 className="section-title reveal">Momentos que nos trajeron aquí</h2>
        </div>
        <Carousel />
      </section>

      {/* ── VENUE ── */}
      <section className="venue-section">
        <div className="section-inner">
          <span className="section-label reveal">El lugar</span>
          <h2 className="section-title reveal">¿Dónde celebramos?</h2>
          <div className="venue-card reveal-scale" style={{position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:"0.5rem",top:"0.5rem",opacity:0.06,width:"120px",pointerEvents:"none"}}>
              <CoffeeBranchSVG />
            </div>
            <span className="venue-name">Monarch Campestre</span>
            <span className="venue-sub">Centro de Eventos · Llanogrande</span>
            <span className="venue-address">Parcelación San Jorge, Rionegro, Antioquia</span>
            <p className="venue-desc">A solo 5 minutos de Llanogrande, rodeados de naturaleza y con fácil acceso desde el Aeropuerto Internacional José María Córdova.</p>
            <a className="venue-map-btn" href="https://maps.google.com/?q=Monarch+Campestre+Rionegro+Antioquia" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section className="rsvp-section">
        <div className="section-inner">
          <span className="section-label reveal">Confirmación</span>
          <h2 className="section-title reveal">¿Nos acompañas?</h2>
          <span className="rsvp-deadline reveal">Confirmar antes del 15 de agosto de 2026</span>
          <div className="rsvp-sep reveal">
            <div className="rsvp-sep-line" />
            <CoffeeLeaf size={14} color="#B7957f" rotate={0} />
            <div className="rsvp-sep-line" />
          </div>
          <div className="rsvp-buttons reveal">
            <a className="rsvp-btn primary" href="https://wa.me/573103235244?text=Hola%2C%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20Junior%20y%20Tatiana%20el%204%20de%20septiembre%20de%202026%20%F0%9F%8C%BF%E2%98%95" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.428a.5.5 0 0 0 .609.61l5.703-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.373l-.36-.215-3.733.977.997-3.645-.234-.374A9.86 9.86 0 0 1 2.1 12c0-5.467 4.433-9.9 9.9-9.9 5.467 0 9.9 4.433 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z"/></svg>
              Confirmar por WhatsApp
            </a>
            <a className="rsvp-btn secondary" href="tel:+573103235244">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Llamar · +57 310 323 52 44
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div style={{display:"flex",justifyContent:"center",gap:"0.8rem",marginBottom:"1rem",opacity:0.25}}>
          {[{s:12,r:-20},{s:16,r:0},{s:12,r:20}].map(({s,r},i) => (
            <CoffeeLeaf key={i} size={s} color="#AB7743" rotate={r} />
          ))}
        </div>
        <div className="footer-names">Junior &amp; Tatiana</div>
        <p className="footer-sub">4 de Septiembre · 2026 · Monarch Campestre · Rionegro, Antioquia</p>
      </footer>
    </>
  );
}