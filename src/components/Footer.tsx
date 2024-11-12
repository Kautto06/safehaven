import React, { useEffect, useState } from 'react';
import { IonFooter, IonToolbar, IonTitle, IonText } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, logoInstagram } from 'ionicons/icons';
import '../assets/Footer.css';

const Footer: React.FC = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
        setIsAtBottom(bottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);





  return (
  <IonFooter>
    <IonToolbar className="footer-toolbar">
      <div className="footer-content">
        <div className="footer-section">
          <IonTitle size="small">© 2024 SafeHaven</IonTitle>
          <IonText>Todos los derechos reservados</IonText>
        </div>

        <div className="footer-section">
          <IonTitle size="small">Contacto</IonTitle>
          <IonText>Email: contacto@tuempresa.com</IonText>
          <IonText>Teléfono: +123 456 7890</IonText>
        </div>

        <div className="footer-section">
          <IonTitle size="small">Síguenos</IonTitle>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <IonIcon icon={logoFacebook} className="social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <IonIcon icon={logoTwitter} className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <IonIcon icon={logoInstagram} className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </IonToolbar>
  </IonFooter>

  );
};

export default Footer;
