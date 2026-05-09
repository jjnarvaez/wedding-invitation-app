import { useState, useEffect } from 'react';

function useGuests() {
  const [guests, setGuests] = useState({ g1: null, g2: null });
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const g1 = p.get("invitado");
    const g2 = p.get("invitado2");
    const clean = s => s ? s.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim() : null;
    setGuests({ g1: clean(g1), g2: clean(g2) });
  }, []);
  return guests;
}

export default useGuests;