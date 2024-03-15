'use client'
import styles from './AddActivity.module.css';
import { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './utils/Button';
import { notification } from 'antd';
import { updateCurrentTripActivities } from '@/reducers/user';
import { faCircleCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import fonts to use them for menu items
import { lexend } from "../app/fonts";

// import elements for Google map
import {
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";
import GoogleMap from "./utils/GoogleMap";

const AddActivity = () => {
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const dispatch = useDispatch();

  // declaring states that will be used for the form
  const [activityName, setActivityName] = useState("");
  const [activityPicture, setActivityPicture] = useState("");
  const [activityURL, setActivityURL] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [activityBudget, setActivityBudget] = useState(0);
  const [activityLocation, setActivityLocation] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  const [formHasError, setFormHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
//use ref to allow hide uggly input button
  const fileInputRef = useRef(null);

  // center of Google map based on trip location
  const [center, setCenter] = useState({
    lat: currentTrip.location.lat,
    lng: currentTrip.location.lng,
  });
  // coordinates of accommodation to be added
  const [position, setPosition] = useState({
    lat: currentTrip.location.lat,
    lng: currentTrip.location.lng,
  });

  // zoom of Google map
  const [zoom, setZoom] = useState(6);
  // check if new marker should be added
  const [newMarker, setNewMarker] = useState(false);

  // Google map camera change
  const INITIAL_CAMERA = {
    center: { lat: currentTrip.location.lat, lng: currentTrip.location.lng },
    zoom: 12,
  };

  const [cameraProps, setCameraProps] = useState(INITIAL_CAMERA);
  const handleCameraChange = useCallback((ev) => setCameraProps(ev.detail));

  //To clear all input fields when the form is registered
  const clearAllfields = () => {
    setActivityName("");
    setActivityPicture("");
    setActivityURL("");
    setActivityBudget(0);
    setActivityDate("");
    setActivityLocation("Non déterminée");
    setActivityDescription("");
    setFormHasError(false);
    setErrorMessage("");
  };

  //to handle fetch activity after map and picture
  const fetchPostNewActivity = (activityData) => {
    fetch("http://localhost:5500/activities/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    })
      .then((response) => response.json())
      .then((data) => {
        // if no trip is found or activity's date is outside trip's date
        if (data.result === false) {
          // notification to user that dates are not valid
          notification.warning({
            message: "Attention !",
            description:
              "La date sélectionnée n'est pas comprise dans les dates de votre voyage !",
            placement: "bottomRight",
          });
          return;
        }
        // dispatch new activity into reducer
        dispatch(
          updateCurrentTripActivities(
            data.newActivity.activities[data.newActivity.activities.length - 1]
          )
        );
        // notification to user that activity has been added
        notification.success({
          message: "Activité ajoutée !",
          description: "Ton activité a bien été proposée pour ton voyage !",
          placement: "bottomRight",
        });
        // reset fields
        clearAllfields();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents auto-refreshing of the page when submitting the form

    // check if url is valid (if url exists)
    if (activityURL !== "") {
      try {
        new URL(activityURL);
      } catch (err) {
        setFormHasError(true);
        setErrorMessage("L'url saisie n'est pas valide");
        return;
      }
    }
    // checks passed, new accomodationData object to be added
    const activityData = {
      name: activityName,
      picture: activityPicture,
      url: activityURL,
      date: activityDate,
      budget: activityBudget,
      location: {
        name: activityLocation,
        lat: position.lat,
        lng: position.lng,
      },
      description: activityDescription,
      tripId: currentTrip._id,
    };

    //Handle picture
    if (activityPicture) {
      const formData = new FormData();
      activityPicture && formData.append("image", activityPicture);
      fetch("http://localhost:5500/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((pictureData) => {
          if (!pictureData || !pictureData.url) {
            return console.log(" No picture ");
          } else {
            activityData.picture = pictureData.url;
          }
          //Return fetch to handle upload
          return fetchPostNewActivity(activityData);
        });
    } else {
      return fetchPostNewActivity(activityData);
    }
  }


  // Google map input logic
  const handleClickLocation = (e) => {
    e.preventDefault();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAtN3JpGGPLuZkaD7j2zoSB0vE3e_B-Jn8&address=${activityLocation}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results[0]) {
          const newCenter = data.results[0].geometry.location;
          setPosition(newCenter);
          setZoom(12);
          setNewMarker(true);
        } else {
          notification.warning({
            message: 'Localisation non trouvée',
            description: "L'adresse saisie n'a pas pu être trouvée. Veuillez essayer avec une autre adresse.",
            placement: 'bottomRight',
          })
          setPosition({
            lat: currentTrip.location.lat,
            lng: currentTrip.location.lng,
          });
          setZoom(3);
        }
      });
  }
//send the click on the button to the hidden button
  const handleClickPicture = () => {
    fileInputRef.current.click();
  };


  return (
    <div className={styles.newActivity}>
      <h1 className={lexend.className}>Une activité à proposer ? </h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.layout}>
          <div className={styles.top}>
            <div>
              <label htmlFor="activity-picture" className={styles.label}>
                Choisis une photo sympa !<br/> 
              </label>
                <input
                type="file"
                id="activity-picture"
                ref={fileInputRef} // Ref to handleclick from penIcon
                style={{ display: "none" }} // To hide input
                onChange={(e) => setActivityPicture(e.target.files[0])}
              />
              <Button type="text" onClick={handleClickPicture} text={!activityPicture? <FontAwesomeIcon icon={faPen} className={styles.penIcon} /> : <FontAwesomeIcon icon={faCircleCheck} className={styles.penIcon} />} />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.inputs}>
                <label htmlFor="activity-name" className={styles.label}>
                  Nom de l'activité *
                </label>
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
                <label htmlFor="activity-url" className={styles.label}>
                  Url vers l'activité
                </label>
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
            <div
              className={`${styles.inputsBudgetContainer} ${styles.rightSide}`}
            >
              <div className={styles.inputsBudget}>
                <label htmlFor="activity-budget" className={styles.label}>
                  Budget:
                </label>
                <input
                  type="number"
                  id="activity-budget"
                  className={styles.input}
                  value={activityBudget}
                  onChange={(e) => setActivityBudget(e.target.value)}
                  placeholder="€"
                />
              </div>
              <div className={styles.inputsBudget}>
                <label
                  htmlFor="activity-budget-single"
                  className={styles.label}
                >
                  Budget par personne:
                </label>
                <input
                  type="number"
                  id="activity-budget-single"
                  readOnly
                  className={styles.input}
                  value={(activityBudget / (currentTrip.members.length + 1)).toFixed(2)}
                  placeholder='€'
                />
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div style={{ minWidth: "21rem" }}>
              <div className={styles.leftSide}>
                <label htmlFor="activity-location" className={styles.label}>
                  Localisation
                </label>
                <input
                  type="text"
                  id="activity-location"
                  className={styles.input}
                  value={activityLocation}
                  onChange={(e) => setActivityLocation(e.target.value)}
                  placeholder='Elle se situe où cette activité ?'
                />
                <Button
                  classButton="secondary"
                  onClick={handleClickLocation}
                  text="Go"
                />
              </div>
              {/* Google map stuff */}
              {currentTrip && (
                <GoogleMap
                  currentTrip={currentTrip}
                  newMarker={newMarker}
                  center={center}
                  markerPos={position}
                  zoom={zoom}
                  {...cameraProps}
                  onCameraChanged={handleCameraChange}
                />
              )}
              {/* end Google map stuff*/}
            </div>
            <div className={styles.rightSide}>
              <div className={styles.inputs}>
                <label htmlFor="activity-description" className={styles.label}>
                  Description de l'activité
                </label>
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
  );
}

export default AddActivity;
