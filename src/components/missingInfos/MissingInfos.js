import styles from './missingInfos.module.css';
import { lexend } from '../../app/fonts'

export default function MissingInfos(props) {

    return (
        <>
            <h1 className={`${styles.title} ${lexend.className}`}>{props.title}</h1>
            <div className={`${styles.container} ${lexend.className}`}>
                <p>Il semblerait qu'il n'y a pas encore {props.text} pour ce voyage !</p>
            </div>
        </>
    )
}