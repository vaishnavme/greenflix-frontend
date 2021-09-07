import { Link } from 'react-router-dom';
import styles from './PlaylistCard.module.css';

export const PlaylistCard = ({ playListItem }) => {
    console.log(playListItem);
    return (
        <div>
            <Link to={`${playListItem._id}`}>
                <div className={styles.videoCard}>
                    {playListItem.length !== 0 ? (
                        <div>
                            <img
                                className={`${styles.thumbnail}`}
                                src={playListItem.image}
                                alt={playListItem._id}
                            />
                        </div>
                    ) : (
                        <div className={`h6`}>No Videos in playlist</div>
                    )}
                </div>
            </Link>
        </div>
    );
};
