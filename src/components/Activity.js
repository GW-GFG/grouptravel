'use client'
import styles from './Activity.module.css'
import { useSelector } from 'react-redux'
import { Card } from 'antd'
import Button from './utils/Button'

const Activity = (props) => {
    const currentTrip = useSelector((state) => state.user.value.currentTrip)
    const { name, place, date, picture, url, description, budget, participation } = props

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mes activités</h1>
            {currentTrip.activities.map((activity, i) => (
                <Card
                    key={i}
                    className={styles.card}
                    hoverable={true}
                >
                    <h2 className={styles.cardTitle}>{activity.name}</h2>
                    <p>Lieu: {activity.place}</p>
                    <p>Date: {activity.date}</p>
                    <p>Description: {activity.description}</p>
                    <p>Budget: {activity.budget}</p>
                    <Button />
                </Card>
            ))}
        </div>
    )
}

export default Activity
