'use client'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@/components/InputLabel';
import Button from '@/components/utils/Button';
 
export default function tokenPage( { params } ) {

  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordNotMatch, setPasswordNotMatch] = useState(null);
  const [emailError, setEmailError] = useState(null);
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
        setEmail(data.user.email)
      })
    }, []);
    //  fetch('http://localhost:5500/confirmation/T03V7khXJS8xh4A_BI7tmYDlCwGe6-Uu')

  return ( 
  
    <div className={styles.mainContainer}> confirmation 
         
        <InputLabel type="text" onChange={(e) => setEmail(e.target.value)} value={email} label="Email"/>
        <InputLabel type="text" onChange={(e) => setUsername(e.target.value)} value={username} label="Nom d'utilisateur(trice)" placeholder="Choisi ton nom !" />
        <InputLabel type="password" onChange={(e) => setPassword(e.target.value)} value={password} label="Mot de passe" placeholder="Ecris ton mot de passe ... " />
        <InputLabel type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} label="Confirmation" placeholder="Confirme ton mot de passe ! " />
        
        <div className={styles.ButtonsContainer}>
            <div className={styles.singleBtn} >
               <Button buttonClass="primary" text="Envoyer invitation(s)" onClick={() => handleAccept()} />
            </div>
            <div className={styles.singleBtn} >
                <Button buttonClass="primary" text="Refuser l'invitation" onClick={() => handleDecline()} />
            </div>
        </div>
    </div> 
  
  )
}
