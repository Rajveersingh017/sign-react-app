import React, { useState, useEffect, useContext } from "react";
import "./css/MealOptions.css";
import { Card, Col } from 'react-bootstrap';
import { API } from "aws-amplify";
import { Form } from "react-bootstrap";
import MealDisplayJSXjs from "./MealDisplayJSXjs"

function MealDisplayCycle(props) {

    useEffect(async () => await fetchMeals(),[])

    const {addOrderIdToState} = props;
    const [meals, setMealData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(!isLoading);
        }
    };

    // meals.map(item => console.log(item));
    return ( isLoading &&
        <div>
            {
                meals.map(item => {
                    return(
                        <div>
                        <Card> 
                            <Card.Header>{item.MealTitle}</Card.Header>
                            <Card.Body>
                            <div className="mealLeftFloat">
                                {item.MealDescription}
                                <br></br><span className="MealServe">
                                    |Meals Left: {item.MealServingCap}|
                                </span>    
                            </div>
                            <div className="mealRightFloat">
                                <button onClick={addOrderIdToState} id={item.MealServingCap} value={item.ID}>Select</button>
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

export default MealDisplayCycle
