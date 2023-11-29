import { IonText, IonHeader, IonContent, IonButtons, IonTitle, IonToolbar, IonPage, IonCol, IonGrid, IonRow, IonButton, IonBackButton } from '@ionic/react'; 
import { useParams } from 'react-router';
import { arrowBackOutline, colorFill } from 'ionicons/icons';
import styles from './Profile.module.scss';

const ProfileOther: React.FC = () => {

    return (
        <IonPage className={styles.home}>
            <IonHeader className='ion-no-border'>
          <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
            <IonTitle> Name </IonTitle>
          </IonToolbar>
        </IonHeader>

            <IonContent>
              <div className={styles.topHeader}></div>
              <div className={styles.fakeTop}></div>
              <IonGrid id="pr" fixed={true}>
                <IonRow className="ion-justify-content-center ion-text-center">
                  <IonCol></IonCol>
                  <IonCol size="8" sizeLg='8' sizeMd='8' sizeSm='8' sizeXl='8' sizeXs='10'>
                        <img className={styles.imageset} style={{ objectFit: "cover",
                            objectPosition: "50% 50%", position: "relative"}}
                          src="https://docs-demo.ionic.io/assets/madison.jpg"
                          alt="The Wisconsin State Capitol building in Madison, WI at night"
                        />
                        <IonRow className="ion-justify-content-center ion-text-center">
                          <IonText className={styles.profileOther}>
                            <h3>Your name</h3>
                            <p>@username</p>
                            <p>email</p>
                          </IonText>
                        </IonRow>
                        <IonRow className="ion-justify-content-center ion-text-center">
                          <IonText className={styles.GroupFriends}>
                            <h5 className={styles.totalFriends}>70</h5>
                            <p>friends</p>
                          </IonText>
                        </IonRow>
                        <IonButton className={styles.tombolAdd}>Add Friend</IonButton>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
        </IonPage>
  );
};
export default ProfileOther;
