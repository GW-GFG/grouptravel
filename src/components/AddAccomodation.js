'use client'
import styles from './addAccomodation.module.css';
import { useState, useEffect } from 'react';
import InputLabel from './InputLabel';
import Button from './utils/Button';

// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

export default function AddAccomodation() {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked');
        // check if url is valid 
        try {
            new URL(accomodationURL);   
        } catch (err) {
            setFormHasError(true);
            setErrorMessage("L'url saisie n'est pas valide");
            return false;
        }


        // new accomodationData object to be added
        // TODO : REMOVE sampleId and replace with real ID
        const sampleId = '65e853f30bff25fe16a3aafb';
        const accomodationData = {
            name: accomodationName,
            picture: accomodationPicture,
            url: accomodationURL,
            departureDate: departureDate,
            returnDate: returnDate,
            budget: accomodationBudget,
            location: accomodationLocation,
            description: accomodationDescription,
            tripId: sampleId
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
                    console.log(data.data);
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
                    <div>
                        <label htmlFor="accomodation-location" className={styles.label}>Localisation</label>
                        <input
                            type="text"
                            id="accomodation-location"
                            value={accomodationLocation}
                            onChange={(e) => setAccomodationLocation(e.target.value)}
                            placeholder='Il se situe où ce logement ?'
                        />
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