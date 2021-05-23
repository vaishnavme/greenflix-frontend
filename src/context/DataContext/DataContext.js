import { useContext ,createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useLoader } from "..";
import { dataReducer } from "./data-reducer";
import { useAuth } from "../AuthContext/AuthContext";

const initailState = {
    allVideos: [],
    likedVideos: [],
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
    const {isLoading, setLoading} = useLoader();
    const [state, dispatch] = useReducer(dataReducer, initailState);


    const addToLikedVideos = async({videoId}) => {
        const {data: {success}} = await axios.post(`/${user._id}/${videoId}`);
        if(success) {
            getLikedVideos();
        }
    }

    const getVideos = async() => {
        try {
            setLoading(true);
            const { data: {success, video} } = await axios.get('/videos');
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
            dispatch,
            isLoading,
            setLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)