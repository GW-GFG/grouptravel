'use client'
import styles from "./page.module.css";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@/components/InputLabel';
import Button from '@/components/utils/Button';
import { addUserToStore, updateMyTrips, updateCurrentTrip } from "@/reducers/user";

export default function tokenwithTripsIdPage() {


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [tripName, setTripName] = useState('');
    const [currentTrip, setCurrentTrip] = useState('');
    const [submitError, setSubmitError] = useState(null);
    // const [idMember, setIdMember] = useState('');
    
    const router = useRouter();
    const dispatch = useDispatch();
    const params = useParams();
    const token = params.token
    const tripId = params.tripId
    const user = useSelector((state) => state.user.value);

    useEffect(() => { 
        // console.log(token)
        //** Fetch BDD pour récepurer donnée user*//
        fetch('http://localhost:5500/users/getUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {token: token} )
        }).then(response => response.json())
        .then(userdata => {
        //Si pas de donnée orienter user vers home
          if(!userdata.result) {
        // TODO Rajouter condition pour que si user déjà dans Trip redirection vers Confirmation.
            router.push('/confirmation');
            return ;
          } else {
        //Si donnée ok récuperer infos pour personnaliser page
            setEmail(userdata.email)
            setUsername(userdata.username)
        // dispacth userdata dans reducer
         dispatch(addUserToStore({ token, username: userdata.username, userPicture: userdata.userPicture, email, myTrips: userdata.myTrips }))    
          }
        });
        //** Fetch BDD pour récepurer donnée Trips*//
        // console.log(params.tripId)
        fetch('http://localhost:5500/trips/onetrip',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {tripId: params.tripId} )
        }).then(response => response.json())
        .then(oneTripData => {
          // console.log('Onetripdata', oneTripData)
          // || data.tripData.members.includes(idMember)
          if(!oneTripData.result) {
            console.log('no data result')
            router.push('/confirmation');
            return ;
        } if (oneTripData.result) {
            // console.log(data.tripData.members)
            setTripName(oneTripData.tripData.name);
        }
            
        })
        
      }, []);

    

    const handleAccept = () => {
        fetch(`http://localhost:5500/trips/adduser/${tripId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          // console.log(data.trip)
           
          // if data result -->  send him to profile page.
          dispatch(updateCurrentTrip(data.trip))
          // dispatch(updateMyTrips(data.trip))
          !data.result && setSubmitError(true);
          router.push('/')
        })
        .catch(error => console.error('Error updating user:', error));
    }

    const handleDecline = () => {
        // console.log('click decline')
        fetch(`http://localhost:5500/decline/invitation/${tripId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      }).then(response => response.json())
      .then(data => {
        if(data)
        router.push('/profile')
      })
    }

    return (
        <div className={styles.mainContainer}> 
            <div className={styles.title}>Confirmation</div>
            <div className={styles.textContainer}>
               <div className={styles.text}>Ravis de te revoir,</div> 
               { username && <div className={styles.textUsername}>{username}</div>}
               <div className={styles.text}>Bonne nouvelle ! </div> 
               <div className={styles.text}>Tu es invité à rejoindre le groupe :</div>
               { tripName && <div className={styles.textTripName}>{tripName}</div>}
               <div className={styles.text}> pour un nouveau voyage ! </div>  
            </div>
            
            <div className={styles.btnContainer}>
           
               <Button 
               text="Confirmer l'invitation" 
               onClick={() => handleAccept()}
               className={styles.accepBtn}
               />
                <Button buttonClass="primary"  text="Refuser l'invitation" onClick={() => handleDecline()} className={styles.declineBtn}/>
           
            </div>  
        </div>
        )
}