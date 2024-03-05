"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import { lexend } from "../app/fonts";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  console.log("avant" + JSON.stringify(user));
  const allUserTrip = [
    {
      name: "Barcelonne en Avril",
      admin: "65e6f61f574900bbbb8ed360",
      members: [{ _id: "65e6f61f574900bbbb8ed360" }],
    },
  ];

  function TripRow(props) {
    const isAdmin = true;
    console.log("apr" + JSON.stringify(user));
    return (
      <div className={styles.row}>
        <div>
          <span className={styles.tripName}>{props.name}</span>
          {isAdmin && <p className={styles.adminBadge}>ADMIN</p>}
        </div>
        <button className={styles.goButton}>Go</button>
      </div>
    );
  }

  const trips = allUserTrip.map((data, i) => {
    return <TripRow key={i} {...data} />;
  });

  if (!user.token) {
    console.log(user);
    return (
      <div className={`${styles.container} ${lexend.className}`}>
        <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>

        <div className={styles.leftContainer}>

        </div>

        <div className={styles.rightContainer}>
            <h1 className={`${styles.title} ${lexend.className}`}>Mon Compte</h1>
          <div className={styles.tripsContainer}>
            <h2 className={`${styles.tripTitle} ${lexend.className}`}>Mes voyages :</h2>
            {trips}
            <button className={styles.addTravel}>
              <span className={styles.plus}>+</span>
              <br />
              Organise un nouveau Travel entre amis
            </button>
          </div>
        </div>
      </div>
    );
  }
}
