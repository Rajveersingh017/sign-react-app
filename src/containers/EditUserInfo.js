import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./UserInfo.css";
import swal from "sweetalert";
import { API } from "aws-amplify";
import Alert from 'react-bootstrap/Alert';
import UserInfo from "./UserInfo";



function EditUserInfo() {
    const [fields, handleFieldChange] = useFormFields({});
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setData] = useState(false);

    useEffect(async()=>{
        let apiName = "production-DynamoAccess-api";
        let path = "/users";
        let userInfo = {message: "empty"};
        let user = {
            email: localStorage.getItem("email"),
            role: "CLI"
        }
        let init = {body:user,}
        try{
            userInfo = await API.put(apiName,path,init);
        } catch(error){
            userInfo.message = error.message;
        }
        setData(userInfo.Item);
    },[]);

    function handleSubmit(){
        console.log("hi");
    }

    return(userData &&
        <div>
            <Form onSubmit={handleSubmit}>
                <Alert variant="success">
                    <Alert.Heading>Hey, nice to see you</Alert.Heading>
                    <p>
                        Please complete or update your information.
                    </p>
                </Alert>        
                <Form.Group controlId="address" size="lg">
                <Form.Label>
                    Home Address
                </Form.Label>
                <Form.Control
                    type="address"
                    placeholder=""
                    value={userData.address}
                    onChange={userData.address
                    }
                />
                </Form.Group>

                <Form.Group controlId="phoneNumber" size="lg">
                <Form.Label>
                    Phone Number
                </Form.Label>
                <Form.Control
                    type="phone"
                    placeholder="Phone number"
                    value={fields.phoneNumber}
                    onChange={handleFieldChange}
                />
                </Form.Group>
            
                <Form.Group controlId="clientName" size="lg">
                <Form.Label>
                    Full Name
                </Form.Label>
                <Form.Control
                    type="clientName"
                    placeholder="First name and Last name"
                    value={fields.clientName}
                    onChange={handleFieldChange}
                />
                </Form.Group>
            
                <Form.Group controlId="clientCity" size="lg">
                <Form.Label>
                    City
                </Form.Label>
                <Form.Control
                    type="clientCity"
                    placeholder="Your City"
                    value={fields.clientCity}
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
                    <option value="0" >Select your neighbourhood</option>
                    <option value="I'm not sure">I'm not sure</option>
                    <option value="Charleswood - Tuxedo - Westwood">Charleswood - Tuxedo - Westwood</option>
                    <option value="Daniel McIntyre">Daniel McIntyre</option>
                    <option value="Elmwood - East Kildonan">Elmwood - East Kildonan</option>
                    <option value="Fort Rouge - East Fort Garry">Fort Rouge - East Fort Garry</option>
                    <option value="Mynarski6">Mynarski</option>
                    <option value="North Kildonan">North Kildonan</option>   
                    <option value="Old Kildonan">Old Kildonan</option>
                    <option value="Point Douglas">Point Douglas</option>
                    <option value="River Heights - Fort Garry0">River Heights - Fort Garry</option>
                    <option value="St. Boniface">St. Boniface</option>
                    <option value="St. James">St. James</option>
                    <option value="St. Norbert - Seine River">St. Norbert - Seine River</option>
                    <option value="St. Vital">St. Vital </option> 
                    <option value="Transcona">Transcona</option>
                    <option value="Waverley West">Waverley West </option> 
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
                    <option value="0">Select the number of adults in the home</option>
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
                    <option value="-0">Select the number of children in the home</option>
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
        </div>
    )
}

export default EditUserInfo

   