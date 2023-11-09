import {
  IonItem,
  IonLabel,
  IonList,
  IonNote
  } from '@ionic/react';
import { Message } from '../data/messages';
import './ChatListItem.css';

interface MessageListItemProps {
  message: Message;
}

const ChatListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem detail={false} lines='none' className='chat-item'>
      <IonList className="ion-text-wrap">
        <p>{message.subject}
          <span className="date">
            <IonNote>{message.date}</IonNote>
          </span>
        </p>
      </IonList>
    </IonItem>
  );
};

export default ChatListItem;
