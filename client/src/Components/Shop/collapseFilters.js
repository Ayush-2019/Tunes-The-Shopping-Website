import React, { useState } from "react";
import { 
    ArrowDropUp, 
    ArrowDropDown
} from "@mui/icons-material";

import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Collapse
} from'@mui/material';

const CollapseBox = (props) => {
    const[open, setOpen] = useState(props.initialState);
    const[checked, setChecked] = useState([]);

    const handleCollapse = () => {
        setOpen(!open);
    }

    const handleCheck = (id) => {
        const currInd = checked.indexOf(id);

        const newArr = [...checked];

        if(currInd === -1){
                newArr.push(id);
        }else{
            newArr.splice(currInd, 1)
        }

        setChecked(newArr);
        props.handleFilters(newArr);
    }

    const renderBrands = () => (
        props.list ? 

        props.list.map((brand, ind) => (
            <ListItem key={brand._id}>
                <ListItemText primary = {brand.name}/>
                <ListItemSecondaryAction>
                    <Checkbox
                        color="success"
                        onChange={() => handleCheck(brand._id)}
                        checked = {checked.indexOf(brand._id)!==-1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        ))

        :null
    )

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
                        {renderBrands()}
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default CollapseBox;