import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import SideBar from "../components/SideBar";
import UserData from '../contextData/UserData';
import MealDisplayCycle from "../components/MealDisplayCycle";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { API } from "aws-amplify";
import * as swal from 'sweetalert';



function MealPreface() {

    const userInfo = useContext(UserData);
   console.log(userInfo.userInfo.email)
    const [mealOrder, SetMealOrder]=useState({ 
        email: userInfo.userInfo.email,
        mealId:"",
        role: "CLI",
    });
    console.log(mealOrder);
    // only for testing this page! Get rid until -------
   
    async function handleSubmit(){
        // event.preventDefault();
        if(mealOrder.mealId==""){
            console.log("mi;")
            swal("choose a meal first in order to proceed.");
        }
        else{
            await updateOrder();
        }
    }
    async function addOrderIdToState(event){
        event.preventDefault();
        
        const { value: ipAddress } = await swal.fire({
            title: 'Enter your IP address',
            input: 'text',
            inputLabel: 'Your IP address',
            inputValue: ' ',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to write something!'
              }
            }
          })
        console.log(event.target.value)
        console.log(event)
        SetMealOrder({...mealOrder, mealId: event.target.value})
        console.log(mealOrder);
    }
    async function updateOrder(){
        let apiName= "production-DynamoAccess-api";
        let path = "/generateorderid"; 
        let data =  {message:"empty"}
         
            
        let user = {
            // email: localStorage.getItem("email"),
            email: userInfo.userInfo.email,
            role: "CLI"

            // role: userInfo.userInfo.userType,
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
    // -------------------------------------------------


    
    // console.log(userInfo)
    return(
        <div>
            <Row>
                <Col md="auto"><SideBar props={userInfo}/></Col>
                <Col>
                    <Form>  
                        <MealDisplayCycle addOrderIdToState={addOrderIdToState} />
                        <Form.Control 
                        type ="number"
                        placeholder="Quantity"
                        min="0"
                        max="6"
                        />
                        <Button variant="dark" id="reqs"  onClick={()=>handleSubmit()}>Request Meal!</Button>
                    </Form>
                </Col>
            </Row>    
            
        </div>
    );
}

export default MealPreface