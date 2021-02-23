import React, { useState, useEffect } from "react";import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";


function Edit_Profile() {

    const history = useHistory();

    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    
    useEffect(() => {
        onLoad();
      }, []);
      
      async function onLoad() {
        if((Auth.currentSession())){
          history.push("/login");
        }
        console.log(Auth.currentUserCredentials());
      }
    return  !isAuthenticating && (
        <div>
            <h1>sadioASDJoiad;</h1>
        </div>
    )
}

export default Edit_Profile
