import React, { useState,useContext } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Login.css";
import { Link } from "react-router-dom";
import UserData from '../contextData/UserData';
import { API } from "aws-amplify";


export default function Login() {
  
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  const {setUserInfo} = useContext(UserData);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function getUserInfo(){
    let apiName= "production-DynamoAccess-api";
        let path = "/users"; 
        let data =  {message:"empty"}
        
            
        let user = {
            email: localStorage.getItem("email"),
            role: "CLI"
        }
        let init ={body:user,}
       
        // console.log(init);
        try{
            console.log(localStorage.getItem("email"));

            data =  await API.put(apiName, path,init);
          //  console.log(data);
            setUserInfo({
              email: fields.email,
              address: data.Item.address || null,
              phoneNumber: data.Item.phoneNumber || null,
              clientName: data.Item.clientName || null,
              clientCity: data.Item.clientCity || null,
              neighbourhood: data.Item.neighbourhood || null,
              adultsHome: data.Item.adultsHome || null,
              childrenHome: data.Item.childrenHome || null,
              clientAllergies: data.Item.clientAllergies || null
            });
        }catch(error){
            data.message = error.message;
        }
  }
  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      let authenticationToken = (await Auth.currentSession()).getIdToken().getJwtToken();
//let tst = (await Auth.currentSession()).getIdToken();
//alert(JSON.stringify(tst))
//console.log(authenticationToken)
      // let userID = (await Auth.currentUserInfo()).attributes.sub;
      localStorage.setItem("email",fields.email);
      // localStorage.setItem("authenticationToken",authenticationToken);
      // localStorage.setItem("userID",userID);
      let fetchUserFromDb = await getUserInfo();
        
      
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }


  return (
    
    <div className="Login">

      <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Link to="/login/reset">Forgot password?</Link>

        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
        <Form.Group lg={24}>
                Or <Link to="/signup">Signup now!</Link>
        </Form.Group>
      </Form>
    </div>
  );
}