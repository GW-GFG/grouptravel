'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from './signin.module.css';
import { addUserToStore } from '../reducers/user';
import { lexend } from '../app/fonts';
import InputLabel from './InputLabel';

export default function SignIn({ handleConnexion }) {
    const dispatch = useDispatch();
//import user data from reducer to verify if is connected
    const user = useSelector((state) => state.user.value);
    const router = useRouter();
//if is connected rout => Profil
    // if (user.token) {
    //     router.push('/profile');
    // }
    useEffect(() => { // Utilisation d'un useEffect pour gérer la redirection
        if (user.token) {
            router.push('/profile');
        }
    }, [user.token, router])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emtyfield, setEmptyField] = useState(null);
    const [signinError, setSigninError] = useState(null);

    const handleSubmit = () => {
//check if there is an email and password
        if (email !== '' && password !== ''){
            setEmptyField(false)
            fetch('http://localhost:5500/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
//The body request contains the useStates values
                body: JSON.stringify({ email, password }),
            }).then(response => response.json())
            .then(data => {
                const {token, username, myTrips, userPicture } = data; 
                data.result && dispatch(addUserToStore({ token, username, userPicture, email: data.email, myTrips }));
                !data.result && setSigninError(true);
                data.result && handleConnexion();
            })
        } else {
            setEmptyField(true);
        }
    }

    return (
        <div className={styles.container}>
            <h3 className={`${styles.title} ${lexend.className}`}>On se connait déjà ? Connecte-toi !</h3>
            <InputLabel type="text" onChange={(e) => setEmail(e.target.value)} value={email} label="Email" placeholder="Entre ton email ici !" />
            <InputLabel type="password" onChange={(e) => setPassword(e.target.value)} value={password} label="Mot de passe" placeholder="Et ton mot de passe ici !" />
            {emtyfield && <p style={styles.error}>Entre ton email et ton mot de passe !</p>}
            {signinError && <p style={styles.error}>Il semble y avoir une erreur, vérifie ton email et ton mot de passe !</p>}
            <button className={styles.button} onClick={() => handleSubmit()}>C'est parti !</button>
        </div>
    )




    };
