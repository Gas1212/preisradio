'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if already installed (works for Android/Desktop)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if Android
    const isAndroid = /Android/.test(navigator.userAgent);

    // Detect if mobile device (only show install prompt on mobile)
    const mobile = iOS || isAndroid;
    setIsMobile(mobile);

    // Check if installed on iOS (navigator.standalone)
    const isIOSInstalled = iOS && (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone || isIOSInstalled) {
      setIsInstalled(true);
      return;
    }

    // Only show install prompt on mobile devices
    if (!mobile) {
      return;
    }

    // For iOS: show prompt after delay (no beforeinstallprompt event on iOS)
    if (iOS) {
      setTimeout(() => {
        const hasSeenPrompt = localStorage.getItem('pwa-install-dismissed');
        if (!hasSeenPrompt) {
          setShowInstallPrompt(true);
        }
      }, 3000);
      return;
    }

    // Listen for the beforeinstallprompt event (Android only, not desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Don't show immediately - wait a bit or show based on user engagement
      setTimeout(() => {
        const hasSeenPrompt = localStorage.getItem('pwa-install-dismissed');
        if (!hasSeenPrompt) {
          setShowInstallPrompt(true);
        }
      }, 3000); // Show after 3 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      console.log('PWA installed successfully');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
      localStorage.setItem('pwa-install-dismissed', 'true');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if installed, not mobile, or no prompt available
  if (isInstalled || !isMobile || (!showInstallPrompt && !isIOS)) {
    return null;
  }

  // iOS Install Instructions
  if (isIOS && showInstallPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-2xl border-2 border-blue-500">
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Als App installieren
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Installieren Sie Preisradio für schnellen Zugriff:
              </p>
              <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="font-bold">1.</span>
                  Tippen Sie auf
                  <svg className="h-5 w-5 inline text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  (Teilen)
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">2.</span>
                  Wählen Sie "Zum Home-Bildschirm"
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Android/Desktop Install Prompt
  if (showInstallPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 shadow-2xl">
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 text-white/80 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Preisradio installieren
              </h3>
              <p className="text-sm text-white/90 mb-4">
                Installieren Sie unsere App für schnelleren Zugriff und ein besseres Erlebnis
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-white/90 transition-colors"
                >
                  Installieren
                </button>
                <button
                  onClick={handleDismiss}
                  className="rounded-lg border-2 border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Später
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
