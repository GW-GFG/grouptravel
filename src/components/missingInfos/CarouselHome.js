import { Carousel } from 'antd';
import Image from 'next/image';
import styles from './carouselHome.module.css';

export default function CarouselHome() {

    const contentStyle = {
        height: '25rem',
        color: '#3B3938',
        lineHeight: '25rem',
        textAlign: 'center',
        //background: '#364d79',
      };

    return (
        <Carousel autoplay>
            <div>
                <div style={contentStyle}>
                    <div className={styles.container}> 
                        <div className={styles.imgCarousel}>
                            <Image src='/photo1_carousel.jpg' alt='Prepare your journey' fill={true}/>
                        </div>
                        
                        <div className={styles.txtCarousel}>
                            <h3>Avant le voyage</h3>
                            <div className={styles.descCarousel}>
                                <p>Superbes fonctionnalités !</p>
                                <p>Planifiez en toute simplicité grace à Group Travel ! </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <div style={contentStyle}>
                    <div className={styles.container}> 
                        <div className={styles.imgCarousel}>
                            <Image src='/groupfriend.jpg' alt='Group of friends' fill={true}/>
                        </div>
                        
                        <div className={styles.txtCarousel}>
                            <h3>Pendant le voyage</h3>
                            <div className={styles.descCarousel}>
                                <p>Superbes fonctionnalités !</p>
                                <p>Planifiez en toute simplicité grace à Group Travel ! </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <div style={contentStyle}>
                    <div className={styles.container}> 
                        <div className={styles.imgCarousel}>
                            <Image src='/photo3_carousel_v2.jpg' alt='Take-off airplane' fill={true}/>
                        </div>
                        
                        <div className={styles.txtCarousel}>
                            <h3>Après le voyage</h3>
                            <div className={styles.descCarousel}>
                                <p>Superbes fonctionnalités !</p>
                                <p>Planifiez en toute simplicité grace à Group Travel ! </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
    )
}