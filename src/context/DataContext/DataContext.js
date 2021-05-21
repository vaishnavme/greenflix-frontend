import { useContext ,createContext, useReducer } from "react";
import {dataReducer} from "./data-reducer";

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
    const [state, dispatch] = useReducer(dataReducer, initailState);

    return (
        <DataContext.Provider value={{
            allVideos: state.allVideos,
            playList: state.playList,
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)