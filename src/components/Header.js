'use client'
// Need "use client" because we're using a hook 'usePathname'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faLaptop, faBed, faTableTennisPaddleBall, faCalendar, faMessage, faPlane, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation'

import { useState } from 'react';

import { Modal, Popover } from 'antd';
// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

import styles from './header.module.css';
// import useSelector for take name of Trips of User
import { useSelector } from "react-redux";

export default function Header() {
    //import user from Redux for dynamize popover with name voyage
    const user = useSelector((state) => state.user.value);
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    // This will help us figure out what's the active link currently is, and add an "active" class to it
    const pathname = usePathname();


    /* Icons used from front awesome */
    const iconHouse = {
        name: faHouse,
    };
    const iconLaptop = {
        name: faLaptop,
    };
    const iconBed = {
        name: faBed,
    }
    const iconTableTennisPaddleBall = {
        name: faTableTennisPaddleBall,
    };
    const iconCalendar = {
        name: faCalendar,
    };
    const iconMessage = {
        name: faMessage,
    };
    const iconPlane = {
        name: faPlane,
    };
    const iconUser = {
        name: faUser,
    };
    const iconArrow = {
        name: faArrowRightFromBracket
    };

    // Popover 
    const changeCurrentTrip = () => {
        console.log('click')
    }
    
    const voyageNamePopover = user.myTrips.map((data, i) => {
        return (
            <div key={i} className={styles.voyageNameContainer}>
            <span className="voyageName" onClick={() => changeCurrentTrip()}>{data.name}</span>
            </div>
        );
        });
    const popoverContent = (
        <div className={styles.popoverContent}>
            {voyageNamePopover}
        </div>
        );
    
   

    /* modal logic */

      const displayModal = () => {
        setIsModalOpen(true);
      };

      const handleOk = () => {
        setIsModalOpen(false);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return <header className={`${styles.header} ${lexend.className}`}>
        <div className={styles.headerLeft}>
            <FontAwesomeIcon icon={iconHouse.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/' ? 'active' : 'link'}`]} href="/"> Home </Link>
            <FontAwesomeIcon icon={iconLaptop.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/dashboard' ? 'active' : 'link'}`]} href="/dashboard"> Dashboard </Link>
            <FontAwesomeIcon icon={iconBed.name} className={styles.headerIcon} />
            <Link className={styles[`${(pathname === '/accomodation' || pathname === '/accomodation/add') ? 'active' : 'link'}`]} href="/accomodation"> Accomodation </Link>
            <FontAwesomeIcon icon={iconTableTennisPaddleBall.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/activities' ? 'active' : 'link'}`]} href="/activities"> Activities </Link>
            <FontAwesomeIcon icon={iconCalendar.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/planning' ? 'active' : 'link'}`]} href="/planning"> Planning </Link>
            <FontAwesomeIcon icon={iconMessage.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/chat' ? 'active' : 'link'}`]} href="/chat"> Chat </Link>
        </div>
        <div className={styles.headerRight}>
            <FontAwesomeIcon icon={iconPlane.name} className={styles.headerIcon} />
            <div className={styles.tripsContainer}>
            <Popover title="Mes voyages" content={popoverContent} className={styles.popover} trigger="hover">
                Mes Voyages   
            </Popover>
            {/* <div className={styles.currentTrip}>Voyage 1</div>
            <ul className={styles.tripsList}>
                <li className={styles.trip}>Voyage 2</li>
                <li className={styles.trip}>Voyage 3</li>
            </ul> */}
            </div>
            <FontAwesomeIcon icon={iconUser.name} className={styles.headerIcon} />
            <div>
                <button onClick={() => displayModal('login')} className={`${styles.link} ${styles.buttonHeader}`}> Login </button>
            </div>
            
            <FontAwesomeIcon icon={iconArrow.name} className={styles.headerIcon} />
            <div>
                <button onClick={() => displayModal('signup')} className={`${styles.link} ${styles.buttonHeader}`}> Signup </button>
            </div>
        </div>
        <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p> Modal inputs, voir pour passer une props pour le type de modal et afficher signup ou login en fonction </p>
      </Modal>
    </header>
}