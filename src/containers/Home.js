import React from "react";
import "./Home.css";
// import Card from 'react-bootstrap/Card';
// import Carousel from 'react-bootstrap/Carousel';
// import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import ClientHome from "./ClientHome";
import AdminHome from "./AdminHome";
import { useAppContext } from "../libs/contextLib";


export default function Home() {

  const { isAuthenticated } = useAppContext();

if(isAuthenticated.isAuthenticated){
  if("ADM" === isAuthenticated.userType){
    return (<AdminHome />);
  }else if("CLI" === isAuthenticated.userType){
    return (<ClientHome />);
  }else if("VOL" === isAuthenticated.userType){
    return (<div>Volunteer Home</div>)
  }else if("AGN" === isAuthenticated.userType){
    return (<div>Agency Home</div>)
  }
}else{
  return (<ClientHome />);
} 

}




