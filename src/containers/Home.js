import React from "react";
import "./Home.css";

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




