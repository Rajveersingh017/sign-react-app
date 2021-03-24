import React, { useState } from "react";
import "./VolunteerSignUp.css";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { Auth } from "aws-amplify";

function AgencySignUp() {
    const options=[{value: 'yes'}, {value: 'no'}];
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState("AGN");

    const [fields, handleFieldChange] = useFormFields({
      name:"",
      email: "",
      phone: "",
      username:"",
      password: "",
      confirmPassword: "",
      service:"0",
      hasVehicle:"0",
      kitchen:"-0",
      'custom:UserType': userType,
      confirmationCode: "",
    });
    

  
    function validateForm() {
      return (
        fields.email.length > 0 &&
        fields.password.length > 0 &&
        fields.password === fields.confirmPassword
      );
      console.log(useFormFields);
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
        history.push("/");
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
    }
  
    function renderConfirmationForm() {
      return (
        <Form onSubmit={handleConfirmationSubmit}>
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
            <Form.Group controlId="name" size="lg">
                <Form.Label>Organisation Name</Form.Label>
                <Form.Control
                autoFocus
                type="name"
                value={fields.name}
                onChange={handleFieldChange}
                />
          </Form.Group>
          <Form.Group controlId="email" size="lg">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </Form.Group>

          <Form.Group controlId="phone" size="lg">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={fields.phone}
              onChange={handleFieldChange}
            />
          </Form.Group>
        
          <Form.Group controlId="userName" size="lg">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="userName"
              value={fields.userName}
              onChange={handleFieldChange}
            />
          </Form.Group> 

          <Form.Group controlId="password" size="lg">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" size="lg">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleFieldChange}
              value={fields.confirmPassword}
            />
          </Form.Group>

          <Form.Group controlId="FB_Link" size="lg">
            <Form.Label>Facebook Link</Form.Label>
            <Form.Control
              type="text"
              onChange={handleFieldChange}
              value={fields.confirmtext}
            />
          </Form.Group>

          <Form.Group controlId="IG_Link" size="lg">
            <Form.Label>Instagram Link</Form.Label>
            <Form.Control
              type="text"
              onChange={handleFieldChange}
              value={fields.confirmtext}
            />
          </Form.Group>

          

          <Form.Group controlId="service" size="lg">
            <Form.Label>Services Offered</Form.Label>
            <Form.Control 
                as="select" 
                value={fields.service}
                onChange={handleFieldChange}            
            >
                <option value ="-2">Food</option>
                <option value="-1">Shelter</option>
                <option value="1">Clothes</option>
                <option value="0">Select</option>
            </Form.Control>
          </Form.Group>

         

          <LoaderButton
            block
            size="lg"
            type="submit"
            variant="success"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Signup
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

export default AgencySignUp
