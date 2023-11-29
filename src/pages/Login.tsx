import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToast } from '@ionic/react';
import './Login.css';
import logo from '../assets/Frame.svg';
import { useHistory } from 'react-router';
import { app } from '../firebaseConfig';
import { GoogleAuthProvider, getAuth, signInWithCredential} from 'firebase/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useState } from 'react';

app; // Initialize firebase

const Login: React.FC = () => {
    const history = useHistory();
    const [toastIsOpen, setToastOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    async function login() {
        GoogleAuth.initialize();
        
        const result = await GoogleAuth.signIn();
        if (result) {
            const credential = GoogleAuthProvider.credential(result.authentication.idToken);
            const auth = getAuth();
            signInWithCredential(auth, credential)
                .then((result) => {
                    history.replace('/usercheck');
                }).catch((error) => {
                    // Handle errors
                    const errorCode = error.code;
                    const errorMsg = error.message;
                    setToastMsg(errorCode + " - " + error.message);
                    setToastOpen(true);
                })
        }
      }

    return(
        <>
            <IonPage>
                <IonContent>
                <IonList lines="none" className='listLogin'>
                    <IonIcon id="logo" src={logo} aria-hidden={true}></IonIcon>
                </IonList>
                <IonList lines="none" className='listLogin'>
                    <IonButton fill="clear" onClick={() => login()}>
                        SIGN-IN
                        <br />
                        GOOGLE
                    </IonButton>
                </IonList>
                    <IonToast
                        isOpen={toastIsOpen}
                        message={toastMsg}
                        onDidDismiss={() => setToastOpen(false)}
                        duration={3000}
                    ></IonToast>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Login;