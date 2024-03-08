import styles from './inWorking.module.css';
import { lexend } from "../../app/fonts";

export default function InWorking(props) {
  return (
    <div className={styles.altPageContainer}>
      <h1 className={`${styles.title} ${lexend.className}`}>{props.title}</h1>
      <div className={`${styles.container} ${lexend.className}`}>
        <p>
          On te demande un peu de patience, cette page est encore en construction !
        </p>
      </div>
    </div>
  );
}
