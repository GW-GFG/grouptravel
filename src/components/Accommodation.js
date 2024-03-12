"use client"
import styles from "./accommodation.module.css";
import { lexend } from "../app/fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./utils/Button";
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { voteToAccommodation } from "@/reducers/user";



export default function Accommodation(props) {
    const { name, location, dates, photos, url, description, budget, vote, _id } = props;   
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.user.value.token)
    const currentTrip = useSelector((state) => state.user.value.currentTrip);
    //To keep vote updated
    const accommodation = currentTrip.accomodations.find(accommodation => accommodation._id === _id);
  
    const [userVoteStatus, setUserVoteStatus] = useState(getInitialVoteStatus());

    
        
        const handleDo = (accomodationId) => {

            const voteData = {
                userToken,
                accomodationId,
                tripId: currentTrip._id,
                status: true,
            }
            
            fetch('http://localhost:5500/accomodations/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( voteData )
            }).then(response => response.json())
            .then(voteRes => {
                console.log('reponse vote : ' + JSON.stringify(voteRes))
                setUserVoteStatus(true);
                dispatch(voteToAccommodation({ accommodationId: accomodationId, newStatus: voteRes.newStatus  }));
            })    
        }

        const handleDont = (accomodationId) => {
            const voteData = {
                userToken,
                accomodationId,
                tripId: currentTrip._id,
                status: false,
            }

            fetch('http://localhost:5500/accomodations/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( voteData )
            }).then(response => response.json())
            .then(voteRes => {
                console.log('reponse vote : ' + JSON.stringify(voteRes))
                setUserVoteStatus(false);
                dispatch(voteToAccommodation({ accommodationId: accomodationId, newStatus: voteRes.newStatus }));
            })
        }

        function getInitialVoteStatus() {
            if (accommodation) {
                const userVote = accommodation.vote && accommodation.vote.find(voteItem => voteItem.userToken === userToken);
                return userVote ? userVote.status : null;
            }
            return null;
        }
        // const userHasVoted = () => {
        //     if (accommodation) {
        //         return accommodation.vote.some(voteItem => voteItem.userToken === userToken);
        //     }
        //     return false;
        // };
        //if user didn't vote yet vote status is null
        // const userVoteStatus = userHasVoted() ? accommodation.vote.find(voteItem => voteItem.userToken === userToken)?.status : null;

        const voteIconStyle = {
            check: userVoteStatus === true ? { fontSize: '1.75rem', color: 'var(--primary-black-color)' } : {fontSize: '1.75rem'},
            cross: userVoteStatus === false ? { fontSize: '1.75rem', color: 'var(--primary-black-color)' } : {fontSize: '1.75rem'}
        };  

        
        return(
            <div className={styles.container}>
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
                            <p className={styles.location}>Localisation : {location.name}</p>
                            </div>
                            <div>
                            <p className={styles.miniTitles}>Descriptif du logement :</p>
                            <p className={styles.description}>{description}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.rightContainer}>
                        <div className={styles.voteIcons}>
                        <FontAwesomeIcon style={voteIconStyle.check} icon={faCircleCheck} onClick={(e) => handleDo(_id)} />
                        <FontAwesomeIcon style={voteIconStyle.cross} icon={faCircleXmark} onClick={(e) => handleDont(_id)}  />
                        </div>
                    <Link href={url} target="_blank"><Button type="text" buttonClass="primary" text="En savoir plus" /></Link>
                    </div>
                </div>
            </div>
        ) 
}