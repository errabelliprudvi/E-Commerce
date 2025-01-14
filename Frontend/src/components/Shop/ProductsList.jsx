
import styles from './productsList.module.css'
import MediaCard from './MediaCard'

export default function ProductsList({items})
{

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