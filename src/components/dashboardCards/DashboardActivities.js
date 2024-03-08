'use client'
import styles from './dashboardActivities.module.css';
import { useSelector } from "react-redux";
import Button from "../utils/Button";
import Link from "next/link";
import MiniActivityRow from './MiniActivityRow';

export default function DashboardActivities() {
    const currentTripActivities = useSelector((state) => state.user.value.currentTrip.activities)

    const activities = currentTripActivities && currentTripActivities.map((data, i) =>{
        return <MiniActivityRow key={i} name={data.name} participation={data.participation} />
    })

    return(
    <div className={styles.container} >
            <h2>Activités</h2>
            <div className={styles.rowContainer}>
                {activities}
            </div>
            <div className={styles.bottom}>
            <Link href="/activities" ><Button type="text" buttonClass="primary" text="Voir les activités" /></Link>
            <p>OU</p>
            <Link href="/activities/add" ><Button type="text" buttonClass="primary" text="Soumettre une activité" /></Link>
            </div>
    </div>
    )}