'use client'
import styles from './Activity.module.css'
import { lexend } from '../app/fonts'
import { useSelector } from 'react-redux'
import { Card } from 'antd'
import Button from './utils/Button'
import Link from 'next/link'
import Image from 'next/image'

const Activity = () => {

    const user = useSelector((state) => state.user.value)
    const currentTrip = useSelector((state) => state.user.value.currentTrip)

    if (!user.token) {
        return (
          <div className={`${styles.container} ${lexend.className}`}>
            <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
          </div>
        );
    } else if (currentTrip && currentTrip.activities) {

    
    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} ${lexend.className}`}>Mes activités</h1>
            {currentTrip.activities.map((activity, i) => (
                <Card
                    key={i}
                    className={styles.card}
                    hoverable
                    cover={
                        <Image
                            src='https://www.science.org/do/10.1126/science.aat9808/abs/cc_A5E67C_copy.jpg'
                            alt={activity.name}
                            width={300}
                            height={200}
                        />
                    }
                >
                    <h2 className={`${styles.cardTitle} ${lexend.className}`}>{activity.name}</h2>
                    <p>Lieu: {activity.place}</p>
                    <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                    <p>Description: {activity.description}</p>
                    <p>Budget: {activity.budget}</p>
                    <div className={styles.button}>
                        <Link href='' target="_blank">
                            <Button type="text" buttonClass="primary" text="En savoir plus" />
                        </Link>
                    </div>
                </Card>
            ))}
        </div>
    ) 
    } else { 
        return (
        <>
        <h1 className={`${styles.activitiesTitle} ${lexend.className}`}>Activités</h1>
        <div className={styles.activitiesContainer}>
        <p>Il semblerait qu'il n'y a pas encore d'activité proposée pour ce voyage !</p>
        </div>
        </>
        
        )
        
    }
}

export default Activity
