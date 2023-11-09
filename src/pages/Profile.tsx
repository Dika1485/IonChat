import {IonImg, IonIcon,IonThumbnail, IonItem, IonText, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonContent, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonLabel, IonAvatar, IonItemDivider, IonPage, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonButton } from '@ionic/react'; 
import { useParams } from 'react-router';
import { arrowBackOutline, colorFill } from 'ionicons/icons';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {

    return (
        <IonPage className={styles.home}>
            <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonButton>
							<IonIcon icon={ arrowBackOutline } />
						</IonButton>
          </IonButtons>
          <IonTitle>Profile Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <div className={styles.topHeader}></div>
		<IonGrid fixed={true}>
		<IonRow className="ion-justify-content-center ion-text-center">
      <IonCol></IonCol>
      <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
						<img className={styles.imageset} style={{ objectFit: "cover",
                objectPosition: "50% 50%", position: "relative"}}
              src="https://docs-demo.ionic.io/assets/madison.jpg"
              alt="The Wisconsin State Capitol building in Madison, WI at night"
            />
            </IonCol>
             <IonCol></IonCol>
					</IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol className={styles.Profil} size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='8'>
            <IonText><h3>Name</h3><p>Your name</p></IonText>	
            <IonText><h3>Email</h3><p>Your email</p></IonText> 
            <IonText><h3>Username</h3><p>@sdls</p></IonText>
            <IonText><h3>Password</h3><p>your password</p></IonText>
            <IonText><h3>Date of Birth</h3><p>your date</p></IonText>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-text-center">
            <IonCol></IonCol>
            <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
            <IonButton className={styles.tombolEdit}>Edit Profile</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
		</IonGrid>
	  		
          
           
          
            
            </IonContent>
        </IonPage>
  );
};
export default Profile;