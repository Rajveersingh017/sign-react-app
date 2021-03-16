import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import Table from 'react-bootstrap/Table';
import swal from "sweetalert";

export default function AdminUserData() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {   
        onLoad();
      }, []);

      
     
                
      
   
   

    return (
       
        <div>
           
        </div>
      );
    }