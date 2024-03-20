"use client"
import styles from "./accommodation.module.css";
import { lexend } from "../app/fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./utils/Button";
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { voteToAccommodation, updateFixStatusAccommodation } from "@/reducers/user";



export default function Accommodation(props) {
    const { name, location, dates, photos, url, description, budget, vote, _id, isFixed } = props;
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.user.value.token)
    const currentTrip = useSelector((state) => state.user.value.currentTrip);
    const [isAdmin, setIsAdmin] = useState(false);
    //To keep vote updated
    const accommodation = currentTrip.accomodations.find(accommodation => accommodation._id === _id);
    const budgetPerPerson = (budget / (currentTrip.members.length + 1)).toFixed(2);
    const [userVoteStatus, setUserVoteStatus] = useState(getInitialVoteStatus());

    useEffect(() => {
        fetch('http://localhost:5500/users/isAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {currentTripId: currentTrip._id, token: userToken} )
          }).then(response => response.json())
          .then(data => {
            data && setIsAdmin(data.isAdmin)
        })
    }, []);

    const handleFix = (newStatus) => {
        console.log('isAdmin: ', isAdmin, 'accommodationId : ', _id , 'dates : ', currentTrip.dates, 'isFixed : ', newStatus )
        fetch('http://localhost:5500/accomodations/fixOne', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {isAdmin, accommodationId: _id , dates: currentTrip.dates, isFixed: newStatus} )
          }).then(response => response.json())
          .then(data => {
            console.log('handlefix res : ',data)
            dispatch(updateFixStatusAccommodation({accommodationId: _id, isFixed: newStatus}))
        })
    }

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
            body: JSON.stringify(voteData)
        }).then(response => response.json())
            .then(voteRes => {
                setUserVoteStatus(true);
                dispatch(voteToAccommodation({ accommodationId: accomodationId, newStatus: voteRes.newStatus }));
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
            body: JSON.stringify(voteData)
        }).then(response => response.json())
            .then(voteRes => {
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

    const voteIconStyle = {
        check: userVoteStatus === true ? { fontSize: '1.75rem', color: 'var(--primary-black-color)' } : { fontSize: '1.75rem' },
        cross: userVoteStatus === false ? { fontSize: '1.75rem', color: 'var(--primary-black-color)' } : { fontSize: '1.75rem' }
    };
    const fixStatusIcon = 
       isFixed? { fontSize: '1.75rem', color: 'var(--primary-black-color)' } : { fontSize: '1.75rem' };      
    

    // count the number of users with a true status on each accomodation's vote
    const countVotes = () => {
        return vote.filter(v => v.status === true).length
    }

    return (
        <div className={styles.container}>
            <h3 className={`${styles.cardTitle} ${lexend.className}`}>{name}</h3>
            <div className={styles.cardBody}>
                <div className={styles.leftContainer}>
                    <div className={styles.leftColumn}>
                        <div className={styles.leftColumnImgContainer}>
                            <Image fill={true} className={styles.imgContainer} src={`${photos[0] || "/acco1.jpg"}`} alt="My Trip Picture" />
                        </div>
                        <p>Budget par personne : {budgetPerPerson}</p>
                    </div>
                    
                    <div className={styles.middleColumn}>
                        <div>
                            <p className={styles.date}>Du : {new Date(dates.departure).toLocaleDateString()} Au : {new Date(dates.return).toLocaleDateString()}</p>
                            <p className={styles.location}>Localisation : {location.name || "Pas déterminée"}</p>
                            </div>
                            <div>
                            <p className={styles.miniTitles}>Descriptif du logement :</p>
                            <p className={styles.description}>{description}</p>
                        </div>  
                        <p>{countVotes() <= 1 ? 'Partant ' : 'Partants '}: {countVotes()}</p>
                    </div>
                </div>

                <div className={styles.rightContainer}>
                    <div className={styles.voteIcons}>
                        <FontAwesomeIcon style={voteIconStyle.check} icon={faCircleCheck} onClick={(e) => handleDo(_id)} />
                        <FontAwesomeIcon style={voteIconStyle.cross} icon={faCircleXmark} onClick={(e) => handleDont(_id)} />
                        {isAdmin && <FontAwesomeIcon style={fixStatusIcon} icon={faCalendar} onClick={(e) => handleFix(!isFixed)} />}
                    </div>
                    <Link href={url} target="_blank"><Button type="text" buttonClass="primary" text="En savoir plus" /></Link>
                </div>
            </div>
        </div>
    )
}