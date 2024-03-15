"use client";

import styles from "./miniActivityRow.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";


export default function MiniActivityRow(props) {
    const { name, participation } = props
    let numberDo = 0; 
    participation.map(data => data.status && numberDo ++)
    return (
      <div className={styles.container}>
          <p className={styles.activityName}>{name}</p>
          <div className={styles.iconContainer}>
            {numberDo <= 1 ? <p>{numberDo} vote</p>:<p>{numberDo} votes</p>}
            {/* <FontAwesomeIcon style={{fontSize: '1.75rem'}} icon={faCircleCheck} onClick={handleDo} />
            <FontAwesomeIcon style={{fontSize: '1.75rem'}} icon={faCircleXmark} onClick={handleDont}  /> */}
          </div>

      </div>
    );
  }