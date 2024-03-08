"use client";
import styles from "./dashboardInfo.module.css";
import { useSelector } from "react-redux";

export default function DashboardInfo() {
  const currentTrip = useSelector((state) => state.user.value.currentTrip);

  return (
    <div className={styles.container}>
      <h2>Informations</h2>
      <div className={styles.profilPictureContainer}>
        <p>Nom du groupe : {currentTrip.name}</p>
        <p>Dates départ : {new Date(currentTrip.dates.departure).toLocaleDateString()}</p>
        <p>Dates retour : {new Date(currentTrip.dates.return).toLocaleDateString()}</p>
      </div>
      <div className={styles.userInfoContainer}>Budget</div>
      <div className={styles.backPicture}>Logement</div>
    </div>
  );
}


