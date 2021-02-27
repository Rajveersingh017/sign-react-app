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
import { Grid, Row, Col } from 'react-bootstrap';


export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    phoneNumber: "",
    address: "",
  });
  const history = useHistory();
  // const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  // function checkChanged(e){
  //   alert(e.target.id)
  //   let value = e.target.checked;
  //   if (e.target.id=="disclaimerCheckBox"){
  //     fields.disclaimerCheckBox= value;
  //   }else if (e.target.id=="policyCheckBox"){
  //     fields.policyCheckBox= value;
  //   }
  // }
 
  
  // function validateForm() {
  //  //  alert(JSON.stringify(fields));
  //   return (
  //     fields.address.length > 0 &&
  //     fields.phoneNumber.length > 0
  //   );
  // }


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