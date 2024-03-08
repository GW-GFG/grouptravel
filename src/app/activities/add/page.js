'use client'
import AddActivity from "@/components/AddActivity";
import NoCurrentTrip from "@/components/missingInfos/NoCurrentTrip";
import NotConnected from "@/components/missingInfos/NotConnected";
import { useSelector } from "react-redux";


export default function AddActivitiesPage() {
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);

    if (!user.token) {
        return <NotConnected title="Activités" />
    } else if (!currentTrip) {
      return <NoCurrentTrip title="Activités" />
    } else {
    return <AddActivity />
    }
}