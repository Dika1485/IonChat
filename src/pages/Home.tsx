import { IonAvatar, IonButtons, IonCard, IonCardContent, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonLoading, IonMenu, IonMenuButton, IonMenuToggle, IonNote, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import './Home.css';
import logo from '../assets/logo_bw.svg';
import { useEffect, useState } from "react";
import { chatbubbleEllipses, logOut, settings } from "ionicons/icons";
import { app, getDB } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from "react-router";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { child, get, onValue, ref } from "firebase/database";

// Initialize firebase
app;

const Home: React.FC = () => {
    const history = useHistory();
    const [dummy, setDummy] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [chatIDs, setChatIDs] = useState([]);
    const [chats, setChats] = useState([]);
    const [unsubscribers, setUnsubscribers] = useState([]);
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

    function sortLatestChat(a: Object, b: Object) {
        let date1 = new Date(a.lastTimestamp).getTime();
        let date2 = new Date(b.lastTimestamp).getTime();

        if (date1 < date2) {
            return -1;
        } else if (date1 > date2) {
            return 1;
        } else {
            return 0;
        }
    }

    function getChatIDs(username) {
        const dbRef = ref(getDB(), `users/${username}/chats`);
        onValue(dbRef, (snapshot) => {
            const latestChatIDs = snapshot.val();
            if (JSON.stringify(chatIDs) != JSON.stringify(latestChatIDs)) {
                setChatIDs(latestChatIDs);
            }
        });
    }
    function toList() {
        history.push('/list');
        // history.replace('/login');
    }

    function getChats(chatIDs) {
        let unsubscribers_tmp = [];
        chatIDs.forEach(chatID => {
            const dbRef = ref(getDB(), `chats/${chatID}`);
            const unsubscriber = onValue(dbRef, (snapshot) => {
                let latestChat = snapshot.val();
                latestChat['chatID'] = chatID;

                // Timestamp
                let date_now = new Date().getDate();
                let datetime = new Date(latestChat['lastTimestamp']);
                let diff_days = date_now - datetime.getDate();
                if (diff_days == 0) {
                    const formatter = new Intl.DateTimeFormat('id-ID', { timeStyle: 'short' });
                    latestChat['lastTimestamp'] = formatter.format(datetime);
                } else if (diff_days == 1) {
                    latestChat['lastTimestamp'] = 'Yesterday';
                } else {
                    const formatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'short'});
                    latestChat['lastTimestamp'] = formatter.format(datetime);
                }

                // Other username
                let otherUsername = '';
                latestChat.members.forEach(username => {
                    if (username != userInfo.username) {
                        otherUsername = username;
                    }
                });
                latestChat['otherUsername'] = otherUsername;

                // Push to array
                let chats_tmp = structuredClone(chats);
                let i = chats_tmp.findIndex((chat) => chat.chatID == chatID);
                if (i == -1) {
                    chats_tmp.push(latestChat);
                } else {
                    chats_tmp[i] = latestChat;
                }
                chats_tmp.sort(sortLatestChat);
                if (JSON.stringify(chats) != JSON.stringify(chats_tmp)) {
                    setChats(chats_tmp);
                }
            });
            unsubscribers_tmp.push(unsubscriber);
        });
        if (JSON.stringify(unsubscribers_tmp) != JSON.stringify(unsubscribers)) {
            setUnsubscribers(unsubscribers_tmp);
        }
    }

    function logout() {
        if (auth != null) {
            signOut(auth).then(() => {
                GoogleAuth.signOut();
                alert('Logout successful!');
                history.replace('/login');
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
        }
    }

    const [items, setItems] = useState<string[]>([]);

    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 60; i++) {
        newItems.push(`Item ${1 + items.length + i}`);
        }
        setItems([...items, ...newItems]);
    };

    useIonViewDidEnter(() => {
        if (auth.currentUser == null) {
            history.replace('/login');
        }
    });

    useEffect(() => {
        setLoading(true);
        getUserInfo();
        if (userInfo.username == null) {
            return;
        }
        getChatIDs(userInfo.username);
        if (chatIDs.length == 0) {
            return;
        }
        if (unsubscribers.length > 0) {
            unsubscribers.forEach(unsubscriber => {
                unsubscriber();
            });
        }
        getChats(chatIDs);
        setLoading(false);
    }, [userInfo, chatIDs, chats]);

    console.log(chats);

    return (
        <>
        <IonMenu contentId="main-content">
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>
                        <IonIcon id="logo-white-small" src={logo} aria-hidden={true}></IonIcon>
                        Ion Chat
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonMenuToggle>
                    <IonItem lines="full" routerLink="/profile" className="sidebar-item">
                        <IonAvatar slot="start">
                            <img
                                src={userInfo.profilePic}
                                alt="Profile Picture" />
                        </IonAvatar>
                        <IonLabel>
                            <h2><b>{ userInfo.username }</b></h2>
                            <p>{ userInfo.email }</p>
                        </IonLabel>
                    </IonItem>
                </IonMenuToggle>
                <IonList lines="none">
                    <IonItem className="sidebar-item" button onClick={() => logout()}>
                        <IonIcon aria-hidden={true} icon={logOut} slot="start" color="dark"></IonIcon>
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
        <IonPage id="main-content">
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon id="logo-white" src={logo} aria-hidden={true}></IonIcon>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar className="search-bar">
                    <IonSearchbar showClearButton="focus"></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonFab slot="fixed" vertical="bottom" horizontal="end" onClick={() => toList()}>
                <IonFabButton color="main">
                    <IonIcon icon={chatbubbleEllipses} color="light"></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonLoading isOpen={isLoading} onDidDismiss={() => setLoading(false)}></IonLoading>
            <IonCard className="home-card">
                <IonCardContent>
                    <IonList lines="none">
                        {chats.map((chat, index) => (
                        <IonItem key={index} className="home-item" routerLink={'/chat/' + chat.chatID}>
                            <IonAvatar slot="start">
                            <img src={chat.profilePics[chat.otherUsername]} alt="avatar" />
                            </IonAvatar>
                            <IonLabel className="ion-text-wrap">
                                <h2>
                                    {chat.otherUsername}
                                    <span className="date">
                                        <IonNote>{chat.lastTimestamp}</IonNote>
                                    </span>
                                </h2>
                                <p>
                                {(chat.lastSender != chat.otherUsername) ? 'You: ' : ''}
                                {chat.lastMessage}
                                </p>
                            </IonLabel>
                        </IonItem>
                        ))}
                    </IonList>
                    <IonInfiniteScroll
                        onIonInfinite={(ev) => {
                        generateItems();
                        setTimeout(() => ev.target.complete(), 500);
                        }}
                    >
                        <IonInfiniteScrollContent></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonCardContent>
            </IonCard>
        </IonPage>
        </>
    );
};

export default Home;