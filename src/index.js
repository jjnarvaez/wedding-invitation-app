import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import BodaJuniorTatiana from './components/BodaJuniorTatiana';
import EnvelopeIntro from './components/EnvelopeIntro';

const root = ReactDOM.createRoot(document.getElementById('root'));
function AppWrapper() {
  const [showMain, setShowMain] = useState(() => {
    try {
      return localStorage.getItem('envelopeOpened') === 'true';
    } catch (e) {
      return false;
    }
  });

  if (!showMain) {
    return <EnvelopeIntro onFinish={() => setShowMain(true)} />;
  }

  return <BodaJuniorTatiana />;
}

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);