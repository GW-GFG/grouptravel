"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './planning.module.css';
import FixedInPlanning from "./FixedInPlanning";
import { adminFixActivity } from '@/reducers/user';
import { notification } from 'antd';

export default function Planning(props) {
  const user = useSelector((state) => state.user.value);
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const dispatch = useDispatch();
  const [areFixed, setAreFixed] = useState(null);

  //console.log('planning component props.hasChanged: ', props.hasChanged);
  useEffect(() => {
    if (user.token && currentTrip && currentTrip._id) {
      
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
            //console.log('planning component has fetched: ', data.data);
            setAreFixed(data.data);
        });
    }
  }, [currentTrip]); 

  const handleClick = (myActivity, newDate) => {

    const updatedActivity = {
        isAdmin: props.isAdmin,
        activityId: myActivity._id,
        isFixed: !myActivity.isFixed
    };

    if (newDate) {
        //pas pris en compte pour l'instant
        //console.log(newDate);
        updatedActivity.date = newDate;
    }

    fetch("http://localhost:5500/planning/fixOne", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedActivity),
      })
        .then((response) => response.json())
        .then((data) => {
          // dispatch planned activity into reducer
          dispatch(adminFixActivity({activityId: data.updatedActivity._id, newStatus: data.updatedActivity.isFixed}));
          // notification to user that activity has been planned
          notification.success({
            message: "Activité retirée du planning !",
            description: "Votre activité a bien été retirée du planning !",
            placement: "bottomRight",
          });
        });
  };

  const formatDate = (props.daily.getMonth()+1).toString().padStart(2, '0');
  const currentDate = `${props.daily.getDate()}/${formatDate}`;

  const fixedList = areFixed && areFixed.map((data, i) => {
    // check if fixed activity matchs current (this planning's) day
    const activityDate = new Date(data.date).getTime();
    const dateToday = new Date(props.daily).getTime();
    if (activityDate === dateToday) {
      return <FixedInPlanning key={i} {...data} handleClick={handleClick} isAdmin={props.isAdmin} handleHasChanged={props.handleHasChanged}/>
    } 
  })
  
  return (
    <div className={styles.globalContainer}>
        <h2 className={styles.headings}>{currentDate}</h2>
        <div className={styles.activityContainer}>
          {fixedList}
        </div>
    </div>
  );
}
