import axios from "axios"

export const createPlaylist = async({playlistName, video, dispatch}) => {
    try {
        const {data: {success, playlist}} = await axios.post(`/playlist/create/${video._id}`, {
            playlistName
        });
        if(success) {
            dispatch({type: "CREATE_PLAYLIST", payload: playlist})
        }
    } catch(err) {
        console.log("error", err)
    }
} 

export const removeFromPlaylist = async({playListId, video, dispatch}) => {
    try {
        const {data: {playlistId, videoId}} = await axios.delete(`/playlist/${playListId}/${video._id}`);
        dispatch({type: "REMOVE_FROM_PLAYLIST", payload: {playlistId, videoId}})

    } catch(err) {
        console.log("error", err)
    }
}

export const addToPlaylist = async({playListId, video, dispatch}) => {
    try {
        const {data: {playlistId}} = await axios.post(`/playlist/${playListId}/${video._id}`);
        dispatch({type: "ADD_TO_PLAYLIST", payload: {playlistId, video}})

    } catch(err) {
        console.log("error", err)
    }
}