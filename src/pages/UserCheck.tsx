import { child, get, ref } from 'firebase/database';
import { getDB } from '../firebaseConfig';
import { IonPage, IonContent, IonLoading, useIonViewDidEnter } from '@ionic/react';
import { useHistory } from 'react-router';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

const UserCheck: React.FC = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);

    useIonViewDidEnter(() => {
        const auth = getAuth();
        if (auth == null) {
            history.replace('/login');
        }
        const email = auth.currentUser?.email;
        const dbRef = ref(getDB());
        get(child(dbRef, `registered_emails`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const result = snapshot.val();
                    let emailRegistered = false;
                    result.forEach(user => {
                        if (user.email == email) {
                            emailRegistered = true;
                            isUserRegistered(user);
                        }
                    });
                    // If email is not in registered_emails, redirect to register page
                    if (!emailRegistered) {
                        history.replace('/register');
                    }
                    setLoading(false);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            })
    });

    function isUserRegistered(userInfo) {
        if (userInfo.registrationComplete) {
            history.replace('/home');
        } else {
            history.replace('/register');
        }
    }

    return (
        <>
            <IonPage>
                <IonContent>
                    <IonLoading isOpen={isLoading} onDidDismiss={() => setLoading(false)}></IonLoading>
                </IonContent>
            </IonPage>
        </>
    );
};

export default UserCheck;
