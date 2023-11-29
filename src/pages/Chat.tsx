import { useEffect, useState } from 'react';
// import { Message, getMessage, getMessages } from '../data/messageswithningbao';
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonAvatar,
  IonList,
  IonInput,
  IonRow,
  IonCol,
  IonFooter,
  IonTitle,
  IonCard,
  IonCardContent,
  useIonViewDidEnter,
} from '@ionic/react';
import { logoIonic, personCircle, sendOutline } from 'ionicons/icons';
import { RouteComponentProps, useHistory, useParams } from 'react-router';
import './Chat.css';
import ChatListItem from '../components/ChatListItem';
import { getAuth } from 'firebase/auth';
import { ref, child, get, onValue, set, update } from 'firebase/database';
import { getDB } from '../firebaseConfig';


const Chat: React.FC = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [otherUserInfo, setOtherUserInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
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

  function getOtherProfile(chatID) {
    const dbRef = ref(getDB(), `chats/${chatID}`);
    onValue(dbRef, (snapshot) => {
      const chatInfo = snapshot.val();
      let otherUser = {username: '', profilePic: ''};
      let otherUsername = '';
      chatInfo.members.forEach(username => {
        if (username != userInfo.username) {
          otherUsername = username;
        }
      });
      otherUser['username'] = otherUsername;
      const dbRef2 = ref(getDB(), `users/${otherUsername}`);
      onValue(dbRef2, (snapshot2) => {
        const user = snapshot2.val();
        otherUser['profilePic'] = user.profilePic;
      });
      if (JSON.stringify(otherUser) != JSON.stringify(otherUserInfo)) {
        setOtherUserInfo(otherUser);
      }
    });
  }

  function getMessages(chatID) {
    const dbRef = ref(getDB(), `messages/${chatID}`);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const msg_tmp = snapshot.val();
        const db = getDB();
        if (messages.length > 0) {
          if (!msg_tmp[messages.length-1].isRead && msg_tmp[messages.length-1].sender != userInfo.username) {
            update(ref(db, `messages/${chatID}/${messages.length-1}`), {
              isRead: true
            });
            update(ref(db, `chats/${chatID}`), {
              lastNotRead: false
            });
          }
        }
        if (JSON.stringify(msg_tmp) != JSON.stringify(messages)) {
          setMessages(msg_tmp);
        }
      }
    });
  }

  // useIonViewWillEnter(() => {
  //   const msgs = getMessages();
  //   setMessages(msgs);
  // });

  // const refresh = (e: CustomEvent) => {
  //   setTimeout(() => {
  //     e.detail.complete();
  //   }, 3000);
  // };

  function sendText() {
    if (text == '') {
      return;
    }
    
    const db = getDB();
    const datetime = new Date().toString();
    set(ref(db, `messages/${params.id}/${messages.length}`), {
      isRead: false,
      message: text,
      photoPath: '',
      sender: userInfo.username,
      timestamp: datetime
    });
    
    set(ref(db, `chats/${params.id}`), {
      lastMessage: text,
      lastNotRead: true,
      lastSender: userInfo.username,
      lastTimestamp: datetime,
      members: [userInfo.username, otherUserInfo.username],
      profilePics: {
        [userInfo.username]: userInfo.profilePic,
        [otherUserInfo.username]: otherUserInfo.profilePic
      }
    });

    setText('');
  }

  useIonViewDidEnter(() => {
    if (auth.currentUser == null) {
      history.replace('/login');
    }
  });

  useEffect(() => {
    getUserInfo();
    getOtherProfile(params.id);
    getMessages(params.id);
  });
  console.log(messages.length);

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton href="/profile/other"><span style={{ textTransform: 'none' }}>{otherUserInfo.username}</span><IonAvatar className="ion-padding"><img src={otherUserInfo.profilePic} alt="Other user avatar" /></IonAvatar></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
        <IonCard>
        <IonList className="ion-padding">
          {messages.map((m, i) => <ChatListItem key={i} message={m} sender={otherUserInfo.username} />)}
        </IonList>
        </IonCard>
      <IonFooter translucent={true}>
        <IonToolbar color={'light'}>
        <IonRow className='footer-content'>
          <IonCol>
            <div>
            <IonInput placeholder='Enter Text' className='ion-input-wrapper' onIonChange={(e: any) => setText(e.target.value)}></IonInput>
            </div>
          </IonCol>
          <IonCol size='fixed'>
            <IonButton fill='clear' onClick={() => sendText()}>
              <IonIcon icon={sendOutline} size='large'></IonIcon>
            </IonButton>
          </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default Chat;
