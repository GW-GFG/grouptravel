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
        <p>En construction... Tu pourras bienôt cliquer ici pour de rendre sur la page du planning de ton voyage {currentTripName} !!</p>
        <Link href="/planning"><Button type="text" buttonClass="primary" text="Voir" /></Link>
    </div>
    <Image width={50} height={100} className={styles.imgContainer} src={"next.svg"} alt="planning" />
</div>
)}