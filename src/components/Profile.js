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
import TripRow from "./TripRow";
import Image from "next/image";


export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  // console.log(user.userPicture)

   //Map on user.myTrips Only if != null
   const trips = user.myTrips && user.myTrips.length > 0 && user.myTrips.map((data, i) => {
    return <TripRow key={i} {...data} />;
  });

  const handleClickAddTrip = () => {
    router.push('/addTrip')
  }

  const pictureStyle = {
    borderRadius: '50%',
    border: '2px solid var(--primary-black-color)',
  }

  const backPictureStyle = {
    borderRadius: '1rem 1rem',
    border: '2px solid var(--primary-black-color)',
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
          <div className={styles.profilPictureContainer}>
                  <Image
              // loader={myLoader}
              src={user.userPicture}
              alt="Avatar"
              width={160}
              height={160}
              style={pictureStyle}
                  />
            <button>
              <FontAwesomeIcon icon={faPen} className={styles.penIcon} />
            </button>
          </div>
          <div className={styles.userInfoContainer}>
            <span>Nom : {user.username}</span>
          </div>
          <div className={styles.backPicture}>
          <Image
              // loader={myLoader}
              src='/image_profile.png'
              alt="backgroundprofile"
              width={360}
              height={250}
              style={backPictureStyle}
                  /></div>
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
