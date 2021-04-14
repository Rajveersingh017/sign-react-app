import React, { useState,useContext, useEffect } from "react";
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
import Alert from 'react-bootstrap/Alert';
import UserData from '../contextData/UserData';
import { setNestedObjectValues } from "formik";


export default function UserInfo() {

  const {setUserInfo} = useContext(UserData);
  const userInfo = useContext(UserData);
  const [errors, setErrors] = useState([]);
  const [refreshfields, setRefreshfields] = useState(false);
// alert(JSON.stringify(userInfo))
//   const [fields, handleFieldChange] = useFormFields({
//     address:userInfo.userInfo.address,
//     phoneNumber:userInfo.userInfo.phoneNumber,
//     clientName:userInfo.userInfo.clientName,
//     clientCity:userInfo.userInfo.clientCity,
//     neighbourhood:userInfo.userInfo.neighbourhood,
//     adultsHome:userInfo.userInfo.adultsHome,
//     childrenHome:userInfo.userInfo.childrenHome,
//     clientAllergies:userInfo.userInfo.clientAllergies,
// });
const [fields, handleFieldChange] = useFormFields({
  address:"",
  phoneNumber:"",
  clientName:"",
  clientCity:"",
  neighbourhood:"0",
  adultsHome:"0",
  childrenHome:"-1",
  clientAllergies:"",
});
// alert(JSON.stringify(fields))


function onLoad(){

  fields.address=userInfo.userInfo.address;
  fields.phoneNumber=userInfo.userInfo.phoneNumber;
  fields.clientName=userInfo.userInfo.clientName;
  fields.clientCity=userInfo.userInfo.clientCity;
  fields.neighbourhood=userInfo.userInfo.neighbourhood;
  fields.adultsHome=userInfo.userInfo.adultsHome;
  fields.childrenHome=userInfo.userInfo.childrenHome;
  fields.clientAllergies=userInfo.userInfo.clientAllergies;

  setRefreshfields(true);
}

useEffect(onLoad,[])

function isPhoneValid(inputnum) {
  // let match = false;
  // if(inputnum != null && inputnum != ""){
  //   match = inputnum.match(/\d/g).length===10;
  // }
  // return match ;
  return (inputnum != null && inputnum != "" && inputnum.match(/\d/g).length===10);
}

function isNameValid(inputtxt) {
//       var letters = /^[A-Za-z]+$/;      use this only for letters without space  
  return (inputtxt != null && inputtxt != "" && inputtxt.match(/^[a-zA-Z\s]*$/));
}

function isAlergyValid(input){
  return (input !="" && input != null && input.match(/^[a-zA-Z\s]*$/));
}

// function isAddressValid(address){
//   return address.match(/^\d+\s[A-z]+\s[A-z]+/);
// }

function handleFieldChangeInner(e){
  let target = e.target;
  let id = target.id;
  errors.map(error => {
    if(error.id == id){
      error.error="";
    }
  })
  handleFieldChange(e);
}

function isFormValid(){
  let ret = true;
  let errors = [];
  
  // let addressValid = isAddressValid(fields.address);
  if(!fields.address && fields.address == "" || fields.address == null){
    let error = {id:"address", error:"Please Enter A Valid Address"};
    errors.push(error);
    ret = false;
  }

  let phoneValid = isPhoneValid(fields.phoneNumber);
  // alert("isPhoneValid = "+phoneValid)
  if(!phoneValid){
    let error = {id:"phoneNumber", error:"Please Enter a Valid Phone Number"};
    errors.push(error);
    ret = false;
  }

  let nameValid = isNameValid(fields.clientName)
  if(!nameValid){
    let error = {id:"clientName", error:"Please Enter Your Name"};
    errors.push(error);
    ret = false;
  }

  let nameCityValid = isNameValid(fields.clientCity)
  if(!nameCityValid){
    let error = {id:"clientCity", error:"Please Enter Your City"};
    errors.push(error);
    ret = false;
  }

  if(fields.neighbourhood == "0" || fields.neighbourhood == "" || fields.neighbourhood == null){
    let error = {id:"neighbourhood", error:"Please choose from the provided list"};
    errors.push(error);
    ret = false;
  }

  if(fields.adultsHome == "0" || fields.adultsHome == "" || fields.adultsHome == null){
    let error = {id:"adultsHome", error:"Please Choose The Number Of Adults"};
    errors.push(error);
    ret = false;
  }

  if(fields.childrenHome == "-1" || fields.childrenHome == "" || fields.childrenHome == null){
    let error = {id:"childrenHome", error:"Please Choose The Number Of Children"};
    errors.push(error);
    ret = false;
  }

  let alergyValid = isAlergyValid(fields.clientAllergies)
  if(!alergyValid){
    let error = {id:"clientAllergies", error:"No numbers or special characters are permitted in this field"};
    errors.push(error);
    ret = false;
  }
  if(errors.length != 0){
    setErrors(errors);
    }
  return ret;
}

function getError(id){
  let ret = "";
  errors.map(error => {
    if(error.id == id){
      ret = error.error;
    }
  })
  return ret;
}
 
  function updateUser(user) {  
    API.configure();
      let init = {
        body: user,   
      }
      let apiName= "production-DynamoAccess-api";
      let path = "/edituserdetails";
      // console.log(user);
    return API.put(apiName, path, init);
  }
  
  const history = useHistory();
  // const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAppContext();
  async function handleSubmit(event) {
    event.preventDefault();

    if(isFormValid()){
      setIsLoading(true);
  
      try {
        let user = {
          // userID : localStorage.getItem("userID"),
          email: isAuthenticated.email,
          // email: localStorage.getItem("email"),
          role: isAuthenticated.userType,
          // role: "CLI",
          address:fields.address,
          phoneNumber:fields.phoneNumber,
          clientName:fields.clientName,
          clientCity:fields.clientCity,
          neighbourhood:fields.neighbourhood,
          adultsHome:fields.adultsHome,
          childrenHome:fields.childrenHome,
          clientAllergies:fields.clientAllergies,
        }
        let retUser = await updateUser(user);
        setUserInfo(user);
        // swal("Profile successfully updated.");
        swal(retUser);
        swal({
          title: "Thank You!",
          text: retUser,
          icon: "success",
          
          dangerMode: true,
        });
  
        setIsLoading(false);
      } catch (e) {
        onError(e);
        setIsLoading(false);
     }
    }else{
      swal({
        title: "Invalid Form",
        text: "Please make sure you have filled out all of the fields correctly",
        icon: "error",    
        dangerMode: true,
      });
    }
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
<Alert variant="success">
  <Alert.Heading>  Please complete or update your information.</Alert.Heading>
</Alert>
        <Form.Group controlId="address" size="lg">
          <Form.Label>Home Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Your home address"
            value={fields.address}
            onChange={handleFieldChangeInner}
          />
         <Form.Label className= "errorStyle">{getError("address")}</Form.Label>
        </Form.Group>

        <Form.Group controlId="phoneNumber" size="lg">
          <Form.Label>Phone Number With Area Code</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Phone number"
            value={fields.phoneNumber}
            onChange={handleFieldChangeInner}
          />
           <Form.Label className= "errorStyle">{getError("phoneNumber")}</Form.Label>
        </Form.Group>

        <Form.Group controlId="clientName" size="lg">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="clientName"
            placeholder="First name and Last name"
            value={fields.clientName}
            onChange={handleFieldChangeInner}
          />
          <Form.Label className= "errorStyle">{getError("clientName")}</Form.Label>
        </Form.Group>

        <Form.Group controlId="clientCity" size="lg">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="clientCity"
            placeholder="Your City"
            value={fields.clientCity}
            onChange={handleFieldChangeInner}
          />
          <Form.Label className= "errorStyle">{getError("clientCity")}</Form.Label>
        </Form.Group>

        <Form.Group controlId="neighbourhood" size="lg">
            <Form.Label>Neighbourhood</Form.Label>
            <Form.Control 
                as="select" 
                type="neighbourhood"
                value={fields.neighbourhood}
                onChange={handleFieldChangeInner}            
            >
                <option value="0" selected>Select your neighbourhood</option>
                <option value="I am not sure">I am not sure</option>
                <option value="Charleswood - Tuxedo - Westwood">Charleswood - Tuxedo - Westwood</option>
                <option value="Daniel McIntyre">Daniel McIntyre</option>
                <option value="Elmwood - East Kildonan">Elmwood - East Kildonan</option>
                <option value="Fort Rouge - East Fort Garry">Fort Rouge - East Fort Garry</option>
                <option value="Mynarski">Mynarski</option>
                <option value="North Kildonan">North Kildonan</option>   
                <option value="Old Kildonan">Old Kildonan</option>
                <option value="Point Douglas">Point Douglas</option>
                <option value="River Heights - Fort Garry">River Heights - Fort Garry</option>
                <option value="St. Boniface">St. Boniface</option>
                <option value="St. James">St. James</option>
                <option value="St. Norbert - Seine River">St. Norbert - Seine River</option>
                <option value="St. Vital">St. Vital </option> 
                <option value="Transcona">Transcona</option>
                <option value="Waverley West">Waverley West </option> 
            </Form.Control>
            <Form.Label className= "errorStyle">{getError("neighbourhood")}</Form.Label>
        </Form.Group>
        <div>
        <img src="https://winnipeg.ca/census/2016/Images/ElectoralWards.gif" className="img-fluid" alt="" />   
        </div>

        <Form.Group controlId="adultsHome" size="lg">
            <Form.Label>How many adults 18 and over live in the home:</Form.Label>
            <Form.Control 
                as="select" 
                type="adultsHome"
                value={fields.adultsHome}
                onChange={handleFieldChangeInner}            
            >
                <option value="0" selected>Select the number of adults in the home</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </Form.Control>
            <Form.Label className= "errorStyle">{getError("adultsHome")}</Form.Label>
        </Form.Group>

        <Form.Group controlId="childrenHome" size="lg">
            <Form.Label>How many children under 18 live in the home:</Form.Label>
            <Form.Control 
                as="select" 
                type="childrenHome"
                value={fields.childrenHome}
                onChange={handleFieldChangeInner}            
            >
                <option value="-1" selected>Select the number of children</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </Form.Control>
            <Form.Label className= "errorStyle">{getError("childrenHome")}</Form.Label>
        </Form.Group>

        <Form.Group controlId="clientAllergies">
          <Form.Label>Please list any allergies you may have</Form.Label>
          <Form.Control 
          as="textarea" rows={3} 
          type="clientAllergies"
          placeholder="Eg. Flower, Milk, Nuts"
          value={fields.clientAllergies}
          onChange={handleFieldChangeInner}
          />
          <Form.Label className= "errorStyle">{getError("clientAllergies")}</Form.Label>
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