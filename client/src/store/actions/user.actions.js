import * as actions from './index';
import axios from 'axios';
import {getAuthHeader, removeTokenCookie, getTokenCookie} from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const userRegister = (values) => {

    return async(dispatch) => {
        try{
            const user = await axios.post(`/api/auth/register`,{
                email:values.email,
                password:values.password
            });

            dispatch(actions.userAuthenticate({
                data:user.data.user,
                auth:true
            }));

            dispatch(actions.successGlobal('Registered. Check mail'))
        }catch(err){
            dispatch(actions.errorGlobal(err.response.data.message))
        }
    }
}

export const userSignIn = (values) => {

    return async(dispatch) => {
        try{
            const user = await axios.post(`/api/auth/sign_in`,{
                email:values.email,
                password:values.password
            })

            dispatch(actions.userAuthenticate({
                data:user.data.user,
                auth:true
            }));

            dispatch(actions.successGlobal('signed in'))
        }catch(err){
            dispatch(actions.errorGlobal(err))
        }
    }
}

export const userIsAuth = () => {
    return async(dispatch) => {
        try{

            const site = await axios.get(`/api/site/`);
            dispatch(actions.getsite(site.data))

            if(!getTokenCookie()){

               throw new Error('ERROR')
            }
            const user = await axios.get(`/api/auth/isauth`,getAuthHeader())

            dispatch(actions.userAuthenticate({
                data:user.data,
                auth:true
            }))
        }catch(err){
            dispatch(actions.userAuthenticate({data:{}, auth:false}))
        }
    }
}

export const userLogout = () => {

    return async(dispatch) => {
        removeTokenCookie();
        dispatch(actions.userLogout())
        dispatch(actions.successGlobal('Succesfully Logged Out!!'))
    }
}

export const userUpdateInfo = (data) => {
    return async(dispatch, getState) => {
        try{

            const profile = await axios.patch(`/api/users/profile`,{
                data:data
            }, getAuthHeader());

            const userData = {
                ...getState().users.data,
                firstname:profile.data.firstname,
                lastname:profile.data.lastname
            }
            dispatch(actions.userUpdateInfo(userData));
            dispatch(actions.successGlobal('Profile Updated'));
        }catch(err){
            dispatch(actions.errorGlobal(err))
        }
    }
}

export const changeEmailId = (data) => {
    
    return async(dispatch, getState) => {
        try{
            await axios.patch(`/api/users/email`,{
                email:data.email,
                newemail:data.newemail
            }, getAuthHeader())
            dispatch(actions.changeEmailId(data.newemail))
            dispatch(actions.successGlobal('Email Update Requested, Check your new email for verification'))

        }catch(err){
            dispatch(actions.errorGlobal(err))
        }
    }
}

export const AddToUserCart = (data) => {
    
    return async(dispatch, getState) => {
        try{
            const prevcart = getState().users.data.cart;

            await axios.patch(`/api/users/profile`,{
                data: {
                    cart:[...prevcart, data]
                }
            }, getAuthHeader())

            dispatch(actions.AddToCart([...prevcart,  data]))
            dispatch(actions.successGlobal(`${data.model} added to Cart`))
        }catch(err){
            dispatch(actions.errorGlobal(err))
        }
    }
}

export const cartRemove = (ind) => {
    
    return async(dispatch, getState) => {
        try{
            const prevcart = getState().users.data.cart;
            prevcart.splice(ind, 1);

            await axios.patch(`/api/users/profile`,{
                data: {
                    cart:[...prevcart]
                }
            }, getAuthHeader())

            dispatch(actions.AddToCart(prevcart))
            dispatch(actions.successGlobal(`Item Removed`))
        }catch(err){
            dispatch(actions.errorGlobal(err))
        }
    }
}

export const purchaseSuccess = (orderID) => {

    return async(dispatch) => {
        try{
            const user = await axios.post(`/api/transaction/`,{
                orderID
            }, getAuthHeader());

            await axios.patch(`/api/users/profile`,{
                data:{
                    cart:[]
                }
            }, getAuthHeader())

            dispatch(actions.AddToCart([]))
            dispatch(actions.successGlobal('Order Placed'));
            dispatch(actions.purchaseSuccess(user.data))
        }catch(err){
            dispatch(actions.errorGlobal(err))
        }
    }
}

export const verifyMailIdAction = (token) => {

        return async(dispatch) => {
            try{

                await axios.get(`/api/users/verify`,{
                    params:{
                        validation:token
                    }
                })
                dispatch(actions.successGlobal('Email Id Verified'))
                

            }catch(error){
                dispatch(actions.errorGlobal(error))
            }
            
        }
}