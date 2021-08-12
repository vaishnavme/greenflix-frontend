import axios from "axios"
import { BASE_URI } from "../api";
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const createPlaylist = async({playlistName, video, dispatch}) => {
    try {
        const response = await axios.post(`${BASE_URI}/playlist/create/${video._id}`, {
            playlistName
        });

        successNotification("New Playlist Created");
        dispatch({type: "CREATE_PLAYLIST", payload: response.data.playlist})

    } catch(err) {
        errorNotification("Error Occured!")
        console.log("error", err)
    }
} 

export const removeFromPlaylist = async({playListId, video, dispatch}) => {
    try {
        const {data: {playlistId, videoId}} = await axios.delete(`${BASE_URI}/playlist/${playListId}/${video._id}`);
        dispatch({type: "REMOVE_FROM_PLAYLIST", payload: {playlistId, videoId}})
        successRemoveNotification("Removed from playlist")

    } catch(err) {
        errorNotification("Error Occured!")
        console.log("error", err)
    }
}

export const addToPlaylist = async({playListId, video, dispatch}) => {
    try {
        const {data: {playlistId}} = await axios.post(`${BASE_URI}/playlist/${playListId}/${video._id}`);
        dispatch({type: "ADD_TO_PLAYLIST", payload: {playlistId, video}})
        successNotification("Added to Playlist")
    } catch(err) {
        errorNotification("Error Occured!")
        console.log("error", err)
    }
}

export const deleteUserPlaylist = async({playListId, dispatch}) => {
    try {
        const {data: {playlistId}} = await axios.delete(`${BASE_URI}/playlist/${playListId}`);
        dispatch({type: "DELETE_PLAYLIST", payload: playlistId});
        successRemoveNotification("Playlist deleted!")


    } catch(err) {
        errorNotification("Error Occured!")
        console.log("error", err)
    }
}

