'use client'
import { useSelector } from "react-redux";
import CreateTrip from "@/components/CreateTrip";
import NotConnected from "@/components/missingInfos/NotConnected";

export default function AddTripPage() {
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);

    if (!user.token) {
        return <NotConnected title="Activités" />
    } else {
    return <CreateTrip/>
    }
}