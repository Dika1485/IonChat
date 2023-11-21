export interface Message {
    fromName: string;
    subject: string;
    date: string;
    id: number;
  }
  
  const messages: Message[] = [
    {
      fromName: '',
      subject: '',
      date: 'Yesterday',
      id: 0
    },
    {
      fromName: 'Dika',
      subject: '嗨，亲爱的！今天过得怎么样？',
      date: 'Yesterday',
      id: 1
    },
    {
      fromName: 'NingBao',
      subject: '嗨！今天还好，有点忙碌。你呢？',
      date: 'Yesterday',
      id: 2
    },
    {
      fromName: 'Dika',
      subject: '天气变得有点冷了，穿暖和一点哦。',
      date: 'Yesterday',
      id: 3
  
    },
    {
      fromName: 'NingBao',
      subject: '好的，谢谢提醒。晚上有什么计划吗？',
      date: 'Yesterday',
      id: 4
    },
    {
      fromName: '',
      subject: '',
      date: 'Today',
      id: 5
    },
    {
      fromName: 'Dika',
      subject: '晚上我们可以一起看电影，你觉得怎么样？',
      date: '00.02 AM',
      id: 6
    },
    {
      fromName: 'NingBao',
      subject: '那听起来不错！你想看什么类型的电影？',
      date: '00.03 AM',
      id: 7
    },
    {
      fromName: 'Dika',
      subject: '我想看一部浪漫的爱情电影，你觉得怎么样？',
      date: '00.03 AM',
      id: 8
    },
    {
      fromName: 'NingBao',
      subject: '没问题，我喜欢浪漫电影。',
      date: '00.03 AM',
      id: 9
    }
  ];
  
  export const getMessages = () => messages;
  
  export const getMessage = (id: number) => messages.find(m => m.id === id);
  