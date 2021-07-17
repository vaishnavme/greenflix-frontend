export const dataReducer = (state, {type, payload}) => {
    switch(type) {
        case "SET_DATA":
            return {...state, allVideos: payload || []}
        
        case "SET_LIKED":
            return {...state, likedvideos: payload || []}
        
        case "SET_WATCHLATER":
            return {...state, watchlater: payload || []}

        case "ADD_TO_LIKED": 
            return {...state, likedvideos: state.likedvideos.concat(payload)}

        case "REMOVE_FROM_LIKED":
            return {...state, 
              likedvideos: state.likedvideos.filter((item) => item._id !== payload)}
        
        case "ADD_TO_WATCHLATER": 
            return {...state, watchlater: state.watchlater.concat(payload)}
  
        case "REMOVE_FROM_WATCHLATER":
            return {...state, 
                watchlater: state.watchlater.filter((item) => item._id !== payload)}

        default:
            return state
    }
}