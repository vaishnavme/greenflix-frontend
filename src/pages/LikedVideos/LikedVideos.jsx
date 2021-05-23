import { useData } from "../../context";
import { VideoCard } from "../../components";
import styles from "./Liked.module.css";

export default function Likedvideos() {
    const { likedvideos } = useData();

    return (
        <div>
            <div className={`h2`}>Liked Videos</div>
            <div className={`${styles.videoGrid}`}>
                {
                    likedvideos.map((video) => (
                        <VideoCard key={video._id} video={video}/>
                    ))
                }
            </div>
        </div>
    )
}