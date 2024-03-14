"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './toPlan.module.css';
import NotFixedInPlanning from "./NotFixedInPlanning";
import { adminFixActivity } from '@/reducers/user';
import { notification } from 'antd';

export default function ToPlan(props) {
  const user = useSelector((state) => state.user.value);
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const dispatch = useDispatch();
  const [areNotFixed, setAreNotFixed] = useState(null);

  //console.log('toplan component props hasChanged: ', props.hasChanged);
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
            //console.log('toplan component has fetched: ', data.data);
            setAreNotFixed(data.data);
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
            dispatch(adminFixActivity({activityId: data.updatedActivity._id, newStatus: data.updatedActivity.isFixed}));
            // notification to user that activity has been planned
            notification.success({
                message: "Activité ajoutée du planning !",
                description: "Votre activité a bien été ajoutée du planning !",
                placement: "bottomRight",
            });
            props.handleHasChanged(); // modifs
        });
  };


  const notFixedList = areNotFixed && areNotFixed.map((data, i) => {
      return <NotFixedInPlanning key={i} {...data} handleClick={handleClick} isAdmin={props.isAdmin} handleHasChanged={props.handleHasChanged}/>
  })

  return (
    <div className={styles.globalContainer}>
        <h2>Ces activités n'ont pas encore été validées</h2>
        <div className={styles.activityContainer}>
          {notFixedList}
        </div>
    </div>
  );
}
