'use client'
import Link from "next/link";
import styles from "./page.module.css";
import { lexend } from "../fonts";
import { useSelector } from "react-redux";
import Accommodation from "@/components/Accommodation";
import NotConnected from "@/components/missingInfos/NotConnected";
import MissingInfos from "@/components/missingInfos/MissingInfos";
import Button from "@/components/utils/Button";
import { useRouter } from "next/navigation";

export default function AccommodationPage() {

  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  //currentTrip contains all data of the selected trip
  if (!user.token) {
    return (
      <NotConnected />
    );
  } else {
    const handleClickPlusButton = () => {
      router.push('/accomodations/add');
    };
    if (currentTrip && currentTrip.accomodations.length > 0) { 
      const accommodations = currentTrip.accomodations.map((data, i) => {
            return <Accommodation key={i} {...data}/>
          });
      return (
          <div className={styles.containerTest}>
              <h1 className={`${styles.title} ${lexend.className}`}>Logements</h1>
              <div className={styles.accommodationsContainer}>
                {accommodations}
              </div>
              <Button text="+" onClick={() => handleClickPlusButton()} style={{backgroundColor: '#ef8b7a'}}/>
          </div>
          
      )
    } else {
      return (
        <>
          <MissingInfos title='Logements' text="de logement proposé" />
          <Button text="+" onClick={() => handleClickPlusButton()} style={{backgroundColor: '#ef8b7a'}}/>
        </>
      )

    }   
    // const currentTrip = useSelector((state) => state.user.value.currentTrip)
    //   //currentTrip contains all data of the selected trip

    // if (currentTrip && currentTrip.accomodations.length > 0) { 
    //   const accommodations = currentTrip.accomodations.map((data, i) => {
    //     return <Accommodation key={i} {...data}/>
    //   })
    //   return (
    //     <>
    //     <h1 className={`${styles.title} ${lexend.className}`}>Logements</h1>
    //     <div className={styles.accommodationsContainer}>
    //       {accommodations}
    //     </div>
    //     </>
    //   )
    // } else {
    //     return (
    //       <>
    //       <h1 className={`${styles.title} ${lexend.className}`}>Logements</h1>
    //       <div className={styles.accommodationsContainer}>
    //         <p>Il semblerait qu'il n'y a pas encore de logement proposé pour ce voyage !</p>
    //       </div>
    //       </>
    //     )
    //   }    
    } 
}
