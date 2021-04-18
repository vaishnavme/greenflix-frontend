import { Link } from "react-router-dom"
import styles from "./VideoCard.module.css";

export const VideoCard = ({video}) => {
    return (
        <Link to={`/video/${video.id}`}>
            <div className={`${styles.videoCard}`}>
                <img className={`${styles.thumbnail}`} src={video.thumbnail} alt={video.title}/>
                <div className={`${styles.cardBody}`}>
                    <div className={`${styles.title}`}>{video.title}</div>
                    <div className={`${styles.creator}`}>{video.creator}</div>
                </div>
            </div>
        </Link>
    )
}