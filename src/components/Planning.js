"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Planning() {
  const user = useSelector((state) => state.user.value);
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const [rerender, setRerender] = useState(null);
  const [areNotFixed, setAreNotFixed] = useState(null);

  console.log(currentTrip);

  useEffect(() => {
    if (user.token && currentTrip && currentTrip._id) {
      fetch("http://localhost:5500/planning/areNotFixed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userToken: user.token,
          currentTripId: currentTrip._id,
        }),
      })
        .then((response) => response.json())
        .then((notFixedData) => {
          console.log("notFixedData : " + JSON.stringify(notFixedData.data));
          setAreNotFixed(notFixedData.data);
        });
    }
  }, []);

  const notFixedList = areNotFixed && areNotFixed.map((data, i) => {
    return <li>{data.name}</li>
  })

  return (
    <>
      <h1>Tadada</h1>
      <ol>{notFixedList}</ol>
    </>
  );
}
