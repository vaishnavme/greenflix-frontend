import { useData } from "../../context/data-context";
import { VideoCard } from "../../components";
import styles from "./Home.module.css";

export default function Home() {
    const { allVideos } = useData();
  
    return (
        <div>
            <div className={`h2`}>Home</div>
            <div className={`${styles.videoGrid}`}>
                {
                    allVideos.map((video) => (
                        <VideoCard key={video.id} video={video}/>
                    ))
                }
            </div>
        </div>
    )
}