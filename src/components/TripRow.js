'use client'
import styles from './triprow.module.css';
import { useDispatch } from 'react-redux';
import { updateCurrentTrip, updateMyTrips } from '@/reducers/user';
import { useRouter } from 'next/navigation';

export default function TripRow(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAdmin = true;


    const handleGoToDash = (data) => {
      dispatch(updateCurrentTrip(data));
      router.push('/');
    }

    return (
      <div className={styles.row}>
          <span className={styles.tripName}>{props.name}</span>
          {isAdmin && <span className={styles.adminBadge}>ADMIN</span>}         
          <button className={styles.goButton} onClick={() => handleGoToDash(props)}>Go</button>                   
      </div>
    );
  }