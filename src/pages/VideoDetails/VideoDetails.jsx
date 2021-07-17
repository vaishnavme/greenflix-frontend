import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useData, useAuth, useLoader } from "../../context";
import { LoginModal, Loader, alreadyExist,InputField } from "../../components";
import { toggleLikeVideos, toggleWatchLater } from "../../services/toggleInPlaylist";
import styles from "./VideoPlayer.module.css";


export default function VideoDetails() {
    const { LikedVideos, WatchLater, Playlist, dispatch } = useData();
    const { isLoading, setLoading } = useLoader();
    const [videoInfo, setVideoInfo] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [playlistName, setPlaylistName] = useState("")
    const { user } = useAuth();
    const { id } = useParams();

    // get videos details from params
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {data: {video}} = await axios.get(`https://greenflix.herokuapp.com/videos/${id}`);
                    setVideoInfo(video)
                setLoading(false);
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    },[id, setLoading])

    const addToLiked = (videoInfo) => {
        user ? (
            alreadyExist(LikedVideos, videoInfo._id) ?
            toggleLikeVideos({
                video: videoInfo,
                action: "REMOVE",
                dispatch
            })
            : toggleLikeVideos({
                video: videoInfo,
                action: "ADD",
                dispatch
            })
        ) : setShowModal(true)
    }

    const addToWatchLater = (videoInfo) => {
        user ? (
            alreadyExist(WatchLater, videoInfo._id) ?
            toggleWatchLater({
                video: videoInfo,
                action: "REMOVE",
                dispatch
            })
            : toggleWatchLater({
                video: videoInfo,
                action: "ADD",
                dispatch
            })
        ) : setShowModal(true)
    }

    const setModelVisibility = () => {
        setShowModal(() => !showModal);
    }

    const create = () => {
        console.log(playlistName)
    }

    return (
        <>
        {isLoading && <Loader/>}
        {showModal && <LoginModal setModelVisibility={setModelVisibility}/>}
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
                            onClick={() => addToLiked(videoInfo)}> 
                                <i className={`bx ${alreadyExist(LikedVideos, videoInfo._id) ? "bxs-heart" : "bx-heart"} `}></i>
                        </button>
                        <button
                            className={`${styles.btnIcon}`}
                            onClick={() => addToWatchLater(videoInfo)}>
                                <i className={`bx ${alreadyExist(WatchLater, videoInfo._id) ? "bxs-stopwatch" : "bx-stopwatch"} `}></i>
                        </button>
                        <button
                            className={`${styles.btnIcon}`}
                            onClick={() => setShowMenu(prevState => !prevState)}>
                                <i className="bx bxs-playlist"></i>
                        </button>
                        {
                            showMenu && 
                            <div className={`modal`}>
                                <div className={`modal-body`}>Create new playlist</div>
                                <InputField
                                    name="playlistName"
                                    type="text"
                                    labelName="Create Playlist" 
                                    onChangeOperation={(e) => setPlaylistName(e.target.value)}
                                />
                                <button 
                                    onClick={() => setShowMenu(prevState => !prevState)}
                                    className={`btn btn-secondary`}>Cancel</button>
                                <button 
                                    onClick={() => create()}
                                    className={`btn btn-secondary`}>Create</button>
                            </div>
                        }
                    </div>
                </div>
            </div> 
        </div>}
        </>
    )
}