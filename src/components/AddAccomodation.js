'use client'
import styles from './addAccomodation.module.css';
import { useState, useEffect } from 'react';

// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

export default function AddAccomodation() {
    return <div className={styles.newAccomodation}>
        <h2 className={lexend.className}>Un logement à proposer ? </h2>
        <div className={styles.layout}>
            <div className={styles.top}>
                <p>image component from nextjs to add there</p>
                <p>form there</p>
            </div>
            <div className={styles.middle}>
                <p> date</p>
                <p> budget</p>
            </div>
            <div className={styles.bottom}>
                <p>map</p>
                <p>desc</p>
            </div>
        </div>
        <p>input submit</p>
    </div>
}