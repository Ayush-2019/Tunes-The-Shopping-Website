import * as actions from './index';
import axios from 'axios';

export const getAllBrands = () => {
    return async(dispatch) => {
        try{

            const brands = await axios.get(`/api/brands/all`);

            dispatch(actions.getBrands(brands.data))

        }catch(err){
            dispatchEvent(actions.errorGlobal(err.response.data.message))

        }
    }
}