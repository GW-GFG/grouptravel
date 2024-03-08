'use client'
import { useSelector } from "react-redux";
import NotConnected from "@/components/missingInfos/NotConnected";
import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
    const user = useSelector((state) => state.user.value);
    if (!user.token) {
        return (
          <NotConnected />
        );
    } else {
        return (
        <Dashboard />
        )
    }
}