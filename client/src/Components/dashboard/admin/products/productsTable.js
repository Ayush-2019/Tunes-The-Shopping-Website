import React, { useState } from "react";
import {Table, Pagination, Modal, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Moment from "react-moment";
import Loader from "utils/loader";
const ProductsTable = ({products, prev, next, gotoEdit, removeModal, closeModal, handleModal, removeProduct}) => {
    const goPrev = (page) => {
        prev(page)
    }

    const goNext = (page) => {
        next(page)
    }

    return(
        <div>
            {products && products.docs ?
                <div>
                <Table
                    striped bordered hover
                >
                    <thead>
                        <tr>
                        <th>Created</th>
                        <th>Model</th>
                        <th>Available</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.docs.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <Moment to={item.date}></Moment>
                                    </td>
                                    <td>
                                        {item.model}
                                    </td>
                                    <td>
                                        {item.available}
                                    </td>
                                    <td className="action_btn remove_btn"
                                        onClick={() => handleModal(item._id)}
                                    >
                                        Remove
                                    </td>

                                    <td className="action_btn edit_btn"
                                        onClick={() => gotoEdit(item._id)}
                                    >
                                        Edit
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <Pagination>
                      {
                        products.hasPrevPage ? 

                        <>
                            <Pagination.Prev onClick={() => goPrev(products.prevPage)}/>
                            <Pagination.Item onClick={() => goPrev(products.prevPage)}>
                                {products.prevPage}
                            </Pagination.Item>

                        </>



                        : null
                      }  

                      <Pagination.Item active>{products.page}</Pagination.Item>

                      {
                        products.hasNextPage ? 

                        <>
                            
                            <Pagination.Item onClick={() => goNext(products.nextPage)}>
                                {products.nextPage}
                            </Pagination.Item>
                            <Pagination.Next onClick={() => goNext(products.nextPage)}/>

                        </>



                        : null
                      }
                </Pagination>

                <hr/>

                      <LinkContainer to="/dashboard/admin/add_product">
                      <Button variant="success">Add New Product</Button>
                    
                      </LinkContainer>

                </div>


                :
                <Loader/>
        
        
        }

        <Modal show = {removeModal} onHide = {closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                This product will be removed, if you click on Delete.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>
                    close Now
                </Button>

                <Button variant="danger" onClick={() => removeProduct()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default ProductsTable;