import { SignalCellularNull } from "@mui/icons-material"
import { GET_PROD_BY_SOLD, GET_PROD_BY_DATE, productsByPaginate, ADD_PRODUCT, CLEAR_PRODUCT, PROD_BY_ID, CLEAR_PRODUCT_LATEST } from "store/types"

export default function productReducer(state={},action){
    switch(action.type){

        case GET_PROD_BY_SOLD:

            return {...state, bySold:action.payload}

        case GET_PROD_BY_DATE:

            return {...state, byDate:action.payload}

        case productsByPaginate:
            return{
                ...state,
                byPaginate:action.payload
            }

        case ADD_PRODUCT:
            return {...state, last:action.payload}

        case CLEAR_PRODUCT:
            return{...state, last:null}

        case PROD_BY_ID:
            return{...state, byId:  action.payload} 

        case CLEAR_PRODUCT_LATEST:
            return{...state, byId:null}
        

        default:
            return state
    }
}