import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ViewImg = ({formik, deletePic}) => {
    const[delId, setDelId] = useState(null);
    const[show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const showModal = (ind) => {
        setDelId(ind)
        setShow(true)
    }

    const deleteImage = () => {

        deletePic(delId)
        handleClose()
        setDelId(null)
    }


    return(
        <div>

            {formik.values && formik.values.images ? 
            
                formik.values.images.map((item, ind) => (
                        <div key={ind}
                        className = "pic_block"
                        onClick={() => showModal(ind)}
                        style = {{
                            background:`url(${item})`,
                            marginRight:'10px'
                            
                        }}
                        ></div>
                ))
        
        :null}

        <Modal show = {show} onHide = {handleClose}>
                
            <Modal.Header closeButton>
                <Modal.Title>Confirm delete</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                The action cant be undone
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="secondary" onClick={handleClose}>
                        Close
                </Button>

                <Button  variant="danger" onClick={deleteImage}>
                        Delete Image
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default ViewImg;