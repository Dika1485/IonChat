import {IonBackdrop, IonDatetime, IonDatetimeButton, IonModal, IonInput, IonImg, IonIcon,IonThumbnail, IonItem, IonText, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonContent, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonLabel, IonAvatar, IonItemDivider, IonPage, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonButton, IonBackButton, IonTextarea } from '@ionic/react'; 
import { useHistory, useParams } from 'react-router';
import React, {useEffect, useRef, useState} from 'react';
import { arrowBackOutline, colorFill } from 'ionicons/icons';
import styles from './Profile.module.scss';
import { child, get, ref, update } from 'firebase/database';
import { getDB } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

const ProfileEdit: React.FC = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [bio, setBio] = useState('');
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

  function save() {
    if (bio == '') {
      return;
    }

    const db = getDB();
    update(ref(db, `users/${userInfo.username}`), {
      bio: bio
    });
    history.goBack();
  }

  useEffect(() => {
    getUserInfo();
    setBio(userInfo.bio);
  }, [userInfo]);
  
  return (
    <IonPage className={styles.home}>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className={styles.topHeader}></div>
        <div className={styles.fakeTop}></div>
	<IonGrid fixed={true}>
          <IonRow className="ion-justify-content-center ion-text-center">
            <IonCol></IonCol>
            <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
              <img className={styles.imageset} style={{ objectFit: "cover",
                objectPosition: "50% 50%", position: "relative"}}
                src={userInfo.profilePic}
                alt="avatar"
              />
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='8'>
              <IonText><h4>Bio</h4></IonText>
              <IonTextarea placeholder='Enter bio' autocomplete='on' value={bio} onIonChange={(e: any) => setBio(e.target.value)}></IonTextarea>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-text-center">
            <IonCol></IonCol>
            <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
              <IonButton className={styles.tombolEdit} onClick={() => save()}>Save</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default ProfileEdit;
