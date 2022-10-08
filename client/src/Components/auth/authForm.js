import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Loader from 'utils/loader';

import { useDispatch, useSelector } from 'react-redux';
import { TextField , Button } from '@mui/material';
import { errHelper } from 'utils/tools';

import { userRegister, userSignIn} from 'store/actions/user.actions';
import { useNavigate } from 'react-router-dom';


const AuthForm = (props) => {


    const notification = useSelector(state => state.notificationReducer)
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const history = useNavigate();


    const formik = useFormik({
        initialValues:{ email:'',password:'' },
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
            password:Yup.string()
            .required('Password is required')
        }),
        onSubmit:( values)=>{
            setLoading(true);
            handleSubmit(values)
        }
    })

    const new_formik = useFormik({
        initialValues:{ email:'',password:'', confirm_pswd:'' },
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
            password:Yup.string()
            .required('Password is required'),
            confirm_pswd:Yup.string()
            .required('Confirm Your Password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit:( values)=>{
            setLoading(true);
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        if(props.formType){
            //register
            dispatch(userRegister(values))
           
        }else{
            dispatch(userSignIn(values))
        }
    }


    useEffect(() => {
        setLoading(false);

        if(notification && notification.success){
            history('/dashboard')
        }
    },[notification, history])


    return(
        <>  
            <div className="auth_container">

            { loading ?
                <Loader/>
                :
                <form className="mt-3" onSubmit={props.formType ? new_formik.handleSubmit : formik.handleSubmit}>
                    
                    {
                        props.formType ? 

                        <>
                            <div className="form-group">
                        <TextField
                            style={{width:'100%', marginBottom:'15px'}}
                            name="email"
                            label="Enter your email"
                            variant="outlined"  
                            {...new_formik.getFieldProps('email')}
                            {...errHelper(new_formik, 'email')}

                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            style={{width:'100%', marginBottom:'15px'}}
                            name="password"
                            label="Enter your password"
                            variant="outlined"  
                            type="password"
                            {...new_formik.getFieldProps('password')}
                            {...errHelper(new_formik, 'password')}

                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            style={{width:'100%', marginBottom:'15px'}}
                            name="confirm_pswd"
                            label="Enter your password"
                            variant="outlined"  
                            type="password"
                            {...new_formik.getFieldProps('confirm_pswd')}
                            {...errHelper(new_formik, 'confirm_pswd')}

                        />
                    </div>


                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                    >
                        Register
                    </Button>
                        
                        </>

                            :

                            <>
                            <div className="form-group">
                            <TextField
                                style={{width:'100%', marginBottom:'15px'}}
                                name="email"
                                label="Enter your email"
                                variant="outlined"  
                                {...formik.getFieldProps('email')}
                                {...errHelper(formik, 'email')}
    
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%', marginBottom:'15px'}}
                                name="password"
                                label="Enter your password"
                                variant="outlined"  
                                type="password"
                                {...formik.getFieldProps('password')}
                                {...errHelper(formik, 'password')}
    
                            />
                        </div>
    
    
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                        >
                            LogIn
                        </Button>
                        </>
                    }

                </form>    
            }


            </div>
        </>
    )
}

export default AuthForm;