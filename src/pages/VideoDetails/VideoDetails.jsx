import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useData, useAuth, useLoader } from '../../context';
import {
    LoginModal,
    Loader,
    alreadyExist,
    InputField,
    Suggestions
} from '../../components';
import { BASE_URI } from '../../api';
import {
    toggleLikeVideos,
    toggleWatchLater,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist
} from '../../services';
import styles from './VideoPlayer.module.css';

export default function VideoDetails() {
    const { LikedVideos, WatchLater, Playlist, dispatch } = useData();
    const { isLoading, setLoading } = useLoader();
    const [videoInfo, setVideoInfo] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const { user } = useAuth();
    const { videoId } = useParams();

    const isInPlaylist = (playlistId) => {
        const playlist = Playlist.filter(
            (item) => item._id === playlistId
        )?.[0];
        return playlist.video.find((videoItem) => videoItem._id === videoId);
    };

    // get videos details from params
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {
                    data: { video }
                } = await axios.get(`${BASE_URI}/videos/${videoId}`);
                setVideoInfo(video);
                setLoading(false);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [videoId, setLoading]);

    const addToLiked = (videoInfo) => {
        user
            ? alreadyExist(LikedVideos, videoInfo._id)
                ? toggleLikeVideos({
                      video: videoInfo,
                      action: 'REMOVE',
                      dispatch
                  })
                : toggleLikeVideos({
                      video: videoInfo,
                      action: 'ADD',
                      dispatch
                  })
            : setShowModal(true);
    };

    const addToWatchLater = (videoInfo) => {
        user
            ? alreadyExist(WatchLater, videoInfo._id)
                ? toggleWatchLater({
                      video: videoInfo,
                      action: 'REMOVE',
                      dispatch
                  })
                : toggleWatchLater({
                      video: videoInfo,
                      action: 'ADD',
                      dispatch
                  })
            : setShowModal(true);
    };

    const createNewPlaylist = async () => {
        await createPlaylist({
            playlistName: playlistName,
            video: videoInfo,
            dispatch
        });
        setPlaylistName('');
    };

    const toggleInPlaylist = async (playlistId) => {
        isInPlaylist(playlistId, videoId)
            ? await removeFromPlaylist({
                  playListId: playlistId,
                  video: videoInfo,
                  dispatch
              })
            : await addToPlaylist({
                  playListId: playlistId,
                  video: videoInfo,
                  dispatch
              });
    };

    const setModelVisibility = () => {
        setShowModal(() => !showModal);
    };

    return (
        <section className={styles.mainSection}>
            {isLoading && <Loader />}
            {showModal && (
                <LoginModal setModelVisibility={setModelVisibility} />
            )}
            <div className={styles.videoPlayer}>
                {videoInfo && (
                    <div>
                        <ReactPlayer
                            className={styles.reactPlayer}
                            url={`https:www.youtube.com/watch?v=${videoInfo.link}`}
                            width="100%"
                            height="100%"
                            controls
                            pip
                        />
                        <div>
                            <div className={styles.actionBar}>
                                <button
                                    className={`${styles.btnIcon}`}
                                    onClick={() => addToLiked(videoInfo)}
                                >
                                    <i
                                        className={`bx ${
                                            alreadyExist(
                                                LikedVideos,
                                                videoInfo._id
                                            )
                                                ? `bxs-heart ${styles.activeHeart}`
                                                : 'bx-heart'
                                        } `}
                                    ></i>
                                </button>
                                <button
                                    className={`${styles.btnIcon}`}
                                    onClick={() => addToWatchLater(videoInfo)}
                                >
                                    <i
                                        className={`bx ${
                                            alreadyExist(
                                                WatchLater,
                                                videoInfo._id
                                            )
                                                ? `bxs-stopwatch ${styles.activeWatch}`
                                                : 'bx-stopwatch'
                                        } `}
                                    ></i>
                                </button>
                                <button
                                    className={`${styles.btnIcon}`}
                                    onClick={() =>
                                        setShowMenu((prevState) => !prevState)
                                    }
                                >
                                    <i className="bx bxs-playlist"></i>
                                </button>
                                {showMenu && (
                                    <PlaylistMenu
                                        Playlist={Playlist}
                                        isInPlaylist={isInPlaylist}
                                        toggleInPlaylist={toggleInPlaylist}
                                        playlistName={playlistName}
                                        setPlaylistName={setPlaylistName}
                                        setShowMenu={setShowMenu}
                                        createNewPlaylist={createNewPlaylist}
                                    />
                                )}
                            </div>
                            <div>
                                <h1 className={styles.videoTitle}>
                                    {videoInfo.title}
                                </h1>
                                <p className={styles.description}>
                                    {videoInfo.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.suggestions}>
                <Suggestions currentVideoId={videoInfo?._id} />
            </div>
        </section>
    );
}

const PlaylistMenu = ({
    Playlist,
    isInPlaylist,
    toggleInPlaylist,
    playlistName,
    setPlaylistName,
    setShowMenu,
    createNewPlaylist
}) => {
    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.body}`}>
                <div className={`${styles.header}`}>
                    <div className={`text-center`}>Create new playlist</div>
                    <ul>
                        {Playlist &&
                            Playlist?.map((playlistItem) => (
                                <li
                                    key={playlistItem._id}
                                    className={`${styles.playlist}`}
                                >
                                    <input
                                        checked={
                                            !!isInPlaylist(playlistItem._id)
                                        }
                                        type="checkbox"
                                        onChange={() =>
                                            toggleInPlaylist(playlistItem._id)
                                        }
                                    />
                                    <p className={styles.space}>
                                        {playlistItem.playlistName}
                                    </p>
                                </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <InputField
                        name="playlistName"
                        type="text"
                        value={playlistName}
                        labelName="Create Playlist"
                        onChangeOperation={(e) =>
                            setPlaylistName(e.target.value)
                        }
                    />
                    <div className={`${styles.action}`}>
                        <button
                            onClick={() =>
                                setShowMenu((prevState) => !prevState)
                            }
                            className={`${styles.btn} ${styles.secondary}`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => createNewPlaylist()}
                            className={`${styles.btn} ${styles.primary}`}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
