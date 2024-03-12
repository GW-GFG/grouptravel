'use client'
import InWorking from "@/components/missingInfos/InWorking";
import Planning from "@/components/Planning";
import NotConnected from "@/components/missingInfos/NotConnected";
import NoCurrentTrip from "@/components/missingInfos/NoCurrentTrip";
import { useSelector } from "react-redux";

export default function PlanningPage() {
    const user = useSelector((state) => state.user.value);
    const currentTrip = useSelector((state) => state.user.value.currentTrip);

  if (!user.token) {
    return <NotConnected title="Planning" />;
  } else if (!currentTrip) {
    return <NoCurrentTrip title="Planning" />;
  } else {

    return (
      <>
        <InWorking title="Planning" />
        <Planning />
      </>
    );
  }
}
