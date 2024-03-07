import styles from './triprow.module.css';

export default function TripRow(props) {
    const isAdmin = true;
    // console.log("apr" + JSON.stringify(user));

    const handleGoToDash = () => {
      console.log(props);
      dispatch(updateCurrentTrip(props));
      console.log(user);
      router.push('/dashboard')
    }

    return (
      <div className={styles.row}>
          <span className={styles.tripName}>{props.name}</span>
          {isAdmin && <span className={styles.adminBadge}>ADMIN</span>}         
          <button className={styles.goButton} onClick={handleGoToDash}>Go</button>                   
      </div>
    );
  }