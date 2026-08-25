import React, { useState, useEffect } from 'react';

const AppInstallOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // 1. Mobile detect karo
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // 2. PWA already installed hai? (standalone mode check)
    const isInstalled = window.navigator.standalone || 
                        window.matchMedia('(display-mode: standalone)').matches;

    // 3. Agar mobile hai aur install nahi hai toh overlay dikhao
    if (isMobile && !isInstalled) {
      setShowOverlay(true);
    }

    // 4. PWA ka beforeinstallprompt event capture karo
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);  // Store karo prompt ko
      // Agar abhi tak overlay nahi dikh raha toh dikhao
      if (isMobile && !isInstalled) {
        setShowOverlay(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // ===== INSTALL BUTTON CLICK =====
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        console.log('✅ App installed successfully!');
      } else {
        console.log('❌ User dismissed installation');
      }
      setDeferredPrompt(null);
      setShowOverlay(false);
    } else {
      // Fallback — iOS ya browser jo PWA support nahi karta
      alert('Please install the app from your app store or browser menu.');
    }
  };

  // Agar overlay show nahi karna toh return null
  if (!showOverlay) return null;

  // ===== UI =====
  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <h2 style={{ margin: '0 0 10px' }}>📱 Install Our App</h2>
        <p style={{ margin: '0 0 20px', color: '#555' }}>
          Get a better experience with our mobile app!
        </p>
        <button onClick={handleInstall} style={btnStyle}>
          Install App
        </button>
        <button onClick={() => setShowOverlay(false)} style={closeBtnStyle}>
          Skip
        </button>
      </div>
    </div>
  );
};

// ========== STYLES ==========
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const popupStyle = {
  background: '#fff',
  padding: '30px',
  borderRadius: '20px',
  textAlign: 'center',
  maxWidth: '350px',
  width: '90%',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
};

const btnStyle = {
  background: '#6a1b9a',
  color: '#fff',
  padding: '12px 30px',
  border: 'none',
  borderRadius: '30px',
  fontSize: '16px',
  cursor: 'pointer',
  margin: '5px',
  fontWeight: 'bold',
};

const closeBtnStyle = {
  background: 'transparent',
  color: '#888',
  padding: '12px 20px',
  border: '1px solid #ccc',
  borderRadius: '30px',
  fontSize: '16px',
  cursor: 'pointer',
  margin: '5px',
};

export default AppInstallOverlay;