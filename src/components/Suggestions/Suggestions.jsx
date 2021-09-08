import { Link } from 'react-router-dom';
import { useData } from '../../context';
import styles from './Suggestion.module.css';

export const Suggestions = ({ currentVideoId }) => {
    const { allVideos } = useData();

    const suggestedVideos = allVideos
        .filter((video) => video._id !== currentVideoId)
        .splice(0, 5);
    return (
        <div>
            <h1>Watch next</h1>
            <div>
                {suggestedVideos &&
                    suggestedVideos.map((video) => (
                        <Link
                            key={video._id}
                            to={`/${video._id}`}
                            className={`${styles.card}`}
                        >
                            <div>
                                <img
                                    src={video.image}
                                    alt={video.title}
                                    className={styles.cardImage}
                                />
                            </div>
                            <div>
                                <h1 className={styles.cardTitle}>
                                    {video.title}
                                </h1>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};
