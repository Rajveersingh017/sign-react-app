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
import Row from 'react-bootstrap/Row';
// import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { Col } from "react-bootstrap";


export default function MealPreface() {

    const { isAuthenticated } = useAppContext();

    async function updateOrder(){
        let apiName= "production-DynamoAccess-api";
        let path = "/generateorderid"; 
        let data =  {message:"empty"}
        
            
        let user = {
            // email: localStorage.getItem("email"),
            // role: "CLI"
            email: isAuthenticated.email,
            role: isAuthenticated.userType,
        }
        let init ={body:user,}
       
        console.log(init);
        try{
            // console.log(localStorage.getItem("email"));

            data =  await API.put(apiName, path,init);
           console.log(data);

        }catch(error){
            data.message = error.message;
        }
    }
    API.configure();
    var [isTrue, isFalse] = useState(false);
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        onLoad();
    }, []);

    async function getData(){
        let apiName= "production-DynamoAccess-api";
        let path = "/users"; 
        let data =  {message:"empty"}
        
            
        let user = {
            // email: localStorage.getItem("email"),
            // role: "CLI"
            email: isAuthenticated.email,
            role: isAuthenticated.userType,
        }
        let init ={body:user,}
       
        console.log(init);
        try{
            // console.log(localStorage.getItem("email"));

            data =  await API.put(apiName, path,init);
           console.log(data);

        }catch(error){
            data.message = error.message;
        }
        if(data.Item.address==null){    
            // console.log('null found');
            // swal("hi");
            isFalse(false);
            swal({
                title: "Oh bummer!",
                text: "Seams like we don't have your address to deliver your food. Please update your profile in order to book the meal.",
                icon: "warning",
                
                dangerMode: true,
              });

        }
        if(data.Item.address!=null){    
            // console.log('not null found');
            isFalse(true);

        }
        return data;
    }
    function validateForm() {
        //  alert(JSON.stringify(fields));
         return (
           
            false
         );
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

      console.log("this is", isTrue);
    return ((userData &&
        <div>
            <Card>
                <Card.Header>Your Personal Details:</Card.Header>
                <Card.Body>
                <Card.Title>  <span class="userinfoHead">{userData.clientName}</span></Card.Title>
                <Card.Text class = "cardText">
                    <span class="userinfoHead">Address: </span>{userData.address}<br></br>
                    <span class="userinfoHead">City: </span>{userData.clientCity}<br></br>
                    <span class="userinfoHead">Email: </span>{userData.email}<br></br>
                    <span class="userinfoHead">Phone: </span>{userData.phoneNumber}<br></br>
                    <span class="userinfoHead">Number Of Adults: </span>{userData.adultsHome}<br></br>
                    <span class="userinfoHead">Number Of Children Home: </span>{userData.childrenHome}<br></br>
                    <span class="userinfoHead">Alergies: </span>{userData.clientAllergies}<br></br>
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
                    
                    <Button variant="dark" id="reqs"  onClick={()=>updateOrder()} disabled={!isTrue}>Request Meal!</Button>
                    </form>
                </Col>
                
                <Col sm={4} class="reqFriend">
                 <Card.Title>Requesting For a friend?</Card.Title>
                 <Button variant="dark" id="reqsfre">Click here!</Button>
                </Col>
                </Row>
                </Card.Body>


            </Card>
        </div>
    ));
    }