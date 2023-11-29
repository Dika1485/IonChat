import {IonImg, IonIcon,IonThumbnail, IonItem, IonText, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonContent, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonLabel, IonAvatar, IonItemDivider, IonPage, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonButton, IonBackButton } from '@ionic/react'; 
import { useParams } from 'react-router';
import { arrowBackOutline, colorFill } from 'ionicons/icons';
import styles from './Profile.module.scss';
import { app, getDB } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { child, get, onValue, ref } from "firebase/database";
import { useState } from 'react';

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState({});
  const auth = getAuth();
  function getUserInfo() {
    const email = auth.currentUser?.email;
    const dbRef = ref(getDB());
    get(child(dbRef, `registered_emails`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val();
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

    return (
      <IonPage className={styles.home}>
        <IonHeader className='ion-no-border'>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Profile Detail</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className={styles.topHeader}></div>
          <div className={styles.fakeTop}></div>
          <IonGrid id="pr" fixed={true}>
            <IonRow className="ion-justify-content-center ion-text-center">
              <IonCol></IonCol>
              <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
                <img className={styles.imageset} style={{ objectFit: "cover",
                  objectPosition: "50% 50%", position: "relative"}}
                  // src="https://docs-demo.ionic.io/assets/madison.jpg"
                  src={userInfo.profilePic}
                  alt="The Wisconsin State Capitol building in Madison, WI at night"
                />
            </IonCol>
            <IonCol></IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='8'>
                {/* <IonText><h4>Name</h4><p>{ userInfo.username }</p></IonText>	 */}
                <IonText><h4>Email</h4><p>{ userInfo.email }</p></IonText> 
                <IonText><h4>Username</h4><p>{ userInfo.username }</p></IonText>
                <IonText><h4>Username</h4><p>{ userInfo.bio }</p></IonText>
                {/* <IonText><h4>Password</h4><p>your password</p></IonText> */}
              </IonCol>
            <IonCol></IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-text-center">
              <IonCol></IonCol>
              <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
                <IonButton className={styles.tombolEdit} routerLink='/editprofile'>Edit Profile</IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
  );
};
export default Profile;
