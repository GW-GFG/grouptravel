'use client'
import styles from './Activity.module.css';
import { lexend } from '../app/fonts';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import Button from './utils/Button';
import Link from 'next/link';
import Image from 'next/image';
import MissingInfos from './missingInfos/MissingInfos';

const Activity = () => {

    const currentTrip = useSelector((state) => state.user.value.currentTrip);

    if (currentTrip && currentTrip.activities.length > 0) {
    
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
        return <MissingInfos title='Activités' text="d'activité proposée" />
    }
}

export default Activity
