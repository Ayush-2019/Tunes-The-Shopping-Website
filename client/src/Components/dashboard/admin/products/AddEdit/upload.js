import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { getTokenCookie } from "utils/tools";
import Loader from "utils/loader";

const UploadImage = ({imgDetails}) => {
    const [loading, setLoading] = useState(false);

    const formikImg = useFormik({
        initialValues:{pic:''},
        validationSchema:Yup.object({
            pic:Yup.mixed()
            .required('Image required')
        }),
        onSubmit:(value) => {
            setLoading(true);
            let formData = new FormData();
            formData.append("file", value.pic);

            axios.post(`/api/products/upload`, formData,{
                headers:{
                    'content-type':'multipart/form-data',
                    'Authorization':`Bearer ${getTokenCookie()}`
                }
            }).then(res => {
                imgDetails(res.data);
                
            }).catch(err => {
                alert(err)
            }).finally(() => {
                setLoading(false)
            })
        }
    });

    return(
        <div>
            {loading ? <Loader/> : 

                <Form onSubmit={formikImg.handleSubmit}>
                    <Form.Group>
                        <Form.Control
                        type="file"
                            id = "file"
                            name="file"
                            onChange ={(event) => {
                                formikImg.setFieldValue('pic', event.target.files[0])
                            }}
                        />

                        {formikImg.errors.pic && formikImg.touched.pic ?  

                        <div>{formikImg.errors.pic}</div>
                        
                        : null}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                            Add Image    
                    </Button>
                </Form>
            
            
            }
        </div>
    )

}

export default UploadImage;