'use client'
import Addaccommodation from "@/components/AddAccommodation"
import { useSelector } from "react-redux";
import NoCurrentTrip from "@/components/missingInfos/NoCurrentTrip";
import NotConnected from "@/components/missingInfos/NotConnected";


export default function AddaccommodationPage() {
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);
    if (!user.token) {
        return <NotConnected title="Logements" />
      } else if (!currentTrip) {
        return <NoCurrentTrip title="Logements" />
      } else { 
        return <Addaccommodation />
      }   
}