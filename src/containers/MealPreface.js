import React, { useState, useEffect, useContext } from "react";
import { Col, useAccordionToggle } from "react-bootstrap";
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
import "./MealPreface.css"


function MealPreface() {
    const {setUserInfo} = useContext(UserData);
    const [reload,setReload]=useState(false);
    const userInfo = useContext(UserData);
    const [hasOrdered,setHasOrdered] = useState(true);
    const [buttonStatus, setButtonStatus] = useState(true);

    const randomOrderId = () =>{
        return "OD-" + Math.random().toString(36).substr(2,9);
    };
    
    useEffect(()=>{
    console.log(userInfo.userInfo)
        if(userInfo.userInfo.address==null || userInfo.userInfo.address=="")
        {    
            setButtonStatus(true);
            swal
            ({
                icon: 'error',
                title: 'We\'re Sorry!',
                text: 'We need you to provide us with an address so that we can deliver you the food. Please update your profile.',
            });
        }
        else
        {
            setButtonStatus(false);
        }
        if(userInfo.userInfo.currentOrderId==null || userInfo.userInfo.currentOrderId==""){
            setHasOrdered(true);
            setButtonStatus(false);
        }
        else{
            setButtonStatus(true);
            setHasOrdered(false);
        }
    },[userInfo.userInfo.currentOrderId])

    const [isLoading, setIsLoading] = useState(false);
    const [initaltesting, updateTest] = useState(<MealDisplayCycle addOrderIdToState={addOrderIdToState} />);
    const [mealCapcity,setQtyOrdered] = useState(null);

    const [mealOrder, SetMealOrder]=useState({ 
        email: userInfo.userInfo.email,
        mealId:"",
        mealServingCap:"",
        qtyOrdered: "",
        role: "CLI"
        
    });
   
    async function handleSubmit(event){
        event.preventDefault();
        setIsLoading(true);
        console.log(mealCapcity)
        if(mealCapcity == 0 || mealCapcity == null){
            swal("choose a meal first in order to proceed.");
            setIsLoading(false);
        }
        else{
            if(userInfo.userInfo.currentOrderId==null || userInfo.userInfo.currentOrderId==""){
                if(userInfo.userInfo.address==null || userInfo.userInfo.address=="")
                {    
                    setButtonStatus(true);
                    swal
                    ({
                        icon: 'error',
                        title: 'We\'re Sorry!',
                        text: 'Please provide us with an address so that we can deliver you the food.',
                    });
                }
                else{
                    if(mealCapcity < 7 && mealCapcity > 0){
                        // alert("alright, remove the comment")
                        await updateOrder(); 
                    }
                    else{
                        swal
                        ({
                            icon: 'error',
                            title: 'Please revise your selections!',
                            text: 'At the moment we only allow our clients to book only 1 single order with a max of 6 meals.',
                        });
                    }
                    
                }
                
            }
            else{
                setIsLoading(false);
                swal({
                    title: "We are sorry!",
                    text: "Please wait until next thursday to place another order with us",
                    icon: "error",
                    dangerMode:true,
                });
            }
        }
    }

    const selectedMeals = [];
    let mealReqCount = 0;
    let count = 0;

    async function addOrderIdToState(event){
        event.preventDefault();

        console.log(userInfo.userInfo.currentOrderId)
        
        let bool = true;
        let temp = 0;
        let quantityDemanded = Number(event.target.value);
        let availableMealQty = Number(event.target.id);
        console.log(quantityDemanded,availableMealQty,availableMealQty - quantityDemanded)
       
        if(availableMealQty - quantityDemanded > -1){

            if (selectedMeals.length!=0){

                let updatedMealQty = availableMealQty - quantityDemanded;
                    
                selectedMeals.map(function(item, i){

                    let updatedMealQty = availableMealQty - quantityDemanded
                    
                    if(event.target.className==item.mealId){
                        // if(quantityDemanded == 0 ){
                        //     console.log("zero")
                        //     selectedMeals.pop()
                        // }
                        // else{
                        //     item.qtyOrdered = event.target.value;
                        //     item.newQtyLeft = updatedMealQty;
                        //     bool = false;
                        // }

                            item.qtyOrdered = event.target.value;
                            item.newQtyLeft = updatedMealQty;
                            bool = false;
                    }                
            
                });
            
                console.log(selectedMeals);

                if(bool==true){

                    selectedMeals.push({                   
                        mealId: event.target.className,
                        mealServingCap: event.target.id,
                        qtyOrdered: event.target.value,
                        newQtyLeft: updatedMealQty
                    })

                }

                mealReqCount =temp;
                
                selectedMeals.map(function(item, i){                
                    temp+= Number(item.qtyOrdered); 
                    setQtyOrdered(temp)
                });
                
                if (temp < 7){
                    setButtonStatus(false);
                }
                else{
                    swal({
                        title: "We're Sorry!",
                        text: "we only allow our clients to book a max of 6 meals",
                        icon: 'error',
                        dangerMode:true,
                    });
                    setButtonStatus(true)
                }
            }
            else{
                console.log("is null",selectedMeals)

                selectedMeals.push({
                    mealId: event.target.className,
                    mealServingCap: event.target.id,
                    qtyOrdered: event.target.value,
                    newQtyLeft: availableMealQty - quantityDemanded
                })

                setQtyOrdered( quantityDemanded)
        
                count = quantityDemanded;
                
                mealReqCount = mealReqCount + quantityDemanded;
                
                setQtyOrdered(Number(mealReqCount));
                
                SetMealOrder({...mealOrder, mealId: event.target.className, mealServingCap: event.target.id, qtyOrdered: event.target.value})
            
            }    
 
            SetMealOrder(selectedMeals);
        }
        else{
            swal({
                title: "oh no!",
                text: "No Meals available for this meal option",
                icon: "danger",
                dangerMode:true,
            });
        }
            
    }

    async function updateTheOrderIdInContextAPI(orderId){
        setUserInfo({
            email: userInfo.userInfo.email,
            role: userInfo.userInfo.userType,
            address:userInfo.userInfo.address,
            phoneNumber:userInfo.userInfo.phoneNumber,
            clientName:userInfo.userInfo.clientName,
            clientCity:userInfo.userInfo.clientCity,
            neighbourhood:userInfo.userInfo.neighbourhood,
            adultsHome:userInfo.userInfo.adultsHome,
            childrenHome:userInfo.userInfo.childrenHome,
            clientAllergies:userInfo.userInfo.clientAllergies,
            currentOrderId: orderId
        });

        // <SingleMealDisplay props={userInfo.userInfo} key={userInfo.userInfo.currentOrderId} />

        console.log("userinfo updated!",orderId)
    }
    async function updateOrder(){
        let apiName= "production-DynamoAccess-api";
        let path = "/generateorderid"; 
        // let path = "";
        let data =  {message:"empty"}
        
        // console.log(mealOrder)

        // const updateMealCap = Number(mealOrder.mealServingCap) - Number(mealOrder.qtyOrdered);
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
            
            await updateTheOrderIdInContextAPI(currentOrderId);
            setIsLoading(false);
            swal({title: "Thank You!",
                text: data,
                icon: "success",
                
                dangerMode: true
              });
              setReload(!reload);

        }catch(error){        
            swal({
                title: "We're Sorry!",
                text: "something went wrong. Please contact admin",
                icon: "error",
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
                        className="totalMealSelected"
                        plaintext 
                        placeholder="Total appears here"
                        readOnly 
                        defaultValue={mealCapcity} 
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