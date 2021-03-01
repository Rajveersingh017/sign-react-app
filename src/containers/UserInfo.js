import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./UserInfo.css";
import { Auth } from "aws-amplify";
import { useFormik } from 'formik';
import { Grid, Row, Col, Image } from 'react-bootstrap';


export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    phoneNumber: "",
    address: "",
  });
  const history = useHistory();
  // const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  


  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      let user = {
        email: localStorage.getItem("userId"),
        userAddress: fields.address,
        phoneNumber: fields.phoneNumber,
      }
      // const newUser = await Auth.signUp(user);
      console.log(JSON.stringify(user));
      setIsLoading(false);
      // setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
 

  function renderForm() {
    return (
      
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="address" size="lg">
          <Form.Label>Home Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Your home address"
            value={fields.address}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber" size="lg">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Phone number"
            value={fields.phoneNumber}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="clientName" size="lg">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="clientName"
            placeholder="First name and Last name"
            value={fields.clientName}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="clientCity" size="lg">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="clientCity"
            placeholder="Your City"
            value={fields.clientCity}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="clientProvince" size="lg">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="clientProvince"
            placeholder="Your Province"
            value={fields.clientProvince}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="neighbourhood" size="lg">
            <Form.Label>Neighbourhood:</Form.Label>
            <Form.Control 
                as="select" 
                type="neighbourhood"
                value={fields.neighbourhood}
                onChange={handleFieldChange}            
            >
                <option value="0" selected>Select your neighbourhood</option>
                <option value="1">I'm not sure</option>
                <option value="2">South East</option>
                <option value="3">South West</option>
                <option value="4">North West</option>
                <option value="5">Central</option>
                <option value="6">North</option>
                <option value="7">North East</option>   
            </Form.Control>
        </Form.Group>
        <img src="https://mediavault.point2.com/p2a/htmltext/e683/3340/686d/b7a53cccfda1d6128d60/original.png" className="img-fluid" alt="" />   
          
        <Form.Group controlId="adultsHome" size="lg">
            <Form.Label>How many adults 18 and over live in the home:</Form.Label>
            <Form.Control 
                as="select" 
                type="adultsHome"
                value={fields.adultsHome}
                onChange={handleFieldChange}            
            >
                <option value="0" selected>Select the number of adults in the home</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="childrenHome" size="lg">
            <Form.Label>How many children under 18 live in the home:</Form.Label>
            <Form.Control 
                as="select" 
                type="childrenHome"
                value={fields.childrenHome}
                onChange={handleFieldChange}            
            >
                <option value="0" selected>Select the number of children in the home</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="clientAllergies">
          <Form.Label>Please list any allergies you may have</Form.Label>
          <Form.Control 
          as="textarea" rows={3} 
          type="clientAllergies"
          placeholder="Eg. Flower, Milk, Nuts"
          value={fields.clientAllergies}
          onChange={handleFieldChange}
          />
        </Form.Group>
       
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
        >
          Update Info
        </LoaderButton>
      </Form>
    );
  }
  return (
    <div className="UserInfo">
      {renderForm()}
    </div>
  );
}