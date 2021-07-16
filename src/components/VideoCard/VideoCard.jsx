import { Link } from "react-router-dom"
import styles from "./VideoCard.module.css";

export const VideoCard = ({video}) => {
    return (
        <Link to={`/${video._id}`} className={`${styles.card}`}>
            <div className={`${styles.videoCard}`}>
                <img className={`${styles.thumbnail}`} src={video.image} alt={video.title}/>
                <div className={`${styles.cardBody}`}>
                    <div className={`${styles.title}`}>{video.title}</div>
                    <div className={`${styles.creator}`}>{video.creator}</div>
                </div>
            </div>
        </Link>
    )
}