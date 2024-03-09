'use client'
import Invitation from "@/components/Invitation"
import { useSelector } from "react-redux";
import NotConnected from "@/components/missingInfos/NotConnected";

export default function invitationPage() {
    const user = useSelector((state) => state.user.value);
    if (!user.token) {
        return (
          <NotConnected />
        );
    } else { 
        return (
        <Invitation/>
        )
    }

    
    
}