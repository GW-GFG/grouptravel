"use client";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import { lexend } from "../app/fonts";
import {updateCurrentTrip} from "@/reducers/user"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  useEffect(() => { // Utilisation d'un useEffect pour gérer la redirection
   console.log('log Profile', user)
  }, [])
  
     // One tripRow model
     function TripRow(props) {
      const isAdmin = true;
      // Routing user to Dashboard && updateCurrentTrip in Redux
      const handleGoToDash = () => {
        dispatch(updateCurrentTrip(props));
        router.push('/dashboard');
      }
      return (
        <div className={styles.row}>
            <span className={styles.tripName}>{props.name}</span>
            {isAdmin && <span className={styles.adminBadge}>ADMIN</span>}         
            <button className={styles.goButton} onClick={() => handleGoToDash()}>Go</button>                   
        </div>
      );
    }

   //Map on user.myTrips Only if != null
   const trips = user.myTrips.length > 0 && user.myTrips.map((data, i) => {
    return <TripRow key={i} {...data} />;
  });

  const handleClickAddTrip = () => {
    router.push('/addTrip')
  }

  


  if (!user.token) {
    console.log(user);
    return (
      <div className={`${styles.container} ${lexend.className}`}>
        <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>

        <div className={styles.leftContainer}>
          <div className={styles.profilPictureContainer}>IMG
            <button>
              <FontAwesomeIcon icon={faPen} className={styles.penIcon} />
            </button>
          </div>
          <div className={styles.userInfoContainer}>
            <span>Nom : {user.username}</span>
          </div>
          <div className={styles.backPicture}>BACKPIC</div>
        </div>

        <div className={styles.rightContainer}>
            <h1 className={`${styles.title} ${lexend.className}`}>Mon Compte</h1>
          <div className={styles.tripsContainer}>
            <h2 className={`${styles.tripTitle} ${lexend.className}`}>Mes voyages :</h2>
            {trips}
            <div className={styles.addContainer}>
            <button className={styles.addTravel} onClick={ () =>handleClickAddTrip()}>
              <span className={styles.plus}><FontAwesomeIcon icon={faCirclePlus} className={styles.faCirclePlusIcon} /></span>
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
