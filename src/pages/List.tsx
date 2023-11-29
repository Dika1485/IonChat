import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import './List.css';
import logo from '../assets/logo_bw.svg';
import { useEffect, useState } from "react";
import { add, chatbubbleEllipses, checkboxSharp, checkmark, checkmarkSharp, closeSharp, logOut, search, sendOutline, settings } from "ionicons/icons";
import { app, getDB } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from "react-router";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { child, get, onValue, ref } from "firebase/database";

// Initialize firebase
app;

const List: React.FC = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [sentRequests, setSentRequests] = useState({});
    const [receivedRequests, setReceivedRequests] = useState({});
    const [friends, setFriends] = useState([]);
    const [sentList, setSentList] = useState([]);
    const [receivedList, setReceivedList] = useState([]);
    const [friendList, setFriendList] = useState([]);
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

    function getFriendsRealtime() {
        const dbRef = ref(getDB(), `users/${userInfo.username}/friends`);
        const unsubscriber = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const friends_tmp = snapshot.val();
                if (JSON.stringify(friends_tmp) != JSON.stringify(friends)) {
                    setFriends(friends_tmp);
                    setFriendList([]);
                }
            }
        });
        setUnsubscribers([...unsubscribers, unsubscriber]);
    }

    function getSentRequestsRealtime() {
        const dbRef = ref(getDB(), `users/${userInfo.username}/sentRequests`);
        const unsubscriber = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const sentRequests_tmp = snapshot.val();
                if (JSON.stringify(sentRequests_tmp) != JSON.stringify(sentRequests)) {
                    setSentRequests(sentRequests_tmp);
                }
            }
        });
        setUnsubscribers([...unsubscribers, unsubscriber]);
    }

    function getReceivedRequestsRealtime() {
        const dbRef = ref(getDB(), `users/${userInfo.username}/receivedRequests`);
        const unsubcriber = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const receivedRequests_tmp = snapshot.val();
                if (JSON.stringify(receivedRequests_tmp) != JSON.stringify(receivedRequests)) {
                    setReceivedRequests(receivedRequests_tmp);
                }
            }
        });
        setUnsubscribers([...unsubscribers, unsubcriber]);
    }

    function getFriendList() {
        const dbRef = ref(getDB());
        friends.forEach(friend => {
            get(child(dbRef, `users/${friend.username}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const user = snapshot.val();
                        user.username = friend.username;
                        user.chatID = friend.chatID;
                        if (!friendList.find((element) => element.username == friend.username)) {
                            setFriendList([...friendList, user]);
                        }
                    }
                });
        });
    }

    function getSentList() {
        const dbRef = ref(getDB());
        Object.keys(sentRequests).forEach(friendUsername => {
            if (sentRequests[friendUsername]) {
                get(child(dbRef, `users/${friendUsername}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const user = snapshot.val();
                            user.username = friendUsername;
                            if (!sentList.find((element) => element.username == friendUsername)) {
                                setSentList([...sentList, user]);
                            }
                        }
                    });
            }
        });
    }

    function getReceivedList() {
        const dbRef = ref(getDB());
        Object.keys(receivedRequests).forEach(friendUsername => {
            if (receivedRequests[friendUsername]) {
                get(child(dbRef, `users/${friendUsername}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const user = snapshot.val();
                            user.username = friendUsername;
                            if (!receivedList.find((element) => element.username == friendUsername)) {
                                setReceivedList([...receivedList, user]);
                            }
                        }
                    });
            }
        });
    }
    
    const [usernameInput, setUsernameInput] = useState("");

    function newFriend() {
        if (usernameInput === "notfound") {
            // Show modal with "Username not found" message
            setShowModal(true);
        } else {
            // Navigate to the profile/other page for other cases
            history.push('profile/other');
            setShowModal(false);
        }
    }

    const [items, setItems] = useState<string[]>([]);

    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 3; i++) {
        newItems.push(`Item ${1 + items.length + i}`);
        }
        setItems([...items, ...newItems]);
    };

    useEffect(() => {
        getUserInfo();
        if (unsubscribers.length > 0) {
            unsubscribers.forEach(unsubscriber => {
                unsubscriber();
            });
        }
        getFriendsRealtime();
        getSentRequestsRealtime();
        getReceivedRequestsRealtime();
        getFriendList();
        getSentList();
        getReceivedList();
    }, [userInfo, friends, sentRequests, receivedRequests, friendList, sentList, receivedList]);

    console.log(friendList);

    return (
        <>
        <IonPage id="main-content">
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    {/* <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons> */}
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon id="logo-white" src={logo} aria-hidden={true}></IonIcon>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar className="search-bar">
                    <IonSearchbar showClearButton="focus"></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonFab slot="fixed" vertical="bottom" horizontal="end" id="newfriend" onClick={() => setShowModal(true)}>
                <IonFabButton color="main">
                    <IonIcon icon={add} color="light"></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonCard className="home-card">
                <IonCardContent>
                    <div>
                        <h2>Request</h2>
                        {(receivedList.length == 0) ?
                            (<h3 align='center'>There are currently no friend requests</h3>) :
                            (
                                <IonList lines='none'>
                                    {receivedList.map((user, index) => (
                                        <IonItem key={index} className="home-item" routerLink="/profile/other">
                                            <IonAvatar slot="start">
                                                <img src="tes" alt="avatar" />
                                            </IonAvatar>
                                            <h2>Tes</h2>
                                            <IonLabel className="ion-text-wrap">
                                                <h2>
                                                    <span className="status">
                                                        <IonButton className="accept" fill="clear" routerLink="/profile/chat">
                                                            <IonIcon icon={checkmarkSharp} color="white"></IonIcon>
                                                        </IonButton>
                                                        <IonButton className="decline" fill="clear" routerLink="/list">
                                                            <IonIcon icon={closeSharp} color="white"></IonIcon>
                                                        </IonButton>
                                                    </span>
                                                </h2>
                                            </IonLabel>
                                        </IonItem>
                                    ))}
                                </IonList>
                            )
                        }
                    </div>
                    <div>
                        <h2>Pending</h2>
                        {(sentList.length == 0) ?
                            (<h3 align='center'>You have not sent any friend requests</h3>) :
                            (
                                <IonList lines="none">
                                    {sentList.map((user, index) => (
                                        <IonItem key={index} className="home-item" routerLink="/profile/other">
                                            <IonAvatar slot="start">
                                                <img src="tes" alt="avatar" />
                                            </IonAvatar>
                                            <h2>Tes</h2>
                                        </IonItem>
                                    ))}
                                </IonList>
                            )
                        }
                    </div>
                    <div>
                        <h2>Friend</h2>
                        {(friendList.length == 0) ?
                            (<h3 align='center'>You don't have any friends yet</h3>) :
                            (
                                <IonList lines="none">
                                    {friendList.map((user, index) => (
                                        <IonItem key={index} className="home-item" routerLink={`/chat/${user.chatID}`}>
                                            <IonAvatar slot="start">
                                                <img src={user.profilePic} alt="avatar" />
                                            </IonAvatar>
                                            <h2>{user.username}</h2>
                                        </IonItem>
                                    ))}
                                </IonList>
                            )
                        }
                    </div>
                </IonCardContent>
            </IonCard>
        </IonPage>
        <IonModal trigger="newfriend" isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="modalNew">
            {/* <IonCard className="modalContent"> */}
            {/* <div className="wrapper"> */}
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start" onClick={() => setShowModal(false)} >
                        <IonBackButton defaultHref="/list"></IonBackButton>
                    </IonButtons>
                    <IonTitle>New Friend</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonItem>
                    <IonInput value={usernameInput} onIonChange={(e) => setUsernameInput(e.detail.value!)} label="Username" labelPlacement="floating" required placeholder="Insert Username..." type="text"></IonInput>
                </IonItem>
                {usernameInput === "notfound" ? (
                <IonItem lines="none">
                    <IonLabel color="danger">Username not found!!</IonLabel>
                </IonItem>
                ) : (<></>)}
                <IonRow>
                    <IonCol>
                        <IonButton type="button" color="success" expand="block" shape="round" onClick={() => newFriend()}><IonIcon icon={search}></IonIcon> Search</IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
            {/* </div> */}
            {/* </IonCard> */}
        </IonModal>
        </>
    );
};

export default List;