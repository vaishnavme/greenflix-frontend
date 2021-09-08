import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useLoader, useData } from '../../context';
import { VideoCard, Loader } from '../../components';
import axios from 'axios';
import { deleteUserPlaylist } from '../../services';
import { BASE_URI } from '../../api';
import styles from './Playlistpage.module.css';

export default function Playlistpage() {
    const { dispatch } = useData();
    const [currentVideoList, setCurrentVideoList] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { isLoading, setLoading } = useLoader();

    const { playlistId } = useParams();
    const navigate = useNavigate();

    const deletePlaylist = (playListId) => {
        deleteUserPlaylist({ playListId, dispatch });
        navigate(-1);
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {
                    data: { playlistVideos }
                } = await axios.get(`${BASE_URI}/playlist/${playlistId}`);
                setCurrentVideoList(playlistVideos);
                setLoading(false);
            } catch (err) {
                setErrorMessage(err);
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [playlistId, setLoading]);

    return (
        <div>
            {isLoading && <Loader />}
            <div className="text-center">
                {errorMessage && <p className="f-danger">{errorMessage}</p>}
            </div>
            {currentVideoList && (
                <div>
                    <div className={`${styles.header}`}>
                        <div className="h3">
                            {currentVideoList?.playlistName}
                        </div>
                        <div>
                            <button
                                onClick={() => deletePlaylist(playlistId)}
                                className={`${styles.deleteBtn}`}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className={`${styles.videoGrid}`}>
                        {currentVideoList.video.map((video) => (
                            <VideoCard key={video._id} video={video} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
