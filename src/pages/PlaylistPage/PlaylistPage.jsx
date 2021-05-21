import { useParams } from "react-router-dom";
import { useData } from "../../context";
import { VideoCard } from "../../components";
import styles from "./PlaylistPage.module.css";

export default function PlaylistPage() {
    const { playList } = useData();
    const { id } = useParams();

    const playlist = playList.find(
        (playlistItem) => playlistItem.id === id
    )

    return (
        <div>
            <div className={`h2`}>{playlist.name}</div>
            <div className={`${styles.videoGrid}`}>
                {
                    playlist.videos.map((video) => (
                        <VideoCard key={video._id} video={video}/>
                    ))
                }
            </div>
        </div>
    )
}