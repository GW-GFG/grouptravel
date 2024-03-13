'use client'
import styles from '@/components/dashboardCards/DashboardMembers';
import Link from "next/link";
import { useSelector } from "react-redux";

import MiniMemberRow from '@/components/dashboardCards/MiniMemberRow';
import { useEffect, useState } from 'react';


export default function MembersList() {
    
    const currentTripId = useSelector((state) => state.user.value.currentTrip._id)
    const [membersUsername, setMembersUsername] = useState([])

    useEffect(() => { 
        fetch('http://localhost:5500/users/getonetripallusername',{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify( {tripId: currentTripId} )
            }).then(response => response.json())
            .then(data => {
                setMembersUsername(data.usernameData)
            })    
      }, []);



    const members = membersUsername && membersUsername.map((data, i) => {

        return <MiniMemberRow key={i} name={data} />
    })


return(<div className={styles.container} >
                <h2>Membres du groupe :</h2>
                
                {members}
                
        </div>
)}