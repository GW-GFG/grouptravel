"use client"
import styles from "./accommodation.module.css";
import { lexend } from "../app/fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./utils/Button";
import Link from "next/link";
import Image from 'next/image';
import { useSelector, useDispatch } from "react-redux";
import { voteToAccommodation } from "@/reducers/user";



export default function Accommodation(props) {
    
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.user.value.token)
    const currentTrip = useSelector((state) => state.user.value.currentTrip);

    const { name, location, dates, photos, url, description, budget, vote, _id } = props;
      
    const defaultPicture = "https://media.istockphoto.com/id/1145422105/fr/photo/vue-a%C3%A9rienne…";
        
        const handleDo = (accomodationId) => {

            const voteData = {
                userToken,
                accomodationId,
                tripId: currentTrip._id,
                status: true,
            }
            
            // console.log('Vote data avant fetch : '+ JSON.stringify(voteData))
            fetch('http://localhost:5500/accomodations/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( voteData )
            }).then(response => response.json())
            .then(voteRes => {
                console.log('reponse vote : ' + JSON.stringify(voteRes))
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

            // console.log('click id puis vote'+ JSON.stringify(voteData))
            fetch('http://localhost:5500/accomodations/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( voteData )
            }).then(response => response.json())
            .then(voteRes => {
                console.log('reponse vote : ' + JSON.stringify(voteRes))
                dispatch(voteToAccommodation({ accommodationId: accomodationId, newStatus: voteRes.newStatus }));
            })
        }
        const userHasVoted = () => {
            if (!vote) return false; // Si le vote n'est pas défini, l'utilisateur n'a pas encore voté
            const userVote = vote.find(voteItem => voteItem.userId === userToken); // Rechercher le vote de l'utilisateur
            return userVote ? userVote.status : false; // Si l'utilisateur a voté, renvoyer son statut de vote (true ou false), sinon renvoyer false
          };
          let voteIconStyle = {};
          if (userHasVoted()) {
              voteIconStyle = { fontSize: '1.75rem', 'color': 'var(--primary-red-color)' }; // Changer la couleur si l'utilisateur a déjà voté
          }
        
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
                        <FontAwesomeIcon style={voteIconStyle} icon={faCircleCheck} onClick={(e) => handleDo(_id)} />
                        <FontAwesomeIcon style={voteIconStyle} icon={faCircleXmark} onClick={(e) => handleDont(_id)}  />
                        </div>
                    <Link href={url} target="_blank"><Button type="text" buttonClass="primary" text="En savoir plus" /></Link>
                    </div>
                </div>
            </div>
        ) 
}