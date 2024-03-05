'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';

export default function SignIn() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const router = useRouter();

    const allUserTrip = [{
        name : "Barcelonne en Avril", 
        dates : { departure : Date, return: Date }, 
        admin : { _id: '65e6f61f574900bbbb8ed360' }, 
        members : [{ _id: '65e6f61f574900bbbb8ed360' }]
    }]

    function TripRow(props) {
        
        return(
            <div>
                <span className={styles.tripTitle}>{props.name}</span>
            </div>
        )
    }

    const trips = allUserTrip.map((data, i) => {
        return <p key={i} {...data} />;
      });
    
    
    
    if (!user.token) {
        return (
            <div className={styles.container}>
                <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
            </div>
        )
    } else {


        return(
            <div className={styles.container}>

            </div>
        );
    
    }


}