"use client"
import styles from "./accommodation.module.css";
import { lexend } from "../app/fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./utils/Button";
import Link from "next/link";
import Image from 'next/image';
import { useSelector } from "react-redux";
import MissingInfos from './missingInfos/MissingInfos';


export default function Accommodation() {
    
    const userToken = useSelector((state) => state.user.value.token)
    const currentTrip = useSelector((state) => state.user.value.currentTrip);
    if (currentTrip && currentTrip.accomodations.length > 0) { 
        const defaultPicture = "https://media.istockphoto.com/id/1145422105/fr/photo/vue-a%C3%A9rienne…";



        const handleDo = (accomodationId) => {

            const voteData = {
                userToken,
                accomodationId,
                tripId: currentTrip,
                status: true,
            }

            console.log('click id puis vote'+ JSON.stringify(voteData))
            fetch('http://localhost:5500/accomodations/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( voteData )
            }).then(response => response.json())
            .then(voteRes => {
                console.log(voteRes)
            })
            
            
        }

        const handleDont = (accomodationId) => {
            const voteData = {
                userToken,
                accomodationId,
                tripId: currentTrip,
                status: false,
            }

            console.log('click id puis vote'+ JSON.stringify(voteData))
            fetch('http://localhost:5500/accomodations/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( voteData )
            }).then(response => response.json())
            .then(voteRes => {
                console.log(voteRes)
            })

            
        }
        
        return(
            <div className={styles.containerTest}>
                <h1 className={`${styles.title} ${lexend.className}`}>Mes logements</h1>
                {currentTrip.accomodations.map((data, i) => {
                            
                    return (
                    <div key={i} className={styles.container}>
                        <h3 className={`${styles.cardTitle} ${lexend.className}`}>{data.name}</h3>
                        <div className={styles.cardBody}>
                            <div className={styles.leftContainer}>
                                <div className={styles.leftColumn}>
                                    <Image width={300} height={200} className={styles.imgContainer} src={`${data.photos[0] || "next.svg"}`} alt="My Trip Picture" />   
                                    <p>Budget par personne : {data.budget}</p>
                                </div>

                                <div className={styles.middleColumn}>
                                    <div>
                                    <p className={styles.date}>Du : {new Date(data.dates.departure).toLocaleDateString()} Au : {new Date(data.dates.return).toLocaleDateString()}</p>
                                    <p className={styles.location}>Localisation : {data.location}</p>
                                    </div>
                                    <div>
                                    <p className={styles.miniTitles}>Descriptif du logement :</p>
                                    <p className={styles.description}>{data.description}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.rightContainer}>
                                <div className={styles.voteIcons}>
                                <FontAwesomeIcon style={{fontSize: '1.75rem'}} icon={faCircleCheck} onClick={(e) => handleDo(data._id)} />
                                <FontAwesomeIcon style={{fontSize: '1.75rem'}} icon={faCircleXmark} onClick={() => handleDont(data._id)}  />
                                </div>
                            <Link href={data.url} target="_blank"><Button type="text" buttonClass="primary" text="En savoir plus" /></Link>
                            </div>
                        </div>
                    </div>

                )})}
        </div>
        )
    } else {
        return <MissingInfos />
    }   
}