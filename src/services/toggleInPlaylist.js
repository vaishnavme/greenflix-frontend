import axios from "axios";
import { BASE_URI } from "../api";
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const toggleLikeVideos = async({
    video, action, dispatch
}) => {
    try {
        const response = await axios.post(`${BASE_URI}/playlist/liked/${video._id}`, {
            type: action
        })

        if(action === "REMOVE") {
            successRemoveNotification("Removed from Liked Videos!")
            dispatch({type: "REMOVE_FROM_LIKED", payload: response.data.videoId})
        } else {
            successNotification("Added to Liked Videos!");
            dispatch({type: "ADD_TO_LIKED", payload: video})
        }
    } catch(err) {
        errorNotification("Error Occured!")
        console.log(err)
    }
}

export const toggleWatchLater = async({
    video, action, dispatch
}) => {
    try {
        const response = await axios.post(`${BASE_URI}/playlist/watch/${video._id}`, {
            type: action
        })

        if(action === "REMOVE") {
            successRemoveNotification("Removed from Watchlater!")
            dispatch({type: "REMOVE_FROM_WATCHLATER", payload: response.data.videoId})
        } else {
            successNotification("Added to Watchlater!");
            dispatch({type: "ADD_TO_WATCHLATER", payload: video})
        }
    } catch(err) {
        errorNotification("Error Occured!")
        console.log(err)
    }
}