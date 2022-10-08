import React from "react";
import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AddToCart = ({modal, closeModal}) => {

    return(
        <div>
            <Modal
                show = {modal}
                onHide = {closeModal}
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title>Not Authorized</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                    
                    <div>You need to Login to make a purchase</div>

            </Modal.Body>

            <Modal.Footer>
                    <LinkContainer to="/sign_in">
                        <Button variant="primary">
                            Sign In
                        </Button>
                    </LinkContainer>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddToCart;