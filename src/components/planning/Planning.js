"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from './planning.module.css';
import FixedInPlanning from "./FixedInPlanning";

export default function Planning(props) {
  const user = useSelector((state) => state.user.value);
  const currentTrip = props.currentTrip;
  const [areNotFixed, setAreNotFixed] = useState(null);
  const [areFixed, setAreFixed] = useState(null);

  useEffect(() => {
    if (user.token && currentTrip && currentTrip._id) {
      
      fetch("http://localhost:5500/planning/areNotFixed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userToken: user.token,
          currentTripId: currentTrip._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log("notFixedData : " + JSON.stringify(data.data));
            setAreNotFixed(data.data);
        });
      fetch("http://localhost:5500/planning/areFixed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userToken: user.token,
          currentTripId: currentTrip._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log("notFixedData : " + JSON.stringify(data.data));
            setAreFixed(data.data);
        });
    }
  }, [props]);

  const formatDate = (props.daily.getMonth()+1).toString().padStart(2, '0');
  const currentDate = `${props.daily.getDate()}/${formatDate}`;

  const notFixedList = areNotFixed && areNotFixed.map((data, i) => {
    // check if not fixed activity matchs current (this planning's) day
    const activityDate = new Date(data.date).getTime();
    const dateToday = new Date(props.daily).getTime();
    if (activityDate === dateToday) {
      return <div key={i}>{data.name}</div>
    }
  })

  const fixedList = areFixed && areFixed.map((data, i) => {
    // check if fixed activity matchs current (this planning's) day
    const activityDate = new Date(data.date).getTime();
    const dateToday = new Date(props.daily).getTime();
    if (activityDate === dateToday) {
      return <FixedInPlanning key={i} {...data} />
    } 
  })


  /*
    <div className={styles.notFixedContainer}>
          <h3 className={styles.headingsNotFixed}>Activités pas (encore ?) validées</h3>
          {notFixedList}
    </div>
  */
  return (
    <div className={styles.globalContainer}>
        <h2 className={styles.headings}>{currentDate}</h2>
        <div className={styles.activityContainer}>
          {fixedList}
        </div>
    </div>
  );
}
