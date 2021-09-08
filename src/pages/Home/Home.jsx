import { useData } from '../../context';
import { VideoCard, Loader } from '../../components';
import styles from './Home.module.css';

export default function Home() {
    const { allVideos, isLoading } = useData();

    return (
        <div>
            {isLoading && <Loader />}
            <div className={`${styles.videoGrid}`}>
                {allVideos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
}
