import API from '@aws-amplify/api';
import React, { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import "./css/MealPauseOrStart.css"
import Spinner from 'react-bootstrap/Spinner';

function MealPauseOrStart() {
    const [mealReqStatus, SetMealReqStatus] = useState("");
    async function pauseMeals(){
        SetMealReqStatus(" ...Loading...");
        let api= "production-DynamoAccess-api";
        let api_path = "/adminpauseorrestartorders"; 
        let mealData =  {message:"empty"}

        try{
            mealData =  await API.get(api, api_path,null);
            SetMealReqStatus("Currently not taking new orders.")
        }catch(error){
            mealData.message = error.message;
        }   
    }
    async function takeNewOrders(){
        SetMealReqStatus(" ...Loading...")
        let api= "production-DynamoAccess-api";
        let api_path = "/adminpauseorrestartorders"; 
        let mealData =  {message:"empty"}

        try{
            mealData =  await API.put(api, api_path,null);
            SetMealReqStatus("Now taking new orders.")
        }catch(error){
            mealData.message = error.message;
        } 
        
    }

    
    return (
        <div>
            <div className="MealButtonsContainer">
                <div>
                    <h1>Meal Status: <span className="nonRed">{mealReqStatus}</span></h1> 
                    <div className="floatleftMealButton">
                        <button onClick={pauseMeals}>Pause Orders</button>
                    </div>
                    <div className="floatrightMealButton">
                        <button onClick={takeNewOrders}>Take Orders</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MealPauseOrStart
