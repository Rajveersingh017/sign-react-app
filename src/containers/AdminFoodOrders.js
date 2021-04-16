import { Card, Table } from "react-bootstrap";
import {useState, useEffect} from "react";
import { API } from "aws-amplify";


export default function AdminFoodOrders() {

    const headerData = {
        labels:[
            "Email", "Meal", "Quantity",
        ]
    }
    let key = 0; 
    const [foodData, setFoodData] = useState({meals:[]});

    useEffect(() => {  
        onLoad();
      },[]);

    async function getData(){
         
        let apiName= "production-DynamoAccess-api";
        let path = "/updateFoodOrdersTable/";//?nghName=" + nghName;
        let data = {};
      
       try{
         data =  await API.get(apiName, path, null);
         return data;
       }catch(error){
           data.message = error.message;
           alert(error.message)
           return null;
       }
      
        
    }

    async function onLoad(){
        let data1 = await getData();
        // let data = {meals:[]}
        // if(data1 != undefined && data1 != null && data1.length > 0){
        //     let mls = [];
        //     data1.map(d => {
        //         let meal = {};
        //         meal.Email = d.Email;//(d.Email.S)?d.Email.S:"Unknown";
        //         meal.MealId = d.MealId;//(d.MealId)?d.MealId.S:"Unknown";
        //         meal.QtyOrdered = d.QtyOrdered;//(d.QtyOrdered)?((d.QtyOrdered.S)?d.QtyOrdered.S:d.QtyOrdered.N):"Unknown";
        //         meal.MealDescription = d.MealDesc;
        //         mls.push(meal);
        //     });
        //     data.meals = mls;
        // }
        setFoodData(data1);
        //  console.log(JSON.stringify(data1));
    }

    // function displayMeal(e){
    //     alert("displaying Meal id = "+e.target.id);
    // }

    return(
        <div>
        <Card>
            <Card.Header> Food Orders Table Goes Here</Card.Header>
            <Table striped bordered hover class="table-light "  responsive="md">
                <thead class="table-secondary">
                    <tr>
                       {
                           headerData.labels.map(label => {
                               return(
                                   <th key = {key++}>
                                       {
                                       label == ""?"Unknown":label
                                       }
                                   </th>
                               );
                           })
                       }
                    </tr>
                </thead>
                <tbody>
                    {
                        foodData.meals.map(meal => {
                            return(
                                <tr key = {key++}>
                                    <td>
                                        {meal.Email}
                                    </td>
                                    {/* <td id={meal.MealId} onClick={displayMeal}>
                                        {meal.MealDesc}
                                    </td> */}
                                     <td>
                                        {meal.MealDesc}
                                    </td>
                                    <td>
                                        {meal.QtyOrdered}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Card>
        </div>
    );

}