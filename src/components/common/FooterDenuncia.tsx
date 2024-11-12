import React from 'react';
import { IonFooter, IonToolbar, IonText } from '@ionic/react';
import '../../assets/common/FooterDenuncia.css';

export const FooterDenuncia: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar className="footer-toolbar-simple">
        <IonText className="footer-text">Tu denuncia es 100% anónima</IonText>
      </IonToolbar>
    </IonFooter>
  );
};


