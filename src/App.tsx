import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Page components */
import Home from './pages/Home';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import ProfileOther from './pages/ProfileOther';
import Login from './pages/Login';
import List from './pages/List';
import UserCheck from './pages/UserCheck';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/usercheck">
          <UserCheck />
        </Route>
        <Route path="/chat/:id">
           <Chat />
        </Route>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/profile">
           <Profile />
        </Route>
        <Route path="/editprofile">
           <ProfileEdit />
        </Route>
        <Route path="/profile/other">
           <ProfileOther />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
