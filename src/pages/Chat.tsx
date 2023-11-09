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
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewMessage.css';
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
            <IonButton href="/otherprofile/1">NingBao<IonAvatar className="ion-padding"><img src="https://i.pinimg.com/736x/a9/a6/39/a9a639dcf7f91a7d733a8f5fafe0a668.jpg" alt="NingBao" /></IonAvatar></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList className="ion-padding">
          {messages.map(m => <ChatListItem key={m.id} message={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Chat;
