"use client";
import { useSelector } from "react-redux";
import styles from "./dashboard.module.css";
import { lexend } from "../app/fonts";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import DashboardPlanning from "./dashboardCards/DashBoardPlanning";
import DashboardInfo from "./dashboardCards/DashBoardInfo";
import DashboardAccommodations from "./dashboardCards/DashboardAccommodations.js";
import DashboardActivitie from "./dashboardCards/DashboardActivities";
import DashboardMembers from "./dashboardCards/DashboardMembers";
import DashboardMessages from "./dashboardCards/DashboardMessages";

export default function Dashboard() {

    const router = useRouter();
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);


    // useEffect(() => { // Utilisation d'un useEffect pour gérer la redirection
    //     if (!user.currentTrip) {
    //         alert('Selectionne ou créé un voyage avant de pouvoir accéder à cette page')
    //         router.push('/profile');
    //     }
    // }, [])

    if (!user.token) {
        return (
          <div className={`${styles.container} ${lexend.className}`}>
            <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
          </div>
        );
    } else if (!user.currentTrip) {
        return (
            <div className={`${styles.container} ${lexend.className}`}>
              <p>Selectionne ou créé un voyage pour profiter de cette page !</p>
            </div>
          );
        }
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <DashboardPlanning />
                <DashboardInfo />
                <DashboardAccommodations />
            </div>
        

            <div className={styles.middleContainer}>
             <DashboardActivitie />
            </div>

            <div className={styles.rightContainer}>
                <DashboardMembers />
                <DashboardMessages />
            </div>
        </div>
    )
}
