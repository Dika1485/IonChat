import { IonText, IonHeader, IonContent, IonButtons, IonTitle, IonToolbar, IonPage, IonCol, IonGrid, IonRow, IonButton, IonBackButton, IonIcon } from '@ionic/react'; 
import logo from '../assets/logo_bw.svg';
import { useHistory, useParams } from 'react-router';
import { arrowBackOutline, colorFill } from 'ionicons/icons';
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import { getDB } from '../firebaseConfig';
import { child, get, onValue, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const ProfileOther: React.FC = () => {
  const params = useParams<{ username: string }>();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [otherUserInfo, setOtherUserInfo] = useState({});
  const [disabled, setDisabled] = useState(false);
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

  function getOtherUserInfo(username) {
    const dbRef = ref(getDB(), `users/${username}`);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        let user = snapshot.val();
        user.username = username;
        if (JSON.stringify(user) != JSON.stringify(otherUserInfo)) {
          setOtherUserInfo(user);
        }
      } else {
        history.replace('/home');
      }
    });
  }

  function checkIfFriend() {
    if (userInfo.hasOwnProperty('friends')) {
      const friends = userInfo.friends;
      friends.forEach(friend => {
        if (friend.username == otherUserInfo.username) {
          setDisabled(true);
        }
      });
    }
    
    if (userInfo.hasOwnProperty('sentRequests')) {
      const sentRequest = userInfo.sentRequests;
      if (sentRequest != null) {
        const sentReq = sentRequest[otherUserInfo.username];
        if (sentReq != null) {
          setDisabled(true);
        }
      }
    }
    if (otherUserInfo.hasOwnProperty('receivedRequests')) {
      const receivedRequests = otherUserInfo.receivedRequests;
      if (receivedRequests != null) {
        const receivedReq = receivedRequests[userInfo.username];
        if (receivedReq != null) {
          setDisabled(true);
        }
      }
    }
  }

  function addFriend() {
    const db = getDB();
    update(ref(db, `users/${userInfo.username}`), {
      sentRequests: {
        [otherUserInfo.username]: true
      }
    });
    update(ref(db, `users/${otherUserInfo.username}`), {
      receivedRequests: {
        [userInfo.username]: true
      }
    });
  }

  useEffect(() => {
    getUserInfo();
    getOtherUserInfo(params.username);
    checkIfFriend();
  }, [userInfo, otherUserInfo, disabled]);

  console.log(userInfo);

    return (
        <IonPage className={styles.home}>
            <IonHeader className='ion-no-border'>
            <IonToolbar>
              {/* <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
              </IonButtons> */}
              <IonButtons slot="start">
                  <IonBackButton defaultHref="/home"></IonBackButton>
              </IonButtons>
              <IonTitle>
                  <IonIcon id="logo-white" src={logo} aria-hidden={true}></IonIcon>
              </IonTitle>
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
                          src={otherUserInfo.profilePic}
                          alt="avatar"
                        />
                        <IonRow className="ion-justify-content-center ion-text-center">
                          <IonText className={styles.profileOther}>
                            <h3>{otherUserInfo.username}</h3>
                            <p>{otherUserInfo.email}</p>
                            <p>{otherUserInfo.bio}</p>
                          </IonText>
                        </IonRow>
                        <IonRow className="ion-justify-content-center ion-text-center">
                          <IonText className={styles.GroupFriends}>
                            <h5 className={styles.totalFriends}>{(otherUserInfo.friends == null) ? (0) : (otherUserInfo.friends.length)}</h5>
                            <p>friends</p>
                          </IonText>
                        </IonRow>
                        <IonButton disabled={disabled} className={styles.tombolAdd} onClick={() => addFriend()}>Add Friend</IonButton>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
        </IonPage>
  );
};
export default ProfileOther;
