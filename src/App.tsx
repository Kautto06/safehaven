import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import AppRouter from './router/AppRouter';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import Register from './pages/Register';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppRouter/>
    </IonReactRouter>
  </IonApp>
);

export default App;

/*<IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Register />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
*/ 