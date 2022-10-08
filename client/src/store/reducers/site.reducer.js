import {GET_VARS, UPDATE_VARS} from '../types';

let DEFAULT_SITE_VARS = {
    vars:{
        _id:'',
        address:'',
        hours:'',
        phone:'',
        email:''
    }
}

export default function siteReducer(state=DEFAULT_SITE_VARS,action){
    switch(action.type){

        case GET_VARS:
            return{
                ...state,
                vars:action.payload
            }

        case UPDATE_VARS:
            return{
                ...state,
                vars:action.payload
            }

        

        default:
            return state
    }
}