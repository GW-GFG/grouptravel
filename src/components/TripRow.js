'use client'
import { connect } from 'react-redux';
import styles from './triprow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTrip } from '@/reducers/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function TripRow(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  const token = useSelector((state) => state.user.value.token);

    useEffect(() => { 
      fetch(`${process.env.NEXT_PUBLIC_BACK}/users/isAdmin`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {currentTripId: props._id, token: token} )
          }).then(response => response.json())
          .then(data => {
              data && setIsAdmin(data.isAdmin)
          })    
    }, []);

    const handleGoToDash = (e, data) => {
      e.preventDefault();
      dispatch(updateCurrentTrip(data))
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
    

    return (
      <div className={styles.row}>
          <span className={styles.tripName}>{props.name}</span>
          {isAdmin ? <span className={styles.adminBadge}>ADMIN</span> : <span className={styles.inviteBadge}>INVITÉ(E)</span>}         
          <button className={styles.goButton} onClick={(e) => handleGoToDash(e, props)}>Go</button>                   
      </div>
    );
  }

  export default connect(mapStateToProps, { updateCurrentTrip })(TripRow);