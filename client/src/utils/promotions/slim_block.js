import React from "react";
import {TunesButton} from '../tools';

const SlimPromotion = ({items}) => {
    
    const renderPromotion = () => (
        items ?

        <div className="slim_promotion_img"
        
            style={{
                background:`url(${items.img})`
            }}
        >

            <div className="tag title">{items.l1}</div>
            <div className="tag low_title">{items.l2}</div>

            <div className="btn">
                <TunesButton
                    type = "default"
                    title = {items.lTitle}
                    linkTo = {items.linkTo}
                />
            </div>

        </div>


        :null
    )

    return(
        <div className="slim_promotion">
            {renderPromotion()}
        </div>
    )
};

export default SlimPromotion;