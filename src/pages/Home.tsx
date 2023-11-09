import { IonAvatar, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import './Home.css';
import logo from '../assets/logo_bw.svg';
import { useEffect, useState } from "react";

const Home: React.FC = () => {
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
            <IonContent>Ini adalah menu</IonContent>
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
            <IonCard>
                <IonCardContent>
                    <IonList>
                        {items.map((item, index) => (
                        <IonItem key={item}>
                            <IonAvatar slot="start">
                            <img src={'https://picsum.photos/80/80?random=' + index} alt="avatar" />
                            </IonAvatar>
                            <IonLabel className="ion-text-wrap">
                                <h2>
                                    {item}
                                    <span className="date">
                                        <IonNote>09:32 AM</IonNote>
                                    </span>
                                </h2>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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