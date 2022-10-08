import React, { useState } from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { errHelper } from "utils/tools";
import { 
    ArrowDropUp, 
    ArrowDropDown
} from "@mui/icons-material";

import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    TextField,
    Button
} from'@mui/material';

const RangeField = (props) => {
    const[open, setOpen] = useState(props.initialState);

    const handleCollapse = () => {
        setOpen(!open);
    }

    const formik = useFormik({
        initialValues:{min:0,max:5000},
        validationSchema:Yup.object({
            min:Yup.number()
            .min(0, 'Min is 0'),
            max:Yup.number()
            .max(5000, 'Max is 5000')
        }),
        onSubmit:(values) => {
            props.handleRange([values.min, values.max])
        }
    })
    

    return(
        <div className="collapse_items_wrapper">
            <List>
                <ListItem onClick = {handleCollapse}>
                    <ListItemText
                        primary = {props.title}
                        className = "collapse_title"
                    />
                    {open ?  <ArrowDropUp/> : <ArrowDropDown/>}
                </ListItem>
                <Collapse in = {open} timeout = "auto">
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                    placeholder="Min"
                                    name = "min"
                                    variant="outlined"
                                    type = "number"
                                    {...formik.getFieldProps("min")}
                                    {...errHelper(formik, 'min')}
                                
                                />
                            </div>

                            <div>
                                <TextField
                                    placeholder="Max"
                                    name = "max"
                                    variant="outlined"
                                    type = "number"
                                    {...formik.getFieldProps("max")}
                                    {...errHelper(formik, 'max')}
                                
                                />
                            </div>
                            <Button
                                type = "submit"
                                className="mt-3"
                                variant="outlined"
                                color="primary"
                                size="medium"
                            >
                                Search
                            </Button>
                        </form>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default RangeField;