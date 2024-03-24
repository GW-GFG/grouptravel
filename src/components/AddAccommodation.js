"use client";
import styles from "./addaccommodation.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./utils/Button";
import { notification } from "antd";
import { updateCurrentTripAccommodations } from "@/reducers/user";
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

export default function Addaccommodation() {
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const dispatch = useDispatch();
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

  const [accommodationName, setaccommodationName] = useState("");
  const [accommodationPicture, setaccommodationPicture] = useState("");
  const [accommodationURL, setaccommodationURL] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [accommodationBudget, setaccommodationBudget] = useState(0);
  const [accommodationBudgetPerPerson, setaccommodationBudgetPerPerson] =
    useState(0);
  const [accommodationLocation, setaccommodationLocation] = useState("");
  const [accommodationDescription, setaccommodationDescription] = useState("");

  const [formHasError, setFormHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //use ref to allow hide uggly input button
  const fileInputRef = useRef(null);
  // Google map camera change
  const INITIAL_CAMERA = {
    center: { lat: currentTrip.location.lat, lng: currentTrip.location.lng },
    zoom: 12,
  };

  const [cameraProps, setCameraProps] = useState(INITIAL_CAMERA);
  const handleCameraChange = useCallback((ev) => setCameraProps(ev.detail));

  //To clear all input fields when the form is registered
  const clearAllfields = () => {
    setaccommodationName("");
    setaccommodationPicture("");
    setaccommodationURL("");
    setaccommodationBudget(0);
    setDepartureDate("");
    setReturnDate("");
    setaccommodationLocation("");
    setaccommodationDescription("");
    setFormHasError(false);
    setErrorMessage("");
    setaccommodationPicture("");
  };

  //handle fetch form
  const fetchPostNewAccommodation = (accommodationData) => {
    fetch(`https://grouptravel-b-gwgfg.vercel.app/accommodations/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accommodationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          notification.warning({
            message: "Attention !",
            description: data.error,
            placement: "bottomRight",
          });
          return;
        }
        dispatch(
          updateCurrentTripAccommodations(
            data.newaccommodation.accommodations[
            data.newaccommodation.accommodations.length - 1
            ]
          )
        );
        notification.success({
          message: "Logement ajouté !",
          description: "Votre logement a bien été soumis à votre groupe !",
          placement: "bottomRight",
        });
        clearAllfields();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if url is valid (if url exists)
    if (accommodationURL !== "") {
      try {
        new URL(accommodationURL);
      } catch (err) {
        setFormHasError(true);
        setErrorMessage("L'url saisie n'est pas valide");
        return;
      }
    }

    // Checking if end date is after start date
    const accommodationDepartureDate = new Date(departureDate);
    const accommodationReturnDate = new Date(returnDate);

    if (accommodationDepartureDate >= accommodationReturnDate) {
      setFormHasError(true);
      setErrorMessage(
        "La date de départ doit être postérieure à la date d'arrivée."
      );
      return;
    }

    // check if accommodation dates are within trip dates
    const tripDepartureDate = new Date(currentTrip.dates.departure);
    const tripReturnDate = new Date(currentTrip.dates.return);

    if (
      accommodationDepartureDate < tripDepartureDate ||
      accommodationDepartureDate > tripReturnDate ||
      accommodationReturnDate < tripDepartureDate ||
      accommodationReturnDate > tripReturnDate
    ) {
      setFormHasError(true);
      setErrorMessage(
        "Les dates du logement ne sont pas comprises dans celles du voyage."
      );
      notification.warning({
        message: "Attention !",
        description: errorMessage,
        placement: "bottomRight",
      });
      return;
    }

    // checks passed, new accommodationData object to be added
    const accommodationData = {
      name: accommodationName,
      photos: [],
      url: accommodationURL,
      departureDate: departureDate,
      returnDate: returnDate,
      budget: accommodationBudget,
      location: {
        name: accommodationLocation,
        lat: position.lat,
        lng: position.lng,
      },
      description: accommodationDescription,
      tripId: currentTrip._id,
    };

    //Handle picture
    if (accommodationPicture) {
      const formData = new FormData();
      formData.append("image", accommodationPicture);
      fetch("https://grouptravel-b-gwgfg.vercel.app/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((pictureData) => {
          if (!pictureData || !pictureData.url) {
            return console.log(" No picture ");
          } else {
            accommodationData.photos.push(pictureData.url);
          }
          //Return fetch to handle upload
          return fetchPostNewAccommodation(accommodationData);
        });
    } else {
      return fetchPostNewAccommodation(accommodationData);
    }
  };

  // Google map input logic
  const handleClickLocation = (e) => {
    e.preventDefault();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${NEXT_PUBLIC_GOOGLE_API}&address=${accommodationLocation}`
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
  };
  //send the click on the button to the hidden button
  const handleClickPicture = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className={styles.newaccommodation}>
      <h1 className={lexend.className}>Un logement à proposer ? </h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.layout}>
          <div className={styles.top}>
            <div>
              <label htmlFor="accommodation-picture" className={styles.label}>
              Choisis une photo sympa !<br/>
              </label>
              <input className={styles.inputFile}
                type="file"
                id="accommodation-picture"
                ref={fileInputRef} // Ref to handleclick from penIcon
                style={{ display: "none" }} // To hide input
                onChange={(e) => setaccommodationPicture(e.target.files[0])}
              />
              <Button type="text" onClick={handleClickPicture} text={!accommodationPicture? <FontAwesomeIcon icon={faPen} className={styles.penIcon} /> : <FontAwesomeIcon icon={faCircleCheck} className={styles.penIcon} />} />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.inputs}>
                <label htmlFor="accommodation-name" className={styles.label}>
                  Nom du logement *
                </label>
                <input
                  type="text"
                  id="accommodation-name"
                  className={styles.input}
                  value={accommodationName}
                  onChange={(e) => setaccommodationName(e.target.value)}
                  placeholder="Un petit nom pour le logement ?"
                  required
                />
              </div>
              <div className={styles.inputs}>
                <label htmlFor="accommodation-url" className={styles.label}>
                  Url vers le logement
                </label>
                <input
                  type="text"
                  id="accommodation-url"
                  className={styles.input}
                  value={accommodationURL}
                  onChange={(e) => setaccommodationURL(e.target.value)}
                  placeholder="Avec un lien c'est encore mieux !"
                />
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div
              className={`${styles.inputsBudgetContainer} ${styles.rightSide}`}
            >
              <div className={styles.inputDate}>
                <label
                  htmlFor="accommodation-departure-date"
                  className={styles.label}
                >
                  Date de début *
                </label>
                <input
                  type="date"
                  id="accommodation-departure-date"
                  className={styles.input}
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputDate}>
                <label
                  htmlFor="accommodation-return-date"
                  className={styles.label}
                >
                  Date de fin *
                </label>
                <input
                  type="date"
                  id="accommodation-return-date"
                  className={styles.input}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div
              className={`${styles.inputsBudgetContainer} ${styles.rightSide}`}
            >
              <div className={styles.inputsBudget}>
                <label htmlFor="accommodation-budget" className={styles.label}>
                  Budget:
                </label>
                <input
                  type="number"
                  id="accommodation-budget"
                  className={styles.input}
                  value={accommodationBudget}
                  onChange={(e) => setaccommodationBudget(e.target.value)}
                  min="0"
                />
              </div>
              <div className={styles.inputsBudget}>
                <label
                  htmlFor="accommodation-budget-single"
                  className={styles.label}
                >
                  Budget par personne:
                </label>
                <input
                  type="number"
                  id="accommodation-budget-single"
                  className={styles.input}
                  readOnly
                  value={(
                    accommodationBudget /
                    (currentTrip.members.length + 1)
                  ).toFixed(2)}
                  min="0"
                />
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div style={{ minWidth: "21rem" }}>
              <div className={styles.leftSide}>
                <label htmlFor="accommodation-location" className={styles.label}>
                  Localisation
                </label>
                <input
                  type="text"
                  id="accommodation-location"
                  className={styles.input}
                  value={accommodationLocation}
                  onChange={(e) => setaccommodationLocation(e.target.value)}
                  placeholder="Il se situe où ce logement ?"
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
                <label
                  htmlFor="accommodation-description"
                  className={styles.label}
                >
                  Description du logement
                </label>
                <textarea
                  id="accommodation-description"
                  className={styles.textarea}
                  value={accommodationDescription}
                  onChange={(e) => setaccommodationDescription(e.target.value)}
                  placeholder="Que dire d'autre ?"
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {formHasError}
            <Button type="submit" buttonClass="primary" text="Soumettre" />
          </div>
        </div>
      </form>
    </div>
  );
}
