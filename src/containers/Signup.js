import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
      name:"",
      email: "",
      phone: "",
      username:"",
      password: "",
      confirmPassword: "",
      license:"",
      hasVehicle:"",
      kitchen:"",
      UserType: "",
      confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("CLI");

  // function checkChanged(e){
  //   alert(e.target.id)
  //   let value = e.target.checked;
  //   if (e.target.id=="disclaimerCheckBox"){
  //     fields.disclaimerCheckBox= value;
  //   }else if (e.target.id=="policyCheckBox"){
  //     fields.policyCheckBox= value;
  //   }
  // }

  function validateForm() {
   //  alert(JSON.stringify(fields));
    return (
      
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword &&
      // fields.disclaimerCheckBox  &&
      fields.policyCheckBox 
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
        attributes: {
          email: fields.email,
          phone_number: "+1204123456",
          preferred_username: "null",
          name: "null",
          'custom:license': "0",
          'custom:hasVehicle': "0",
          'custom:kitchen': "0",
          'custom:UserType': userType
        }
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
  
      userHasAuthenticated(true);
      history.push("/UserInfo");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit} method = "post">
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            placeholder="Enter email"
            value={fields.email}
            onChange={handleFieldChange}
          />
          <Form.Text className="text-muted">
           We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password01!"
            value={fields.password}
            onChange={handleFieldChange}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters, one number and one special characters (such as !@#$%), and
            must not contain spaces.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password01!"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        


       <Form.Group controlId="policyCheckBox">
         <Form.Check onChange={handleFieldChange}  type="checkbox" label="Privacy Policy" />
         <Form.Text id="passwordHelpBlock" muted >
          <a href="https://www.thesignfoundation.org/privacy-policy" target="_blank">Read our Privacy Policy</a>
          </Form.Text>
       </Form.Group>
       
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
           disabled={!validateForm()}
        >
          Agree and Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}