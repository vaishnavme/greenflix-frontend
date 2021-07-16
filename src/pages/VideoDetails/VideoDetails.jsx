import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useData, useAuth, useLoader } from "../../context";
import { LoginModal, Loader, checkIn } from "../../components";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";
import axios from "axios";

export default function VideoDetails() {
    const {   
        likedvideos, 
        watchlater, 
        addToLikedVideos,
        removeLikedVideos,
        addToWatchLater,
        removeWatchlater
    } = useData();
    const { isLoading, setLoading } = useLoader();

    const { user } = useAuth();
    const [videoInfo, setVideoInfo] = useState();
    //const [newPlaylistName, setNewPlaylistName] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false)
    //const [showMenu, setShowMenu] = useState(false);
    const { id } = useParams();

    // get videos details from params
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {data: {success, video}} = await axios.get(`https://greenflix.herokuapp.com/videos/${id}`);
                if(success) {
                    setVideoInfo(video)
                }
                setLoading(false);
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    },[id, setLoading])

    const quickActionHandler = (action, videoId, collection) => {
        if(user) {
            switch(action) {
                case "LIKED":
                    checkIn(collection, videoId) ?
                        removeLikedVideos({videoId: videoId})
                    : addToLikedVideos({videoId: videoId})
                    break;
                
                case "WATCH":
                    checkIn(collection, videoId) ?
                        removeWatchlater({videoId: videoId})
                    : addToWatchLater({videoId: videoId})
                    break;
                
                default:
                    break
            }
        } else {
            setShowLoginModal(true)
        }
    }

    // // check if video is in playlist
    // const getPlayListById = (playListID) => 
    //     playList.filter((playListItem) => playListItem.id === playListID)?.[0]
    
    // const isInPlayList = (playListID, videoId) => {
    //     const playListName = getPlayListById(playListID)
    //     return playListName.videos.find((video) => video._id === videoId)
    // }
    // const getPlayListByName = (playListName) =>
    //     playList.filter((playListItem) => playListItem.name === playListName)?.[0]
    
    // // adding new playlist
    // const createNewPlaylist = (e) => {
    //     !getPlayListByName(newPlaylistName) && dispatch({
    //         type: "NEW_PLAYLIST", 
    //         payload:{newPlaylist: newPlaylistName,
    //         videoInfo: videoInfo}
    //     })
    //     setNewPlaylistName("")
    // }

    // //toggle in playlist
    // const toggleInPlaylist = (playListIDName) => {
    //     user ?
    //         dispatch({
    //             type: "TOGGLE_IN_PLAYLIST",
    //             payload: {
    //                 playListID: playListIDName,
    //                 videoInfo: videoInfo
    //             }
    //         }) : setShowLoginModal(true)
    // }

    // const toggleMenu = () => {
    //     user ? setShowMenu(() => !showMenu) : setShowLoginModal(() => !showLoginModal)
    // }

    return (
        <>
        {isLoading && <Loader/>}
        {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal}/>}
        {
            videoInfo &&
            <div className={`${styles.videoDetails}`}>
            <div>
                <ReactPlayer
                        className={styles.reactPlayer}
                        url={`https://www.youtube.com/watch?v=${videoInfo.link}`}
                        width="100%"
                        height="100%"
                        controls
                        pip
                    />
            </div>
            <div className={`${styles.about}`}>
                <div className={`${styles.aboutInfo}`}>
                    <div className={`${styles.title}`}>{videoInfo.title}</div>
                    <div className={`${styles.description}`}>{videoInfo.description}</div>
                </div>
                <div className={`${styles.aboutAction}`}>
                    <a href={videoInfo.channellink} target="_blank" rel="noreferrer">
                        <div className={`${styles.channel}`}>
                            <img className={`${styles.channelProfile}`} src={videoInfo.profilelink} alt={videoInfo.name}/>
                            <div className={`${styles.channelName}`}>{videoInfo.name}</div>
                        </div>
                    </a>
                    
                    <div className={`${styles.aboutButtons}`}>
                        <button 
                            className={`${styles.btnIcon}`}
                            onClick={() => quickActionHandler("LIKED", videoInfo._id, likedvideos)}> 
                                {checkIn(likedvideos, videoInfo._id) ? 
                                <i className="bx bxs-heart"></i>
                                : <i className="bx bx-heart"></i>}
                        </button>
                        <button
                            className={`${styles.btnIcon}`}
                            onClick={() => quickActionHandler("WATCH", videoInfo._id, watchlater)}>
                                {checkIn(watchlater, videoInfo._id) ? 
                                <i className="bx bxs-stopwatch"></i> 
                                : <i className="bx bx-stopwatch"></i>}
                        </button>
                        {/* <button 
                            onClick={toggleMenu}
                            className={`${styles.btnIcon}`}>
                            <span className={`material-icons`}>playlist_add</span>
                        </button>
                        {
                            showMenu && (
                            <div className={`${styles.menu}`}>
                                <ul className={`simple-list`}>
                                { playList &&
                                    playList.map((playListItem) => (
                                        <li className={`h6`} key={playListItem.id}>
                                            <input
                                                className={`mr-2`}
                                                type="checkbox"
                                                checked={isInPlayList(playListItem.id, videoInfo._id)}
                                                value={playListItem.id}
                                                onChange={() => toggleInPlaylist(playListItem.id)}
                                            />{playListItem.name}
                                        </li>
                                    ))
                                }
                                </ul>
                                <div className={`${styles.menuHeader}`}>
                                    <div className={`styled-input`}>
                                        <input
                                            className={`${styles.inputField}`}
                                            onChange={(e) => setNewPlaylistName(e.target.value)}
                                            type="text" 
                                            placeholder="playlist"/>
                                            <span></span>
                                    </div>
                                </div>
                                <div className={`${styles.menuFooter}`}>
                                    <button 
                                        className={`btn btn-secondary w40`}
                                        onClick={toggleMenu}>CLOSE
                                    </button>
                                    <button 
                                        onClick={(e) => createNewPlaylist(e)}
                                        className={`btn btn-secondary w40`}>CREATE
                                    </button>
                                </div>
                            </div>
                            )
                        } */}
                    </div>
                </div>
            </div> 
        </div>}
        </>
    )
}

