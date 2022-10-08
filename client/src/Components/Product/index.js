import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "utils/loader";
import { productById } from "store/actions/product.actions";
import { useParams } from "react-router-dom";
import { clearProductNow } from "store/actions";
import ProdInfo from "./productinfo";
import { renderCardImage } from "utils/tools";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const ProductDetails = (props) => {

    const[modal, setModal] = useState(false);

    const settings = {
        dot:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1
    };

    const closeModal = () => {
        setModal(false)
    }

    const showImages = () => {
        if(products.byId.images.length > 0){
            setModal(true);
        }
    }

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(productById(id))
    },[dispatch, id])

    useEffect(() => {
        return() => {
            dispatch(clearProductNow())
        }
    }, [dispatch])

        return(
            <div className="page_container">
                <div className="page_top">
                    <div className="container" style={{fontWeight:'bolder'}}>
                        Product Details
                    </div>
                </div>
                <div className="container">
                    {products && products.byId ? 

                    <div className="product_detail_wrapper">
                         <div className="left">
                            <div>
                                <img
                                
                                    alt="some alt"
                                    src={renderCardImage(products.byId.images)}
                                    onClick = {() => showImages()}
                                >
                                </img>
                            </div>
                        </div>  

                         <div className="right">
                            <ProdInfo
                                data = {products.byId}
                            
                            />
                         </div>
                    </div>

                
                
                            :
                
                <Loader/>
                
                }
                </div>

                <Modal show = {modal} onHide = {closeModal} dialogClassName = "modal-90w">
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>
                        <Slider {...settings}>
                            {
                                products.byId && products.byId.images ? 

                                    products.byId.images.map((image, i) => (
                                        <div key={i} style = {{margin: '0 auto'}}>
                                            <div className="img-block"
                                            
                                                style={{
                                                    background: `url(${image}) no-repeat`
                                                }}
                                            ></div>
                                        </div>
                                    ))


                                : null
                            }
                        </Slider>
                    </Modal.Body>
                </Modal>
            </div>
        )
}

export default ProductDetails;