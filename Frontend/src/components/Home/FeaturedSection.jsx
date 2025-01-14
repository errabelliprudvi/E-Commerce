import pex from '../../assets/pex.jpg';
import cam from '../../assets/cam.jpg';
import stu from '../../assets/stu.jpg';
import styles from './featuredSection.module.css';
export default function FeaturedSection({ name }) {
    const items = [pex, cam, pex, stu];

    return (
        <div className={styles.mainCnt}>
            <div className={styles.heading}>{name}</div>
            <div className={styles.listCnt}>
                {items.map((item, index) => (
                    <div key={index} className={styles.imgCnt}>
                        <img src={item} alt={`Featured ${index}`} />
                    </div>
                ))}
            </div>
            <div className={styles.btnCnt}>
                <div className={styles.btn}>View More</div>
            </div>
        </div>
    );
}
