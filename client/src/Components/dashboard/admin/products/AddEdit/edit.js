import React, { useEffect, useState } from "react";
import DashboardLayout from "HOC/dashboardLayout";
import { useFormik } from "formik";
import { errHelper } from "utils/tools"; 
import Loader from "utils/loader";
import { useSelector, useDispatch } from "react-redux";
import { clearProductNow } from "store/actions";
import ViewImg from "./viewImg";
import {
    TextField,  
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    FormHelperText


} from '@mui/material';
import { validation, formValidation, getValues } from "./formValidation";
import { getAllBrands } from "store/actions/brand.actions";
import { NavItem } from "react-bootstrap";
import { editProduct, productById } from "store/actions/product.actions"; 
import { useNavigate, useParams } from "react-router-dom";
import UploadImage from "./upload";

const EditProducts = (props) => {

    const[loading, setLoading] = useState(false);
    const[values, setValues] = useState(formValidation)
    const notifications = useSelector(state => state.notificationReducer);
    const products = useSelector(state => state.products)
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();
    const history = useNavigate();

    const {id} = useParams()

    const formik = useFormik({
        enableReinitialize:true,
        initialValues :values,

        validationSchema: validation,
        onSubmit:(values) => {
            handleSubmit(values);
        }

    });

        useEffect(() => {
            if(notifications && notifications.success){
                history('/dashboard/admin/admin_products')
            }
            if(notifications && notifications.error){
                setLoading(false)
            }
        },[notifications, history])
    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(editProduct(values, id))

    }

    const handleImg = (data) => {
        const imgArray = formik.values.images;
        imgArray.push(data.url);
        formik.setFieldValue('images', imgArray)
    }

    const deletePic = (ind) => {
        const imgArray = formik.values.images;
        imgArray.splice(ind, 1);
        formik.setFieldValue('images', imgArray)
    }

    useEffect(() => {
        const param = id;
        dispatch(getAllBrands());
        if(param){
            dispatch(productById(param))

        }
    }, [dispatch, id])

    useEffect(() => {
        if(products && products.byId){
            setValues(getValues(products.byId))
        }
    }, [products])

    useEffect(() => {
        return() => {
            dispatch(clearProductNow())
        }
    },[dispatch])

    return(
        <DashboardLayout title = "Edit Product">

                {loading ? <Loader/>:

                    <>
                    <ViewImg
                        formik = {formik}
                        deletePic = {(ind) => deletePic(ind)}

                    
                    />

                    <UploadImage
                        imgDetails={(pic) => handleImg(pic)}
                    />

                    <Divider className="mt-3 mb-3"/>

                        <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <TextField
                                    style={{width:'100%'}}
                                    name = "model"
                                    label = "Enter Model"
                                    variant="outlined"
                                    {...formik.getFieldProps('model')}
                                    {...errHelper(formik, 'model')}
                                
                                />
                            </div>

                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <TextField
                                    style={{width:'100%'}}
                                    name = "frets"
                                    label = "Enter Frets"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('frets')}
                                    {...errHelper(formik, 'frets')}
                                
                                />
                            </div>

                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <TextField
                                    style={{width:'100%'}}
                                    name = "woodtype"
                                    label = "Enter Woodtype"
                                    variant="outlined"
                                    {...formik.getFieldProps('woodtype')}
                                    {...errHelper(formik, 'woodtype')}
                                
                                />
                            </div>

                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <FormControl variant="outlined">
                                    <h5>Select a Brand</h5>
                                    <Select
                                        name="brand"
                                        {...formik.getFieldProps('brand')}
                                        error = {formik.errors.brand && formik.touched.brand ? true:false}
                                    >
                                        <MenuItem value =""><em>None</em></MenuItem>
                                        {brands && brands.all ?  
                                            brands.all.map((brand, ind) => (
                                                <MenuItem key = {brand._id} value ={brand._id}>{brand.name}</MenuItem>
                                            ))

                                        
                                        : null}

                                    </Select>
                                    {formik.errors.brand && formik.touched.brand ?

                                        <FormHelperText>
                                            {formik.errors.brand}
                                        </FormHelperText>
                                    
                                    : null}
                                </FormControl>
                            </div>

                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <TextField
                                    style={{width:'100%'}}
                                    name = "description"
                                    label = "Enter description"
                                    variant="outlined"
                                    {...formik.getFieldProps('description')}
                                    {...errHelper(formik, 'description')}
                                    multiline
                                    rows={5}
                                />
                            </div>

                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <TextField
                                    style={{width:'100%'}}
                                    name = "price"
                                    label = "Enter price"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('price')}
                                    {...errHelper(formik, 'price')}
                                
                                />
                            </div>

                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <TextField
                                    style={{width:'100%'}}
                                    name = "available"
                                    label = "Availability"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('available')}
                                    {...errHelper(formik, 'available')}
                                
                                />
                            </div>
                                
                            <Divider className="mt-3 mb-3"/>

                            <div className="form-group" style={{marginBottom:'15px'}}>
                                <FormControl variant="outlined">
                                    <h5>Shipping free?</h5>
                                    <Select
                                        name="shipping"
                                        {...formik.getFieldProps('shipping')}
                                        error = {formik.errors.shipping && formik.touched.shipping ? true:false}
                                    >
                                        <MenuItem value ={true}>Yes</MenuItem>
                                        <MenuItem value ={false}>No</MenuItem>

                                    </Select>
                                    {formik.errors.shipping && formik.touched.shipping ?

                                        <FormHelperText error = {true}>
                                            {formik.errors.shipping}
                                        </FormHelperText>
                                    
                                    : null}
                                </FormControl>
                            </div>

                            <Divider className="mt-3 mb-3"/>

                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                            >
                                Edit Product
                            </Button>

                        </form>
                    </>
                
                
                
                }
        </DashboardLayout>
    )
}

export default EditProducts