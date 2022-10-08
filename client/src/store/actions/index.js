import { 
            GET_PROD_BY_DATE, 
            GET_PROD_BY_SOLD,
            ERR_GLOBAL,
            SUCCESS_GLOBAL,
            CLEAR_NOTIFY,
            AUTH_USER,
            LOGOUT,
            updateUser,
            changeEmail,
            productsByPaginate,
            PROD_REMOVE,
            GET_BRANDS,
            ADD_PRODUCT,
            CLEAR_PRODUCT,
            PROD_BY_ID,
            CLEAR_PRODUCT_LATEST,
            ADD_TO_CART,
            PURCHASE_SUCCESS,
            VERIFY_EMAIL,
            GET_VARS,
            UPDATE_VARS
} from "store/types";

export const userLogout = () => ({
    type:LOGOUT
})

export const userAuthenticate = (user) => ({
    type:AUTH_USER,
    payload:user
})

export const productsBySold = (data) => ({
    type: GET_PROD_BY_SOLD,
    payload:data
});

export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload:data
});

export const errorGlobal = (msg) => ({
    type: ERR_GLOBAL,
    payload:msg
});

export const successGlobal = (msg) => ({
    type:SUCCESS_GLOBAL,
    payload:msg
});

export const clearNotify = () =>{
    return (dispatch) => {
        dispatch({
            type:CLEAR_NOTIFY
        })
    }
}

export const userUpdateInfo = (data) => ({
    type: updateUser,
    payload:data
})

export const changeEmailId = (data) => ({
    type:changeEmail,
    payload:data

})

export const prodPaginate = (products) => ({
    type:productsByPaginate,
    payload:products
})

export const productRemove = () => ({
    type:PROD_REMOVE
})

export const getBrands = (brands) => ({
    type:GET_BRANDS,
    payload:brands

})

export const Add_Product = (data) => ({
    type:ADD_PRODUCT,
    payload:data
})

export const clearProduct = () => {
    return{
        type:CLEAR_PRODUCT
    }
}

export const productsById = (data) => ({
    type:PROD_BY_ID,
    payload:data
})

export const clearProductNow = () => ({
    type :CLEAR_PRODUCT_LATEST
})

export const AddToCart = (data) => ({
    type: ADD_TO_CART,
    payload:data
})

export const purchaseSuccess = (data) => ({
    type:PURCHASE_SUCCESS,
    payload:data
})

export const getsite = (vars) => ({
    type:GET_VARS,
    payload:vars
})

export const manageVars = (vars) => ({
    type:UPDATE_VARS,
    payload:vars
})