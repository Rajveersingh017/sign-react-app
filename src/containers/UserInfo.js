import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./UserInfo.css";
import swal from "sweetalert";
// import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
// import { useFormik } from 'formik';
// import { Grid, Row, Col, Image } from 'react-bootstrap';


export default function UserInfo() {

  function updateUser(user) {
    //
    API.configure();
    // return API.put("DynamoAccess", "/updateUser", {
    //   body: user,
     
    // });
   
    // let authenticationToken = localStorage.getItem("authenticationToken");
    // let headers = {
    //       "X-Api-Key":"zbn0eGjhvYxtFZWWdSHL4BFREdBIAhI6k6aaZHRd",
    //        "Authorization":authenticationToken
    //   };
      let init = {
        body: user,
        // headers:headers
      }
      let apiName= "production-DynamoAccess-api";
      let path = "/updateUser";
     
    return API.put(apiName, path, init);

    
    // headers:{
    //   "x-api-key":"zbn0eGjhvYxtFZWWdSHL4BFREdBIAhI6k6aaZHRd",
    //   "x-authorization-token":"6d24ead7-8b05-4b98-80e7-2acc12df9bea"
    // }

    // return API.put("client-portal-api", "/updateUser", {
    //   body: user,
    //   "x-api-key": "zbn0eGjhvYxtFZWWdSHL4BFREdBIAhI6k6aaZHRd",
    // }); 
    //"x-authorization-token": "",DynamoAccess

  }

  const [fields, handleFieldChange] = useFormFields({
    address:"",
    phoneNumber:"",
    clientName:"",
    clientCity:"",
    neighbourhood:"",
    adultsHome:"",
    childrenHome:"",
    clientAllergies:"",
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
        userID : localStorage.getItem("userID"),
        email: localStorage.getItem("email"),
        address:fields.address,
        phoneNumber:fields.phoneNumber,
        clientName:fields.clientName,
        clientCity:fields.clientCity,
        neighbourhood:fields.neighbourhood,
        adultsHome:fields.adultsHome,
        childrenHome:fields.childrenHome,
        clientAllergies:fields.clientAllergies,
      }

      await updateUser (user);
      swal("Profile successfully updated.");
      setIsLoading(false);
      // const JSON_SETINGS = {
      //   // *GET, POST, PUT, DELETE, etc.
      //   method: "PUT",
      //   // no-cors, *cors, same-origin,cors
      //   mode: "cors",
      //   // *default, no-cache, reload, force-cache, only-if-cached
      //   cache: "no-cache",
      //   // include, *same-origin, omit
      //   credentials: "omit",
      //   // manual, *follow, error
      //   redirect: "follow",
      //   // no-referrer, *client
      //   referrer: "no-referrer",
      //   // 'application/json' 'Content-Type': 'application/x-www-form-urlencoded',
      //   headers: {
      //     "Content-Type": "text/plain"
      //   },
      //   body: null
      // };
      // let json_setings = JSON_SETINGS;
      // json_setings.body = JSON.stringify(user);
      // let url = "https://8pysyfg5ce.execute-api.us-east-2.amazonaws.com/dev/updateUser";
      // setIsLoading(true);
      // // ******************************
      // fetch(url, json_setings)
      // .then(response => response.json())
      // .then(result => {
      //   if(result.status){
      //     alert("UPDATED");
      //   }else{
      //     alert("UPDATE FAILED");
      //   }
      //   setIsLoading(false);
      // })
      // .catch(error => {
      //   alert("ERROR "+error.message);
      //   setIsLoading(false);
      // });
      //****************************************************** 
      // alert("call lambda function "+JSON.stringify(user));
      
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

        {/* <Form.Group controlId="clientProvince" size="lg">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="clientProvince"
            placeholder="Your Province"
            value={fields.clientProvince}
            onChange={handleFieldChange}
          />
        </Form.Group> */}

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
                <option value="2">Charleswood - Tuxedo - Westwood</option>
                <option value="3">Daniel McIntyre</option>
                <option value="4">Elmwood - East Kildonan</option>
                <option value="5">Fort Rouge - East Fort Garry</option>
                <option value="6">Mynarski</option>
                <option value="7">North Kildonan</option>   
                <option value="8">Old Kildonan</option>
                <option value="9">Point Douglas</option>
                <option value="10">River Heights - Fort Garry</option>
                <option value="11">St. Boniface</option>
                <option value="12">St. James</option>
                <option value="13">St. Norbert - Seine River</option>
                <option value="14">St. Vital </option> 
                <option value="15">Transcona</option>
                <option value="16">Waverley West </option> 
            </Form.Control>
        </Form.Group>
        <img src="https://winnipeg.ca/census/2016/Images/ElectoralWards.gif" className="img-fluid" alt="" />   
          
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