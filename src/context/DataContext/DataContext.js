import { useContext ,createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth, useLoader } from "..";
import { dataReducer } from "./data-reducer";

const initailState = {
    allVideos: [],
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
    const {isLoading, setLoading} = useLoader();
    const [state, dispatch] = useReducer(dataReducer, initailState);

    const getVideos = async() => {
        try {
            setLoading(true);
            const { data: {success, video} } = await axios.get('/videos');
            console.log(success, video)
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

    useEffect(() => {
        getVideos();
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