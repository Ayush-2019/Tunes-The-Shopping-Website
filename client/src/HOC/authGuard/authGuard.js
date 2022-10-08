import React, { useEffect, useState } from "react";

import {useSelector} from 'react-redux';
import Loader from "utils/loader";

import { useNavigate } from "react-router-dom";
import { showToast } from "utils/tools";

export default function AuthGuard(ComposedComponent){

    const AuthCheck = (props) => {

        const history = useNavigate();

        const [isAuth, setIsAuth] = useState(false);

        const users = useSelector(state => state.users);

        useEffect(() => {
            if(!users.auth){
                history('/')
            }
            else{
                setIsAuth(true);
            }
        },[props.users]);

        if(!isAuth){
            return(
                <Loader full={true}/>
            )
        }
        else{
            return(
                <ComposedComponent users = {users} {...props}/>
            )
        }
    }

    return AuthCheck;
}