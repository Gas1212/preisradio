'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

export default function PWALoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Détecter si l'app est lancée en mode PWA
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSPWA = (window.navigator as any).standalone === true;
      return isStandalone || isIOSPWA;
    };

    setIsPWA(checkPWA());

    // Temps de chargement minimum pour l'animation
    const minLoadTime = isPWA ? 2000 : 500;

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime);

    return () => clearTimeout(loadTimer);
  }, [isPWA]);

  // Afficher le loader uniquement en mode PWA et pendant le chargement initial
  if (isLoading && isPWA) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
