import React, { useState } from "react";
import "./VolunteerSignUp.css";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { Auth } from "aws-amplify";

export default function VolunteerSignUp() {
    const options=[{value: 'yes'}, {value: 'no'}];

    const [fields, handleFieldChange] = useFormFields({
      name:"",
      email: "",
      phone: "",
      username:"",
      password: "",
      confirmPassword: "",
      license:"-1",
      hasVehicle:"2",
      kitchen:"-1",
      'custom:UserType': userType,
      confirmationCode: "",
    });

    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState("VOL");

  
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
          attributes: {
            email: fields.email,
            phone_number: fields.phone,
            preferred_username: fields.userName,
            name: fields.name,
            'custom:license': fields.license,
            'custom:hasVehicle': fields.hasVehicle,
            'custom:kitchen': fields.kitchen,
            'custom:UserType': "VOL"
          }
        });
        setIsLoading(false);
        console.log(newUser);
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
                <Form.Label>Full Name</Form.Label>
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

          <Form.Group controlId="license" size="lg">
            <Form.Label>Do you have a valid driving license?</Form.Label>
            <Form.Control 
                as="select" 
                value={fields.license}
                onChange={handleFieldChange}            
            >
                <option value ="-2">dsf</option>
                <option value="-1">Select</option>
                <option value="1">yes</option>
                <option value="0">no</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="vehicle" size="lg">
            <Form.Label>Do you have your own vehicle?</Form.Label>
            <Form.Control 
                as="select" 
                value={fields.hasVehicle}
                onChange={handleFieldChange}            
            >
                <option value ="-2">dsf</option>
                <option value="-1">Select</option>
                <option value="1">yes</option>
                <option value="0">no</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="kitchen" size="lg">
            <Form.Label>Do you prefer to work in kitchen?</Form.Label>
            <Form.Control 
                as="select" 
                value={fields.kitchen}
                onChange={handleFieldChange} 
            >
                <option value="-1">Select</option>
                <option value="1">yes</option>
                <option value="0">no</option>
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