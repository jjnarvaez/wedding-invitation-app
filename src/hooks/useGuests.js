import { useState, useEffect } from 'react';

const guestKeys = ["invitado", "invitado1", "name", "nombre", "guest"];
const guestKeys2 = ["invitado2", "name2", "nombre2", "guest2"];

function useGuests() {
  const [guests, setGuests] = useState({ g1: null, g2: null });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g1 = cleanGuest(findGuestValue(params, guestKeys));
    const g2 = cleanGuest(findGuestValue(params, guestKeys2));
    setGuests({ g1, g2 });
  }, []);
  return guests;
}

function findGuestValue(params, keys) {
  return keys
    .map((key) => params.get(key))
    .find((value) => value && value.trim().length > 0) || null;
}

function cleanGuest(value) {
  if (!value) return null;
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

export default useGuests;