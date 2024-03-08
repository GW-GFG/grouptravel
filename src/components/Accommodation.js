"use client"
import styles from "./accommodation.module.css";
import { lexend } from "../app/fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./utils/Button";
import Link from "next/link";
import Image from 'next/image';
import { useSelector } from "react-redux";


export default function Accommodation(props, i) {

    //const currentTrip = useSelector((state) => state.user.value.currentTrip);
    const { name, location, dates, photos, url, description, budget, vote, _id } = props;
    
    const userToken = useSelector((state) => state.user.value.token)
        const defaultPicture = "https://media.istockphoto.com/id/1145422105/fr/photo/vue-a%C3%A9rienne…";
        const handleDo = (accomodationId) => {

            // changer voteData, sorry Gwen j'ai tout cassé
            const voteData = {
                userToken,
                accomodationId,
                tripId: _id,
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
                tripId: _id,
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
            <div key={i} className={styles.container}>
                <h3 className={`${styles.cardTitle} ${lexend.className}`}>{name}</h3>
                <div className={styles.cardBody}>
                    <div className={styles.leftContainer}>
                        <div className={styles.leftColumn}>
                            <Image width={300} height={200} className={styles.imgContainer} src={`${photos[0] || "next.svg"}`} alt="My Trip Picture" />   
                            <p>Budget par personne : {budget}</p>
                        </div>

                        <div className={styles.middleColumn}>
                            <div>
                            <p className={styles.date}>Du : {new Date(dates.departure).toLocaleDateString()} Au : {new Date(dates.return).toLocaleDateString()}</p>
                            <p className={styles.location}>Localisation : {location}</p>
                            </div>
                            <div>
                            <p className={styles.miniTitles}>Descriptif du logement :</p>
                            <p className={styles.description}>{description}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.rightContainer}>
                        <div className={styles.voteIcons}>
                        <FontAwesomeIcon style={{fontSize: '1.75rem'}} icon={faCircleCheck} onClick={(e) => handleDo(_id)} />
                        <FontAwesomeIcon style={{fontSize: '1.75rem'}} icon={faCircleXmark} onClick={(e) => handleDont(_id)}  />
                        </div>
                    <Link href={url} target="_blank"><Button type="text" buttonClass="primary" text="En savoir plus" /></Link>
                    </div>
                </div>
            </div>
        ) 
}