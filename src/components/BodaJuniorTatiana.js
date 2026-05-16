import React, { useEffect, useState, useRef } from 'react';
import CoffeePlantSVG from './CoffeePlantSVG';
import CoffeeLeaf from './CoffeeLeaf';
import CoffeeBranchSVG from './CoffeeBranchSVG';
import { ReactComponent as CoffeeBranchRemasteredSVG } from './Coffe_branch_remastered_SVG.svg';
import Carousel from './Carousel';
import QuotesCarousel from './QuotesCarousel';
import useReveal from '../hooks/useReveal';
import useCountdown from '../hooks/useCountdown';
import useGuests from '../hooks/useGuests';

export default function BodaJuniorTatiana() {
  useReveal();
  const [isDressCodeOpen, setIsDressCodeOpen] = useState(false);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const { d, h, m, s } = useCountdown();
  const { g1, g2 } = useGuests();

  useEffect(() => {
    if (!isDressCodeOpen && !isRecommendationsOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDressCodeOpen(false);
        setIsRecommendationsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDressCodeOpen, isRecommendationsOpen]);

  useEffect(() => {
    document.body.style.overflow = isDressCodeOpen || isRecommendationsOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDressCodeOpen, isRecommendationsOpen]);

  /* Audio background */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.log('Audio autoplay blocked by browser');
      }
    };

    // Intentar reproducir automáticamente
    playAudio();

    // Configurar loop infinito
    audio.loop = true;
    audio.volume = 0.1; // Volumen bajo para no ser intrusivo

    return () => {
      audio.pause();
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      audio.play();
      setIsAudioPlaying(true);
    }
  };

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

  const guestHeading = g2
    ? `${g1} y ${g2}`
    : g1;
  const heroNamesText = g1
    ? g2 ? `${g1} & ${g2}` : g1
    : 'Junior & Tatiana';

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

        

        <p className="hero-label anim-up" style={{animationDelay:"0.2s"}}>Con amor los invitamos a nuestra boda</p>

        <div className="hero-names anim-up" style={{animationDelay:"0.4s"}}>
          {heroNamesText.split(' y ').map((name, index, arr) => (
            <React.Fragment key={name}>
              {name}
              {index < arr.length - 1 && <span className="hero-amp">&amp;</span>}
            </React.Fragment>
          ))}
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
            <div ><CoffeeBranchRemasteredSVG /></div>
        </div>

        <div className="scroll-hint anim-in" style={{animationDelay:"1.6s"}}>
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
            Entre aromas de café, miradas de complicidad y un amor que ha crecido con el tiempo, hemos decidido comenzar el viaje más bonito de nuestras vidas.<br/>
            <br/>
            <strong style={{fontFamily:"'Playfair Display',serif",fontSize:"3.45em",fontWeight:400,fontStyle:"italic",color:"var(--text-dark)"}}>Junior &amp; Tatiana</strong>
            <br/>
            <br/>
            Queremos invitarlos a compartir con nosotros este nuevo capítulo, celebrado entre sonrisas, amor y la calidez de quienes hacen parte de nuestra historia.
            Será un honor tenerlos junto a nosotros en un día tan especial.
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
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 11h16M4 16h16"/></svg>, label:"Recomendaciones", val:"Consejos", sub:"Tap para ver más" },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:"Horario", val:"4:00 PM", sub:"Recepción 7:00 PM" },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, label:"Etiqueta", val:"Formal", sub:"Tap para ver más"},
            ].map(({icon,label,val,sub}) => {
              const isRecommendations = label === "Recomendaciones";
              const isDressCode = label === "Etiqueta";
              return (
                <div
                  key={label}
                  className={`detail-card reveal-scale${isRecommendations || isDressCode ? " detail-card-clickable" : ""}`}
                  onClick={isRecommendations ? () => setIsRecommendationsOpen(true) : isDressCode ? () => setIsDressCodeOpen(true) : undefined}
                  role={isRecommendations || isDressCode ? "button" : undefined}
                  tabIndex={isRecommendations || isDressCode ? 0 : undefined}
                  onKeyDown={isRecommendations || isDressCode ? (e) => { if (e.key === "Enter" || e.key === " ") {
                    if (isRecommendations) setIsRecommendationsOpen(true);
                    if (isDressCode) setIsDressCodeOpen(true);
                  }} : undefined}
                  style={isRecommendations || isDressCode ? { cursor: "pointer" } : undefined}
                >
                  <div className="detail-card-icon">{icon}</div>
                  <span className="detail-card-label">{label}</span>
                  <span className="detail-card-value">{val}</span>
                  <span className="detail-card-sub">{sub}</span>
                  {(isRecommendations || isDressCode) && <span className="detail-card-link">Ver detalles</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {isDressCodeOpen && (
        <div className="modal-overlay" onClick={() => setIsDressCodeOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsDressCodeOpen(false)} aria-label="Cerrar detalles de etiqueta">
              &times;
            </button>
            <div className="modal-content">
              <h3 className="modal-title">Código de vestimenta</h3>
              <p className="modal-text">Hemos soñado cada detalle de este día, y nos encantará que nos acompañen vistiendo acorde a esta celebración.</p>
              <div className="modal-detail-list">
                <div className="modal-detail-group">
                  <h4>Hombres</h4>
                  <ul>
                    <li><strong>Estilo:</strong> Traje formal.</li>
                    <li><strong>Colores sugeridos:</strong> Negro.</li>
                    <li><strong>Accesorios:</strong> corbata, pañuelo de bolsillo.</li>
                  </ul>
                </div>
                <div className="modal-detail-group">
                  <h4>Mujeres</h4>
                  <ul>
                    <li><strong>Estilo:</strong> Vestido largo.</li>
                    <li><strong>Colores sugeridos:</strong> crema, ocre, terracota y tonos apagados.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn" onClick={() => setIsDressCodeOpen(false)}>Entendido</button>
            </div>
          </div>
        </div>
      )}

      {isRecommendationsOpen && (
        <div className="modal-overlay" onClick={() => setIsRecommendationsOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsRecommendationsOpen(false)} aria-label="Cerrar detalles de recomendaciones">
              &times;
            </button>
            <div className="modal-content">
              <h3 className="modal-title">Recomendaciones para invitados</h3>
              <p className="modal-text">Queremos que esta experiencia sea tan cómoda como especial para todos ustedes, así que les dejamos algunas sugerencias importantes.</p>
              <div className="modal-detail-list">
                <div className="modal-detail-group">
                  <ul>
                    <li>Recuerda que estarás lejos de casa, no olvides tu chaqueta ya que en al noche puede hacer frio.</li>
                    <li>Sabemos que la rumba estará increible, no olvides tu calzado de cambio, sin embargo, solo podrás usarlos en el momento de la fiesta.</li>
                    <li>Para que no tengas preocupaciones, reserva tu transporte con tiempo; si quieres ir en tu vehiculo propio tendremos parqueaderos disponibles, pero, si vas a tomar, pide tu conductor elegido o contrata alguien que te lleve y recoja al final de la fiesta.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn" onClick={() => setIsRecommendationsOpen(false)}>Entendido</button>
            </div>
          </div>
        </div>
      )}

      {/* ── COFFEE QUOTES ── */}
      <div className="coffee-break reveal">
        <div className="coffee-bg-beans" />
        <QuotesCarousel />
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
          <span className="rsvp-deadline reveal">Confirmar antes del 22 de Julio de 2026</span>
          <div className="rsvp-sep reveal">
            <div className="rsvp-sep-line" />
            <CoffeeLeaf size={14} color="#B7957f" rotate={0} />
            <div className="rsvp-sep-line" />
          </div>
          <div className="rsvp-buttons reveal">
            <a className="rsvp-btn primary" href="https://wa.me/573166865818?text=Hola%2C%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20Junior%20y%20Tatiana%20el%204%20de%20septiembre%20de%202026%20%F0%9F%8C%BF%E2%98%95" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.428a.5.5 0 0 0 .609.61l5.703-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.373l-.36-.215-3.733.977.997-3.645-.234-.374A9.86 9.86 0 0 1 2.1 12c0-5.467 4.433-9.9 9.9-9.9 5.467 0 9.9 4.433 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z"/></svg>
              Confirmar por WhatsApp
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

      {/* Audio background */}
      <audio ref={audioRef} preload="auto">
        <source src="/assets/wedding-background-music.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Audio control button */}
      <button
        onClick={toggleAudio}
        className="audio-control"
        aria-label={isAudioPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
      >
        {isAudioPlaying ? '🔊' : '🔇'}
      </button>
    </>
  );
}