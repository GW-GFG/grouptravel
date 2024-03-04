'use client'
import { useState } from "react";
import Link from "next/link";

export default function Accomodation() {

    const [sampleCounter, setSampleCounter] = useState(0);

    const handleCounterClick = () => {
        setSampleCounter(sampleCounter+1);
    }

    return <div>Accomodation page
        <div>
            Here is a sample counter to show how to use hooks with next 14 : {sampleCounter}
            <button onClick={() => handleCounterClick()}> Click me </button>
        </div>
        <div>
            Here is a link to add an accomodation : 
            <Link href='/accomodation/add'>Add logement</Link>
        </div>
        <div>
            Here is a button to fetch users in DB (see in console.log) : 
            <button>Fetch with axios</button>
        </div>
    </div>
}
