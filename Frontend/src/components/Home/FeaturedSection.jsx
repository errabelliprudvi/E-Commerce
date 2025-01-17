import pex from '../../assets/pex.jpg';
import cam from '../../assets/cam.jpg';
import stu from '../../assets/stu.jpg';
import styles from './featuredSection.module.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL_IMAGE = import.meta.env.VITE_IMAGE_URL;

export default function FeaturedSection({ name ,products}) {
    const items = [pex, cam, pex, stu];
    const navigate = useNavigate();
    const handleClickBtn = () => {
        console.log("Button clicked!");
       navigate('/shop');
      };
      const handleClickImg = (id) => {
        console.log("Button clicked!");
       navigate(`/product/${id}`);
      };

    return (
        <div className={styles.mainCnt}>
            <div className={styles.heading}>{name}</div>
            <div className={styles.listCnt}>
                {products.map((item, index) => {
                    const { _id, name, description, images, category } = item;
                   return (
                    <div key={_id} className={styles.imgCnt} onClick={()=>handleClickImg(_id)}>
                        <img src={`${BASE_URL_IMAGE}/images/${category}/${name}/${images[0]}`}alt={`Featured ${index}`} />
                    </div>
                )})};
            </div>
            <div className={styles.btnCnt}>
                <div className={styles.btn} onClick={handleClickBtn}>View More</div>
            </div>
        </div>
    );
}
