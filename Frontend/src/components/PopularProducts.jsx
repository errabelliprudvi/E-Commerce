import pex from '../assets/pex.jpg';
import cam from '../assets/cam.jpg';
import stu from '../assets/stu.jpg';
import styles from './popularProducts.module.css';

export default function PopularProducts() {
    const items = [stu, pex, cam, stu];
    return (
        <div className={styles.mainCnt}>
            <div className={styles.heading}>Popular Products</div>
            <div className={styles.listCnt}>
                {items.map((item, index) => (
                    <div key={index} className={styles.imgCnt}>
                        <img src={item} alt={`Product ${index}`} />
                        <div className={styles.btn}>Add to Cart</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
