'use client'
import Link from "next/link";
import styles from "./page.module.css";
import { lexend } from "../fonts";
import { useSelector } from "react-redux";
import Accommodation from "@/components/Accommodation";

export default function AccommodationPage() {
  const currentTrip = useSelector((state) => state.user.value.currentTrip)
    //currentTrip contains all data of the selected trip

  const accommodations = currentTrip && currentTrip.accomodations && currentTrip.accomodations.map((data, i) => {
    return <Accommodation key={i} {...data}/>
  })


   if (currentTrip && currentTrip.accomodations.length > 0 ) { 
      return (
        <>
        <h1 className={`${styles.title} ${lexend.className}`}>Logements</h1>
        <div className={styles.accommodationsContainer}>
          {accommodations}
        </div>
        </>
      )
    } else {
      return (
        <>
        <h1 className={`${styles.title} ${lexend.className}`}>Logements</h1>
        <div className={styles.accommodationsContainer}>
          <p>Il semblerait qu'il n'y a pas encore de logement proposé pour ce voyage !</p>
        </div>
        </>
          
      )
    }     
}
