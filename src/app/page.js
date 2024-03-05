import styles from "./page.module.css";
import  SignIn  from "../components/SignIn";
import SignUp from "@/components/SignUp";

export default function Home() {
  
  return (
    <main>
      Home page
      <SignIn />
      <SignUp />
    </main>
  );
}
