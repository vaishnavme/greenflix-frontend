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
            return {...state, watchlater: payload || []}

        case "ADD_TO_LIKED": 
            return {...state, LikedVideos: state.LikedVideos.concat(payload)}

        case "REMOVE_FROM_LIKED":
            return {...state, 
              LikedVideos: state.LikedVideos.filter((item) => item._id !== payload)}
        
        case "ADD_TO_WATCHLATER": 
            return {...state, watchlater: state.watchlater.concat(payload)}
  
        case "REMOVE_FROM_WATCHLATER":
            return {...state, 
                watchlater: state.watchlater.filter((item) => item._id !== payload)}

        default:
            return state
    }
}