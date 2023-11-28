import { useState } from 'react';
import { Message, getMessage, getMessages } from '../data/messageswithningbao';
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
} from '@ionic/react';
import { logoIonic, personCircle, sendOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewMessage.css';
import './Chat.css';
import ChatListItem from '../components/ChatListItem';

function Chat() {

    const [messages, setMessages] = useState<Message[]>([]);
  
    useIonViewWillEnter(() => {
      const msgs = getMessages();
      setMessages(msgs);
    });
  
    const refresh = (e: CustomEvent) => {
      setTimeout(() => {
        e.detail.complete();
      }, 3000);
    };

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton href="/otherprofile/1"><span style={{ textTransform: 'none' }}>NingBao🤍</span><IonAvatar className="ion-padding"><img src="https://lh3.googleusercontent.com/drive-viewer/AK7aPaAWqGc5fn-udFh9apq9nsqYkCST_UIQnIYN8sFOGIYu7LZ7QtuebmWDCsUrXmlKK62DvvTzFDV88Wh33fjWVCmw0W7EDg=w1366-h651" alt="NingBao" /></IonAvatar></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* <IonContent fullscreen> */}
        <IonCard>
          {/* <IonCardContent> */}
        <IonList className="ion-padding">
          {messages.map(m => <ChatListItem key={m.id} message={m} />)}
        </IonList>
        {/* <IonToolbar className='search-bar'>
          <IonRow>
          <IonCol>
            <IonInput placeholder='Enter Text'></IonInput>
          </IonCol>
          <IonCol>
          <IonButtons>
            <IonButton>Send</IonButton>
          </IonButtons>
          </IonCol>
          </IonRow>
        </IonToolbar> */}
        {/* </IonCardContent> */}
        </IonCard>
      {/* </IonContent> */}
      <IonFooter translucent={true}>
        <IonToolbar color={'light'}>
        <IonRow className='footer-content'>
          <IonCol>
            <div>
            <IonInput placeholder='Enter Text' className='ion-input-wrapper'></IonInput>
            </div>
          </IonCol>
          <IonCol size='fixed'>
            <IonIcon icon={sendOutline} size='large'></IonIcon>
          </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default Chat;
