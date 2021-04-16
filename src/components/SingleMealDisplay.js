import React, { useEffect, useState } from 'react';
import { API } from "aws-amplify";
import { Col } from 'react-bootstrap';
import "./css/SingleMealDisplay.css";

function SingleMealDisplay(userinfo) {
    // console.log("this is userprop",userinfo.props.currentOrderId);
    const [loadComponent, setLoadComponent] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(
        {
            Id:""
        }
    );
    useEffect(async () => await fetchMeals(),[]) 
    async function fetchMeals(){
        let api= "production-DynamoAccess-api";
        let api_path = "/getmealstatusfromorderid"; 
        let mealData =  {message:"empty"}
        let orderid = {
            body:{
                orderId: userinfo.props.currentOrderId
            }
        }
        try{
            mealData =  await API.put(api, api_path,orderid);
            console.log("hellp",mealData);
            console.log(mealData.orderId)
        
            setCurrentOrder({
                Id: mealData.orderId,
                title: mealData.mealTitle,
                qty: mealData.QtyOrdered,
                description: mealData.MealDescription
            });
            
            setLoadComponent(!loadComponent);
            
        }catch(error){
            console.log(error);
            setLoadComponent(!loadComponent);

        }                      
        if(mealData!=null){
            setLoadComponent(!loadComponent);
        }
    };
    return (loadComponent &&
        <div>
            <Col md="auto" className="CurrentOrderData"> 
                <h1>Your Current Order:</h1>
                <span className="Current_order_heading">Order ID: </span>{currentOrder.Id}<br></br>
                <span className="Current_order_heading">Title: </span>{currentOrder.title}<br></br>
                <span className="Current_order_heading">Description: </span>{currentOrder.description}<br></br>
                <span className="Current_order_heading">Qty: </span>{currentOrder.qty}<br></br>
            </Col>
        </div>
    )
}

export default SingleMealDisplay
