import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Moment from 'react-moment';

const PurchaseHistory = ({history}) => {

    const[modal, setModal] = useState(false);

    const closeModal = () => setModal(false);

    const productsModal = (item) => (
        <Modal show = {modal} onHide = {closeModal}>
            <Modal.Header closeButton>Order ID: {item.orderID}</Modal.Header>

            <Modal.Body>
                <Table striped hover bordered>

                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>

                    {
                    item.items.map((prod,i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{prod.name}</td>
                            <td>${prod.unit_amount.value}</td>
                            <td>{prod.quantity}</td>
                        </tr>

                    ))
                }

                    </tbody>
                
                </Table>
            </Modal.Body>
        </Modal>
    )

    return(
        <div>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Products</th>
                        <th>Amount</th>
                        <th>Order ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((item,i) => (
                            <>
                            {productsModal(item)}
                            <tr key={i}>
                                <td><Moment to={item.date}></Moment></td>
                                 <td>
                                    <Button variant="success" onClick = {() => setModal(true)}>
                                        Items
                                    </Button>
                                </td> 
                                <td>{item.amount}</td>
                                <td>{item.orderID}</td>
                            </tr>
                            </>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default PurchaseHistory;