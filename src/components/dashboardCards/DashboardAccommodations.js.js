'use client'

import styles from './dashboardAccommodations.module.css'
import Button from "../utils/Button";
import Link from "next/link";

export default function DashboardAccommodations() {


return(
<div className={styles.container} >
        <h2 className={styles.heading}>Logements</h2>
        <div className={styles.utilCenter}>
                <div className={styles.bottom}>
                        <Link href="/accomodation" ><Button type="text" buttonClass="primary" text="Voir les logements" /></Link>
                        <p>OU</p>
                        <Link href="/accomodation/add" ><Button type="text" buttonClass="primary" text="Soumettre un logement" /></Link>
                </div>
        </div>
</div>
)}