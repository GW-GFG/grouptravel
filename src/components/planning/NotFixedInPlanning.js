'use client'
import styles from './fixedInPlanning.module.css';
import Image from 'next/image';
import Button from '../utils/Button';

export default function NotFixedInPlanning(props) {
    
    const handleClick = () => {
        props.handleClick(props);
        props.handleHasChanged();
    };

    return (
        <div className={styles.activityContainer}>
            <h2 className={styles.headings}>{props.name}</h2>
            <div className={styles.imgContainer}>
                <Image fill={true} src={props.picture} alt={props.name} />
            </div>
            <div className={styles.basicInfo}>
                <p>
                    Votes pour: {props.participation.length}
                </p>
                <p>
                    Prix: {props.budget}
                </p>
            </div>
            {props.isAdmin && <Button type="text" style={{ width: '80%', margin: 'auto' }} text="Ajouter l'activité" onClick={() => handleClick()} />}

        </div>
    )
}