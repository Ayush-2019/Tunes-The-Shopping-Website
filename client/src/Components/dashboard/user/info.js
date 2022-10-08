import React from "react";
import DashboardLayout from "HOC/dashboardLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errHelper } from "utils/tools";
import { useSelector,  useDispatch} from "react-redux";
import { TextField, Button } from "@mui/material";
import { userUpdateInfo } from "store/actions/user.actions";
import EmailChanger from "./stepper";


const UserInfo = ({users}) => {

        const dispatch = useDispatch();

        const formik = useFormik({
            enableReinitialize:true,
            initialValues:{
                firstname:users.data.firstname,
                lastname:users.data.lastname,
            },
            validationSchema:Yup.object({
                firstname:Yup.string()
                .min(1, 'Min 1 Character')
                .max(100, 'Max 100 characters')
                .required('Firstname is Required'),
                lastname:Yup.string()
                .min(1, 'Min 1 Character')
                .max(100, 'Max 100 characters')
                .required('lastname is Required')

            }),
            onSubmit : (values) => {
                dispatch(userUpdateInfo(values))
            }
        })

    return(
        <DashboardLayout title = "YOUR INFORMATION">
            <form className="mt-3 article_form" style={{
                maxWidth:'300px'
            }} onSubmit = {formik.handleSubmit}>

                <div className="form-group">
                    <TextField
                    style={{width:'100%', marginBottom:'15px'}}
                    name = "firstname"
                    label = "Enter Firstname"
                    variant="outlined"
                    {...formik.getFieldProps('firstname')}
                    {...errHelper(formik, 'firstname')}
                    />
                </div>

                <div className="form-group">
                    <TextField
                    style={{width:'100%', marginBottom:'15px'}}
                    name = "lastname"
                    variant="outlined"
                    label = "Enter Lastname"
                    {...formik.getFieldProps('lastname')}
                    {...errHelper(formik, 'lastname')}
                    />
                </div>

                <Button
                    className="mb-3"
                    variant = "contained"
                    color="secondary"
                    type="submit"
                >
                    Edit Profile
                </Button>
            </form>
            <hr/>
            <div>
                <EmailChanger user = {users}/>
            </div>
        </DashboardLayout>
    )
}

export default UserInfo;