import * as actionTypes from './actions'
const initialState={
    movies:[]
}

const reducer = (state=initialState,actions)=>{
    switch(actions.type){
        case actionTypes.GETMOVIES:
            return{
                movies:actions.payload
            }
        default:
            return state
    }
}

export default reducer