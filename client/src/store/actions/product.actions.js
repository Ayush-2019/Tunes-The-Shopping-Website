import * as actions from './index';
import axios from 'axios';

import {getAuthHeader, removeTokenCookie, getTokenCookie} from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';


export const productsBySort = ({limit, sortBy, order, where}) => {

    return async(dispatch) => {
        try{
        const products = await axios.get(`/api/products/all`,{
            params:{
                limit,
                sortBy,
                order
            }

        });

        switch(where){

            case 'bySold':
                dispatch(actions.productsBySold(products.data));
                break;

            case 'byDate':
                dispatch(actions.productsByDate(products.data));
                break;

            default:
                return false;
        }
        
        
    }catch(err){
        dispatch(actions.errorGlobal('Something went wrong'));
    }
}
}

export const prodPaginate = (args) => {

    return async(dispatch) => {
        try{

            const products = await axios.post(`/api/products/paginate/all`, args)
            dispatch(actions.prodPaginate(products.data))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productRemove = (_id) => {

    return async(dispatch) => {
        try{

            const products = await axios.delete(`/api/products/product/${_id}`,getAuthHeader())

            dispatch(actions.productRemove())
            dispatch(actions.successGlobal('Product Removed'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productAdd = (data) => {

    return async(dispatch) => {
        try{

            const product = await axios.post(`/api/products/`,data,getAuthHeader())

            dispatch(actions.Add_Product(product.data))
            dispatch(actions.successGlobal('Product Added'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productById = (data) => {

    return async(dispatch) => {
        try{

            const product = await axios.get(`/api/products/product/${data}`);
            dispatch(actions.productsById(product.data))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}
 

export const editProduct = (data, id) => {

    return async(dispatch) => {
        try{

            const product = await axios.patch(`/api/products/product/${id}`, data, getAuthHeader());
            dispatch(actions.successGlobal('Updated'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}