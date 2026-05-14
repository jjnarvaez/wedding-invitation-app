import React, { useState, useEffect, useRef } from 'react';
import CoffeeLeaf from './CoffeeLeaf';
import QUOTES from '../quotesData';

function QuotesCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const virtIdxRef = useRef(currentIdx);

  const totalQuotes = QUOTES.length;
  const quote = QUOTES[currentIdx];

  const goTo = (idx) => {
    setCurrentIdx(((idx % totalQuotes) + totalQuotes) % totalQuotes);
  };

  /* Auto-advance every 8 seconds */
  useEffect(() => {
    virtIdxRef.current = currentIdx;
  }, [currentIdx]);

  useEffect(() => {
    const id = setInterval(() => {
      goTo(virtIdxRef.current + 1);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="quotes-carousel-fullscreen">
      <div className="quote-display fade-in-out" key={currentIdx}>
        <div className="quote-inner-fullscreen">
          <CoffeeLeaf size={20} color="rgba(171,119,67,0.45)" rotate={currentIdx % 2 === 0 ? -15 : 15} />
          <p className="quote-text-fullscreen">
            <span className="quote-open-quote">"</span>
            {quote.text}
          </p>
          <span className="quote-author-fullscreen">{quote.author}</span>
          <div className="quote-leaves-row-fullscreen">
            {[{ s:12, r:-20 },{ s:16, r:0 },{ s:12, r:20 }].map(({s,r},idx) => (
              <CoffeeLeaf key={idx} size={s} color="#B7957f" rotate={r} />
            ))}
          </div>
        </div>
      </div>

      <div className="quotes-carousel-controls-fullscreen">
        <button 
          className="quotes-carousel-btn" 
          onClick={() => goTo(currentIdx - 1)}
          aria-label="Frase anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="quotes-carousel-dots-fullscreen">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              className={`quotes-carousel-dot-fullscreen${i === currentIdx ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Frase ${i+1}`}
            />
          ))}
        </div>

        <button 
          className="quotes-carousel-btn" 
          onClick={() => goTo(currentIdx + 1)}
          aria-label="Frase siguiente"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default QuotesCarousel;