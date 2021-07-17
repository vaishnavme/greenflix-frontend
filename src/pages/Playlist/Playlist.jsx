import { Link } from "react-router-dom";
import { useData } from "../../context"
import styles from "./Playlist.module.css";

export default function Playlists() {
    const { LikedVideos, WatchLater } = useData();
    return (
        <div className={`${styles.main}`}>
            {
                LikedVideos.length === 0 ?
                <div>
                    <div className={`h4`}>Liked Videos</div>
                    <div className={`${styles.emptyCard}`}>
                        <div>No Liked Videos</div>
                    </div>
                </div>
                :
                <div>
                    <div className={`h4`}>Liked Videos</div>
                    {
                        <Link to={`/playlist/liked`}>
                            <div className={`${styles.thumbnail}`}>
                                <img 
                                    className={`${styles.image}`} 
                                    src={LikedVideos?.[0].image} 
                                    alt={LikedVideos?.[0].title}
                                />  
                                <div className={`${styles.overlay}`}>
                                    <p><i className='bx bxs-playlist h2'></i></p>
                                </div>  
                            </div>
                        </Link>
                    }
                </div>
            }
            {
                WatchLater.length === 0 ?
                <div>
                    <div className={`h4`}>Watch Later</div>
                    <div className={`${styles.emptyCard}`}>
                        <div>Nothing in Watch Later</div>
                    </div>
                </div>
                :
                <div>
                    <div className={`h4`}>Watch Later</div>
                    {
                        <Link to={`/playlist/watch`}>
                            <div className={`${styles.thumbnail}`}>
                                <img 
                                    className={`${styles.image}`} 
                                    src={WatchLater?.[0].image} 
                                    alt={WatchLater?.[0].title}
                                />  
                                <div className={`${styles.overlay}`}>
                                    <p><i className='bx bxs-playlist h2'></i></p>
                                </div>  
                            </div>
                        </Link>
                    }
                </div>
            }
        </div>
    )
}