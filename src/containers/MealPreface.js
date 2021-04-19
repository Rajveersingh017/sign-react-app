import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import SideBar from "../components/SideBar";
import UserData from '../contextData/UserData';
import MealDisplayCycle from "../components/MealDisplayCycle";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import SingleMealDisplay from "../components/SingleMealDisplay";

import swal from "sweetalert";



function MealPreface() {
    const [reload,setReload]=useState(false);
    const userInfo = useContext(UserData);

    const [buttonStatus, setButtonStatus] = useState(true);
    const randomOrderId = () =>{
        return "OD-" + Math.random().toString(36).substr(2,9);
    };
    
    useEffect(()=>{
        
    console.log(userInfo.userInfo)
        // updateTest(<MealDisplayCycle addOrderIdToState={addOrderIdToState} />)
        if(userInfo.userInfo.currentOrderId!=null){
            setButtonStatus(true);
        }
        else if(userInfo.userInfo.address==null){
            setButtonStatus(true);
            swal({
                icon: 'error',
                title: 'Oh bummer!',
                text: 'We need you to provide us with an address so that we can deliver you the food! Please update your profile.',
              })
        }
        else{
            setButtonStatus(false);
        }
    },[])
    const [isLoading, setIsLoading] = useState(false);
    const [initaltesting, updateTest] = useState(<MealDisplayCycle addOrderIdToState={addOrderIdToState} />);
//    console.log(userInfo.userInfo)
   const [orderedQty,setQtyOrdered] = useState(0);
    const [mealOrder, SetMealOrder]=useState({ 
        email: userInfo.userInfo.email,
        mealId:"",
        mealServingCap:"",
        qtyOrdered: "",
        role: "CLI"
        
    });
    // console.log(mealOrder);
    // only for testing this page! Get rid until -------
   
    async function handleSubmit(event){
        console.log(event);
        event.preventDefault();
        setIsLoading(true);
        // console.log(mealOrder)
        console.log(orderedQty)
        await updateOrder();
        // if(mealOrder.mealId==""){
        //     console.log("mi;")
        //     swal("choose a meal first in order to proceed.");
        //     setIsLoading(false);
        // } else if(mealOrder.mealServingCap >= orderedQty){
        //     await updateOrder();
        // }
        // else{
        //     swal("Meal Quantity can not exceed the quantity that we are serving");
        //     setIsLoading(false);
        // }
    }

    const selectedMeals = [];
    let mealReqCount = 0;


    async function addOrderIdToState(event){
        let temp = 0;
        let bool = true;
        if (selectedMeals.length!=0){
            console.log("is not null",selectedMeals)

            selectedMeals.map(function(item, i){
        
                if(event.target.className==item.mealId){
                    console.log("its a match",bool);
                    item.qtyOrdered = event.target.value;
                    bool = false;
                }
                // else{
                //     bool = true;
                // }
                temp += Number(item.qtyOrdered);
            });
            console.log("it was a match outter map",bool);

            if(bool==true){
                console.log("putting item 1")
                selectedMeals.push({                   
                    mealId: event.target.className,
                    mealServingCap: event.target.id,
                    qtyOrdered: event.target.value
                })
            }
            mealReqCount =temp;
        }
        else{
            console.log("is null",selectedMeals)
            // if(mealReqCount > 6 || (mealReqCount+Number(event.target.value)) > 6){
            //     swal("error can't select more than 6 meals")
            // }
            selectedMeals.push({
                mealId: event.target.className,
                mealServingCap: event.target.id,
                qtyOrdered: event.target.value
            })
            console.log("putting item 2")
            mealReqCount = mealReqCount + Number(event.target.value);
            setQtyOrdered(mealReqCount);
            console.log("this[]" , selectedMeals);
            console.log(orderedQty)
            // console.log(event.target.value)
            // console.log(event.target.id)
            SetMealOrder({...mealOrder, mealId: event.target.className, mealServingCap: event.target.id, qtyOrdered: event.target.value})
        
        }
        event.preventDefault();
        // console.log("hi",event.target.value,"id", event.target.id, "cl", event.target.className)
        console.log(mealReqCount)
        
        // let user = {
        //     // email: localStorage.getItem("email"),
        //     email: userInfo.userInfo.email,
        //     role: "CLI",
        //     CurrentOrderId: currentOrderId,
        //     QtyOrdered: Number(mealOrder.mealReqCount),
        //     UpdatedMealQty: "none",
        //     MealId: selectedMeals,
        //     instructions: "none"
        //     // role: userInfo.userInfo.userType,
        // }

        
        // selectedMeals.map(function (item,i){
        //     console.log(item);
        //     SetMealOrder({wholeMeal: item})
        // })
        SetMealOrder(selectedMeals);
        
        // console.log(user);
        
        
        // console.log(orderedQty)
    }

    async function updateOrder(){
        let apiName= "production-DynamoAccess-api";
        let path = "/generateorderid"; 
        // let path = "";
        let data =  {message:"empty"}
        
        // console.log(mealOrder)

        const updateMealCap = Number(mealOrder.mealServingCap) - Number(mealOrder.qtyOrdered);
        // console.log(updateMealCap)
        const currentOrderId = randomOrderId();
        // console.log(currentOrderId);
        let user = {
            // email: localStorage.getItem("email"),
            email: userInfo.userInfo.email,
            role: "CLI",
            CurrentOrderId: currentOrderId,
            Order: mealOrder,
            instructions: "none"
            // role: userInfo.userInfo.userType,
        }
        let init ={body:user,}
       
        console.log(init);
        try{
            // console.log(localStorage.getItem("email"));

            data =  await API.put(apiName, path,init);
            console.log(data);
            setIsLoading(false);
            
            swal({title: "Thank You!",
                text: data,
                icon: "success",
                
                dangerMode: true
              });
              setReload(!reload);
            //   console.log(mealOrder);
        //    swal("Succesfully booked your meal! Thank you.");
            

        }catch(error){        
            swal({
                title: "Bummer! ):",
                text: "something went wrong",
                icon: "success",
                dangerMode:true,
            });
            setIsLoading(false);
        }
    }
    // -------------------------------------------------


    // <MealDisplayCycle addOrderIdToState={addOrderIdToState} />
    // console.log(userInfo)
    return(
        <div>
            <Row>
                <Col md="auto">
                    <SideBar props={userInfo}/>
                    <SingleMealDisplay props={userInfo.userInfo} />

                </Col>
                <Col>

                    <Form onSubmit={handleSubmit}>  
                        {initaltesting}
                    
                        <Form.Control 
                        type ="number"
                        placeholder="Quantity"
                        min="0"
                        max="6"
                        value={orderedQty}
                        onChange={e => setQtyOrdered(e.target.value)}
                        /><br></br>
                        
                        <LoaderButton
                        // Class="box"
                        block
                        size="lg"
                        type="submit"
                        variant="success"
                        isLoading={isLoading}
                        disabled={buttonStatus}
                        >
                            Request Meal!                        
                        </LoaderButton>
        
                    </Form>
                </Col>
            </Row>    
            
        </div>
    );
}

export default MealPreface