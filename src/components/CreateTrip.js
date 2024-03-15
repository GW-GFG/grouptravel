'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd'
import InputLabel from './InputLabel';
import styles from './creatTrip.module.css';
import { updateCurrentTrip, updateMyTrips } from '@/reducers/user';
// import fonts to use them for menu items
import { lexend } from '../app/fonts';

export default function CreateTrip() {
    const user = useSelector((state) => state.user.value);
    const router = useRouter();
    const dispatch = useDispatch();

    const [groupName, setgroupName] = useState('');
    const [location, setLocation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const token = user.token


    const handleSubmit = () => {
        if (!location || !groupName || !departureDate || !returnDate) {
            notification.warning({
                message: 'Attention !',
                description: 'Merci de remplir tous les champs.',
                placement: 'bottomRight'
            })
            return
        }
        // Google map input logic
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAtN3JpGGPLuZkaD7j2zoSB0vE3e_B-Jn8&address=${location}`)
            .then(response => response.json()).then(data => {
                if (data && data.results[0]) {
                    const coordinates = data.results[0].geometry.location;
                    // Unbreakable form
                    const locationToSend = {
                        name: location[0].toUpperCase() + location.slice(1).toLowerCase(),
                        lat: coordinates.lat,
                        lng: coordinates.lng,
                    }
                    console.log(locationToSend)
                    const nameToSend = groupName[0].toUpperCase() + groupName.slice(1).toLowerCase()
                    // fetch for add new trip in DDB
                    fetch('http://localhost:5500/trips/new', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: nameToSend, location: locationToSend, departureDate, returnDate, token: token }),
                    }).then(response => response.json())
                        .then(data => {
                            // If data.error send error.msg to front
                            console.log('verif data avant if : ', data)
                            if (!data.result) {
                                setErrorMsg(data.error)
                                notification.warning({
                                    message: 'Attention !',
                                    description: errorMsg,
                                    placement: 'bottomRight'
                                })
                            } else {
                                // If no error > update reducer in redux
                                dispatch(updateMyTrips(data.newTrip));
                                dispatch(updateCurrentTrip(data.newTrip));
                                // rerouting user to dashboard of new trip
                                router.push('/');                               
                                // notification.success({
                                //     message: 'Voyage créé !',
                                //     description: 'Votre voyage a bien été créé !',
                                //     placement: 'bottomRight'
                                // })
                                                               
                            }
                        });
                } else {
                    notification.warning({
                        message: 'Localisation non trouvée',
                        description: "L'adresse saisie n'a pas pu être trouvée. Veuillez essayer avec une autre adresse.",
                        placement: 'bottomRight',
                    })
                }
            });
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.logo} ${lexend.className}`}>GROUPTRAVEL</div>
            <h3 className={`${styles.title} ${lexend.className}`}>Planification de votre voyage entre amis !</h3>
                <div className={styles.inputTextContainer}>
                    <h4 className={styles.h4}>Définis le nom de ton groupe :</h4>
                    <InputLabel style={{width: "60%"}} type="text" onChange={(e) => setgroupName(e.target.value)} value={groupName} label="Nom du groupe" placeholder="Entre le nom de ton Groupe !" />
                </div>
                <div className={styles.inputTextContainer}>
                    <h4 className={styles.h4}>Précise la destination :</h4>
                    <InputLabel type="text" onChange={(e) => setLocation(e.target.value)} value={location} label="Destination" placeholder="Et votre destination !" />
                </div>
                <h4 className={styles.inputTextContainer}>Vous partez quand ?</h4>
            
            <div className={styles.dateContainers}>
                <div className={styles.dateRow}>
                    <div className={styles.inputDateContainer}>
                        <h5 className={styles.textDate}>Date de départ :</h5>
                        <input className={styles.inputDate}
                            type="date"
                            id="departureDate"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputDateContainer}>
                        <h5 className={styles.textDate}>Date de retour :</h5>
                        <input className={styles.inputDate}
                            type="date"
                            id="returnDate"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>

                </div>
                {/* only if error display error */}
                {/* {errorMsg != '' && <h2 className={styles.error}>{errorMsg}</h2>} */}
                <button className={styles.button} onClick={() => handleSubmit()}>Go!</button>
            </div>
        </div>


    )
}