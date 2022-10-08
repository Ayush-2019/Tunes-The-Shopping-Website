import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errHelper } from "utils/tools";
 import { useDispatch, useSelector } from "react-redux";
 import { updateVars } from "store/actions/site.actions";
 import {
    TextField,
    Button
 } from '@mui/material'
const SiteForm = () => {
    const site = useSelector(state => state.site);
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            address:site.vars.address,
            hours:site.vars.hours,
            phone:site.vars.phone,
            email:site.vars.email
        },
        validationSchema:Yup.object({
            address:Yup.string()
            .min(3,'Min is 3')
            .max(100,'Min is 100')
            .required('This is required'),
            hours:Yup.string()
            .max(100,'Min is 100')
            .min(3,'Min is 3')
            .required('This is required'),
            phone:Yup.string()
            .min(10,'Min is 3')
            .max(20,'Min is 20')
            .required('This is required'),
            email:Yup.string()
            .min(3,'Min is 3')
            .max(100,'Min is 100')
            .email('Invalid Email')
            .required('This is required')
        }),
        onSubmit:(values) => {
            dispatch(updateVars({
                _id:site.vars._id,
                ...values
            }))
        }
    })

        return(
            <>
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            style={{
                                width:'100%',
                                marginBottom:'15px'
                            }}
                            name="address"
                            label="Enter address"
                            variant="outlined"
                            {...formik.getFieldProps('address')}
                            {...errHelper(formik, 'address')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            style={{
                                width:'100%',
                                marginBottom:'15px'
                            }}
                            name="phone"
                            label="Enter Phone Number"
                            variant="outlined"
                            {...formik.getFieldProps('phone')}
                            {...errHelper(formik, 'phone')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            style={{
                                width:'100%',
                                marginBottom:'15px'
                            }}
                            name="hours"
                            label="Enter Working Hours"
                            variant="outlined"
                            {...formik.getFieldProps('hours')}
                            {...errHelper(formik, 'hours')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            style={{
                                width:'100%',
                                marginBottom:'15px'
                            }}
                            name="email"
                            label="Enter email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errHelper(formik, 'email')}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Edit Info
                    </Button>
                </form>

            </>
        )
}

export default SiteForm