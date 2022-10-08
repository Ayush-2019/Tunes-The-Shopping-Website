import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "utils/tools";


const PreventSignIn = (props) => {

        const history = useNavigate();

        const users = useSelector(state => state.users);

        useEffect(() => {
            if(users.auth){
                history('/dashboard')
            }
        }, [users.auth])



    return(
        <>
            {props.children}
        </>
    )
}

export default PreventSignIn;