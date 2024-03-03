'use client'
import { useState } from "react";
import Link from "next/link";

// axios is used like "fetch"
const axios = require('axios');

export default function Accomodation() {

    const [sampleCounter, setSampleCounter] = useState(0);

    const handleCounterClick = () => {
        setSampleCounter(sampleCounter+1);
    }

    // sample fetch like useEffect
    axios.get('http://localhost:5500/users/').then(response => console.log(" 'useEffect' data is :", response.data));

    const handleFetch = async () => {
        try {
            // backend url is set on port 5500
            const response = await axios.get('http://localhost:5500/users/');
            console.log(response);
            console.log('fetched data is : ', response.data);
          } catch (error) {
            console.error(error);
          }
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
            <button onClick={() => handleFetch()}>Fetch with axios</button>
        </div>
    </div>
}
