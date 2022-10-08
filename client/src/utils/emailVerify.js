import React from "react";
import * as actions from '../store/actions'
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { verifyMailIdAction } from "store/actions/user.actions";

const VerifyEmail = () => {

const [searchParams, setSearchParams] = useSearchParams();
const p = searchParams.get('t');
const dispatch = useDispatch();
const history = useNavigate();

const verifyMailId = () => {
    try{
        dispatch(verifyMailIdAction(p))
        
        history('/')

    }catch(error){
        dispatch(actions.errorGlobal(error))
    }
}

    return(
        <div className="container">
            <h1 style={{marginLeft:'400px', fontFamily:'fantasy'}}> WELCOME</h1>

            <div style={{
                marginLeft:'200px',
                marginTop:'100px',
                fontSize:'30px',
                fontFamily:'cursive',
                color:'blue'
            }}>
                Please verify your email address by clicking on the button below.
            </div>

            <div>
                <Button variant="success" style={{
                    marginLeft:'400px',
                    marginTop:'100px',
                    marginBottom:'200px'
                }}
                    onClick = {() => verifyMailId()}
                
                >
                    Verify Email
                </Button>
            </div>
        </div>
    )
}

export default VerifyEmail;