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
  const [passwordNotMatch, setPasswordNotMatch] = useState(null);
  const [emptyField, setEmptyField] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const token = params.token
  const router = useRouter();
  const dispatch = useDispatch();
  
    useEffect(() => { 
      console.log(token)
      fetch('http://localhost:5500/users/getUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {token: token} )
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        if(!data.result) {
          router.push('/confirmation');
          return ;
        } else {
          setEmail(data.user.email)
        }
        
      })
    }, []);

    const handleAccept = () => {
      setPasswordNotMatch(false)
      setEmptyField(false)
      console.log('click on handleAccept data to send', token + username + password);
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
        .then(data => {console.log(data)
          data.result && dispatch(addUserToStore({ user: data.token, username: data.username, userPicture: data.userPicture, email: data.email, myTrips: data.myTrips })) && setSubmitError(false);
          !data.result && setSubmitError(true);
          router.push('/profile')
        })
        .catch(error => console.error('Error updating user:', error));
    };

    const handleDecline = () => {
      
    }
  
    

  return ( 
  
    <div className={styles.mainContainer}> Confirmation 
         
        <InputLabel readOnly value={email} label="Email"/>
        <InputLabel type="text" onChange={(e) => setUsername(e.target.value)} value={username} label="Nom d'utilisateur(trice)*" placeholder="Choisi ton nom !" />
        <InputLabel type="password" onChange={(e) => setPassword(e.target.value)} value={password} label="Mot de passe*" placeholder="Ecris ton mot de passe ... " />
        <InputLabel type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} label="Confirmation*" placeholder="Confirme ton mot de passe ! " />
        
        <div className={styles.errorsContainer}>
            {passwordNotMatch && <p style={styles.error}>Les mots de passe renseignés sont différents !</p>}
            {emptyField && <p style={styles.error}>Veille a bien remplir tous les champs requis !</p>}
            {submitError && <p style={styles.error}> Une erreur est survenue !</p>}
        </div>
        <div className={styles.ButtonsContainer}>

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
