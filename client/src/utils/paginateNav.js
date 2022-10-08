import React, { useEffect, useState } from "react";
import { Pagination, Button, Modal } from "react-bootstrap";

const PaginateComp = ({prods, prev, next, reset}) => {
    const[modal, setModal] = useState(false);

    const gotoPrev = (page) => {
        prev(page)
    }

    const gotoNext = (page) => {
        next(page)
    }
    const closeModal = () => setModal(false);
    
    useEffect(() => {
        if(prods.docs.length === 0){
            setModal(true)
        }
    }, [prods.docs.length])


    return(
        <div>
            {prods.docs.length > 0 ?  

            <Pagination>
                {prods.hasPrevPage ? 

                    <>
                        <Pagination.Prev onClick={() => gotoPrev(prods.prevPage)}/>
                        <Pagination.Item onClick={() => gotoPrev(prods.prevPage)}>
                            {prods.prevPage}
                        </Pagination.Item>
                    </>
            
            :null}

                        <Pagination.Item active>
                            {prods.page}
                        </Pagination.Item>


                        {prods.hasNextPage ? 

<>
    <Pagination.Item onClick={() => gotoNext(prods.nextPage)}>
        {prods.nextPage}
    </Pagination.Item>
    <Pagination.Next onClick={() => gotoNext(prods.nextPage)}/>
    
</>

:null}

            </Pagination>
            
        
        
        :

        <Modal show = {modal} onHide = {closeModal}>
        <Modal.Header closeButton>No Results Found</Modal.Header>
        <Modal.Body>Click Reset Button to reset the search.</Modal.Body>

        <Modal.Footer>
        <Button
            className="mt-3"
            variant="primary"
            onClick = {() => {
                reset();
                setModal(false);

            }}
    >
        Reset Search
    </Button>
        </Modal.Footer>
    </Modal>
        
        }
        </div>
    )
}

export default PaginateComp;