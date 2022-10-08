import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errHelper } from "utils/tools";
import {
    TextField
} from '@mui/material'
import { Button } from "react-bootstrap";

const SearchVal = (props) => {

    const formik = useFormik({
        initialValues:{keywords:''},
        validationSchema:Yup.object({
            keywords:Yup.string()
            .min(3, 'Min is 3')
            .max(100, 'Max is 100')
        }),
        onSubmit:(value, {resetForm}) =>{
            props.handleKeywords(value.keywords)
            resetForm();
        }
    })

    return(
        <div className="ccontainer">
            <form className = "mt-3" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        style={{
                            width:'100%'
                        }}

                        placeholder="Search a Product by model"
                        name = "keywords"
                        variant="outlined"
                        {...formik.getFieldProps('keywords')}
                        {...errHelper(formik, 'keywords')}
                    
                    />
                    <Button variant="primary" type="submit" style={{marginRight:'10px'}}>
                        Search
                    </Button>

                    <Button variant="primary" onClick={() => props.resetSearch()}>
                        Reset
                    </Button>

                </div>
            </form>
        </div>
    )
}

export default SearchVal;