import './Meal.css';
import '../components/OrderId.js';
import Form from "react-bootstrap/Form";
import Amplify from "aws-amplify";
// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";

import React, { useState } from "react";




function Meal() {
    const history = useHistory();
    // const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
     


    const randomOrderId = () =>{
        return "OD-" + Math.random().toString(36).substr(2,9);
    }

    const [fields, handleFieldChange] = useFormFields({
        email:"",
        name:"",
        street:"",
        city:"",
        province:"",
        postalCode:"",
        numberOfMeals:"",
        Alergies:"",
        instructions:"",
    });



    ////
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = {
                body:{
                    OrderId: randomOrderId(),
                    email: fields.email,
                    name: fields.name,
                    street: fields.street,
                    city: fields.city,
                    province: fields.province,
                    postalCode: fields.postalCode,
                    numberOfMeals: fields.numberOfMeals,
                    Alergies: fields.Alergies,
                    instructions: fields.instructions
                }
            };
            console.log(data);
            // const apiData = await API.post('DynamoAccess', '/mealpost' , data);

            fetch('https://z6i4s4dis4.execute-api.us-east-2.amazonaws.com/production/mealpost',{
                    method: 'POST',
                    headers: {
                       'Access-Control-Allow-Origin': '*',
                       'Accept':'application/json',
                       'content-type':'application/json'
                    },
                    body: JSON.stringify({data})});
        } catch (e) {
        }
      }
      
      ////

    // async function postMyMeal(){
    //     const data = {
    //         body:{
    //             OrderId: randomOrderId(),
    //             email: fields.email,
    //             name: fields.name,
    //             street: fields.street,
    //             city: fields.city,
    //             province: fields.province,
    //             postalCode: fields.postalCode,
    //             numberOfMeals: fields.numberOfMeals,
    //             Alergies: fields.Alergies,
    //             instructions: fields.instructions
    //         }
    //     };
    //     const apiData = await API.post('DynamoAccess', '/mealpost' , data);
    // }
    return (
        <div>
            <div className="Meal_Container_Top">
                <label htmlFor = "MealFriendBox">Please click on the checkbox to request meal for a friend</label>
                <input type="checkbox" id = "MealFriendBox"></input>
            </div>
            <div className="Meal_Container">
            <h1>Request A Meal!</h1>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                {/* {console.log(localStorage.getItem("email"))} */}
                <label htmlFor = "email">Email/Phone</label>
                <input type="text" value={fields.email} onChange={handleFieldChange} id="email" placeholder = "example@example.com"></input>

                <label htmlFor = "name">Name</label>
                <input type="text" id="name" value={fields.name} onChange={handleFieldChange} placeholder="First Last"></input>

                <label htmlFor = "street" >Street</label>
                <input type="text" id="street" value={fields.street} onChange={handleFieldChange} placeholder="Street"></input>

                <label htmlFor = "city" >City</label>
                <input type="text" id="city" value={fields.city} onChange={handleFieldChange} placeholder="City"></input>

                <label htmlFor = "province" >Province</label>
                <input type="text" id="province" value={fields.province} onChange={handleFieldChange} placeholder="Province"></input>

                <label htmlFor = "postalCode" >Postal Code</label>
                <input type="text" id="postalCode" placeholder="PostalCode" value={fields.postalCode} onChange={handleFieldChange}></input>

                <label htmlFor = "numberOfMeals" >Number Of Meals</label>
                <input type="number" id="numberOfMeals" placeholder="NoOfAdults" value={fields.numberOfMeals} onChange={handleFieldChange}></input>

                <label htmlFor = "Alergies" >Alergies</label>
                <textarea id="Alergies" value={fields.Alergies} onChange={handleFieldChange}></textarea>

                <label htmlFor = "instructions" >Delivery Instructions</label>
                <textarea id="instructions" value={fields.instructions} onChange={handleFieldChange}></textarea>
                
                <button type="Submit" >Request!</button>

                <h1>{randomOrderId()}</h1>
            </form>
            </div>
        </div>
    )
}

export default Meal
