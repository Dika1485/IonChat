import {
  IonItem,
  IonLabel,
  IonList,
  IonNote
  } from '@ionic/react';
import { Message } from '../data/messages';
import './ChatListItem.css';
import { useEffect, useState } from 'react';

interface MessageListItemProps {
  message: Message;
  sender: string
}
const ChatListItem: React.FC<MessageListItemProps> = ({ message, sender }) => {
  // const [i, setI] = useState(1);

  let datetime = new Date(message.timestamp);
  const timestamp = new Intl.DateTimeFormat('id', { timeStyle: 'short', dateStyle: 'short' }).format(datetime);

  // Fungsi ini akan dipanggil setiap kali komponen di-render
  // const incrementI = () => setI(prevI => prevI + 1);

  // useEffect(() => {
  //   // Memanggil fungsi incrementI untuk meningkatkan nilai i setelah komponen di-render
  //   incrementI();
  // }, []); // Menambahkan dependensi kosong agar useEffect hanya dijalankan setelah mount
  
  let chatClass;
  if (message.sender === sender) {
    chatClass = 'chat2';
  } else if (message.sender==="") {
    chatClass = 'chat3';
  } else {
    chatClass = 'chat1';
  }
  return (
    <IonItem detail={false} lines='none' className='chat-item'>
      <IonList className={`ion-text-wrap ${chatClass}`}>
        {/* <p className="ion-text-wrap"> */}
        {chatClass !== 'chat3' && (
          <>
            {message.message}
          </>
        )}
        {/* sasjijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}
        {/* <p> */}
        {/* <br /> */}
        &nbsp;&nbsp;&nbsp;
          <span className="date">
            <IonNote><sub>{timestamp}</sub></IonNote>
          </span>
        {/* </p> */}
      </IonList>
    </IonItem>
  );
};

export default ChatListItem;
