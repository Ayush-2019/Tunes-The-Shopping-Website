import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux'

import { errHelper } from "utils/tools";
import Loader from "utils/loader";

import { changeEmailId } from "store/actions/user.actions";

import { Modal } from "react-bootstrap";

import {TextField, Button, Stepper, Step, StepLabel} from '@mui/material';


const EmailChanger = ({user}) => {

    const[loading, setLoading] = useState(false);
    const[emailModal, setEmailModal] = useState(false);
    const notifications = useSelector(state => state.notificationReducer)
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Enter Old Email', 'Enter New Email', 'Confirm']

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            email:'',
            newemail:''
        },
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Old email required')
            .email('Invalid email')
            .test('match', 'Please Check email', (email) => {
                return email === user.data.email
            }),
            newemail:Yup.string()
            .required('New email required')
            .email('Invalid email')
            .test('match', 'Same mail id', (email) => {
                return email !== user.data.email
            })
        }),
        onSubmit:(values) => {
                setLoading(true)
                dispatch(changeEmailId(values));
        }
    });

    const closeModal = () => setEmailModal(false);
    const openModal = () => setEmailModal(true);

    const handleStepsNext = () => {
        setActiveStep((prevStep) =>prevStep+1 )
    }

    const handleStepsPrev = () => {
        setActiveStep((prevStep) =>prevStep-1 )
    }

    const nextBtn = () => (
        <Button className="mt-3" variant = "contained" color = "primary" onClick={handleStepsNext}>
            Proceed
        </Button>
    )

    const backBtn = () => (
        <Button className="mt-3 ml-2" variant = "contained" onClick={handleStepsPrev}>
            Back
        </Button>
    )

    useEffect(() => {
        if(notifications && notifications.success){
            closeModal();
        }
        setLoading(false);
    }, [notifications])

    return(
        <div>
            <form className="mt-3 article_form" style={{
                maxWidth:'300px'
            }}>

                <div className="form-group">
                <TextField
                    style={{width:'100%'}}
                    name = "email"
                    label = "EnterEmail"
                    variant="outlined"
                    disabled
                    value={user.data.email}
                    />
                </div>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                >
                    Edit Email
                </Button>
            </form>

            <Modal
                size="lg"
                centered
                show = {emailModal}
                onHide = {closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>UpdateEmail</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Stepper
                        activeStep={activeStep}
                    >
                        {steps.map((text, ind) => {
                                return(
                                    <Step key = {ind}>
                                        <StepLabel>{text}</StepLabel>
                                    </Step>
                                )
                        })}
                    </Stepper>

                    <form className = "mt-3 stepper_form" onSubmit = {formik.handleSubmit}>

                    {activeStep === 0 ? 
                        <div className="form-group">
                            <TextField
                            style={{width:'100%'}}
                            name = "email"
                            label = "Enter Current Email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errHelper(formik, 'email')}
                            />

                        {
                            formik.values.email && !formik.errors.email ? 
                                nextBtn()

                            : null
                        }
                        </div>

                        
                    
                
                        :null}

                    {activeStep === 1 ? 
                        <div className="form-group">
                            <TextField
                            style={{width:'100%'}}
                            name = "newemail"
                            label = "Enter New Email"
                            variant="outlined"
                            {...formik.getFieldProps('newemail')}
                            {...errHelper(formik, 'newemail')}
                            />

                        {
                            backBtn()
                        }   

                        {
                            formik.values.newemail && !formik.errors.newemail ? 
                                nextBtn()

                            : null
                        }

                        </div>

                        
                    
                
                        :null}


                    {activeStep === 2 ?
                    
                        <div className="form-group">
                            {
                                loading ? 
                                <Loader/>

                                :

                                <div>
                                    {backBtn()}
                                    <Button className="mt-3" variant = "contained" color="success" onClick={formik.submitForm}>
                                        Submit
                                    </Button>
                                </div>

                            }
                        </div>
                
                :null}

                </form>


                </Modal.Body>


            </Modal>
        </div>
    )




}

export default EmailChanger;