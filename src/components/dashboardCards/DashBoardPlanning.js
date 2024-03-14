'use client'
import styles from './dashboardPlanning.module.css';
import Link from "next/link";
import Image from 'next/image';
import { useSelector } from "react-redux";
import Button from "../utils/Button";

export default function DashboardPlanning() {

    const currentTripName = useSelector((state) => state.user.value.currentTrip.name)

return(
<div className={styles.container} >
    <div className={styles.leftContainer}>
        <h2>Planning</h2>
        <p>Clique ici pour te rendre sur le planning de ton voyage : {currentTripName} !!</p>
        <div className={styles.bottomContainer}>
            <Link href="/planning" ><Button type="text" buttonClass="primary" text="Voir" /></Link>
        </div>
        
    </div>
    
    
</div>
)}