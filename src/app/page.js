
import Dashboard from "@/components/Dashboard";
import { useSelector } from "react-redux";
import HomeNotConnected from "@/components/missingInfos/HomeNotConnected";

export default function Home() {
  
  const user = useSelector((state) => state.user.value);
    if (!user.token) {
        return (
          <HomeNotConnected />
        );
    } else {
        return <Dashboard />
    }
}
