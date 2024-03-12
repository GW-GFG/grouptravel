'use client'
import styles from './AddActivity.module.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from './utils/Button'
import { updateCurrentTripActivities } from '@/reducers/user'

// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

const AddActivity = () => {

  const currentTrip = useSelector((state) => state.user.value.currentTrip)
  const dispatch = useDispatch()

  const [activityName, setActivityName] = useState('')
  const [activityPicture, setActivityPicture] = useState('')
  const [activityURL, setActivityURL] = useState('')
  const [activityDate, setActivityDate] = useState('')
  const [activityBudget, setActivityBudget] = useState(0)
  const [activityBudgetPerPerson, setActivityBudgetPerPerson] = useState(0)
  const [activityLocation, setActivityLocation] = useState('')
  const [activityDescription, setActivityDescription] = useState('')

  const [formHasError, setFormHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault() // prevents auto-refreshing of the page when submitting the form


    // Google map input logic
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAtN3JpGGPLuZkaD7j2zoSB0vE3e_B-Jn8&address=${activityLocation}`)
    .then(response => response.json()).then(data => {
        if (data && data.results[0]) {
          const coordinates = data.results[0].geometry.location;
          // check if url is valid (if url exists)
          if (activityURL !== '') {
            try {
              new URL(activityURL);
            } catch (err) {
              setFormHasError(true);
              setErrorMessage("L'url saisie n'est pas valide");
              return;
            }
          }

          // new activity object
          const activityData = {
            name: activityName,
            picture: activityPicture,
            url: activityURL,
            date: activityDate,
            budget: activityBudget,
            location: {
              name: activityLocation,
              lat: coordinates.lat,
              lng: coordinates.lng
            },
            description: activityDescription,
            tripId: currentTrip._id
          }

            //Handle picture
            const formData = new FormData();
            activityPicture && formData.append('image', activityPicture);
            fetch('http://localhost:5500/upload', {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .then(pictureData => {
                if (!pictureData || !pictureData.url){
                    return console.log(' No picture ')
                } else {
                    console.log('pictureDataUrl : ', pictureData.url);
                    activityData.picture = pictureData.url;
                }

            return fetch('http://localhost:5500/activities/new', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(activityData)
            });
            })
            .then(response => response.json())
            .then(data => {
              // if no trip is found or activity's date is outside trip's date
              if (data.result === false) {
                alert(data.error)
                return
              }
              // trip is found, add activity
              dispatch(updateCurrentTripActivities(data.newActivity.activities[data.newActivity.activities.length - 1]))
              alert('Votre activité a bien été ajoutée à votre groupe !')
              setActivityName('')
              setActivityPicture('')
              setActivityURL('')
              setActivityBudget('')
              setActivityDate('')
              setActivityLocation('')
              setActivityDescription('')
              setActivityPicture('')
            })
          } else {
            alert('Le voyage choisi n\'a pas pu être trouvé.');
          }
    });
  }

  return (
    <div className={styles.newActivity}>
      <h1 className={lexend.className}>Une activité à proposer ? </h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.layout}>
          <div className={styles.top}>
            <div>
              <label htmlFor="activity-picture" className={styles.label}>Photo</label>
              <input
                type="file"
                id="activity-picture"
                onChange={(e) => setActivityPicture(e.target.files[0])}
              />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.inputs}>
                <label htmlFor="activity-name" className={styles.label}>Nom de l'activité *</label>
                <input
                  type="text"
                  id="activity-name"
                  className={styles.input}
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="Un petit nom pour l'activité ?"
                  required
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
                  placeholder="Avec un lien c'est encore mieux !"
                />
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.inputDate}>
              <label htmlFor="activity-date" className={styles.label}>Sélectionnez la date: *</label>
              <input
                type="date"
                id="activity-date"
                className={styles.input}
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputsBudgetContainer} ${styles.rightSide}`}>
              <div className={styles.inputsBudget}>
                <label htmlFor="activity-budget" className={styles.label}>Budget:</label>
                <input
                  type="number"
                  id="activity-budget"
                  className={styles.input}
                  value={activityBudget}
                  onChange={(e) => setActivityBudget(e.target.value)}
                  placeholder='€'
                />
              </div>
              <div className={styles.inputsBudget}>
                <label htmlFor="activity-budget-single" className={styles.label}>Budget par personne:</label>
                <input
                  type="number"
                  id="activity-budget-single"
                  className={styles.input}
                  value={activityBudgetPerPerson}
                  onChange={(e) => setActivityBudgetPerPerson(e.target.value)}
                  placeholder='€'
                />
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div>
              <label htmlFor="activity-location" className={styles.label}>Localisation</label>
              <input
                type="text"
                id="activity-location"
                value={activityLocation}
                onChange={(e) => setActivityLocation(e.target.value)}
                placeholder='Il se situe où cette activité ?'
              />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.inputs}>
                <label htmlFor="activity-description" className={styles.label}>Description de l'activité</label>
                <textarea
                  id="activity-description"
                  className={styles.textarea}
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  placeholder="Que dire d'autre ?"
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {formHasError && errorMessage}
            <Button type="submit" buttonClass="primary" text="Soumettre" />
          </div>
        </div>

      </form>
    </div>
  )
}

export default AddActivity
