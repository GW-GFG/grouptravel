// 'use client'
// import { useState } from "react";
// import Link from "next/link";
// import { useSelector } from "react-redux";
// import user from "@/reducers/user";
// import Accommodation from "@/components/Accommodation";

// export default function AccommodationPage() {
//     const currentTrip = useSelector((state) => state.user.value.currentTrip)
    //currentTrip contains all data of the selected trip

    // fetch('http://localhost:5500/accomodations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: currentTrip
    // }).then(data => {
    //     console.log('pageaccommodation 18 data fetch data' + data)
    // })

    // return <div>Accommodations</div>
// }

//     const currentTrip = useSelector(state.user.value.currentTrip)
    
//     const accomodations = currentTrip.accomodations && currentTrip.accomodations.map((data, i) => {
//         return (
//             <Accommodation />
//         )
//     })
//     return (
//         <div>
//             AccommodationPage
//         </div>
//     )
        
// }
