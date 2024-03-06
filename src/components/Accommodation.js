"use client"
import styles from "./accommodation.module.css";
import { useSelector } from "react-redux";
import { lexend } from "../app/fonts";
import { current } from "@reduxjs/toolkit";

export default function Accommodation(props) {
 const { name, location, dates, picture, url, description, budget, vote } = props


return(
<div className={styles.container} >
    <div className={styles.leftColumn}>
        <div>IMG</div>
        <p>Budget par personne : {budget}</p>
    </div>

    <div className={middleColumn}>
        <h4 className={styles.cardTitle}>{name}</h4>
        <p className={styles.date}>Du : {dates.departure} Au : {dates.return}</p>
        <p className={styles.location}>Localisation : {location}</p>
        <p className={styles.descriptionTitle}>Descriptif du logement :</p>
        <p className={styles.description}>{description}</p>
    </div>

    <div className={middleColumn}>
        <div>ICONES VOTE</div>
    <button className={styles.btn}>En savoir plus</button>
    </div>



    ACCoMModations


</div>
)
}