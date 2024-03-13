'use client'
import styles from './dashboardMembers.module.css';
import Link from "next/link";
import { useSelector } from "react-redux";
import Button from "../utils/Button";
import MiniMemberRow from './MiniMemberRow';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MembersList from '../MemberList';


export default function DashboardMembers() {
    
    const currentTripId = useSelector((state) => state.user.value.currentTrip._id)
    const [membersUsername, setMembersUsername] = useState([])
    const router = useRouter();

//     useEffect(() => { 
//         // console.log(currentTrip)
//         fetch('http://localhost:5500/users/getonetripallusername',{
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify( {tripId: currentTripId} )
//             }).then(response => response.json())
//             .then(data => {
//                 // console.log(data)
//                 // console.log(data.usernameData)
//                 setMembersUsername(data.usernameData)
//             })    
//       }, []);



//     // const members = currentTripMembersId && currentTripMembersId.map((data, i) => {
//     const members = membersUsername && membersUsername.map((data, i) => {
// //Add avatar when ready
//         return <MiniMemberRow key={i} name={data} />
//     })
// console.log('admin : ', currentTripAdminId)
// console.log('admin : ', currentTripMembersId)

const handleClick = () => {
    router.push('/invitation')
}

return(
<div className={styles.container} >
        {/* <h2>Membres du groupe :</h2>
        {/* <MiniMemberRow name={username} />
        {members} */}
        <MembersList/>
        <Button text="+"  onClick={() => handleClick()} />
</div>
)}