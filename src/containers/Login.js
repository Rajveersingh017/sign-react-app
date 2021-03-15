import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Login.css";
import { Link } from "react-router-dom";



export default function Login() {
  
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });


  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      let authenticationToken = (await Auth.currentSession()).getIdToken().getJwtToken();
//let tst = (await Auth.currentSession()).getIdToken();
//alert(JSON.stringify(tst))
//console.log(authenticationToken)
      // let userID = (await Auth.currentUserInfo()).attributes.sub;
      localStorage.setItem("email",fields.email);
      // localStorage.setItem("authenticationToken",authenticationToken);
      // localStorage.setItem("userID",userID);
      
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }


  return (
    
    <div className="Login">

      <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Link to="/login/reset">Forgot password?</Link>

        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
        <Form.Group lg={24}>
                Or <Link to="/signup">Signup now!</Link>
        </Form.Group>
      </Form>
    </div>
  );
}