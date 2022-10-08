import React, { useEffect, useState } from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Header from "./Components/navigation/header";
import Footer from "./Components/navigation/footer";
import Home from "./Components/Home";
import MainLayout from "HOC/mainLayout";
import LoginRegister from "Components/auth";

import AuthGuard from './HOC/authGuard/authGuard';

import Dashboard from "Components/dashboard";
import UserInfo from "Components/dashboard/user/info";
import AdminProducts from "Components/dashboard/admin/products";
import AddProducts from "Components/dashboard/admin/products/AddEdit/addProduct";
import EditProducts from "Components/dashboard/admin/products/AddEdit/edit";
import ProductDetails from "Components/Product";
import UserCart from "Components/dashboard/user/cart";
import VerifyEmail from "utils/emailVerify";
import SiteChange from "Components/dashboard/admin/site";

import Shop from "Components/Shop";

import {useDispatch, useSelector} from 'react-redux';
import { userIsAuth, userLogout } from "store/actions/user.actions"; 
import Loader from "utils/loader";

const RoutesFile = (props) => {

  //AuthGuard Components

  const Dash_comp = AuthGuard(Dashboard);
  const UserInfo_comp = AuthGuard(UserInfo);
  const Admin_Prod_Comp = AuthGuard(AdminProducts);
  const Add_Prod_Comp = AuthGuard(AddProducts);
  const Edit_Prod_Comp = AuthGuard(EditProducts);
  const User_Cart_Comp = AuthGuard(UserCart);
  const Site_Comp = AuthGuard(SiteChange);

  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLogout())
  }

useEffect(() => {
  dispatch(userIsAuth())
},[dispatch])

useEffect(() => {
  if(users.auth !== null){
    setLoading(false);
  }
},[users])

  return (
    <BrowserRouter>

    {
      loading ? 
      <Loader full={true}/> :

      <div>
        <Header
          users = {users}
          logout = {logout}
        />
        <MainLayout>
        <Routes>
        <Route path = "/dashboard/admin/manage_site" element = {<Site_Comp/>}/>
        <Route path = "/dashboard/user/user_cart" element = {<User_Cart_Comp/>}/>
        <Route path = "/dashboard/admin/edit_products/:id" element = {<Edit_Prod_Comp/>}/>
        <Route path = "/dashboard/admin/add_product" element = {<Add_Prod_Comp/>}/>
        <Route path = "/dashboard/admin/admin_products" element = {<Admin_Prod_Comp/>}/>
        <Route path = "/dashboard/user/user_info" element = {<UserInfo_comp/>}/>
        <Route path = "/dashboard" element = {<Dash_comp/>}/>

        <Route path = "/verification" element = {<VerifyEmail/>}/>
        <Route path = "/product_detail/:id" element = {<ProductDetails/>}/>
        <Route path = "/shop" element = {<Shop/>}/>
        <Route path = "/sign_in" element = {<LoginRegister/>}/>
        <Route path = '/' element = {<Home/>}/>
        </Routes>
        </MainLayout>
        <Footer/>
      </div>

    }
    
    </BrowserRouter>
  );
}

export default RoutesFile;
