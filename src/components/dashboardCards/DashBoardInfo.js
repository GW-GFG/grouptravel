"use client";
import { useEffect, useState } from "react";
import styles from "./dashboardInfo.module.css";
import { useSelector } from "react-redux";


export default function DashboardInfo() {
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetPerPerson, setBudgetPerPerson] = useState(0);
  const [fixedAccommodation, setFixedAccommodation] = useState([]);
  let accoName = null;
  useEffect(() => { 
    fetch('http://localhost:5500/trips/onetrip',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {tripId: currentTrip._id} )
        }).then(response => response.json())
        .then(data => {
          // console.log(data.tripData)
          setTotalBudget(data.tripData.budget.toFixed(2))
          if (data.tripData.members.length > 0) {
            const tempBudget = data.tripData.budget / (data.tripData.members.length + 1)
            setBudgetPerPerson(tempBudget.toFixed(2)) 
          } else {             
            totalBudget && setBudgetPerPerson(totalBudget)
          }
          if (data.tripData.accomodations && data.tripData.accomodations.length > 0){
          accoName = data.tripData.accomodations
          .filter(accomodation => accomodation.isFixed === true)
          .map(accomodation => accomodation.name);
          setFixedAccommodation(accoName)
          }
        })    
  }, [currentTrip]);

  const accommodationsList = fixedAccommodation.map((data, i) => {
    return <li key={i} >{data}</li>
  })

  return (
    <div className={styles.container}>
      <h2>Informations</h2>
      <div className={styles.profilPictureContainer}>
        <p>Nom du groupe : {currentTrip.name}</p>
        <p>Dates départ : {new Date(currentTrip.dates.departure).toLocaleDateString()}</p>
        <p>Dates retour : {new Date(currentTrip.dates.return).toLocaleDateString()}</p>
      </div>
      <div className={styles.userInfoContainer}>Budget :
          <div className={styles.userInfoBudget}>Total : {totalBudget} € - par Personne : {budgetPerPerson}€</div>
      </div>
          <div className={styles.infoLogement}>lieu séjour: {currentTrip.location.name}</div>
          <ul className={styles.infoLogement}>
        <h3>Logement :</h3>
        {accommodationsList.length > 0 ? accommodationsList : <li>à définir !</li>}
      </ul>
    </div>
  );
}


