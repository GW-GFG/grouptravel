'use client'
// Need "use client" because we're using a hook 'usePathname'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBars, faHouse, faLaptop, faBed, faTableTennisPaddleBall, faCalendar, faMessage, faPlane, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from 'next/navigation'

import { useState } from 'react';

import { Modal, Popover } from 'antd';
// import fonts to use them for menu items 
import { lexend } from "@/app/fonts";

import styles from './burgerMenu.module.css';
import SignIn from '@/components/SignIn';
import SignUp from "@/components/SignUp";

import { useDispatch, useSelector } from 'react-redux';
import { removeUserToStore, updateCurrentTrip } from "@/reducers/user";

export default function BurgerMenu(props) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const router = useRouter();

    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [icon, setIcon] = useState('faBars');

    // This will help us figure out what's the active link currently is, and add an "active" class to it
    const pathname = usePathname();


    /* Icons used from front awesome */
    const iconHouse = {
        name: faHouse,
    };
    const iconLaptop = {
        name: faLaptop,
    };
    const iconMenu = {
        name: faBars,
    };
    const iconMenuOn = {
        name: faXmark,
    }
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
        // action to change currentTrips from popover
        const handleCurrentTrip = (data) => {
            // console.log(data)
            dispatch(updateCurrentTrip(data));  // Dispatch in Redux
            
            // router.push('/dashboard') // refresh or routing to Dashboard
        }
        
        //map on all myTrip to put name in popover
        
            
        const voyageNamePopover = user.myTrips && user.myTrips.length > 0 && user.myTrips.filter(e => e !== user.currentTrip).map((data, i) => {
        return (
            <div key={i} className={styles.voyageNameContainer}>
                <span className={styles.singleVoyageName}  onClick={() => handleCurrentTrip(data)}>{data.name}</span>
            </div>
        );
        });
      
       const popoverContent = (
        <div className={styles.popoverContent}>
            {voyageNamePopover}
        </div>
        );
    
     /* modal logic */

     const displaySignInModal = () => {
        setIsSignInModalOpen(true);
      };

      const displaySignUpModal = () => {
        setIsSignUpModalOpen(true);
      };

      const handleCancelSignIn = () => {
        setIsSignInModalOpen(false);
      };
      const handleCancelSignUp = () => {
        setIsSignUpModalOpen(false);
      };

      //Reverse data flow tu handle submit in SignIn SignUp

      const handleConnexion = () => {
        setIsSignInModalOpen(false);
      }

      const handleRegister = () => {
        setIsSignUpModalOpen(false);
      }


      //Logout
      const handleLogout = () => {
        dispatch(removeUserToStore());
        router.push('/');
      };

      const handleProfile = () => {
        router.push('/profile');
      }

      const handleBurgerClick = () => {
        setIsOpen(!isOpen);
      }

      const myStyle = {
        visible: {
            display: isOpen ? "grid" : "none",
        }
      }

    if (props.hasToken) {
        return (
        <div className={styles.headerBurger}> 
            <div onClick={() => handleBurgerClick()}>
            {!isOpen ? <FontAwesomeIcon icon={iconMenu.name} className={styles.headerIconMain} /> :
            <FontAwesomeIcon icon={iconMenuOn.name} className={styles.headerIconMain} />}
            </div>
            <div className={styles.toReveal} style={myStyle.visible}>
                <FontAwesomeIcon icon={iconHouse.name} className={styles.headerIcon} />
                <Link className={styles[`${pathname === '/' ? 'active' : 'link'}`]} href="/"> Accueil </Link>
                <FontAwesomeIcon icon={iconBed.name} className={styles.headerIcon} />
                <Link className={styles[`${(pathname === '/accomodation' || pathname === '/accomodation/add') ? 'active' : 'link'}`]} href="/accomodation"> Hébergement </Link>
                <FontAwesomeIcon icon={iconTableTennisPaddleBall.name} className={styles.headerIcon} />
                <Link className={styles[`${(pathname === '/activities' || pathname === '/activities/add') ? 'active' : 'link'}`]} href="/activities"> Activités </Link>
                <FontAwesomeIcon icon={iconCalendar.name} className={styles.headerIcon} />
                <Link className={styles[`${pathname === '/planning' ? 'active' : 'link'}`]} href="/planning"> Planning </Link>
                <FontAwesomeIcon icon={iconMessage.name} className={styles.headerIcon} />
                <Link className={styles[`${pathname === '/chat' ? 'active' : 'link'}`]} href="/chat"> Messages </Link>
                <FontAwesomeIcon icon={iconPlane.name} className={styles.headerIcon} />
            <div className={styles.tripsContainer}>
            <Popover title="Mes autres voyages" content={popoverContent} className={styles.popover} trigger="hover">
                {!user.currentTrip && <p>Mes voyages</p>}
                {user.currentTrip && <p> {user.currentTrip.name}</p>}
            </Popover>
            </div>
            <FontAwesomeIcon icon={iconUser.name} className={styles.headerIcon} />
            <div>
                {!user.token && <button onClick={displaySignInModal} className={`${styles.link} ${styles.buttonHeader}`}> Connexion </button>}
                {user.token && <button onClick={handleProfile} className={`${styles.link} ${styles.buttonHeader}`}> Profil </button>}
            </div>
            {user.token && (<>
            <FontAwesomeIcon icon={iconArrow.name} className={styles.headerIcon} onClick={handleLogout} />
            <div>
                <button onClick={handleLogout} className={`${styles.link} ${styles.buttonHeader}`}> Déconnexion </button>                
            </div>
            </>)}        
            {!user.token && <button onClick={displaySignUpModal} className={`${styles.link} ${styles.buttonHeader}`}> Inscription </button>}
            </div> 
            <Modal open={isSignInModalOpen} onCancel={handleCancelSignIn} footer={null}>
                <SignIn handleConnexion={handleConnexion} />
            </Modal>
            <Modal open={isSignUpModalOpen} onCancel={handleCancelSignUp} footer={null}>
                <SignUp handleRegister={handleRegister} />
            </Modal>
        </div>
        )
    } else {
        return <div>hi i am not connected menu</div>
        // return not signed in menu
    }
}