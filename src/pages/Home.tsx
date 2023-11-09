import { IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import './Home.css';
import logo from '../assets/logo_bw.svg';

const Home: React.FC = () => {
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
            <IonContent>Daftar pesan</IonContent>
        </IonPage>
        </>
    );
};

export default Home;