import {IonBackdrop, IonDatetime, IonDatetimeButton, IonModal, IonInput, IonImg, IonIcon,IonThumbnail, IonItem, IonText, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonContent, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonLabel, IonAvatar, IonItemDivider, IonPage, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonButton } from '@ionic/react'; 
import { useParams } from 'react-router';
import React, {useRef} from 'react';
import { arrowBackOutline, colorFill } from 'ionicons/icons';
import styles from './Profile.module.scss';

const ProfileEdit: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();
  }
    return (
      
        <IonPage className={styles.home}>
          
            <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonButton>
							<IonIcon icon={ arrowBackOutline } />
						</IonButton>
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
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
            <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='8'>
            <IonText><h3>Name</h3></IonText>
            <IonInput  placeholder='Enter name' autocomplete='on' value=""></IonInput>
           <IonText><h3>Email</h3></IonText> 
           <IonInput  placeholder='Enter email' autocomplete='on' type='email' value=""></IonInput>
           <IonText><h3>Username</h3></IonText>
           <IonInput  placeholder='Enter username' autocomplete='on' maxlength={8} value=""></IonInput>
           <IonText><h3>Password</h3></IonText>
           <IonInput  placeholder='Enter password' autocomplete='on' type='password' value=""></IonInput>
           <IonText><h3>Date of Birth</h3></IonText>
           <IonButton id="open-modal" expand="block">
          Open Modal
        </IonButton>
        <IonModal className={styles.exampleModal} ref={modal} trigger="open-modal">
          <IonContent>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton color="light" onClick={() => dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonDatetime presentation='date'></IonDatetime>
          </IonContent>
        </IonModal>
          </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-text-center">
            <IonCol></IonCol>
            <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
            <IonButton className={styles.tombolEdit}>Save</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
		</IonGrid>
	  		
          
           
          
            
            </IonContent>
        </IonPage>
  );
};
export default ProfileEdit;