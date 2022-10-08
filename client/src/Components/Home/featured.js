import React from "react";
import Carrousel from "utils/Carrousel";

const Featured = () => {

    const carrouselItems = [
        {
            img:'/images/featured/featured_home.jpg',
            l1:'Fender',
            l2:'Custom Shop',
            lTitle:'Shop Now',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_2.jpg',
            l1:'B-Stock',
            l2:'Awesome Discounts',
            lTitle:'View Offers',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_3.jpg',
            l1:'B-Stock',
            l2:'Awesome Discounts',
            lTitle:'View Offers',
            linkTo:'/shop'
        }
    ]

    return(
    <div className="featured_container">
        <Carrousel items = {carrouselItems}/>
    </div>)
}

export default Featured;