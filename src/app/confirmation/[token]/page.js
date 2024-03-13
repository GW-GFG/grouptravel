'use client'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@/components/InputLabel';
import Button from '@/components/utils/Button';
import { addUserToStore } from "@/reducers/user";
 
export default function tokenPage( { params } ) {


  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [tripId, setTripId] = useState ('');
  const [passwordNotMatch, setPasswordNotMatch] = useState(null);
  const [emptyField, setEmptyField] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const token = params.token
  const router = useRouter();
  const dispatch = useDispatch();
  
    useEffect(() => { 
      // console.log(token)
      fetch('http://localhost:5500/users/getUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {token: token} )
      }).then(response => response.json())
      .then(data => {
        // console.log('data : ', JSON.stringify(data))
        if(!data.result || data.username != '' ) {
          router.push('/confirmation');
          return ;
        } else {
          setEmail(data.email)
          setTripId(data.myTrips[0])
        }
        
      })
    }, []);

    const handleAccept = () => {
      setPasswordNotMatch(false)
      setEmptyField(false)
      // console.log('click on handleAccept data to send', token + username + password);
      if (username === '' || password === '' || password2 === '') {
          setEmptyField(true);
          console.log('Champs vides');
          return; // Empêcher la soumission du formulaire si des champs sont vides
      } else if (password !== password2) {
          setPasswordNotMatch(true);
          setPassword('');
          setPassword2('');
          console.log('Mots de passe différents');
          return;// Empêcher le fetch du formulaire si des champs sont vides
      }
      setPasswordNotMatch(false);
      fetch('http://localhost:5500/users/updatenewuser', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data.updatedUser) 
          // if data result --> dispacth updatedUser send him to profile page.
          data.result && dispatch(addUserToStore({ token: data.updatedUser.token, username: data.updatedUser.username, userPicture: data.updatedUser.userPicture, email: data.updatedUser.email, myTrips: data.updatedUser.myTrips })) && setSubmitError(false);
          !data.result && setSubmitError(true);
          router.push('/profile')
        })
        .catch(error => console.error('Error updating user:', error));
    };
    // console.log(tripId)
    const handleDecline = () => {
      // console.log('trip id', tripId )
        fetch(`http://localhost:5500/decline/invitateduser/${tripId._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      }).then(response => response.json())
      .then(data => {
        // console.log(data)
        if(data)
        // console.log(data)
        router.push('/')
      })      
    }
  
    

  return ( 
  
    <div className={styles.mainContainer}> 
        <div className={styles.title}>Confirmation</div>         
        <InputLabel readOnly value={email} label="Email"/>
        <InputLabel type="text" onChange={(e) => setUsername(e.target.value)} value={username} label="Nom d'utilisateur(trice)*" placeholder="Choisi ton nom !" />
        <InputLabel type="password" onChange={(e) => setPassword(e.target.value)} value={password} label="Mot de passe*" placeholder="Ecris ton mot de passe ... " />
        <InputLabel type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} label="Confirmation*" placeholder="Confirme ton mot de passe ! " />
        
        <div className={styles.errorsContainer}>
            {passwordNotMatch && <p style={styles.error}>Les mots de passe renseignés sont différents !</p>}
            {emptyField && <p style={styles.error}>Veille a bien remplir tous les champs requis !</p>}
            {submitError && <p style={styles.error}> Une erreur est survenue !</p>}
        </div>
        <div className={styles.buttonsContainer}>

            <div className={styles.singleBtn} >
               <Button buttonClass="primary" text="Confirmer l'invitation" onClick={() => handleAccept()} />
            </div>
            <div className={styles.singleBtn} >
                <Button buttonClass="primary" text="Refuser l'invitation" onClick={() => handleDecline()} />
            </div>
        </div>
    </div> 
  
  )
}
