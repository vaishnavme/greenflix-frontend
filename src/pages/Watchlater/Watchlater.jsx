import { useData } from "../../context";
import { VideoCard } from "../../components";
import styles from "./PlaylistPage.module.css";

export default function Watchlater() {
    const { watchlater } = useData();

    return (
        <div>
            <div className={`h2`}>Watch Later</div>
            <div className={`${styles.videoGrid}`}>
                {
                    watchlater.map((video) => (
                        <VideoCard key={video._id} video={video}/>
                    ))
                }
            </div>
        </div>
    )
}