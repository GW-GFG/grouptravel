"use client";
import { useEffect, useState } from "react";
import styles from "./dashboardInfo.module.css";
import { useSelector } from "react-redux";


export default function DashboardInfo() {
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetPerPerson, setBudgetPerPerson] = useState(0)

  useEffect(() => { 
    // console.log(currentTrip)
    fetch('http://localhost:5500/trips/onetrip',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {tripId: currentTrip._id} )
        }).then(response => response.json())
        .then(data => {
          // console.log(data.tripData)
          setTotalBudget(data.tripData.budget)
          if (data.tripData.members.length > 0) {
            const tempBudget = data.tripData.budget / (data.tripData.members.length + 1)
            setBudgetPerPerson(tempBudget)
          } else { 
            setBudgetPerPerson(data.budget)
          }
        })    
  }, []);

  return (
    <div className={styles.container}>
      <h2>Informations</h2>
      <div className={styles.profilPictureContainer}>
        <p>Nom du groupe : {currentTrip.name}</p>
        <p>Dates départ : {new Date(currentTrip.dates.departure).toLocaleDateString()}</p>
        <p>Dates retour : {new Date(currentTrip.dates.return).toLocaleDateString()}</p>
      </div>
      <div className={styles.userInfoContainer}>Budget :
          <div className={styles.userInfoBudget}>Total : {totalBudget} €</div>
          <div className={styles.userInfoBudget}>par Personne : {budgetPerPerson}€</div>
      </div>
      <div className={styles.backPicture}>Logement</div>
          <div className={styles.infoLogement}>lieu séjour: {currentTrip.location}</div>
          <div className={styles.infoLogement}>Logement: à définir !</div>
    </div>
  );
}


