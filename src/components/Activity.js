'use client'
import styles from './Activity.module.css';
import { lexend } from '../app/fonts';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Card } from 'antd';
import Button from './utils/Button';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { participateToActivity } from '@/reducers/user';

const Activity = (props, i) => {

    const { name, location, date, picture, url, description, budget, participation, _id } = props
    const dispatch = useDispatch()
    const userToken = useSelector((state) => state.user.value.token)
    const currentTrip = useSelector((state) => state.user.value.currentTrip)
    const activity = currentTrip.activities.find(activity => activity._id === _id)

    const [userParticipationStatus, setUserParticipationStatus] = useState(getInitialParticipationStatus())

    function capitalizeFirstLetter(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const handleParticipate = (activityId) => {
        const participationData = {
            userToken,
            tripId: currentTrip._id,
            activityId,
            status: true
        }
        fetch('http://localhost:5500/activities/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participationData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Vote réussi', JSON.stringify(data))
                    setUserParticipationStatus(true)
                    dispatch(participateToActivity({ activityId: activityId, newStatus: data.newStatus }))
            })
    }

    const handleDontParticipate = (activityId) => {
        const participationData = {
            userToken,
            tripId: currentTrip._id,
            activityId,
            status: false
        }
        fetch('http://localhost:5500/activities/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participationData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Vote réussi', JSON.stringify(data))
                    setUserParticipationStatus(false)
                    dispatch(participateToActivity({ activityId, newStatus: data.newStatus }))
            })
    }

    function getInitialParticipationStatus() {
        if (activity) {
            const userParticipation = activity.participation && activity.participation.find(participationItem => participationItem.userToken === userToken)
            return userParticipation ? userParticipation.status : null
        }
        return null
    }

    const participationIconStyle = {
        check: userParticipationStatus === true ? { fontSize: '1.75rem', color: 'var(--primary-black-color)' } : { fontSize: '1.75rem' },
        cross: userParticipationStatus === false ? { fontSize: '1.75rem', color: 'var(--primary-black-color)' } : { fontSize: '1.75rem' }
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
                    src={`${picture || "next.svg"}`}
                    alt={name}
                    width={300}
                    height={200}
                />
            }
        >
            <h2 className={`${styles.cardTitle} ${lexend.className}`}>{capitalizeFirstLetter(name)}</h2>
            <p>Lieu: {location.name}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Description: {description}</p>
            <p>Budget: {budget}</p>
            <div className={styles.bottomCard}>
                <div className={styles.bottomCardVotes}>
                    <div className={styles.participation}>
                        <p>Je participe !</p>
                        <FontAwesomeIcon
                            style={participationIconStyle.check}
                            icon={faCircleCheck}
                            onClick={() => handleParticipate(_id)}
                        />
                    </div>
                    <div className={styles.participation}>
                        <p>Ouais bof...</p>
                        <FontAwesomeIcon
                            style={participationIconStyle.cross}
                            icon={faCircleXmark}
                            onClick={() => handleDontParticipate(_id)}
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
