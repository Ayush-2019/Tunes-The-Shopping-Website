import React from "react";
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (props)=> {
    return(
        <header className="bck_b_light">

            <div className="container">
                <div className="left">
                    <div className="logo">
                        TUNES
                    </div>
                </div>

                <div className="right">
                    <div className="top">

                        { props.users.auth ?
                        <div>
                            <div className="cart_link">
                                <span>{props.users.data.cart.length}</span>
                                <Link to = "/dashboard/user/user_cart">
                                    My Cart
                                </Link>
                            </div>

                            <Link to = "/dashboard">
                                    My Account
                                </Link>
                                <span onClick={() => props.logout()}>
                                    LOG OUT
                                </span>
                                </div>

                                :
                                <>

                                <Link to="/sign_in">
                                    Sign In
                                </Link>
                        
                        </>
}
                    </div>

                    <div className="bottom">

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/shop">
                            SHOP
                        </Link>


                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header;