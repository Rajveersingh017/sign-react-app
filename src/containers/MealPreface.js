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
import { Redirect } from 'react-router-dom';

export default function MealPreface() {

    var [isTrue, isFalse] = useState(false);
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const { isAuthenticated } = useAppContext();
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        onLoad();
    }, []);

    function goToPage(page){
        alert("GOING TO "+page)
        // 
        setRedirectTo(page);
    }

    

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
    

    async function getData(){
        let apiName= "production-DynamoAccess-api";
        let path = "/users"; 
        let data =  {message:"empty","Item":{address:""}}
        
            
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

            let ret_data =  await API.put(apiName, path,init);
            if(ret_data.Item){
                data = ret_data;
            }
           console.log(JSON.stringify(data));

        }catch(error){
            data.message = error.message;
        }
        if(data.Item.address==null || data.Item.address==""){    
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
        
        let data = await getData();
        console.log(JSON.stringify(data));
        setUserData(data.Item);
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
//(userData && 
    return (
        (userData && redirectTo == null)?(
        <div>
            <Card>
                <Card.Header>Your Personal Details:</Card.Header>
                <Card.Body>
                <Card.Title>  <span className="userinfoHead">{userData.clientName || ""}</span></Card.Title>
                <Card.Text className= "cardText">
                    <span className="userinfoHead">Address: </span>{userData.address || ""}<br></br>
                    <span className="userinfoHead">City: </span>{userData.clientCity || ""}<br></br>
                    <span className="userinfoHead">Email: </span>{userData.email || ""}<br></br>
                    <span className="userinfoHead">Phone: </span>{userData.phoneNumber || ""}<br></br>
                    <span className="userinfoHead">Number Of Adults: </span>{userData.adultsHome || ""}<br></br>
                    <span className="userinfoHead">Number Of Children Home: </span>{userData.childrenHome || ""}<br></br>
                    <span className="userinfoHead">Alergies: </span>{userData.clientAllergies || ""}<br></br>
                </Card.Text>goToPage
                {/* <Button variant="primary" href="/userinfo">Click Here to Edit/Update!</Button> */}
                <Button variant="primary" onClick={()=>goToPage('/userinfo')} >Click Here to Edit/Update!</Button>
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
        </div>):
        (redirectTo)?(
            <Redirect to={redirectTo} />
        ):(null)
    );
    }