import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { TunesButton } from "./tools";

const Carrousel = ({items}) => {

    const settings = {
        dot:true,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        arrows:true
    };

    const generateSliders = () => (

        items?
            items.map((item, ind) => (
                <div key={ind}>
                    <div className="featured_image"
                    
                        style={{
                            background:`url(${item.img})`,
                            height:`${window.innerHeight}px`,
                            width:`${window.innerWidth}px`
                        }}
                    >

                        <div className="featured_action">
                            <div className="tag title">
                                {item.l1}
                            </div>
                            <div className="tag low_title">
                                {item.l2}
                            </div>

                            <div>
                                <TunesButton
                                    type = "default"
                                    title = {item.lTitle}
                                    linkTo = {item.linkTo}

                                    style = {{
                                        margin:'10px'
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            ))
        
        : null
    )

    return(
        <Slider {...settings}>
            {generateSliders()}
        </Slider>
    )
}
export default Carrousel;