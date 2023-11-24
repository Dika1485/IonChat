import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonPage, IonTitle } from '@ionic/react';
import './Login.css';
import logo from '../assets/logo.svg';
import { useHistory } from 'react-router';
import { app } from '../firebaseConfig';
import { GoogleAuthProvider, getAuth, signInWithCredential} from 'firebase/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

app; // Initialize firebase

const Login: React.FC = () => {
    const history = useHistory();

    async function login() {
        GoogleAuth.initialize();
        
        const result = await GoogleAuth.signIn();
        if (result) {
            const credential = GoogleAuthProvider.credential(result.authentication.idToken);
            const auth = getAuth();
            const firebaseLogin = await signInWithCredential(auth, credential);
            history.push('/home');
        }
      }

    return(
        <>
            <IonPage>
                <IonContent>
                    <IonButton onClick={() => login()}>
                        Login with Google
                    </IonButton>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Login;