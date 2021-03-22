import React, { useState,Component } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./AdminUpdateFood.css";
import swal from "sweetalert";
// import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
// import { useFormik } from 'formik';
// import { Grid, Row, Col, Image } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

export default function FoodInfo() {

    function updateFood(food) {
  
        API.configure();
        
          let init = {
            body: food,   
          }
          let apiName= "production-DynamoAccess-api";
          let path = "/updatefood";        //**CHANGE THIS**
          console.log(food);
         
        return API.put(apiName, path, init);
      }

  const [fields, handleFieldChange] = useFormFields({
    foodDescription:"",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const { isAuthenticated } = useAppContext();
  const history = useHistory();
  
  //const [newUser, setNewUser] = useState(null);

  async function handleSubmit(event) {
      event.preventDefault();
      setIsLoading(true);

      try{
          let food = {
            email: isAuthenticated.email,
            foodDescription:fields.foodDescription,
          }
          let retFood = await updateFood(food);
          swal(retFood);
          setIsLoading(false);
      } catch (e) {
          onError(e);
          setIsLoading(false);
      }
  }


  function renderForm() {
    return (
      
      <Form onSubmit={handleSubmit} >

        <Form.Group>
            <Form.Label>Please upload a picture of the food</Form.Label>
            <Form.File 
                id="custom-file"
                label=""
                custom
            />
        </Form.Group>

        <Form.Group controlId="foodDescription">
            <Form.Label>Please provide a description of the meal</Form.Label>
            <Form.Control 
            as="textarea" rows={5} 
            type="foodDescription"
            placeholder="Eg. Pumpkin pie, with lentil soup"
            value={fields.foodDescription}
            onChange={handleFieldChange}
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
    );
  }
  return (
    <div className="UpdateFood">
      {renderForm()}
    </div>
  );
}


