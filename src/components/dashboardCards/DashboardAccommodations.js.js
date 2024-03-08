'use client'

import styles from './dashboardAccommodations.module.css'
import Button from "../utils/Button";
import Link from "next/link";

export default function DashboardAccommodations() {


return(
<div className={styles.container} >
        <h2>Logements</h2>
        <div className={styles.bottom}>
        <Link href="/accomodation" target="_blank"><Button type="text" buttonClass="primary" text="Voir les logements" /></Link>
        <p>OU</p>
        <Link href="/accomodation/add" target="_blank"><Button type="text" buttonClass="primary" text="Soumettre un logement" /></Link>
        </div>
</div>
)}