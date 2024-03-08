'use client'
import styles from './addAccomodation.module.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Button from './utils/Button';

// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

// import elements for Google map
import GoogleMap from './utils/GoogleMap';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function AddAccomodation() {

    const currentTrip = useSelector((state) => state.user.value.currentTrip);

    const [accomodationName, setAccomodationName] = useState('');
    const [accomodationPicture, setAccomodationPicture] = useState('');
    const [accomodationURL, setAccomodationURL] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [accomodationBudget, setAccomodationBudget] = useState(0);
    const [accomodationBudgetPerPerson, setAccomodationBudgetPerPerson] = useState(0);
    const [accomodationLocation, setAccomodationLocation] = useState('');
    const [accomodationDescription, setAccomodationDescription] = useState('');

    const [formHasError, setFormHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    /* Google map stuff */
    // Allows us to set map's center
    const [center, setCenter] = useState({
        lat: 48.866667,
        lng: 2.333333,
      });
    const [zoom, setZoom] = useState(4);

    // Allows us to set marker's position
    const [position, setPosition] = useState({
        lat: 48.866667,
        lng: 2.333333, 
    });

    const Map = () => {};

    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
    if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
    }
    }, [ref, map]);

    const Marker = (options) => {
        const [marker, setMarker] = useState();
      
        useEffect(() => {
          if (!marker) {
            setMarker(new google.maps.Marker());
          }
      
          // remove marker from map on unmount
          return () => {
            if (marker) {
              marker.setMap(null);
            }
          };
        }, [marker]);
        useEffect(() => {
          if (marker) {
            marker.setOptions(options);
          }
        }, [marker, options]);
        return null;
      };


    /*
    // Possible de gérer l'affichage de la carte en créant des components <Spinner />, <ErrorComponent /> et <MyMapComponent />
    // dans ce cas, il faut modifier en bas par : <Wrapper apiKey={"YOUR_API_KEY"} render={render} />
    const render = (status) => {
        switch (status) {
          case Status.LOADING:
            return <Spinner />;
          case Status.FAILURE:
            return <ErrorComponent />;
          case Status.SUCCESS:
            return <MyMapComponent />;
        }
      };

      possible de faire comme ça aussi
      const render = (status) => {
        if (status === Status.FAILURE) return <ErrorComponent />;
        return <Spinner />;
        };
      */

        const render = (status) => {
            if (status === Status.FAILURE) return <div>Hi</div>;
            return <div>Ho</div>;
          };


    /* end Google map stuff */

    const handleSubmit = (e) => {
        e.preventDefault();

        // check if url is valid (if url exists)
        if (accomodationURL !== '') {
            try {
                new URL(accomodationURL);   
            } catch (err) {
                setFormHasError(true);
                setErrorMessage("L'url saisie n'est pas valide");
                return;
            }
        }

        // Checking if end date is after start date
        const accommodationDepartureDate = new Date(departureDate);
        const accommodationReturnDate = new Date(returnDate);

        if(accommodationDepartureDate >= accommodationReturnDate) {
            setFormHasError(true);
            setErrorMessage("La date de départ doit être postérieure à la date d'arrivée.")
            return;  
        }

        // check if accommodation dates are within trip dates
        const tripDepartureDate = new Date(currentTrip.dates.departure);
        const tripReturnDate = new Date(currentTrip.dates.return);

        if (accommodationDepartureDate < tripDepartureDate || accommodationDepartureDate > tripReturnDate 
        || accommodationReturnDate < tripDepartureDate || accommodationReturnDate > tripReturnDate) {
            setFormHasError(true);
            setErrorMessage("Les dates du logement ne sont pas comprises dans celles du voyage.");
            return;
        }


        // checks passed, new accomodationData object to be added
        const accomodationData = {
            name: accomodationName,
            picture: accomodationPicture,
            url: accomodationURL,
            departureDate: departureDate,
            returnDate: returnDate,
            budget: accomodationBudget,
            location: accomodationLocation,
            description: accomodationDescription,
            tripId: currentTrip._id
        }

        fetch(`http://localhost:5500/accomodations/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accomodationData)
        })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                console.log('Erreur');
                return
            } else {
                if (data.result === true) {
                    setAccomodationName('');
                    setAccomodationPicture('');
                    setAccomodationURL('');
                    setAccomodationBudget(0);
                    setDepartureDate('');
                    setReturnDate('');
                    setAccomodationLocation('');
                    setAccomodationDescription('');
                    setFormHasError(false);
                    setErrorMessage('');
                    // replace with proper feedback
                    console.log('AddAccomodation.js : nouveau logement ajouté au trip, yay !')
                } else {
                    setFormHasError(true);
                    setErrorMessage(data.error);
                }
            }
        });
    }

    return <div className={styles.newAccomodation}>
        <h1 className={lexend.className}>Un logement à proposer ? </h1>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <div className={styles.layout}>
                <div className={styles.top}>
                    <div>
                        <label htmlFor="accomodation-picture" className={styles.label}>Photo</label>
                        <input
                            type="file"
                            id="accomodation-picture"
                            value={accomodationPicture}
                            onChange={(e) => setAccomodationPicture(e.target.value)}
                        />
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.inputs}>
                            <label htmlFor="accomodation-name" className={styles.label}>Nom du logement *</label>
                            <input
                                type="text"
                                id="accomodation-name"
                                className={styles.input}
                                value={accomodationName}
                                onChange={(e) => setAccomodationName(e.target.value)}
                                placeholder='Un petit nom pour le logement ?'
                                required
                            />
                        </div>
                        <div className={styles.inputs}>
                            <label htmlFor="accomodation-url" className={styles.label}>Url vers le logement</label>
                            <input
                                type="text"
                                id="accomodation-url"
                                className={styles.input}
                                value={accomodationURL}
                                onChange={(e) => setAccomodationURL(e.target.value)}
                                placeholder="Avec un lien c'est encore mieux !"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.middle}>
                    <div className={`${styles.inputsBudgetContainer} ${styles.rightSide}`}>
                        <div className={styles.inputDate}>
                            <label htmlFor="accomodation-departure-date" className={styles.label}>Date de début *</label>
                            <input
                                type="date"
                                id="accomodation-departure-date"
                                className={styles.input}
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputDate}>
                            <label htmlFor="accomodation-return-date" className={styles.label}>Date de fin *</label>
                            <input
                                type="date"
                                id="accomodation-return-date"
                                className={styles.input}
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={`${styles.inputsBudgetContainer} ${styles.rightSide}`}>
                        <div className={styles.inputsBudget}>
                            <label htmlFor="accomodation-budget" className={styles.label}>Budget:</label>
                            <input
                                type="number"
                                id="accomodation-budget"
                                className={styles.input}
                                value={accomodationBudget}
                                onChange={(e) => setAccomodationBudget(e.target.value)}
                                min="0"
                            />
                        </div>
                        <div className={styles.inputsBudget}>
                            <label htmlFor="accomodation-budget-single" className={styles.label}>Budget per person:</label>
                            <input
                                type="number"
                                id="accomodation-budget-single"
                                className={styles.input}
                                value={accomodationBudgetPerPerson}
                                onChange={(e) => setAccomodationBudgetPerPerson(e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div style={{minWidth: '350px'}}>
                        <label htmlFor="accomodation-location" className={styles.label}>Localisation</label>
                        {/* Kevin: input peut-être plus nécessaire, cf maquette (?)
                        <input
                            type="text"
                            id="accomodation-location"
                            value={accomodationLocation}
                            onChange={(e) => setAccomodationLocation(e.target.value)}
                            placeholder='Il se situe où ce logement ?'
                        />
                        */}
                        {/* Google map stuff */}
                        <Wrapper apiKey={"AIzaSyAtN3JpGGPLuZkaD7j2zoSB0vE3e_B-Jn8"} render={render}>
                            <GoogleMap style={{ width: '100%', height: '250px' }} center={center} zoom={zoom} position={position}>
                                <Marker position={position} />
                            </GoogleMap>
                        </Wrapper>
                        {/* end Google map stuff*/}
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.inputs}>
                            <label htmlFor="accomodation-description" className={styles.label}>Description du logement</label>
                            <textarea
                                id="accomodation-description"
                                className={styles.textarea}
                                value={accomodationDescription}
                                onChange={(e) => setAccomodationDescription(e.target.value)}
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
}