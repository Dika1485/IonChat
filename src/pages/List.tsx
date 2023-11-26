import { IonAvatar, IonBackButton, IonButtons, IonCard, IonCardContent, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonNote, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import './List.css';
import logo from '../assets/logo_bw.svg';
import { useEffect, useState } from "react";
import { chatbubbleEllipses, logOut, settings } from "ionicons/icons";
import { app, getDB } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from "react-router";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

// Initialize firebase
app;

const List: React.FC = () => {
    const history = useHistory();

    // Fungsi Firebase
    const auth = getAuth();
    console.log(auth);
    function logout() {
        signOut(auth).then(() => {
          GoogleAuth.signOut();
          alert('Logout successful!');
          history.replace('/login');
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
    }

    const [items, setItems] = useState<string[]>([]);

    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 60; i++) {
        newItems.push(`Item ${1 + items.length + i}`);
        }
        setItems([...items, ...newItems]);
    };

    useEffect(() => {
        generateItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            <img src="https://i.pinimg.com/736x/a9/a6/39/a9a639dcf7f91a7d733a8f5fafe0a668.jpg" alt="NingBao" />
                        </IonAvatar>
                        <IonLabel>
                            <h2><b>Ning Bao</b></h2>
                            <p>ningbao@gmail.com</p>
                        </IonLabel>
                    </IonItem>
                </IonMenuToggle>
                <IonList lines="none">
                    <IonItem href="#" className="sidebar-item">
                        <IonIcon aria-hidden={true} icon={settings} slot="start" color="dark"></IonIcon>
                        <IonLabel>Settings</IonLabel>
                    </IonItem>
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
            {/* <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton color="main">
                    <IonIcon icon={chatbubbleEllipses} color="light"></IonIcon>
                </IonFabButton>
            </IonFab> */}
            <IonCard className="home-card">
                <IonCardContent>
                    <IonList lines="none">
                        {items.map((item, index) => (
                        <IonItem key={item} className="home-item" routerLink="/profile/other">
                            <IonAvatar slot="start">
                            <img src={'https://picsum.photos/80/80?random=' + index} alt="avatar" />
                            </IonAvatar>
                            <h2>{item}</h2>
                            <IonLabel className="ion-text-wrap">
                                <h2>
                                    {/* {item} */}
                                    <span className="status">
                                        <IonNote>Friend</IonNote>
                                    </span>
                                </h2>
                                {/* <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p> */}
                            </IonLabel>
                        </IonItem>
                        ))}
                    </IonList>
                    {/* <IonInfiniteScroll
                        onIonInfinite={(ev) => {
                        generateItems();
                        setTimeout(() => ev.target.complete(), 500);
                        }}
                    >
                        <IonInfiniteScrollContent></IonInfiniteScrollContent>
                    </IonInfiniteScroll> */}
                </IonCardContent>
            </IonCard>
        </IonPage>
        </>
    );
};

export default List;