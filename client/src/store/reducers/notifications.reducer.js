import { ERR_GLOBAL, SUCCESS_GLOBAL, CLEAR_NOTIFY, PROD_REMOVE, CLEAR_PRODUCT } from "store/types";

export default function notificationReducer(state={},action){
    switch(action.type){
        case ERR_GLOBAL:
            return {...state, error:true, msg:action.payload}

        case SUCCESS_GLOBAL:
            return {...state, success:true, msg:action.payload}

        case CLEAR_NOTIFY:
            return {}

        case PROD_REMOVE:
            return{...state, removeProd:true}
        

        default:
            return state
    }
}