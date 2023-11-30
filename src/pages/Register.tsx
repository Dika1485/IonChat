import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToast } from '@ionic/react';
import './Register.css';
import logo from '../assets/Frame.svg';
import { useHistory } from 'react-router';
import { app, getDB } from '../firebaseConfig';
import { GoogleAuthProvider, getAuth, signInWithCredential} from 'firebase/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useEffect, useState } from 'react';
import { child, get, ref, set } from 'firebase/database';

app; // Initialize firebase

const Register: React.FC = () => {
    const history = useHistory();
    const [toastIsOpen, setToastOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [username, setUsername] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [registeredEmails, setRegisteredEmails] = useState(0);
    const auth = getAuth();

    function getUserInfo() {
        const email = auth.currentUser?.email;
        const dbRef = ref(getDB());
        get(child(dbRef, `registered_emails`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const result = snapshot.val();
              setRegisteredEmails(result.length);
              result.forEach(user => {
                if (user.email == email) {
                  get(child(dbRef, `users/${user.username}`))
                    .then((snapshot) => {
                      if (snapshot.exists()) {
                        let userinfo = snapshot.val();
                        userinfo['username'] = user.username;
                        if (JSON.stringify(userinfo) != JSON.stringify(userInfo)) {
                          setUserInfo(userinfo);
                        }
                      }
                    }).catch((error) => {
                      console.error(error);
                    });
                }
              });
            } else {
                console.log("No data available");
            }
          }).catch((error) => {
              console.error(error);
          });
      }

    function register() {
        if (username == '') {
            return;
        }

        const dbRef = ref(getDB());
        get(child(dbRef, `registered_usernames/${username}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    alert("Username has already been taken");
                } else {
                    const db = getDB();
                    set(ref(db, `users/${username}`), {
                        bio: `Halo, perkenalkan nama saya ${username}!`,
                        email: auth.currentUser?.email,
                        profilePic: "https://firebasestorage.googleapis.com/v0/b/ionchat-dbff3.appspot.com/o/profile_pic%2Fdefault_profile_pic.jpg?alt=media&token=14d66a86-2fa7-4310-9d23-7f1329941cd6"
                    });
                    set(ref(db, `registered_emails/${registeredEmails}`), {
                        email: auth.currentUser?.email,
                        registrationComplete: true,
                        username: username
                    });
                    set(ref(db, `registered_usernames`), {
                        [username]: true
                    });
                    history.replace('/home');
                }
            });
    }

    useEffect(() => {
        getUserInfo();
    })

    return(
        <>
            <IonPage>
                <IonContent>
                <IonList className='listRegister listMedium' lines="none">
                    <IonIcon id="logo" src={logo} aria-hidden={true}></IonIcon>
                </IonList>
                <IonList className='listRegister listSmall'>
                    <IonItem>
                        <IonInput label="Username" labelPlacement="floating" className='ion-input-wrapper' onIonChange={(e: any) => setUsername(e.target.value)} value={username}></IonInput>
                    </IonItem>
                </IonList>
                <IonList className='listRegister listMedium' lines="none">
                    <IonButton fill="clear" onClick={() => register()}>
                        REGISTER
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

export default Register;