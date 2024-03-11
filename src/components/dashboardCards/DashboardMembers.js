'use client'
import styles from './dashboardMembers.module.css';
import Link from "next/link";
import { useSelector } from "react-redux";
import Button from "../utils/Button";
import MiniMemberRow from './MiniMemberRow';
import { useRouter } from 'next/navigation';

export default function DashboardMembers() {
    
    const currentTripMembersId = useSelector((state) => state.user.value.currentTrip.members);
    const currentTripAdminId = useSelector((state) => state.user.value.currentTrip.admin);
    const router = useRouter();

    const members = currentTripMembersId && currentTripMembersId.map((data, i) => {
//Add avatar when ready
        return <MiniMemberRow key={i} name={data.name} />
    })
console.log('admin : ', currentTripAdminId)

const handleClick = () => {
    router.push('/invitation')
}

return(
<div className={styles.container} >
        <h2>Membres du groupe</h2>
        {members}
        <MiniMemberRow name={"Mon Joli Nom"} />
        <Button text="+"  onClick={() => handleClick()} />
</div>
)}