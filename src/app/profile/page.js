'use client'
import Profile from "@/components/Profile";
import NotConnected from "@/components/missingInfos/NotConnected";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const user = useSelector((state) => state.user.value);
    if (!user.token) {
        return <NotConnected title="Profil" />
    } else {
    return <Profile />
    } 
}