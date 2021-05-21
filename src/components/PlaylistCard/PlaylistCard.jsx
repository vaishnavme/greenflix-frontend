import { Link } from "react-router-dom";
import styles from "./PlaylistCard.module.css";

export const PlaylistCard = ({playListItem}) => {
    return (
        <div>
            <h4>{playListItem.name}</h4>
            <Link to={`/playlist/${playListItem.id}`}>
                <div className={styles.videoCard}>
                    {
                        playListItem.videos.length !== 0 ?
                        <div>
                            <img 
                                className={`${styles.thumbnail}`}
                                src={playListItem.videos[0].image} 
                                alt={playListItem.videos[0]._id}/>
                        </div> : 
                        <div className={`h6`}>No Videos in playlist</div>
                    }
                </div>
            </Link>
        </div>
    )
}