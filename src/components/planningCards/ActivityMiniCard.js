'use client'
import styles from './activityMiniCard.module.css'


export default function activityMiniCard(props) {

const { name, budget, participation } = props;
const numberOfParticipants = 0
// const participants = participation && 
// participation.map((participant, i) => {
//  if (participant.status === true) {
//     numberOfParticipants ++
//  }
// })

return(
    <div className={styles.miniCard} >
        <h3 className={styles.miniTitle}>
            {name}
        </h3>

        <p>
            {numberOfParticipants} participant(e)s
        </p>
        <p>
            {budget}€ /personne
        </p>
    </div>
)}