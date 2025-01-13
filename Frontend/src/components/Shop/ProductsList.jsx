
import styles from './productsList.module.css'
import pex from '../../assets/pex.jpg'
import cam from '../../assets/cam.jpg'
import stu from '../../assets/stu.jpg'
import MediaCard from './MediaCard'

export default function ProductsList({items})
{
   // const items = [{img:stu,name:'Mens',price:'$34.2'}]
   /* const items = [{img:stu,name:'Mens',price:'$34.2'},{img:pex,name:'Women',price:'$34.2'},{img:cam,name:'Jeans',price:'$34.2'},
        {img:stu,name:'Children',price:'$34.2'},{img:stu,name:'Mens',price:'$34.2'},{img:pex,name:'Women',price:'$34.2'},{img:cam,name:'Jeans',price:'$34.2'},
        {img:stu,name:'Children',price:'$34.2'},
        {img:stu,name:'Mens',price:'$34.2'},{img:pex,name:'Women',price:'$34.2'},{img:cam,name:'Jeans',price:'$34.2'},
        {img:stu,name:'Children',price:'$34.2'},{img:stu,name:'Mens',price:'$34.2'},{img:pex,name:'Women',price:'$34.2'},{img:cam,name:'Jeans',price:'$34.2'},
        {img:stu,name:'Children',price:'$34.2'}]

        */
    return(
        <div className={styles.gridContainer }>
                {items.map((i)=>
                (
                    <div key={i._id} className={styles.imgCnt}>
                       <MediaCard item={i}/>

                    </div>
                ))}
        </div>
    )
}