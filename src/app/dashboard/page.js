'use client'
import { useSelector } from "react-redux";
import InWorking from "@/components/missingInfos/NotConnected";
import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
    const user = useSelector((state) => state.user.value);
    if (!user.token) {
        return (
          <InWorking title="Accueil" />
        );
    } else {
        return (
        <Dashboard />
        )
    }
}