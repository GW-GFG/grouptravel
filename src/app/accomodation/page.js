'use client'
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import user from "@/reducers/user";
import Accommodation from "@/components/Accommodation";

export default function AccommodationPage() {
    return <div>Accommodations</div>
}

//     const currentTrip = useSelector(state.user.value.currentTrip)
    
//     const accomodations = currentTrip && currentTrip.map((data, i) => {
//         return (
//             <Accommodation />
//         )
//     })
//     return (
//         <div>
//             {accomodations}
//         </div>
//     )
        
// }
