import { useParams } from "react-router-dom";
import { useState } from "react";
import { useData, useAuth } from "../../context";
import { LoginModal } from "../../components";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";

export default function VideoDetails() {
    const { allVideos, playList, dispatch } = useData();
    const { isUserLogin } = useAuth();

    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const { id } = useParams();

    // get videos details from params
    const getVideoDetails = (allVideosList, id) => {
        return allVideosList.find((video) => video.id === id);
    }
    const videoInfo = getVideoDetails(allVideos, id)
    
    // check if video is in playlist
    const getPlayListById = (playListID) => 
        playList.filter((playListItem) => playListItem.id === playListID)?.[0]
    
    const isInPlayList = (playListID, videoId) => {
        const playListName = getPlayListById(playListID)
        return playListName.videos.find((video) => video.id === videoId)
    }
    const getPlayListByName = (playListName) =>
        playList.filter((playListItem) => playListItem.name === playListName)?.[0]
    
    // adding new playlist
    const createNewPlaylist = (e) => {
        !getPlayListByName(newPlaylistName) && dispatch({
            type: "NEW_PLAYLIST", 
            payload:{newPlaylist: newPlaylistName,
            videoInfo: videoInfo}
        })
        setNewPlaylistName("")
    }

    //toggle in playlist
    const toggleInPlaylist = (playListIDName) => {
        isUserLogin ?
            dispatch({
                type: "TOGGLE_IN_PLAYLIST",
                payload: {
                    playListID: playListIDName,
                    videoInfo: videoInfo
                }
            }) : setShowLoginModal(true)
    }

    const toggleMenu = () => {
        isUserLogin ? setShowMenu(() => !showMenu) : setShowLoginModal(() => !showLoginModal)
    }

    return (
        <div className={`${styles.videoDetails}`}>
            <div>
                <ReactPlayer
                        className={styles.reactPlayer}
                        url={`https://www.youtube.com/watch?v=${videoInfo.id}`}
                        width="100%"
                        height="100%"
                        controls
                        pip
                    />
            </div>
            {
                showLoginModal &&
                <LoginModal setShowLoginModal={setShowLoginModal}/>
            }
            <div className={`${styles.about}`}>
                <div className={`${styles.aboutInfo}`}>
                    <div className={`${styles.title}`}>{videoInfo.title}</div>
                    <div className={`${styles.description}`}>{videoInfo.description}</div>
                </div>
                <div className={`${styles.aboutAction}`}>
                    <a href={videoInfo.channel} target="_blank" rel="noreferrer">
                        <div className={`${styles.channel}`}>
                            <img className={`${styles.channelProfile}`} src={videoInfo.profile} alt={videoInfo.name}/>
                            <div className={`${styles.channelName}`}>{videoInfo.name}</div>
                        </div>
                    </a>
                    
                    <div className={`${styles.aboutButtons}`}>
                        <button 
                            className={`${styles.btnIcon}`}
                            onClick={() => toggleInPlaylist("likedVideo")}> 
                                {isInPlayList("likedVideo", videoInfo.id) ? 
                                <span className={`material-icons`}>favorite</span> 
                                : <span className={`material-icons`}>favorite_border</span>}
                        </button>
                        <button
                            className={`${styles.btnIcon}`}
                            onClick={() => toggleInPlaylist("watchLater")}>
                                {isInPlayList("watchLater", videoInfo.id) ? 
                                <span className={`material-icons`}>watch_later</span> 
                                : <span className={`material-icons`}>schedule</span>}
                        </button>
                        <button 
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
                                                checked={isInPlayList(playListItem.id, videoInfo.id)}
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
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

