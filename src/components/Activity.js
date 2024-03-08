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
    const { name, location, date, picture, url, description, budget, participation, _id } = props;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
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
                                        style={{ fontSize: '1.75rem', cursor: 'pointer' }} 
                                        icon={faCircleCheck} 
                                    />
                                </div>
                                <div className={styles.participation}>
                                    <p>Ouais bof...</p>
                                    <FontAwesomeIcon 
                                        style={{ fontSize: '1.75rem', cursor: 'pointer' }} 
                                        icon={faCircleXmark} 
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
