import {GET_BRANDS } from "store/types";

export default function brandReducer(state={},action){
    switch(action.type){
        
        case GET_BRANDS:
            return {...state, all : action.payload}
        

        default:
            return state
    }
}