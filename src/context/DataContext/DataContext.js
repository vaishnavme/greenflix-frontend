import { useContext ,createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useLoader } from "..";
import { dataReducer } from "./data-reducer";
import { useAuth } from "../AuthContext/AuthContext";
import { BASE_URI } from "../../api";

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
            const response = await axios.get(`${BASE_URI}/videos`);

            dispatch({type: "SET_DATA", payload: response.data.video})
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getUserData = async() => {
        try {
            const {data: {playlistVideos: likedvideos}} = await axios.get(`${BASE_URI}/playlist/liked`);
            dispatch({type: "SET_LIKED", payload: likedvideos.video})
        
            const { data: {playlistVideos: watchlaters} } = await axios.get(`${BASE_URI}/playlist/watch`);
            dispatch({type: "SET_WATCHLATER", payload: watchlaters.video})
           
            const { data: {playlists}} = await axios.get(`${BASE_URI}/playlist`);
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