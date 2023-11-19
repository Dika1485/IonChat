import { useState } from 'react';
import { Message, getMessage, getMessages } from '../data/messages';
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
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton href="/otherprofile/1"><span style={{ textTransform: 'none' }}>NingBao</span><IonAvatar className="ion-padding"><img src="https://i.pinimg.com/736x/a9/a6/39/a9a639dcf7f91a7d733a8f5fafe0a668.jpg" alt="NingBao" /></IonAvatar></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
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
      </IonContent>
      <IonFooter translucent={true}>
        <IonToolbar color={'light'}>
        <IonRow className='footer-content'>
          <IonCol>
            <div>
            <IonInput placeholder='Enter Text' className='ion-input-wrapper'></IonInput>
            </div>
          </IonCol>
          <IonCol size='0.5'>
            <IonIcon icon={sendOutline} size='large'></IonIcon>
          </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default Chat;
