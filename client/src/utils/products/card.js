import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {renderCardImage, TunesButton} from '../tools';
import AddToCart from "utils/addToCart";
import { AddToUserCart } from "store/actions/user.actions";

const Card = (props) => {
    const[modal, setModal] = useState(false);
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();

    const closeModal = () => setModal(false)

    const handleAddToCart = (item) => {
        if(!user.auth){
            setModal(true)
            return false
        }

        dispatch(AddToUserCart(item))
    }

    return(
        <div className={`card_item_wrapper ${props.grid? 'grid_bars':''}`}>
            <div
                className="image"

                style={{
                    background:`url(${renderCardImage(props.item.images)})`
                }}
            ></div>

            <div className="action_container">
                <div className="tags">

                    <div className="brand">{props.item.model}</div>
                    <div className="name">{props.item.brand.name}</div>
                    <div className="name">${props.item.price}</div>

                </div>

                {props.grid ?  
                
                    <div className="description">
                        <p style={{textAlign:'justify'}}>
                            {props.item.description}
                        </p>
                    </div>    

                    :null
                    }

                    <div className="actions">
                        <div className="button_wrapp">
                            <TunesButton
                                type = "default"
                                altClass = "card_link"
                                title = "View product"
                                linkTo = {`/product_detail/${props.item._id}`}
                                style = {{
                                    fontWeight:'bold'
                                }}
                            />
                        </div>

                        <div className="button_wrapp">
                            
                        <div className="button_wrapp">
                            <TunesButton
                                type = "bag_link"
                                runAction = {() => handleAddToCart(props.item)}
                                iconSize = "25"
                            />
                        </div>


                        </div>
                    </div>

                    <AddToCart
                        modal = {modal}
                        closeModal = {closeModal}
                        />

            </div>
        </div>
    )
}

export default Card;