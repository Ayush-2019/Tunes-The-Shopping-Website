import {
    AUTH_USER,
    LOGOUT,
    updateUser,
    changeEmail,
    ADD_TO_CART,
    PURCHASE_SUCCESS,
    VERIFY_EMAIL
} from '../types';

let DEFAULT_USER_STATE = {
    data:{
        _id:null,
        email:null,
        firstname:null,
        lastname:null,
        history:[],
        verified:null
    },

    auth:null
}

export default function userReducer(state=DEFAULT_USER_STATE,action){
    switch(action.type){

        case AUTH_USER:
            return{...state,
                data: {...state.data, ...action.payload.data},
                auth:action.payload.auth
            
            }

        case LOGOUT:
            return{
                ...state,
                data: {...DEFAULT_USER_STATE.data},
                auth:false
            }

        case updateUser:

            return {
                ...state,
                data: {...action.payload}
            }

        case changeEmail:
            return {
                ...state,
                data:{...state.data, email:action.payload}
            }

        case ADD_TO_CART:
            return{
                ...state,
                data:{
                    ...state.data,
                    cart:action.payload
                } 
            }
 
        case PURCHASE_SUCCESS:
            return{
                ...state,
                data:{
                    ...state.data,
                    history:action.payload.history
                }
            }
        

        default:
            return state
    }
}