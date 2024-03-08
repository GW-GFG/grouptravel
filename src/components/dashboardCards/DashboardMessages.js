'use client'

import styles from './dashboardMessages.module.css'
import Button from "../utils/Button";
import Link from "next/link";

export default function DashboardMessages() {


return(
<div className={styles.container} >
    <h2>Messages</h2>
    <div className={styles.whiteContainer}>
        <p style={{color: 'var(--primary-black-color)'}}>Cette fonctionnalité est en chantier, elle sera bientôt disponible !</p>
    </div>
</div>
)}