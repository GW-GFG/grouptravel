'use client'
import styles from './addAccomodation.module.css';
import { useState, useEffect } from 'react';

// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

export default function AddAccomodation() {

    const [accomodationName, setAccomodationName] = useState('')
    const [accomodationPicture, setAccomodationPicture] = useState('')
    const [accomodationURL, setAccomodationURL] = useState('')
    const [accomodationDate, setAccomodationDate] = useState('')
    const [accomodationBudget, setAccomodationBudget] = useState('')
    const [accomodationBudgetPerPerson, setAccomodationBudgetPerPerson] = useState('')
    const [accomodationLocation, setAccomodationLocation] = useState('')
    const [accomodationDescription, setAccomodationDescription] = useState('')

    const handleSubmit = () => {
        // new accomodationData object to be added
        const accomodationData = {
            name: accomodationName,
            picture: accomodationPicture,
            url: accomodationURL,
            date: accomodationDate,
            budget: accomodationBudget,
            location: accomodationLocation,
            description: accomodationDescription,
        }

        // TODO : REMOVE sampleId and replace with real ID
        const sampleId = '65e71a80a9a4730b5fe8da4e';

        fetch(`http://localhost:5500/accomodations/${sampleId}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accomodationData)
        })
        .then(response => response.json())
        .then(data => {
            if (!data) {
            console.log('Erreur');
            return
            }
            console.log('New accomodation added')
            setAccomodationName('');
            setAccomodationPicture('');
            setAccomodationURL('');
            setAccomodationBudget(null);
            setAccomodationDate('');
            setAccomodationLocation('');
            setAccomodationDescription('');
        })                                    
    }

    return <div className={styles.newAccomodation}>
        <h1 className={lexend.className}>Un logement à proposer ? </h1>
        <form onSubmit={() => handleSubmit()} className={styles.form}>
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
                            <label htmlFor="accomodation-name" className={styles.label}>Nom du logement</label>
                            <input
                                type="text"
                                id="accomodation-name"
                                className={styles.input}
                                value={accomodationName}
                                onChange={(e) => setAccomodationName(e.target.value)}
                                placeholder='Un petit nom pour le logement ?'
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
                    <div className={styles.input}>
                        <label htmlFor="accomodation-date" className={styles.label}>Sélectionnez la date:</label>
                        <input
                            type="date"
                            id="accomodation-date"
                            className={styles.input}
                            value={accomodationDate}
                            onChange={(e) => setAccomodationDate(e.target.value)}
                        />
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
                    <button type="submit" className={styles.button}>Soumettre</button>
                </div>
            </div>
            
        </form>
    </div>
}