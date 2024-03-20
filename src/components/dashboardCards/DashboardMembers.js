'use client'
import styles from './dashboardMembers.module.css';
import Button from "../utils/Button";
import { useRouter } from 'next/navigation';
import MembersList from '../MemberList';


export default function DashboardMembers() {
    
    const router = useRouter();

    const handleClick = () => {
        router.push('/invitation')
    }

    return(
    <div className={styles.container} >
            <MembersList/>
            <Button text="+"  onClick={() => handleClick()} />
    </div>
)}