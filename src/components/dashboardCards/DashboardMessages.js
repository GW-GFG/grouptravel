'use client'

import styles from './dashboardMessages.module.css'
import Button from "../utils/Button";
import Link from "next/link";
import Chat from "../Chat"

export default function DashboardMessages() {


return(
<div className={styles.container} >
        
        <Chat/>
            {/* <p style={{color: 'var(--primary-black-color)'}}>Cette fonctionnalité est en chantier, elle sera bientôt disponible !</p> */}
    
</div>
)}