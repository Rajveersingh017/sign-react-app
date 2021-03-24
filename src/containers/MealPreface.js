import React, { useState, useEffect, useContext } from "react";
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
import UserData from '../contextData/UserData';


export default function MealPreface() {
    const userInfo = useContext(UserData);
    console.log(useContext(UserData))
    const [user,setUser] = useState({});
    useEffect(() => {
        onLoad();
        
    }, []);
    setUser(useContext(UserData));
    console.log(user)
    function onLoad() {

        // userInfo = useContext(UserData);

        if(userInfo.userInfo.address==""){    
            console.log(userInfo.userInfo.address)
            isFalse(false);
            swal({
                title: "Oh bummer!",
                text: "Seams like we don't have your address to deliver your food. Please update your profile in order to book the meal.",
                icon: "warning",
                
                dangerMode: true,
            });
        }
    }

    async function updateOrder(){
        let apiName= "production-DynamoAccess-api";
        let path = "/generateorderid"; 
        let data =  {message:"empty"}
        
            
        let user = {
            email: localStorage.getItem("email"),
            role: "CLI"
        }
        let init ={body:user,}
       
        console.log(init);
        try{
            console.log(localStorage.getItem("email"));

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
    

    async function getData(){
        let apiName= "production-DynamoAccess-api";
        let path = "/users"; 
        let data =  {message:"empty"}
        
            
        let user = {
            email: localStorage.getItem("email"),
            role: "CLI"
        }
        let init ={body:user,}
       
        console.log(init);
        try{
            console.log(localStorage.getItem("email"));

            data =  await API.put(apiName, path,init);
           console.log(data);

        }catch(error){
            data.message = error.message;
        }
        if(userInfo.userInfo.address==""){    
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
    
    
    //   console.log(localStorage.getItem("userId"));
    //   let key = 0;

      
    return (({userInfo} &&
        <div>
            <Card>
                <Card.Header>Your Personal Details:</Card.Header>
                <Card.Body>
                <Card.Title>  <span className="userinfoHead">{userInfo.userInfo.clientName}</span></Card.Title>
                <Card.Text className = "cardText">


                    <span className="userinfoHead">Address: </span>{userInfo.userInfo.address}<br></br>
                    <span className="userinfoHead">City: </span>{userInfo.userInfo.clientCity}<br></br>
                    <span className="userinfoHead">Email: </span>{userInfo.userInfo.email}<br></br>
                    <span className="userinfoHead">Phone: </span>{userInfo.userInfo.phoneNumber}<br></br>
                    <span className="userinfoHead">Number Of Adults: </span>{userInfo.userInfo.adultsHome}<br></br>
                    <span className="userinfoHead">Number Of Children Home: </span>{userInfo.userInfo.childrenHome}<br></br>
                    <span className="userinfoHead">Alergies: </span>{userInfo.userInfo.clientAllergies}<br></br>
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
                
                <Col sm={4} className="reqFriend">
                 <Card.Title>Requesting For a friend?</Card.Title>
                 <Button variant="dark" id="reqsfre">Click here!</Button>
                </Col>
                </Row>
                </Card.Body>


            </Card>
        </div>
    ));
    }