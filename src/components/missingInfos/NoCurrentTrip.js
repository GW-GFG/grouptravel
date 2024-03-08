import styles from "./noCurrentTrip.module.css";
import { lexend } from "../../app/fonts";

export default function NoCurrentTrip(props) {
  return (
    <div className={styles.altPageContainer}>
      <h1 className={`${styles.title} ${lexend.className}`}>{props.title}</h1>
      <div className={`${styles.container} ${lexend.className}`}>
        <p>Selectionne ou créé un voyage pour profiter de cette page !</p>
      </div>
    </div>
  );
}
