'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from './signin.module.css';
import { addUserToStore } from '../reducers/user';

export default function SignIn() {
    const dispatch = useDispatch();
//import user data from reducer to verify if is connected
    const user = useSelector((state) => state.user.value);
    const router = useRouter();
//if is connected rout => Profil
    if (user.token) {
        router.push('/profile');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log(email, password)
        fetch('http://localhost:5500/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(response => response.json())
        .then(data => {
            console.log('data : '+ JSON.stringify(data))
            const {token, username, myTrips, userPicture } = data; 
            data.result && dispatch(addUserToStore({ token, username, userPicture, email: data.email, myTrips }));
            
        })
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>On se connait déjà ? Connecte-toi !</h3>
            <input type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Entre ton email ici !" />
            <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Et ton mot de passe ici !" />
            <button className={styles.button} onClick={() => handleSubmit()}>C'est parti !</button>
        </div>
    )




    };
