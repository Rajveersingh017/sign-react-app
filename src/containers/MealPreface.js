import React, { useState, useEffect, useContext } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
// import { onError } from "../libs/errorLib";
// import config from "../config";
// import { LinkContainer } from "react-router-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./MealPreface.css";
// import Table from 'react-bootstrap/Table';
import { useAppContext } from "../libs/contextLib";
import swal from "sweetalert";
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
// import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { Col } from "react-bootstrap";
import UserData from '../contextData/UserData';
import { Redirect } from 'react-router-dom';
    
export default function MealPreface() {

    var [isTrue, isFalse] = useState(false);
    const history = useHistory();
    // const { userHasAuthenticated } = useAppContext();
    // const [isLoading, setIsLoading] = useState(false);
    // const [userData, setUserData] = useState(null);
    const { isAuthenticated } = useAppContext();
    const [redirectTo, setRedirectTo] = useState(null);
    const userInfo = useContext(UserData);
    const [meals,setMealOptions] = useState(null);
    useEffect(() => {

        if(userInfo.userInfo.address===""){    
            console.log(userInfo.userInfo.address)
            isFalse(false);
            swal({
                title: "Oh bummer!",
                text: "Seams like we don't have your address to deliver your food. Please update your profile in order to book the meal.",
                icon: "warning",
                dangerMode: true,
            });
        }

        else{
            isFalse(true);
        }
        const mealOptionsFromDb = fetchMeals();
       
        fetchMeals();

    }, []);
    
    async function fetchMeals(){
        let api= "production-DynamoAccess-api";
        let api_path = "/managemeals"; 
        let mealData =  {message:"empty"}
        try{
            mealData =  await API.get(api, api_path,null);
            mealData.body.map((item) => console.log(item))
            
        }catch(error){
            mealData.message = error.message;
        }                      
    };

    function renderMealsOnForm(mealData){
        // console.log(mealData)
        return( 
               
            <div>{
                
                // meals.map(item => <p>item</p>)
            }</div>
        )
    }
    // function onLoad() {


    //     if(userInfo.userInfo.address===""){    
    //         console.log(userInfo.userInfo.address)
    //         isFalse(false);
    //         swal({
    //             title: "Oh bummer!",
    //             text: "Seams like we don't have your address to deliver your food. Please update your profile in order to book the meal.",
    //             icon: "warning",
                
    //             dangerMode: true,
    //         });
    //     }
    // }    

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
    // var [isTrue, isFalse] = useState(false);
    // const history = useHistory();
    // const { userHasAuthenticated } = useAppContext();
    // const [isLoading, setIsLoading] = useState(false);
    // const [userData, setUserData] = useState(null);
    

    // async function getData(){
    //     let apiName= "production-DynamoAccess-api";
    //     let path = "/users"; 
    //     let data =  {message:"empty","Item":{address:""}}
        
            
    //     let user = {
    //         // email: localStorage.getItem("email"),
    //         // role: "CLI"
    //         email: isAuthenticated.email,
    //         role: isAuthenticated.userType,
    //     }
    //     let init ={body:user,}
       
    //     console.log(init);
    //     try{
    //         // console.log(localStorage.getItem("email"));

    //         let ret_data =  await API.put(apiName, path,init);
    //         if(ret_data.Item){
    //             data = ret_data;
    //         }
    //        console.log(JSON.stringify(data));

    //     }catch(error){
    //         data.message = error.message;
    //     }
    //     if(userInfo.userInfo.address==""){    
    //         // console.log('null found');
    //         // swal("hi");
    //         isFalse(false);
    //         swal({
    //             title: "Oh bummer!",
    //             text: "Seams like we don't have your address to deliver your food. Please update your profile in order to book the meal.",
    //             icon: "warning",
                
    //             dangerMode: true,
    //           });

    //     }
    //     if(data.Item.address!=null){    
    //         // console.log('not null found');
    //         isFalse(true);

    //     }
    //     return data;
    // }
    // function validateForm() {
    //     //  alert(JSON.stringify(fields));
    //      return (
           
    //         false
    //      );
    // }
    
    
    //   console.log(localStorage.getItem("userId"));
    //   let key = 0;

      console.log("this is", isTrue);
//(userData && 
    return (
        ((userInfo) && redirectTo == null)?(
        <div>
        {renderMealsOnForm(meals)}
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
                    <span className="userinfoHead">Number Of Children: </span>{userInfo.userInfo.childrenHome}<br></br>
                    <span className="userinfoHead">Allergies: </span>{userInfo.userInfo.clientAllergies}<br></br>
                </Card.Text>
                <Button variant="primary" onClick={() => history.push('/userinformation')}>Click Here to Edit/Update!</Button>
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