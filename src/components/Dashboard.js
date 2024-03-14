"use client";
import { useSelector } from "react-redux";
import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";
import DashboardPlanning from "./dashboardCards/DashBoardPlanning";
import DashboardInfo from "./dashboardCards/DashBoardInfo";
import DashboardAccommodations from "./dashboardCards/DashboardAccommodations.js";
import DashboardActivitie from "./dashboardCards/DashboardActivities";
import DashboardMembers from "./dashboardCards/DashboardMembers";
import DashboardMessages from "./dashboardCards/DashboardMessages";
import DashboardMap from "./dashboardCards/DashboardMap";
import NoCurrentTrip from "./missingInfos/NoCurrentTrip.js";


export default function Dashboard() {

    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);


    if (!user.currentTrip) {
        return <NoCurrentTrip title="Dashboard" />
    } else {
      return (
          <div className={styles.container}>
            <div className={styles.leftContainer}>
                <DashboardPlanning />
                <DashboardInfo key={currentTrip.name} />
                <DashboardAccommodations />
            </div>
          

            <div className={styles.middleContainer}>
                <DashboardActivitie />
                <div className={styles.gmap}>
                    <DashboardMap />
                </div>
            </div>

            <div className={styles.rightContainer}>
                <DashboardMembers />
                <DashboardMessages />
            </div>
          </div>
      )
  }
}
