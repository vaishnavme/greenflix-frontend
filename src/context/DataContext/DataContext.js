import { useContext ,createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useLoader } from "..";
import { dataReducer } from "./data-reducer";
import { useAuth } from "../AuthContext/AuthContext";

const initailState = {
    allVideos: [],
    LikedVideos: [],
    WatchLater: [],
    Playlist: []
}

const DataContext = createContext();

export function DataProvider({children}) {
    const { token } = useAuth();
    const { isLoading, setLoading } = useLoader();
    const [{
        allVideos, 
        LikedVideos, 
        WatchLater,
        Playlist
    }, dispatch] = useReducer(dataReducer, initailState);

    // get initial data
    const getVideos = async() => {
        try {
            setLoading(true);
            const { data: {success, video} } = await axios.get(`/videos`);
            if(success) {
                dispatch({type: "SET_DATA", payload: video})
            }
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getUserData = async() => {
        try {
            const {data: {playlistVideos: likedvideos}} = await axios.get(`/playlist/liked`);
            dispatch({type: "SET_LIKED", payload: likedvideos})
        
            const { data: {playlistVideos: watchlaters} } = await axios.get(`/playlist/watch`);
            dispatch({type: "SET_WATCHLATER", payload: watchlaters})
           
            const { data: {playlists}} = await axios.get(`/playlist`);
            dispatch({type: "SET_PLAYLIST", payload: playlists})
        } catch(err) {
            console.log(err);
        } 
      } 

    useEffect(() => {
        getVideos();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        token && getUserData();
        // eslint-disable-next-line
    },[])

    return (
        <DataContext.Provider value={{
            allVideos,
            LikedVideos,
            WatchLater,
            Playlist,
            dispatch,
            isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)