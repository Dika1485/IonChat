import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonPage, IonTitle } from '@ionic/react';
import './Login.css';
import logo from '../assets/logo.svg';
import { useHistory } from 'react-router';
import { app } from '../firebaseConfig';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

app; // Initialize firebase

const Login: React.FC = () => {
    const history = useHistory();

    function login() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            history.push('/home');
          }).catch((error) => {
            // Handle Errors here.
            console.log(error);
          });
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