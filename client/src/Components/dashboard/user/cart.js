import React, { useEffect, useState } from "react";
import DashboardLayout from "HOC/dashboardLayout";
import Loader from "utils/loader";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartList from "./cartList";
import { cartRemove, purchaseSuccess } from "store/actions/user.actions";
import { color, fontWeight } from "@mui/system";
import {PayPalButton} from 'react-paypal-button-v2';
import { useNavigate } from "react-router-dom";

const UserCart = (props) => {

    const[modal, setModal] = useState(true);
    const[loading, setLoading] = useState(false);
    const notifications = useSelector(state => state.notificationReducer)
   const dispatch = useDispatch();
   const history = useNavigate();

   const removeItem = (ind) => {
        dispatch(cartRemove(ind))
   }
   const calculateNet = () => {
        let net = 0;
        props.users.data.cart.forEach(item => {
            net += parseInt(item.price)
        });
        return net
   }
   const generateUnits = () => (
        [{
            description:"Guitars",
            amount:{
                currency_code:"USD",
                value:calculateNet(),
                breakdown:{
                    item_total:{
                        currency_code:"USD",
                        value:calculateNet()
                    }
                    

                }
            },
            items: genItems()
        }]
   );

   const genItems = () => {
        let items = props.users.data.cart.map((item) => (
            {
                unit_amount:{
                    currency_code:"USD",
                    value:item.price
                },
                quantity:1,
                name:item.model
            }
        ));
        return items;
   }

   const closeModal = () => setModal(false)

   useEffect(() => {

        if(notifications && notifications.success){
            history('/dashboard')
        }
        if(notifications && notifications.error){
            setLoading(false)
        }

   },[notifications, history])

   return(
        <DashboardLayout title = " SHOP CART">
            {props.users.data.cart && props.users.data.cart.length > 0 ?
                        
                    <>
                    
                        <CartList
                            list = {props.users.data.cart}
                            remove = {(id) => removeItem(id)}
                        />

                        <div className="user_cart_sum">
                            Net Amount : ${calculateNet()}
                        </div>

                        {
                            loading ?
                            <Loader/>
                            :
                            <div className="pp_button">
                                <PayPalButton
                                    options={{
                                        clientId : "AX9-_tvawJS6aCKH51mpu4DfWe2MSph83diYa-NWrBYEMY3TgbBbXTRNV3G3pixvPkbREKyU_Nt7G9is",
                                        currency: "USD",
                                        disableFunding:'credit,card'

                                        
                                    }}
                                    createOrder = {(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: generateUnits()
                                        })
                                    }}

                                    onSuccess = {(details, data) => {
                                        console.log(details)
                                        console.log(data)
                                        dispatch(purchaseSuccess(details.id))
                                        setLoading(true)
                                        
                                    }}
                                    onCancel = {(data) => {
                                        setLoading(false)
                                    }}
                                
                                />
                            </div>
                        }
                    </>
                        :
                    <>
                        <div style={{
                            marginTop:"200px",
                            marginLeft:"100px",
                            fontFamily:"cursive",
                            fontWeight:"bolder",
                            fontSize:"50px",
                            color:"blue"
                        }}>
                            No Item in the Cart
                        </div>
                        <div>
                            <LinkContainer to="/shop" style={{
                                    marginLeft:'300px'
                                }}>
                                <Button variant="success">
                                    Go To Shop
                                </Button>
                            </LinkContainer>
                        </div>
                        
                        <Modal
                        show = {modal}
                        onHide = {closeModal}
                        centered
                    >
                    <Modal.Header closeButton></Modal.Header>
        
                    <Modal.Body>
                        Nothing to show in cart
                    </Modal.Body>
        
                    <Modal.Footer>  
                            <LinkContainer to="/shop">
                                <Button variant="primary">
                                    Go To Shop
                                </Button>
                            </LinkContainer>

                            <Button variant="primary" onClick = {closeModal}>
                                    Back
                                </Button>
                    </Modal.Footer>
                    </Modal>
                    </>
            
            
            }
        </DashboardLayout>
   )


}
export default UserCart;