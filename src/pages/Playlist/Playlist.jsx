import { Link } from "react-router-dom";
import { useData } from "../../context"
import { deleteUserPlaylist } from "../../services";
import styles from "./Playlist.module.css";

export default function Playlists() {
    const { LikedVideos, WatchLater, Playlist, dispatch } = useData();

    const deletePlaylist = async(playListId) => {
        await deleteUserPlaylist({playListId, dispatch})
    }
    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.block}`}>
            {
                LikedVideos.length === 0 ?
                null
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
                                    <p><i className='bx bxs-playlist h2'></i><span>{LikedVideos?.length}</span></p>
                                </div>  
                            </div>
                        </Link>
                    }
                </div>
            }
            {
                WatchLater.length === 0 ?
                null
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
                                    <p><i className='bx bxs-playlist h2'></i><span>{WatchLater?.length}</span></p>
                                </div>  
                            </div>
                        </Link>
                    }
                </div>
            }
            </div>
            {
                Playlist.length === 0 ?
                null
                :
                <div>
                    <div className={`h4`}>User Playlists</div>
                    <div className={`${styles.block}`}>
                    {
                        Playlist.map((userPlaylist) => (
                            <div key={userPlaylist._id}>
                                <div className={`h4`}>{userPlaylist.playlistName}</div>
                                <Link to={`/playlist/${userPlaylist._id}`}>
                                    <div className={`${styles.thumbnail}`}>
                                        <img 
                                            className={`${styles.image}`} 
                                            src={userPlaylist?.video[0].image} 
                                            alt={userPlaylist?.video[0].title}
                                        />  
                                        <div className={`${styles.overlay}`}>
                                            <p><i className='bx bxs-playlist h2'></i><span>{userPlaylist?.video.length}</span></p>
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => deletePlaylist(userPlaylist._id)} 
                                    className={`${styles.deleteBtn}`}>
                                        Delete
                                </button>
                            </div>
                        ))
                    }
                    </div>
                </div>
            }
        </div>
    )
}