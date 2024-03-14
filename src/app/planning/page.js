'use client'
import styles from './page.module.css';
import Planning from "@/components/planning/Planning";
import { lexend } from "../fonts";
import NotConnected from "@/components/missingInfos/NotConnected";
import NoCurrentTrip from "@/components/missingInfos/NoCurrentTrip";
import { useSelector } from "react-redux";

export default function PlanningPage() {
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);

  if (!user.token) {
    return <NotConnected title="Planning" />;
  } else if (!currentTrip) {
    return <NoCurrentTrip title="Planning" />;
  } else {


    // Returns an array of dates between two dates, in order to display 1 Planning for reach trip day
    const getDates = (startDate, endDate) => {
      const dates = []
      let currentDate = startDate
      const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
      }
      while (currentDate <= endDate) {
        dates.push(currentDate)
        currentDate = addDays.call(currentDate, 1)
      }
      return dates
    }

    const dates = getDates(new Date(currentTrip.dates.departure), new Date(currentTrip.dates.return));
    /*const nbrOfColumns = dates.length < 7 ? dates.length : 7;*/
    // split isFixed and isNotFixed and send it to different components
    const dailyPlanning = dates.map((date, i) => {
      return <Planning daily={date} key={i} currentTrip={currentTrip} />;
    });

/* old version to style dynamically our nbr of columns
<div className={styles.container} style={{gridTemplateColumns: `repeat(${nbrOfColumns}, 1fr)`}}>*/
    return (
      <div className={styles.globalContainer}>
        <div className={styles.container}>
          {dailyPlanning}
        </div>
      </div>
    );
  }
}
