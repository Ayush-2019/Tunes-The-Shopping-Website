import React from "react";
import { renderCardImage } from "utils/tools";

const CartList = ({list, remove}) => {

    const renderList = () => (
        list ? 

        list.map((item, i) => (
            <div className="user_product_block" key={item._id}>
                <div className="item">
                    <div className="image"
                    
                    style={{
                        background:`url(${renderCardImage(item.images)}) no-repeat`
                    }}
                    >

                    </div>
                </div>

                <div className="item">
                    <h4>Product:</h4>
                    <div>{item.brand.name} {item.model}</div>
                </div>

                <div className="item">
                    <h4>Price:</h4>
                    <div>{item.price}</div>
                </div>

                <div className="item btn">
                    <div className="cart_remove_btn" onClick={() => remove(i)}>Remove</div>
                </div>
            </div>
        ))

        :

        null
    )

    return(
        <div>
            {renderList()}
        </div>
    )
}

export default CartList;