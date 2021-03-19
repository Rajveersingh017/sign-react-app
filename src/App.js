import React, { useState, useEffect, Component, Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";

// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';


function App() {

  const history = useHistory();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
    
    history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              SIGN Home
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/userinfo">
                  <Nav.Link>User Information</Nav.Link>
                  </LinkContainer>
 
                  <LinkContainer to="/Edit_Profile">
                    <Nav.Link>Edit Profile</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/Request_Meal">
                    <Nav.Link>Request Meal</Nav.Link>
                  </LinkContainer>
                  
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>

                  {/* <LinkContainer to="/AdminUserData">
                    <Nav.Link>Admin User Data</Nav.Link>
                  </LinkContainer> */}

                  <LinkContainer to="/AdminHome">
                    <Nav.Link>AdminHome</Nav.Link>
                  </LinkContainer>


                  <LinkContainer to="/Volunteer_Registration">
                    <Nav.Link>Volunteer Sign Up</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/Agency_Registration">
                    <Nav.Link>Agency Sign Up</Nav.Link>
                  </LinkContainer>
                 
                  <LinkContainer to="/signup">
                    <Nav.Link>Client Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;