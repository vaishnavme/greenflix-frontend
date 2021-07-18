import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLoader } from "../../context";
import { VideoCard, Loader } from "../../components";
import axios from "axios";
import { BASE_URI } from "../../api";
import styles from "./Playlistpage.module.css"

export default function Playlistpage() {
    const [currentVideoList, setCurrentVideoList] = useState(null);
    const [errorMessage, setErrorMessage] = useState("")
    const { isLoading, setLoading } = useLoader();
    
    const { playlistId } = useParams();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {data: {playlistVideos}} = await axios.get(`${BASE_URI}/playlist/${playlistId}`);
                setCurrentVideoList(playlistVideos)
                setLoading(false);
            } catch(err) {
                setErrorMessage(err)
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    },[playlistId, setLoading])

    return (
        <div>
            {isLoading && <Loader/>}
            <div className="text-center">
                {
                    errorMessage && 
                    <p className="f-danger">{errorMessage}</p>
                }
            </div>
            <div className={`${styles.videoGrid}`}>
                {
                    currentVideoList &&
                    currentVideoList.map((video) => (
                        <VideoCard key={video._id} video={video}/>
                    ))
                }
            </div>
        </div>
    )
}