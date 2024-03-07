"use client";
import { useState, } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import { lexend } from "../app/fonts";
import {updateCurrentTrip} from "@/reducers/user"
import Link from "next/link";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  function TripRow(props) {
    const isAdmin = true;


    const handleGoToDash = () => {
      console.log('props depuis profil 20' +props);
      dispatch(updateCurrentTrip(props));
      console.log('user depuis profil 22' + user);
      router.push('/dashboard')
    }

    return (
      <div className={styles.row}>
          <span className={styles.tripName}>{props.name}</span>
          {isAdmin && <span className={styles.adminBadge}>ADMIN</span>}         
          <button className={styles.goButton} onClick={handleGoToDash}>Go</button>                   
      </div>
    );
  }

  const trips = user.myTrips && user.myTrips.map((data, i) => {
    return <TripRow key={i} {...data} />;
  });

  const handleClickAddTrip = () => {
    router.push('/addTrip');
  }

  if (!user.token) {
    return (
      <div className={`${styles.container} ${lexend.className}`}>
        <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>

        <div className={styles.leftContainer}>
          <div className={styles.profilPictureContainer}>IMG</div>
          <div className={styles.userInfoContainer}>INFO</div>
          <div className={styles.backPicture}>BACKPIC</div>
        </div>

        <div className={styles.rightContainer}>
            <h1 className={`${styles.title} ${lexend.className}`}>Mon Compte</h1>
          <div className={styles.tripsContainer}>
            <h2 className={`${styles.tripTitle} ${lexend.className}`}>Mes voyages :</h2>
            {trips}
            <div className={styles.addContainer}>
            <button className={styles.addTravel} onClick={handleClickAddTrip}>
              <span className={styles.plus}>+</span>
              <br />
              Organise un nouveau Travel entre amis
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
