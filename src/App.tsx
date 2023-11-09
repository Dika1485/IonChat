import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home1 from './pages/Home1';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import Chat from './pages/Chat';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Redirect to="/home" />
        </Route>
        <Route path="/message/:id">
           <ViewMessage />
        </Route>
        <Route path="/home1" exact={true}>
          <Home1 />
        </Route>
        <Route path="/home" exact={true}>
          <Home />
        </Route>
        <Route path="/chat">
           <Chat />
        </Route>
        {/* <Route path="/home" exact={true}>
          <Home />
        </Route>
        <Route path="/signin">
           <Signin />
        </Route>
        <Route path="/register">
           <Register />
        </Route>
        <Route path="/chat">
           <Chat />
        </Route>
        <Route path="/edit">
           <Edit />
        </Route>
        <Route path="/home">
           <Home />
        </Route>
        <Route path="/list">
           <List />
        </Route>
        <Route path="/otherprofile/:id">
           <OtherProfile />
        </Route>
        <Route path="/profile">
           <Profile />
        </Route> */}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
