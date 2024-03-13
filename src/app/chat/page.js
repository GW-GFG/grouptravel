"use client";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import NotConnected from "@/components/missingInfos/NotConnected";
import NoCurrentTrip from "@/components/missingInfos/NoCurrentTrip";
import Chat from "@/components/Chat"
import InWorking from "../../components/missingInfos/InWorking"
import MembersList from "@/components/MemberList";

export default function ChatPage() {
    const user = useSelector((state) => state.user.value);
        
    if (!user.token) {
        return <NotConnected title="Chat" />
    } 
    if (!user.currentTrip) {
        return <NoCurrentTrip title="Dashboard" />
    } else {
        return ( <div className={styles.mainContainer}>
                    <div div className={styles.listContainer}> 
                        <MembersList/>
                    </div>
                    <div div className={styles.chatContainer}>
                        <Chat/>
                    </div>
                     
                </div>
      
        ) 
    }
}