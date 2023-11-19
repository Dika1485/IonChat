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
  
  const chatClass = i % 2 === 0 ? 'chat2' : 'chat1';
  return (
    <IonItem detail={false} lines='none' className='chat-item'>
      <IonList className='ion-text-wrap chat1'>
        {/* <p className="ion-text-wrap"> */}
          {message.subject}
        {/* sasjijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}
        {/* <p> */}
        {/* <br /> */}
        &emsp;
          <span className="date">
            <IonNote><sub>{message.date}</sub></IonNote>
          </span>
        {/* </p> */}
      </IonList>
    </IonItem>
  );
};

export default ChatListItem;
