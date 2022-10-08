import React, { useEffect } from "react";
import Featured from "./featured";
import SlimPromotion from "utils/promotions/slim_block";
import CardBlock from "utils/products/card.blocks";

import Loader from "utils/loader";

import {useDispatch, useSelector} from 'react-redux';

import { productsBySort } from "store/actions/product.actions";

const SlimPromotionsObj = {
    img:'/images/featured/featured_home_3.jpg',
    l1:'Get 40% Discount',
    l2:'Certified Refurbished',
    lTitle:'Buy Now',
    linkTo:'/shop'
};

const Home = ()=> {

    const {bySold, byDate} = useSelector(state => state.products)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsBySort({
            limit:4,
            sortBy:'itemsSold',
            order:'asc',
            where:'bySold'
        }));

        dispatch(productsBySort({
            limit:4,
            sortBy:'date',
            order:'desc',
            where:'byDate'
        }));

    }, [dispatch]);
    return(
        <div>
            <Featured/>

            {bySold ?  

                <CardBlock
                    items = {bySold}
                    title = "Best Selling Guitars"
                />
        
            :<Loader/>}

            <SlimPromotion items = {SlimPromotionsObj}/>

            {byDate ?  

            <CardBlock
                items = {byDate}
                title = "Latest Selling Guitars"
            />

            :<Loader/>}

        </div>

    )
}

export default Home;