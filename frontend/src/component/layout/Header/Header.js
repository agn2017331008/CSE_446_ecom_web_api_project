import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import {FaUserAlt} from 'react-icons/fa'
import {GrCart} from 'react-icons/gr'
import {AiFillBank} from 'react-icons/ai'

const Header = () => {
  return(
    <ReactNavbar
      burgerColorHover= "#eb4034"
      logo
      logoWidth= "20vmax"
      navColor1= "white"
      logoHoverSize= "10px"
      logoHoverColor= "#eb4034"
      link1Text= "Home"
      link2Text= "Products"
      link3Text= "Bank Login/Sign"
      link4Text= "About"
      link1Url= "/"
      link2Url= "/products"
      link3Url= "/bank"
      link4Url= "/about"
      link1Size= "1.3vmax"
      link1Color= "rgba(35, 35, 35,0.8)"
      nav1justifyContent= "flex-end"
      nav2justifyContent= "flex-end"
      nav3justifyContent= "flex-start"
      nav4justifyContent= "flex-start"
      link1ColorHover= "#eb4034"
      link1Margin= "1vmax"
      profileIcon= {true}
      cartIcon = {true}
      // searchIcon = {true}
      searchIconElement = {AiFillBank}
      CartIconElement = {GrCart}
      ProfileIconElement=  {FaUserAlt}
      profileIconUrl= "/login"
      // searchIconUrl = "/bank"
      profileIconColor= "rgba(35, 35, 35,0.8)"
      // searchIconColor= "rgba(35, 35, 35,0.8)"
      cartIconColor= "rgba(35, 35, 35,0.8)"
      profileIconColorHover= "#eb4034"
      searchIconColorHover= "#eb4034"
      cartIconColorHover= "#eb4034"
      cartIconMargin= "1vmax"
    />
  );
}
export default Header;
