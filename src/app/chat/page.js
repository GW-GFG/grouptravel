"use client";
import { useSelector } from "react-redux";
import NotConnected from "@/components/missingInfos/NotConnected";
import Chat from "@/components/Chat"
import InWorking from "../../components/missingInfos/InWorking"

export default function ChatPage() {
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);

    if (!user.token) {
        return <NotConnected title="Chat" />
    } else {
    return <Chat/>
    }
}