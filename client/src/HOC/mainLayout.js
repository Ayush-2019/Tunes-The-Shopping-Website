import React, { useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showToast } from "utils/tools"; 

import { useSelector,  useDispatch} from "react-redux"; 

import { clearNotify } from "store/actions";

const MainLayout = (props) => {

    const notification = useSelector(state => state.notificationReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if(notification && notification.error){
            const msg = notification.msg ? notification.msg : 'ERROR';
            showToast('error', msg);
             dispatch(clearNotify());
            
        }

        if(notification && notification.success){
            const msg = notification.msg ? notification.msg : 'SUCCESS';
            showToast('success', msg);
             dispatch(clearNotify());
        }
    },[notification, dispatch])

    return(
        <div>
            {props.children}
            <ToastContainer/>
        </div>
    )
}

export default MainLayout;