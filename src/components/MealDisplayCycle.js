import React, { useState, useEffect, useContext } from "react";
import "./css/MealOptions.css";
import { Card, Col } from 'react-bootstrap';
import UserData from '../contextData/UserData';
import { API } from "aws-amplify";
import { Form } from "react-bootstrap";
import MealDisplayJSXjs from "./MealDisplayJSXjs"

function MealDisplayCycle(props) {
    const userInfo = useContext(UserData);

    // useEffect(async () => await fetchMeals(),[])
    useEffect(async () => await fetchMeals(),[userInfo.userInfo.currentOrderId]) 


    const {addOrderIdToState} = props;
    const [meals, setMealData] = useState({});
    const [dropDownLoopVal, setDropDownLoopVal] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    function formTheOrderRequest(event){
        // console.log("hi",event.target.value,"id", event.target.id, "cl", event.target.className)
    }

    async function fetchMeals(){
        let api= "production-DynamoAccess-api";
        let api_path = "/managemeals"; 
        let mealData =  {message:"empty"}

        try{
            let gatherMeal = [];  
            mealData =  await API.get(api, api_path,null);
            // console.log(mealData);
            mealData.body.map((item) => 
            {
                console.log(item); 
                <MealDisplayJSXjs key={item.ID} mealValues={item} />
                let meal = {};
                meal.MealTitle = (item.MealTitle)?item.MealTitle:null;
                meal.ID = (item.ID)?item.ID:null;
                meal.MealDescription = (item.MealDescription)?item.MealDescription:null;
                meal.MealServingCap = (item.MealServingCap)?item.MealServingCap:null;
                gatherMeal.push(meal);
            });
            // console.log(mealData.body[0])
            setMealData(gatherMeal);
            console.log(meals);
        }catch(error){
            mealData.message = error.message;
        }                      
        if(meals!=null){
            setIsLoading(true);
        }
        else{
            setIsLoading(false);
        }
    };

    // meals.map(item => console.log(item));
    return ( isLoading &&
        <div>
            {
                meals.map(item => {
                    let meals = "";
                    let bool = false;
                    if(Number(item.MealServingCap)< 10)
                    {
                        meals = "|Meals Left: "+ item.MealServingCap+" |"
                    }

                    if(Number(item.MealServingCap) <= 0)
                    {
                        bool = true;
                        meals = "| 0 Meals Left | Not available for booking |";
                    }
                    
                    return(
                        <div key={item.ID}>
                        <Card> 
                            <Card.Header>{item.MealTitle}</Card.Header>
                            <Card.Body>
                            <div className="mealLeftFloat">
                                {item.MealDescription}
                                <br></br>
                                <span className="MealServe">
                                    {meals}
                                </span>    
                            </div>
                            <div className="mealRightFloat">
                                <select
                                onChange={addOrderIdToState}
                                id={item.MealServingCap} 
                                className={item.ID}
                                disabled={bool}>
                                    <option value="0">QTY</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                            </Card.Body>
                           
                        </Card><br></br>
                        </div>
                    )
                })
            } 
        </div>
    )
}
// <button onClick={addOrderIdToState} id={item.MealServingCap} value={item.ID}>Select</button>

export default MealDisplayCycle
