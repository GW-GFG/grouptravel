'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from './creatTrip.module.css'

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
            <h3 className={styles.title}>Planification de votre voyage entre amis !</h3>
            <input type="text" className={styles.input} onChange={(e) => setgroupName(e.target.value)} value={groupName} placeholder="Entre le nom de ton Group !" />
            <input type="text" className={styles.input} onChange={(e) => setLocation(e.target.value)} value={location} placeholder="Et votre destination !" />
            <div className={styles.inputContainers}>    
                <input
                    type="date"
                    id="departureDate"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                />
                <input
                    type="date"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
            </div>
            
                {errorMsg != '' && <h2>{errorMsg}</h2>}

            <button className={styles.button} onClick={() => handleSubmit()}>Go!</button>
        </div>
    )
}