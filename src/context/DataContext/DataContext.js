import { useContext ,createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useLoader } from "..";
import { dataReducer } from "./data-reducer";
import { useAuth } from "../AuthContext/AuthContext";

const initailState = {
    allVideos: [],
    likedvideos: [],
    watchlater: [],
}

const DataContext = createContext();

export function DataProvider({children}) {
    const { user, token } = useAuth();
    const { isLoading, setLoading } = useLoader();
    const [{
        allVideos, 
        likedvideos, 
        watchlater
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
            setLoading(true);
            const { data: {likedvideos} } = await axios.get(`/liked/}`);
            dispatch({type: "SET_LIKED", payload: likedvideos})
        
            const { data: {watchlater} } = await axios.get(`/watchlater`);
            dispatch({type: "SET_WATCHLATER", payload: watchlater})
           
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVideos();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        token && getUserData();
        // eslint-disable-next-line
    },[token, user])

    return (
        <DataContext.Provider value={{
            allVideos,
            likedvideos,
            watchlater,
            dispatch,
            isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)