
'use client'
import styles from './homeNotConnected.module.css';
import Image from 'next/image';
import Button from '../utils/Button';
import CarouselHome from './CarouselHome';
import { useState } from 'react';
import { Modal } from 'antd';
import SignUp from '../SignUp';

export default function HomeNotConnected() {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const displaySignUpModal = () => {
        setIsSignUpModalOpen(!isSignUpModalOpen);
      };
      const handleRegister = () => {
        setIsSignUpModalOpen(false);
      }

    return (
        <div className={styles.globalContainer}>
            <div className={styles.top}>
                <Image src='/photo_homepage.png' priority alt='Group of friends' fill={true}/>
                <div className={styles.topLeftContainer}>
                    <h2> Enfin un plaisir de planifier ses voyages</h2>
                </div>
            </div>
            <div className={styles.middle}>
                <CarouselHome />
            </div>
            <div className={styles.bottom}>
                <h2>Planification de votre voyage entre amis</h2>                
                    <Button buttonClass='primary' text='Créer votre compte' onClick={displaySignUpModal} />
            </div>
            <Modal open={isSignUpModalOpen} onCancel={displaySignUpModal} footer={null}>
                <SignUp handleRegister={handleRegister} />
            </Modal>

        </div>
    );

}