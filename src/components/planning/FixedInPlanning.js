'use client'
import styles from './fixedInPlanning.module.css';
import Image from 'next/image';

export default function FixedInPlanning(props) {


    const toBecomeHour = (new Date(props.date)).getDate();

    return (
        <div className={styles.activityContainer}>
            <h2 className={styles.headings}>{props.name}</h2>
            <div className={styles.imgContainer}>
                <Image fill={true} src={props.picture} alt={props.name} />
            </div>
            <div className={styles.basicInfo}>
                <p>
                    Heure: {toBecomeHour}
                </p>
                <p>
                    Prix: {props.budget}
                </p>
            </div>

        </div>
    )
}