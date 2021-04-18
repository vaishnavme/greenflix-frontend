import { useData } from "../../context";
import { PlaylistCard } from "../../components";
import styles from "./Playlist.module.css";

export default function Playlist() {
    const { playList } = useData();

    return (
        <div>
            <div className={`h2`}>Playlist</div>
            <div className={`${styles.playlist}`}>
                {
                    playList.map((playListItem) => (
                        <PlaylistCard key={playListItem.id} playListItem={playListItem}/>
                    ))
                }
            </div>
        </div>
    )
}