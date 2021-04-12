import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import SideBar from "../components/SideBar";
import UserData from '../contextData/UserData';
import MealDisplayCycle from "../components/MealDisplayCycle";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

import swal from "sweetalert";



function MealPreface() {
    const [isLoading, setIsLoading] = useState(false);

    const userInfo = useContext(UserData);
   console.log(userInfo.userInfo.email)
   const [orderedQty,setQtyOrdered] = useState(0);
    const [mealOrder, SetMealOrder]=useState({ 
        email: userInfo.userInfo.email,
        mealId:"",
        mealServingCap:"",
        role: "CLI",
        QtyOrdered: "0"
    });
    console.log(mealOrder);
    // only for testing this page! Get rid until -------
   
    async function handleSubmit(event){
        console.log(event);
        event.preventDefault();
        setIsLoading(true);
        console.log(orderedQty)
        if(mealOrder.mealId==""){
            console.log("mi;")
            swal("choose a meal first in order to proceed.");
            setIsLoading(false);
        } else if(mealOrder.mealServingCap >= orderedQty){
            await updateOrder();
        }
        else{
            swal("Meal Quantity can not exceed the quantity that we are serving");
            setIsLoading(false);
        }
    }
    async function addOrderIdToState(event){
        event.preventDefault();
        
        console.log(event.target.value)
        console.log(event.target.id)
        SetMealOrder({...mealOrder, mealId: event.target.value, mealServingCap: event.target.id})
        console.log(mealOrder);
        console.log(orderedQty)
    }
    async function updateOrder(){
        let apiName= "production-DynamoAccess-api";
        let path = "/generateorderid"; 
        let data =  {message:"empty"}
         
        const updateMealCap = mealOrder.mealServingCap - Number(orderedQty);
        console.log(updateMealCap)

        let user = {
            // email: localStorage.getItem("email"),
            email: userInfo.userInfo.email,
            role: "CLI",
            // CurrentOrderId: mealOrder.mealId,
            QtyOrdered: Number(orderedQty),
            UpdatedMealQty: updateMealCap,
            MealId: mealOrder.mealId,
            instructions: "none"
            // role: userInfo.userInfo.userType,
        }
        let init ={body:user,}
       
        console.log(init);
        try{
            // console.log(localStorage.getItem("email"));

            data =  await API.put(apiName, path,init);
            console.log(data);
            setIsLoading(false);
            swal({title: "Thank You!",
                text: data,
                icon: "success",
                
                dangerMode: true
              });
        //    swal("Succesfully booked your meal! Thank you.");
            

        }catch(error){        
            swal({
                title: "Bummer! ):",
                text: "something went wrong",
                icon: "success",
                dangerMode:true,
            });
            setIsLoading(false);
        }
    }
    // -------------------------------------------------


    
    // console.log(userInfo)
    return(
        <div>
            <Row>
                <Col md="auto"><SideBar props={userInfo}/></Col>
                <Col>
                    <Form onSubmit={handleSubmit}>  
                        <MealDisplayCycle addOrderIdToState={addOrderIdToState} />
                        <Form.Control 
                        type ="number"
                        placeholder="Quantity"
                        min="0"
                        max="6"
                        value={orderedQty}
                        onChange={e => setQtyOrdered(e.target.value)}
                        /><br></br>
                        
                        <LoaderButton
                        // Class="box"
                        block
                        size="lg"
                        type="submit"
                        variant="success"
                        isLoading={isLoading}
                        >
                            Request Meal!                        
                        </LoaderButton>
        
                    </Form>
                </Col>
            </Row>    
            
        </div>
    );
}

export default MealPreface