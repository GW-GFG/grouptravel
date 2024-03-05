'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import styles from './creatTrip.module.css';
import {updateMyTrips} from '../reducers/user';
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

    // const token = user.token
    const token = '5O6w1fh0P0QUEXPxHa7ruV_NigpCzbs_'
    

    const handleSubmit = () => {
        fetch('http://localhost:5500/trips/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: groupName, location, departureDate, returnDate, token: token }),
        }).then(response => response.json())
            .then(data => {
            console.log('data : '+ JSON.stringify(data))
            // If data.error > error.msg
            if(data.error) {
               console.log(data.error)
                setErrorMsg(data.error)
            }
            else {
            dispatch(updateMyTrips(data.newTrip.id))
            router.push('/dashboard')
            }
            // 
        });

    }

    return (
        <div className={styles.container}>
            <h3 className={`${styles.title} ${lexend.className}`}>Planification de votre voyage entre amis !</h3>
                <div className={styles.inputTextContainer}>
                    <h5>Défini le nom de ton groupe :</h5>
                    <input type="text" className={styles.input} onChange={(e) => setgroupName(e.target.value)} value={groupName} placeholder="Entre le nom de ton Group !" />
                </div>
                <div className={styles.inputTextContainer}>
                    <h5>Précise la destination :</h5>
                    <input type="text" className={styles.input} onChange={(e) => setLocation(e.target.value)} value={location} placeholder="Et votre destination !" />
                </div>
            
            <div className={styles.dateContainers}>
                <h5 className={styles.inputTextContainer}>Vous partez quand ?</h5>    
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
            
                {errorMsg != '' && <h2 className={styles.error}>{errorMsg}</h2>}
            
            <button className={styles.button} onClick={() => handleSubmit()}>Go!</button>
            
        </div>
    )
}