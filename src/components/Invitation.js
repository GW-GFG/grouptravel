'use client'
import styles from './invitation.module.css';
import InputLabel from './InputLabel';
import Button from './utils/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Invitation() {
    
    const user = useSelector((state) => state.user.value);

    const [emails, setEmails] = useState(['']);
    const [errorNbImput, setErrorNbImput] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [erroMail, setErrorMail] = useState(false)

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
        for(let email of emails) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                setErrorMail(true);
                return; // Arrêter le traitement si un email est invalide
            }
            console.log(user.currentTrips)
            try {
                const response = await fetch(`http://localhost:5500/trips/adduser/${email}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: nameToSend, location : locationToSend, departureDate, returnDate, token: token }),
                });
                const data = await response.json();

                if(data.error) {
                    setErrorMsg(data.error);
                    return; // Arrêter le traitement si une erreur est retournée par le serveur
                }
            } catch (error) {
                console.error('Error sending email:', error);
                setErrorMsg('Error sending email. Please try again later.');
                return; // Arrêter le traitement en cas d'erreur réseau
            }
        }

        setConfirmMsg(true); // Définir le message de confirmation une fois tous les emails envoyés avec succès
        setEmails(['']); // Réinitialiser les emails après l'envoi
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
            </div>
            <Button  buttonClass="primary" text="+" onClick={() => handleAddImput()} />
            {errorNbImput && <div>Nombre d'email dépassés</div>}
            <div className={styles.ButtonContainer}>
                <Button buttonClass="primary" text="Envoyer invitation(s)" onClick={() => handleSendEmail()} />
            {confirmMsg && <div> Les invitations ont bien été envoyées</div>}
            </div>
        </div>
    )

}