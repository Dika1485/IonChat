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
}
const ChatListItem: React.FC<MessageListItemProps> = ({ message }) => {
  const [i, setI] = useState(1);

  // Fungsi ini akan dipanggil setiap kali komponen di-render
  const incrementI = () => setI(prevI => prevI + 1);

  useEffect(() => {
    // Memanggil fungsi incrementI untuk meningkatkan nilai i setelah komponen di-render
    incrementI();
  }, []); // Menambahkan dependensi kosong agar useEffect hanya dijalankan setelah mount
  
  let chatClass;
  if (message.fromName === "NingBao") {
    chatClass = 'chat2';
  } else if (message.fromName==="") {
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
            {message.subject}
          </>
        )}
        {/* sasjijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}
        {/* <p> */}
        {/* <br /> */}
        &nbsp;&nbsp;&nbsp;
          <span className="date">
            <IonNote><sub>{message.date}</sub></IonNote>
          </span>
        {/* </p> */}
      </IonList>
    </IonItem>
  );
};

export default ChatListItem;
