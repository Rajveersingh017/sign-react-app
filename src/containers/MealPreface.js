import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./MealPreface.css";
import Table from 'react-bootstrap/Table';
import { useAppContext } from "../libs/contextLib";
import swal from "sweetalert";
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
// import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { Col } from "react-bootstrap";


export default function MealPreface() {
    API.configure();
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        onLoad();
    }, []);

    async function getData(){
        let apiName= "production-DynamoAccess-api";
        let path = "/getSingleUser"; 
        let data =  {message:"empty"}
        let init ={ body: {userId: localStorage.getItem("userID")}}
        
       
        console.log(init);
        try{
            console.log(localStorage.getItem("userID"));

            data =  await API.get(apiName, path,init);
           console.log(data);

        }catch(error){
            data.message = error.message;
        }
        return data;
    }
      
    async function onLoad() {
        
        let data1 = await getData();
        console.log(data1.Item);
        setUserData(data1.Item);
    //    if(userdata.email.empty){
    //     const Reqstate = "Disabled";
    //    }
    //    else{
    //        const Reqstate = "";
    //    }

    }
   
    
    //   console.log(localStorage.getItem("userId"));
      let key = 0;

      
    return ((userData &&
        <div>
            <Card>
                <Card.Header>Your Personal Details:</Card.Header>
                <Card.Body>
                <Card.Title>  <span class="userinfoHead">{userData.clientName.S}</span></Card.Title>
                <Card.Text class = "cardText">
                    <span class="userinfoHead">Address: </span>{userData.address.S}<br></br>
                    <span class="userinfoHead">City: </span>{userData.clientCity.S}<br></br>
                    <span class="userinfoHead">Email: </span>{userData.email.S}<br></br>
                    <span class="userinfoHead">Phone: </span>{userData.phoneNumber.S}<br></br>
                    <span class="userinfoHead">Number Of Adults: </span>{userData.adultsHome.S}<br></br>
                    <span class="userinfoHead">Number Of Children Home: </span>{userData.childrenHome.S}<br></br>
                    <span class="userinfoHead">Alergies: </span>{userData.clientAllergies.S}<br></br>
                    
                </Card.Text>
                <Button variant="primary" href="/userinfo">Click Here to Edit/Update!</Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                <Row>
                <Col sm={8}>
                    <Card.Title>Meal Request Form:</Card.Title>
                    <Card.Text>
                        Please fill out the delivery insturctions (optional)
                    </Card.Text>
                    
                    <form>
                    <Form.Group controlId="clientAllergies">
                        <Form.Control 
                        as="textarea" rows={3} 
                        type="clientAllergies"
                        placeholder="Eg. Flower, Milk, Nuts"
                        
                        />
                        </Form.Group>
                    </form>
                    <Button variant="dark" id="reqs">Request Meal!</Button>
                </Col>
                
                <Col sm={4} class="reqFriend">
                 <Card.Title>Requesting For a friend?</Card.Title>
                 <Button variant="dark" id="reqs">Click here!</Button>
                </Col>
                </Row>
                </Card.Body>


            </Card>
        </div>
    ));
    }