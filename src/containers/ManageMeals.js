import React, { useState, useEffect } from "react";
import "./ManageMeals.css";
import { API } from "aws-amplify";
// import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
// import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid';
import swal from "sweetalert";
import AdminMealDisplayCycle from "../components/AdminMealDisplayCycle";


function ManageMeals() {
    
    let data = null;
    const [mealOption, setMeals] = useState([]);
    async function onLoad(){
        // data = await getCurrentMealsFromDB();
        
    }
    useEffect(() => onLoad(),[]);
    async function getCurrentMealsFromDB(){
        let apiName= "production-DynamoAccess-api";
        let path = "/managemeals"; 
        let data =  {message:"empty"}
        try{
            data =  await API.get(apiName, path, null);
            setMeals({
                MealTitle: data.MealTitle,
                MealDescription: "sadsdad"
            })
            console.log(mealOption);
        }catch(error){
            data.message = error.message;
        }
        return data;
    }

    // const [fields, handleFieldChange] = useFormFields({
    //     ID:"",
    //     MealTitle:"",
    //     MealDescription:"",
    //     MealServingCap:"",
    // });

    const [field, handleFieldChanges] = useState({
        ID:"",
        MealTitle:"",
        MealDescription:"",
        MealServingCap:"",
    });
    const [mealTitle, setMealTitle] = useState("");
    const [mealDescription, setMealDescription] = useState("");
    const [mealServingCap, setMealServingCap] = useState("");
    const [mealId, setMealId] = useState(uuidv4());
    const [disableEdit,EnableEdit] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);

    async function updateMealOption(){
        if(disableEdit){

            let apiName= "production-DynamoAccess-api";
            let path = "/admineditfooddynamodbupdate"; 
            let data =  {message:"empty"}
            console.log(field)
            let init ={ body:{
                MealId: mealId,
                MealTitle: mealTitle,
                MealDescription: mealDescription,
                MealServingCap: mealServingCap
            }}

            console.log(init);
            try{
                data =  await API.put(apiName, path,init);
                setMealServingCap("");
                setMealTitle("");
                setMealId(uuidv4());
                setMealDescription("");
                EnableEdit(false);
                swal({
                    title: "Thank You!",
                    text: "Gotcha! Meal option has been updated.",
                    icon: "success",    
                    dangerMode: false,
                });
            }catch(error){
                data.message = error.message;
            }
        }
        else{
            let apiName= "production-DynamoAccess-api";
            let path = "/updatefood"; 
            let data =  {message:"empty"}
            console.log(field)
            let init ={ body:{
                ID: mealId,
                MealTitle: mealTitle,
                MealDescription: mealDescription,
                MealServingCap: mealServingCap
            }}

            console.log(init);
            try{

                data =  await API.put(apiName, path,init);
                swal({
                    title: "Thank You!",
                    text: "Gotcha! the new meal option will be displayed to the clients.",
                    icon: "success",    
                    dangerMode: false,
                });
            }catch(error){
                data.message = error.message;
            }
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try{
            // let FormData = {
            //   email: localStorage.getItem("email"),  
            //   MealDescription:fields.MealDescription,
            // }
            await updateMealOption()
            setIsLoading(false);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function deleteMealFromDynamoDB(mealID){
        console.log("hello from delee function",mealID)

        let apiName= "production-DynamoAccess-api";
        let path = "/adminupdatefoodfetchsinglemeal"; 
        let init =  {
            body:{
                MealId: mealID
            }
        }
        let data = {message: "none"}
        console.log(init);
        try{
            data = await API.del(apiName,path,init);
        }catch(error){
            data.message = error.message;
        }
        return data;
    }

    async function deleteMeal(event){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Meal Option!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                deleteMealFromDynamoDB(event.target.value);
                swal("The meal option has been successfully removed!!", {
                icon: "success",
              });
            } else {
              swal("Meal is not deleted!");
            }
        });
    }
    async function addOrderIdToState(event){
        // console.log(event.target.value)
        await fetchTheParticularMeal()
        
        async function fetchTheParticularMeal(){
            let apiName= "production-DynamoAccess-api";
            let path = "/adminupdatefoodfetchsinglemeal"; 
            let data =  {message:"empty"}
            
            let init ={ body:{
                MealId: event.target.value
            }}
           
            console.log(init);
            try{
                data =  await API.put(apiName, path,init);
                console.log(data)                
                setMealId(data.Item.ID || null);
                setMealTitle( data.Item.MealTitle || null);
                setMealDescription(data.Item.MealDescription || null);
                setMealServingCap(data.Item.MealServingCap || null);    
                EnableEdit(true);   
            }catch(error){
                data.message = error.message;
            }
        }

        // adminupdatefoodfetchsinglemeal
    }

    return (mealOption &&
        <div className="ManageMeals">
        
        

            
            <Form onSubmit={handleSubmit} >

            <Form.Group>
                <Form.Label>
                    Please provide a title:
                </Form.Label>
                <Form.Control
                    type="text"
                    size = "lg"
                    id = "MealTitle"
                    placeholder ="Eg. Chicken Soup"
                    value={mealTitle}
                    onChange={e  => setMealTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Please upload a picture of the food</Form.Label>
                <Form.File 
                    id="custom-file"
                    label=""
                    custom
                    disabled
                />
            </Form.Group>
        
            <Form.Group>
                <Form.Label>Please provide a number of meals:</Form.Label>
                <Form.Control type="number"
                 id="MealServingCap"
                 size="lg"
                 placeholder="Number of meals"
                 value={mealServingCap}
                 onChange={e  => setMealServingCap(e.target.value)}
                />
            </Form.Group>
                

            <Form.Group>
                <Form.Label>Please provide a description of the meal</Form.Label>
                <Form.Control 
                as="textarea" rows={5} 
                type="MealDescription"
                id = "MealDescription"
                placeholder="Eg. Pumpkin pie, with lentil soup"
                value={mealDescription}
                onChange={e  => setMealDescription(e.target.value)}
                />
            </Form.Group>
    
            <Form.Group>
                <LoaderButton
                // Class="box"
                block
                size="lg"
                type="submit"
                variant="success"
                isLoading={isLoading}
                >
                Update Food
                </LoaderButton>
            </Form.Group>
          </Form>
          <AdminMealDisplayCycle addOrderIdToState={addOrderIdToState} deleteMeal = {deleteMeal} />
        </div>
    )
}

export default ManageMeals
