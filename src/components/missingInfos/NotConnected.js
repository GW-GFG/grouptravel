import styles from './notConnected.module.css';
import { lexend } from '../../app/fonts'

export default function NotConnected() {

    return (
        <div className={`${styles.container} ${lexend.className}`}>
            <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
          </div>
    )
}