export const dataReducer = (state, {type, payload}) => {
  console.log("state: ", state);
  console.log("type: ", type);
  console.log("payload: ", payload)
    switch(type) {
        case "SET_DATA":
            return {...state, allVideos: payload || []}
        
        case "SET_LIKED":
            return {...state, LikedVideos: payload || []}
        
        case "SET_WATCHLATER":
            return {...state, WatchLater: payload || []}
        
        case "SET_PLAYLIST":
            return {...state, Playlist: payload || []}

        case "ADD_TO_LIKED": 
            return {...state, LikedVideos: state.LikedVideos.concat(payload)}

        case "REMOVE_FROM_LIKED":
            return {...state, 
              LikedVideos: state.LikedVideos.filter((item) => item._id !== payload)}
        
        case "ADD_TO_WATCHLATER": 
            return {...state, WatchLater: state.WatchLater.concat(payload)}
  
        case "REMOVE_FROM_WATCHLATER":
            return {...state, 
                WatchLater: state.WatchLater.filter((item) => item._id !== payload)}

        case "CREATE_PLAYLIST": 
            return {
                ...state,
                Playlist: [
                    ...state.Playlist,
                    payload
                ]
            }
        
        case "ADD_TO_PLAYLIST": 
            return {
                ...state,
                Playlist: state.Playlist.map((playlistItem) => 
                    playlistItem._id === payload.playlistId 
                    ? {
                        ...playlistItem,
                        video: [...playlistItem.video, payload.video]
                    } : playlistItem
                )
            }

        case "REMOVE_FROM_PLAYLIST":
            console.log("remov ", payload.playlistId, payload.videoId)
            return {
                ...state,
                Playlist: state.Playlist.map((playlistItem) => 
                    playlistItem._id === payload.playlistId 
                    ? {
                        ...playlistItem,
                        video: playlistItem.video.filter((videoItem) => videoItem._id !== payload.videoId)
                    } : playlistItem
                )
            }

        default:
            return state
    }
}