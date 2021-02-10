import React from 'react';
import './Meal.css';
import '../components/OrderId.js'


function Meal() {
    const randomOrderId = () =>{
        return "OD-" + Math.random().toString(36).substr(2,9);
    }
    console.log(randomOrderId());

    return (
        <div>
            <div className="Meal_Container_Top">
                <label htmlFor = "MealFriendBox">Please click on the checkbox to request meal for a friend</label>
                <input type="checkbox" id = "MealFriendBox"></input>
            </div>
            <div className="Meal_Container">
            <h1>Request A Meal!</h1>
            <hr></hr>
            <form method="post" action="../components/PostMeal">
                <label htmlFor = "EmailOrPhone">Email/Phone</label>
                <input type="text" id="EmailOrPhone" placeholder = "example@example.com"></input>

                <label htmlFor = "Name">Name</label>
                <input type="text" id="Name" placeholder="First Last"></input>

                <label htmlFor = "Street" >Street</label>
                <input type="text" id="Street" placeholder="Street"></input>

                <label htmlFor = "City" >City</label>
                <input type="text" id="City" placeholder="City"></input>

                <label htmlFor = "Province" >Province</label>
                <input type="text" id="Province" placeholder="Province"></input>

                <label htmlFor = "PostalCode" >Postal Code</label>
                <input type="text" id="PostalCode" placeholder="PostalCode"></input>

                <label htmlFor = "NoOfAdults" >Number Of Meals</label>
                <input type="number" id="NoOfAdults" placeholder="NoOfAdults"></input>

                <label htmlFor = "Alergies" >Alergies</label>
                <textarea id="Alergies"></textarea>

                <label htmlFor = "Delivery" >Delivery Instructions</label>
                <textarea id="Delivery"></textarea>
                
                <button type="Submit">Request!</button>

                <h1>{randomOrderId}</h1>
            </form>
            </div>
        </div>
    )
}

export default Meal
