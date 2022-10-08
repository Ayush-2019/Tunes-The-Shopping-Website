import React, { useState } from "react";

import Button from "@mui/material/Button"; 
import AuthForm from "./authForm";

import PreventSignIn from "HOC/preventSignIn";


const LoginRegister = (props) => {

    const [formType, setFormType] = useState(false);

    const toggleFormType = () => {
        setFormType(!formType);
    }


    return(
        <PreventSignIn>
            <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        {formType ?
                            <div>
                                <h3>Already Registered?</h3>
                            </div>
                    
                            :
                            <div>
                                <h3>
                                    New User?
                                </h3>
                            </div>

                    }
                    <p style={{textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <Button
                    
                        variant="contained"
                        color="success"
                        size = "small"
                         onClick = {() => toggleFormType()}
                    >
                        {formType ?  'Sign In' : "Register Now"}
                    </Button>

                    </div>
                    <div className="right">
                        <h3>
                            {formType ? 'Register' : 'Sign In'}
                            <AuthForm
                                formType = {formType}
                                {...props}
                            />
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        </PreventSignIn>
    )
}

export default LoginRegister;