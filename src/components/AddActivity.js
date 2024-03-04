'use client'
import styles from './AddActivity.module.css'
import { useState, useEffect } from 'react'

const AddActivity = () => {
  const [activityName, setActivityName] = useState('')
  const [activityPicture, setActivityPicture] = useState('')
  const [activityURL, setActivityURL] = useState('')
  const [activityDate, setActivityDate] = useState('')
  const [activityBudget, setActivityBudget] = useState(null)
  const [activityBudgetPerPerson, setActivityBudgetPerPerson] = useState(null)
  const [activityLocation, setActivityLocation] = useState('')
  const [activityDescription, setActivityDescription] = useState('')

  const handleSubmit = () => {
    const activityData = {
      name: activityName,
      picture: activityPicture,
      url: activityURL,
      date: activityDate,
      budget: activityBudget,
      location: activityLocation,
      description: activityDescription,
    }

    fetch('http://localhost:3000/activities/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(activityData)
    })
      .then(response => response.json())
      .then(data => {
        if (!data) {
          console.log('Erreur')
          return
        }
          console.log('New activity added')
          setActivityName('')
          setActivityPicture('')
          setActivityURL('')
          setActivityBudget(null)
          setActivityDate('')
          setActivityLocation('')
          setActivityDescription('')
      })
  }

  return (
    <div className={styles.container}>

      <div className={styles.title}>
        <h1>Une idée d'activité ?</h1>
      </div>

      <div className={styles.columns}>

        <div className={styles.leftColumn}>
          <form>
            <div className={styles.inputs}>
              <label htmlFor="activity-picture" className={styles.label}>Photo</label>
              <input 
                type="image" 
                id="activity-picture" 
                value={activityPicture}
                onChange={(e) => setActivityPicture(e.target.value)}
                />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="activity-location" className={styles.label}>Localisation</label>
              <input 
                type="text" 
                id="activity-location" 
                value={activityLocation}
                onChange={(e) => setActivityLocation(e.target.value)}
                />
            </div>
          </form>
        </div>

        <div className={styles.rightColumn}>
          <form>
            <div className={styles.inputs}>
              <label htmlFor="activity-name" className={styles.label}>Nom de l'activité</label>
              <input 
                type="text" 
                id="activity-name" 
                className={styles.input}
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="activity-url" className={styles.label}>Url vers l'activité</label>
              <input 
                type="text" 
                id="activity-url" 
                className={styles.input} 
                value={activityURL}
                onChange={(e) => setActivityURL(e.target.value)}
                />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="activity-date" className={styles.label}>Sélectionnez la date:</label>
              <input 
                type="date" 
                id="activity-date" 
                className={styles.input} 
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="activity-budget" className={styles.label}>Budget:</label>
              <input 
                type="number" 
                id="activity-budget" 
                className={styles.input} 
                value={activityBudget}
                onChange={(e) => setActivityBudget(e.target.value)}
                />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="activity-budget-per-person">Budget par personne:</label>
              <input 
                type="number" 
                id="activity-budget-per-person" 
                className={styles.input} 
                value={activityBudgetPerPerson}
                onChange={(e) => setActivityBudgetPerPerson(e.target.value)}
                />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="activity-description" className={styles.label}>Description de l'activité</label>
              <textarea 
                id="activity-description" 
                className={styles.input} 
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
                />
            </div>
            <button type="submit" className={styles.button}>Soumettre</button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default AddActivity
