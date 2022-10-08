import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "HOC/dashboardLayout";
import { useDispatch, useSelector } from "react-redux"; 
import { prodPaginate, productRemove } from "store/actions/product.actions";
import ProductsTable from "./productsTable";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errHelper } from "utils/tools"; 
import {TextField} from '@mui/material';
import {Button, Modal} from 'react-bootstrap';

const defaultValue = {
    keywords:'',
    brand:[],
    min:0,
    max:5000,
    frets:[],
    page:1
}



const AdminProducts = (props) => {

    const [removeModal, setremoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);

    const products = useSelector(state => state.products);


    const history = useNavigate();

    const notifications = useSelector(state => state.notificationReducer)

    const [searchVal, setSearchVal] = useReducer((state, newState) =>(
        {...state, ...newState}
    ), defaultValue)

    const formik = useFormik({
        initialValues:{keywords:''},
        validationSchema:Yup.object({
            keywords:Yup.string()
            .min(3, 'Min is 3')
            .max(500, 'Max is 500')
        }),
        onSubmit : (value, {resetForm}) => {

            setSearchVal({keywords:value.keywords, page:1});
            resetForm();
        
        }
    })

    const gotoEdit = (_id) => {
        history(`/dashboard/admin/edit_products/${_id}`)
    }

    const handleClose = () => {

        setremoveModal(false)
    }

    const handleModal = (id) => {
        setToRemove(id)
        setremoveModal(true)
    }

    const removeProduct = () => {
        dispatch(productRemove(toRemove))
    }

    const toPage = (page) => {
        setSearchVal({
            page:page
        })
    }

    const resetSearch = () => {
        setSearchVal(defaultValue)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(prodPaginate(searchVal))
    },[dispatch, searchVal])

    useEffect(() => {

        handleClose();
        setToRemove(null);
        if(notifications && notifications.removeProd){

            dispatch(prodPaginate(searchVal))
        }
    }, [notifications, dispatch])


    return(
        <DashboardLayout title = "Products">
           <div className="products_table">
                <div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{width:'100%'}}
                            name = "keywords"
                            label = "Search a product"
                            variant="outlined"
                            {...formik.getFieldProps('keywords')}
                            {...errHelper(formik,'keywords')}
                        
                        />
                    </form>
                    <Button onClick={() => resetSearch()}>
                        RESET
                    </Button>
                </div>
                <hr/>
                <ProductsTable
                    removeModal = {removeModal}
                    closeModal = {() => handleClose()}
                    products = {products.byPaginate}
                    prev = {(page) => toPage(page)}
                    next = {(page) => toPage(page)}
                    gotoEdit = {(_id) => gotoEdit(_id)}
                    handleModal = {(_id) => handleModal(_id)}
                    removeProduct = {() => removeProduct()}
                
                />
           </div>
        </DashboardLayout>
    )
}

export default AdminProducts;