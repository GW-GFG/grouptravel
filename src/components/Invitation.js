'use client'
import styles from './invitation.module.css';
import InputLabel from './InputLabel';
import Button from './utils/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Invitation() {
    
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip)
    // console.log(user)
    // console.log(currentTrip)
    const [emails, setEmails] = useState(['']);
    const [errorNbImput, setErrorNbImput] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [erroMail, setErrorMail] = useState(false)
    const [emptyField, setEmptyField] = useState(false)

    const handleAddImput = () => {

        if (emails.length < 6) {
            setEmails([...emails, '']); // Add a new empty email input
        } else {
            setErrorNbImput(true); // set msg error nbImput true
        }    
    }

    const handleEmailChange = (email, index) => {
        const newEmails = [...emails];
        newEmails[index] = email;
        setEmails(newEmails);
    };

    const handleSendEmail = async () => {

        // console.log(currentTrip._id)

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const validEmails = emails.filter(email => email && emailRegex.test(email));
        // console.log(validEmails)
    if (validEmails.length === 0) {
        setEmptyField(true); // Aucune adresse e-mail valide n'est saisie
        return;
    }

    try {
        for (let email of validEmails) {
            const response = await fetch(`http://localhost:5500/trips/addnewuser/${user.currentTrip._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }), // Envoyer l'email valide au back pour chaque email valide
        });

        const data = await response.json();

        if (data.error) {
            setErrorMsg(data.error); // Afficher un message d'erreur si nécessaire
            return;
        }       
        }
        setConfirmMsg(true); // Afficher le message de confirmation une fois les e-mails envoyés
        setEmails(['']); // Réinitialiser les e-mails après l'envoi réussi
        setEmptyField(false)
    } catch (error) {
        // console.error('Error sending emails:', error);
        setErrorMsg('Error sending emails. Please try again later.');
    }
};

    

    return (
        <div className={styles.mainContainer}>
            <div className={styles.inputContainer}>
                {emails.map((email, index) => (
                    <InputLabel
                        key={index}
                        type="text"
                        onChange={(e) => handleEmailChange(e.target.value, index)}
                        value={email}
                        label={`Email ${index + 1}`}
                        placeholder="Entre l'email à inviter!"
                        style={{ width: "110%" }}
                    />
                ))}
                { emptyField && <div className={styles.text}>Merci de renseigner une adresse e-mail valide </div> }
            </div>
            <Button  buttonClass="primary" text="+" onClick={() => handleAddImput()} />
            {errorNbImput && <div className={styles.text}>Nombre d'email dépassé</div>}
            <div className={styles.ButtonContainer}>
                <Button buttonClass="primary" text="Envoyer invitation(s)" onClick={() => handleSendEmail()} />
            </div>
            {confirmMsg && emails.length === 1 && <div className={styles.text}> L'invitation a bien été envoyée</div>}
            {confirmMsg && emails.length > 1 && <div className={styles.text}> Les invitations ont bien été envoyées</div>}
        </div>
    )

}