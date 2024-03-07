"use client";
import { useSelector } from "react-redux";
import styles from "./dashboard.module.css";
import { lexend } from "../app/fonts";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter();
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);


    useEffect(() => { // Utilisation d'un useEffect pour gérer la redirection
        if (!user.currentTrip) {
            alert('Selectionne ou créer un voyage avant de pouvoir accéder à cette page')
            router.push('/profile');
        }
    }, [])

    if (!user.token) {
        console.log('dashboard user 13 :' + JSON.stringify(user));
        return (
          <div className={`${styles.container} ${lexend.className}`}>
            <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
          </div>
        ); } else {
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.profilPictureContainer}>Info Trips
                    <p>Nom du groupe : {currentTrip.name}</p>
                    <p>Dates départ : {currentTrip.dates.departure}</p>
                    <p>Dates retour : {currentTrip.dates.return}</p>
                </div>
                <div className={styles.userInfoContainer}>Budget
                </div>
                <div className={styles.backPicture}>Logement
                </div>
            </div>
            <div className={styles.centerContainer}>
                <div className={styles.profilPictureContainer}>Activies</div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.profilPictureContainer}>Add Friends</div>
                <div className={styles.userInfoContainer}>Chat</div>
            </div>
        </div>
    )
}
}