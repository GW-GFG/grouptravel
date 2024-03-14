

import styles from './homeNotConnected.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../utils/Button';
import CarouselHome from './CarouselHome';

export default function HomeNotConnected() {


    return (
        <div className={styles.globalContainer}>
            <div className={styles.top}>
                <Image src='/photo_homepage.png' priority alt='Group of friends' fill={true}/>
                <div className={styles.topLeftContainer}>
                    <h2> Enfin un plaisir de planifier ses voyages</h2>
                    {/* <Button buttonClass='primary' style={{position: 'absolute', top: '40px', left: '40px', backgroundColor: '#f3ad68', border: 'none'}} text='Nouveau voyage'>
                        <Link href='/addTrip'>Nouveau compte</Link>
                    </Button> */}
                </div>
            </div>
            <div className={styles.middle}>
                <CarouselHome />
            </div>
            <div className={styles.bottom}>
                <h2>Planification de votre voyage entre amis</h2>
                <Link href='/addTrip'>
                    <Button buttonClass='primary' text='Créer votre compte' />
                </Link>
            </div>

        </div>
    );

}