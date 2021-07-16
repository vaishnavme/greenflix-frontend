import { useContext ,createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useLoader } from "..";
import { dataReducer } from "./data-reducer";
import { useAuth } from "../AuthContext/AuthContext";

const initailState = {
    allVideos: [],
    likedvideos: [],
    watchlater: [],
    playList : [
        {
            id: "likedVideo",
            name: "Liked Videos",
            videos: []
        },
        {
            id: "watchLater",
            name: "Watch Later",
            videos: []
        }
    ]
}

const DataContext = createContext();

export function DataProvider({children}) {
    const { user } = useAuth();
    const {setLoading} = useLoader();
    const [state, dispatch] = useReducer(dataReducer, initailState);

    const addToLikedVideos = async({videoId}) => {
        try {
            const { data:{success} } = await axios.post(`/liked/${user._id}/${videoId}`)
            if(success) {
                getLikedVideos();
            }
        } catch(err) {
            console.log(err);
        }
    }

    const removeLikedVideos = async({videoId}) => {
        try {
            const { data: {success} } = await axios.delete(`/liked/${user._id}/${videoId}`)
            if(success) {
                getLikedVideos();
            }
        } catch(err) {
            console.log(err);
        }
    }

    const addToWatchLater = async({videoId}) => {
        try {
            const { data:{success} } = await axios.post(`/watchlater/${user._id}/${videoId}`)
            if(success) {
                getWatchlater();
            }
        } catch(err) {
            console.log(err);
        }
    }

    const removeWatchlater = async({videoId}) => {
        try {
            const { data: {success} } = await axios.delete(`/watchlater/${user._id}/${videoId}`)
            if(success) {
                getWatchlater();
            }
        } catch(err) {
            console.log(err);
        }
    }

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

    const getLikedVideos = async() => {
        try {
            setLoading(true);
            const { data: {success, likedvideos} } = await axios.get(`/liked/${user._id}`);
            console.log(likedvideos)
            if(success) {
                dispatch({type: "SET_LIKED", payload: likedvideos})
            }
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getWatchlater = async() => {
        try {
            setLoading(true);
            const { data: {success, watchlater} } = await axios.get(`/watchlater/${user._id}`);
            if(success) {
                dispatch({type: "SET_WATCHLATER", payload: watchlater})
            }
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getVideos();
        getLikedVideos();
        getWatchlater();
        // eslint-disable-next-line
    }, [])

    return (
        <DataContext.Provider value={{
            allVideos: state.allVideos,
            playList: state.playList,
            likedvideos: state.likedvideos,
            watchlater: state.watchlater,
            dispatch,
            addToLikedVideos,
            removeLikedVideos,
            addToWatchLater,
            removeWatchlater
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)