import React, { useEffect, useState } from 'react';
import { API } from "aws-amplify";
import { Col } from 'react-bootstrap';
import "./css/SingleMealDisplay.css";
import SingleMealDisplayCycle from "./SingleMealDisplayCycle";

function SingleMealDisplay(userinfo) {
    // console.log("this is userprop",userinfo.props.currentOrderId);
    const [loadComponent, setLoadComponent] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(
        {
            
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
            // console.log("hellp",mealData);
            console.log("hellp",mealData[0]);
            // console.log(mealData.orderId)
            // mealData.Item.map((item) => 
            // {
            //     console.log(item)
            // });     
            console.log(mealData.length)
            let gatherMealsFromDB = [];
            for (let i = 0; i < mealData.length; i++) {
                let element = mealData[i];
                gatherMealsFromDB.push({
                    desc: element.MealDescription,
                    title: element.MealTitle,
                    qty: element.OrderedQty
                })
            }
            // console.log(gatherMealsFromDB)
            setCurrentOrder(gatherMealsFromDB);
            
            // currentOrder.map((item)=> console.log(item))
            // console.log(currentOrder);

            setLoadComponent(!loadComponent);
            
        }catch(error){
            console.log(error);
            // setLoadComponent(!loadComponent);

        }                      
        if(mealData!=null){
            // setLoadComponent(!loadComponent);
        }
    };


    
    return (loadComponent &&
        <div>
            <Col md="auto" className="CurrentOrderData"> 
                <h1>Your Current Order:</h1>
                <span className="Current_order_heading">Order ID: </span>{userinfo.props.currentOrderId}<br></br>
                  
                {
                    currentOrder.map(item =>{
                        return(
                            <div>
                                <span className="Current_order_heading">Title: </span>{item.title}<br></br>
                                <span className="Current_order_heading">Description: </span>{item.desc}<br></br>
                                <span className="Current_order_heading">Qty: </span>{item.qty}<br></br>
                            </div>
                        )
                    })
                }
                
            </Col>
        </div>
    )
}

export default SingleMealDisplay
