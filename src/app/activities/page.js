'use client'
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import { lexend } from "../fonts";
import Activity from "@/components/Activity";
import NotConnected from "@/components/missingInfos/NotConnected";
import NoCurrentTrip from "@/components/missingInfos/NoCurrentTrip";
import MissingInfos from "@/components/missingInfos/MissingInfos";
import Button from "@/components/utils/Button";
import { useRouter } from "next/navigation";

export default function ActivitiesPage() {

    const router = useRouter();
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);

    if (!user.token) {
        return <NotConnected title="Activités" />
    } else if (!currentTrip) {
      return <NoCurrentTrip title="Activités" />
  } else {
        const handleClickPlusButton = () => {
          router.push('/activities/add');
        };

        if (currentTrip && currentTrip.activities.length > 0) { 
            const activities = currentTrip.activities.map((data, i) => {
                  return <Activity key={i} {...data}/>
                });
            return (
              <div className={styles.globalContainer}>
                  <h1 className={`${styles.title} ${lexend.className}`}>Activités</h1>
                  <div className={styles.container}>
                    {activities}
                  </div>
                    <Button text="+" onClick={() => handleClickPlusButton()} buttonClass={'bgBlue'}/>
              </div>
            )
          } else {
            return (
              <>
                <MissingInfos title='Activités' text="d'activité proposée" />
                  <Button text="+" onClick={() => handleClickPlusButton()} buttonClass={'bgBlue'}/>
              </>
            
            )
          }   
    }
}