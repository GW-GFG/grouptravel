'use client'
import { useSelector } from "react-redux";
import Activity from "@/components/Activity";
import NotConnected from "@/components/missingInfos/NotConnected";

export default function ActivitiesPage() {

    const user = useSelector((state) => state.user.value);
    if (!user.token) {
        return (
          <NotConnected />
        );
    } else {
        return <Activity />
    }
}