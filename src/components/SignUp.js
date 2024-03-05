'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from './signup.module.css';
import { addUserToStore } from '../reducers/user';

export default function SignUp() {
    const dispatch = useDispatch();
//import user data from reducer to verify if is connected
    const user = useSelector((state) => state.user.value);
    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//if is connected rout => Profil
    if (user.token) {
        router.push('/profile');
    }

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordNotMatch, setPasswordNotMatch] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    const handleSubmit = () => {
//step to verify that email have email format        
        if (emailRegex.test(email)){
            setEmailError(false);
//step to verify that passwords are the same
            if (password === password2) {
                // setPasswordNotMatch(false);
                fetch('http://localhost:5500/users/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
//The body request contains the useStates values
                    body: JSON.stringify({ email, username, password }),
                }).then(response => response.json())
                .then(data => {
                    console.log('Front data : '+ JSON.stringify(data))
                    const {token, myTrips, userPicture } = data; 
                    data.result && dispatch(addUserToStore({ token, username: data.username, userPicture, email: data.email, myTrips })) && setSubmitError(false);
                    !data.result && setSubmitError(true);
                })
            } else {
                setPasswordNotMatch(true)
            }
        } else {
            setEmailError(true)
        }
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>On se rencontre ? Inscris-toi !</h3>
            <input type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Entre ton email ici !" />
            <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Choisi ton nom !" />
            <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Ecris ton mot de passe ... " />
            <input type="password" className={styles.input} onChange={(e) => setPassword2(e.target.value)} value={password2} placeholder="Confirme ton mot de passe ! " />
            {passwordNotMatch && <p style={styles.error}>Les mots de passes sont différents</p>}
            {emailError && <p style={styles.error}>Entre une adresse email valide !</p>}
            {submitError && <p style={styles.error}>Il semble y avoir une erreur, vérifie les champs saisis !</p>}
            <button className={styles.button} onClick={() => handleSubmit()}>C'est parti !</button>
        </div>
    )



};