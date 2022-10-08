import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prodPaginate } from "store/actions/product.actions";
import { getAllBrands } from "store/actions/brand.actions";
import { GridOff, GridOn } from "@mui/icons-material";
import CardBlock from "utils/products/card.blocks";
import PaginateComp from "utils/paginateNav";
import SearchVal from "./searchVal";
import CollapseBox from "./collapseFilters";
import RangeField from "./selectRange";

const defaultValues = {keywords:'', brand:[], min:0,max:5000, frets:[], page:1}

const Shop = () => {

    const[grid, setGrid] = useState(false);

    const [searchVal, setSearchVal] = useReducer((state, newState) =>(
        {...state, ...newState}
    ), defaultValues)

    const brands = useSelector(state => state.brands)
    const {byPaginate} = useSelector(state => state.products)
    const dispatch = useDispatch();

    const handleGrid = () => {
        setGrid(!grid)
    }

    const goto = (page) => {
        setSearchVal({page:page})
    }

    const resetSearch = () => {
        setSearchVal({keywords:'', brand:[], min:0,max:5000, frets:[], page:1})
    }

    const handleSearch = (value) => {
        setSearchVal({keywords:value,page:1})
    }
    const handleRange = (values) => {
        setSearchVal({min:values[0],max:values[1], page:1})
    }

    const handleFilters = (filters, category) => {
        if(category === 'brands'){
            setSearchVal({brand:filters,page:1})
        }

        if(category === 'frets'){
            setSearchVal({frets:filters,page:1})
        }
    }
    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    useEffect(() => {
        dispatch(prodPaginate(searchVal))
    },[searchVal, dispatch])

    return(
        <div className="page_container">
            <div className="page_top">
                <div className="container">
                    <SearchVal
                        handleKeywords = {(value) => handleSearch(value)}
                        resetSearch = {resetSearch}
                    
                    />
                </div>

            </div>

            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseBox
                            initialState = {true}
                            title = "Brands"
                            list = {brands.all}
                            handleFilters = {(filters) => handleFilters(filters,'brands')}
                        />
                        
                        <CollapseBox
                            initialState = {false}
                            title = "Frets"
                            list = {[
                                {_id:20, name:20},
                                {_id:21, name:21},
                                {_id:22, name:22},
                                {_id:24, name:24}
                            ]}
                            handleFilters = {(filters) => handleFilters(filters,'frets')}
                        />

                        <RangeField
                            title = "Price Range"
                            handleRange = {(values) => handleRange(values)}
                        />
                    </div>

                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                            <div className={`grid_btn ${grid ? '' : 'active'}`}

                            onClick = {() => handleGrid()}

                            >
                            <GridOn/>
                            </div>

                            <div className={`grid_btn ${!grid ? '' : 'active'}`}

                            onClick = {() => handleGrid()}

                            >
                            <GridOff/>
                            </div>
                            </div>

                            <div>
                                {byPaginate && byPaginate.docs ? 
                                    <>
                                    <CardBlock
                                        grid={grid}
                                        items = {byPaginate.docs}
                                        shop = {true}
                                    />
                                    <PaginateComp
                                        prods = {byPaginate}
                                        prev = {(page) => goto(page)}
                                        next = {(page) => goto(page)}
                                        reset = {() => resetSearch()}
                                    
                                    />
                                    </>
                    
                            
                            
                            :null}
                                </div>
                            

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;