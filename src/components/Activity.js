'use client'
import styles from './Activity.module.css';
import { lexend } from '../app/fonts';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import Button from './utils/Button';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Activity = (props, i) => {

    //const currentTrip = useSelector((state) => state.user.value.currentTrip);
    const { name, location, date, picture, url, description, budget, participation, _id } = props
    const userToken = useSelector((state) => state.user.value.token)
    const currentTrip = useSelector((state) => state.user.value.currentTrip)

    function capitalizeFirstLetter(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    // const userVote = participation.find(vote => vote.userToken === userToken)
    // const isParticipating = userVote ? userVote.status : null;

    const handleParticipate = (participate) => {
        const activityId = _id

        const voteData = {
            userToken,
            tripId: currentTrip._id,
            activityId,
            status: participate
        }

        fetch('http://localhost:5500/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(voteData)
        })
            .then(response => response.json())
            .then(data => {
                if (!data.result) {
                    console.error('Erreur de vote', data.message)
                    return
                }
                if (data.result) {
                    console.log('Vote réussi', data)
                }
            })
    }

    //if (currentTrip && currentTrip.activities.length > 0) {

    return (
        //<div className={styles.container}>
        //<h1 className={`${styles.title} ${lexend.className}`}>Mes activités</h1>
        //{currentTrip.activities.map((activity, i) => (
        <Card
            key={i}
            className={styles.card}
            cover={
                <Image
                    src='https://www.science.org/do/10.1126/science.aat9808/abs/cc_A5E67C_copy.jpg'
                    alt={name}
                    width={300}
                    height={200}
                />
            }
        >
            <h2 className={`${styles.cardTitle} ${lexend.className}`}>{capitalizeFirstLetter(name)}</h2>
            <p>Lieu: {location}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Description: {description}</p>
            <p>Budget: {budget}</p>
            <div className={styles.bottomCard}>
                <div className={styles.bottomCardVotes}>
                    <div className={styles.participation}>
                        <p>Je participe !</p>
                        <FontAwesomeIcon
                            style={{
                                fontSize: '1.75rem',
                                cursor: 'pointer',
                                // color: isParticipating === true ? 'green' : 'grey'
                            }}
                            icon={faCircleCheck}
                            onClick={() => handleParticipate(true)}
                        />
                    </div>
                    <div className={styles.participation}>
                        <p>Ouais bof...</p>
                        <FontAwesomeIcon
                            style={{
                                fontSize: '1.75rem',
                                cursor: 'pointer',
                                // color: isParticipating === true ? 'red' : 'grey'
                            }}
                            icon={faCircleXmark}
                            onClick={() => handleParticipate(false)}
                        />
                    </div>
                </div>
                <div className={styles.button}>
                    <Link href=''>
                        <Button type="text" buttonClass="primary" text="En savoir plus" />
                    </Link>
                </div>
            </div>
        </Card>
        //))}
        //</div>
    )
    //}
}

export default Activity
