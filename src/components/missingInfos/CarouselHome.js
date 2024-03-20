import { Carousel } from 'antd';
import Image from 'next/image';
import styles from './carouselHome.module.css';
import { lexend } from "../../app/fonts";

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
                            <h2>Avant le voyage</h2>
                            <div className={styles.descCarousel}>
                                <h3>Bienvenue sur GroupTravel</h3>
                                <p className={lexend.className}>Choisis un nom pour ton groupe de voyage,<br/>
                                    Dis nous les dates de ton départ et celles de ton arrivée,<br/>
                                    Précise nous l'endroit idéal pour partir en vacances ...<br/>
                                    ... et c'est parti !
                                    
                                </p>
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
                            <h2>Pendant le voyage</h2>
                            <div className={styles.descCarousel}>
                                <h3>Planifiez en toute simplicité grâce à Group Travel !</h3>
                                <p>Découvres nos superbes fonctionnalités !<br/>
                                    Invite des amis,<br/>
                                    Puis, ensemble proposez des logements sympas et des activités merveilleuses (ou tranquilles),<br/>
                                    Donnez votre avis pour décider de ce que vous allez faire,<br/>                              
                                    Visualisez en quelques coup d'oeil de quoi votre voyage sera fait,<br/>
                                    Laissez des petits messages à vos amis et profitez des bons moments !                                
                                </p>
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
                            <h2>Après le voyage</h2>
                            <div className={styles.descCarousel}>
                                <h3>C'est simple d'y revenir</h3>
                                <p>Après ces bons moments passés ensembles<br/>
                                Revenez vous rappeler de vos derniers voyages ...<br/>
                                ... puis en créer de nouveaux !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
    )
}