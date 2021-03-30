import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
// import { useHistory } from "react-router-dom";
// import { onError } from "../libs/errorLib";
// import config from "../config";
// import { LinkContainer } from "react-router-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


export default function AdminUserData() {
    // const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [nbrh, setNbrh] = useState(
        [
            {
                name:"I'm not sure",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Charleswood - Tuxedo - Westwood",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Daniel McIntyre",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Elmwood - East Kildonan",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Fort Rouge - East Fort Garry",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Mynarski",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"North Kildonan",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Old Kildonan",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"River Heights - Fort Garry",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"St. Boniface",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"St. James",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"St. Norbert - Seine River",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"St. Vital",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Transcona",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Waverley West",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
            {
                name:"Point Douglas",
                totalAdults: 0,
                totalChildren: 0,
                totalClients: 0,
            },
        ]
    );
    useEffect(() => {   
        onLoad();
       
      }, []);
      async function getData(){
        let apiName= "production-DynamoAccess-api";
        // let path = "/scanUsersTable";
        let path = "/executestatement";
        let data =  {message:"empty"}
       try{
         data =  await API.get(apiName, path, null);
       }catch(error){
        data.message = error.message;
       }
   
         return data.Items;
         
      }
      function updateNbrh(data){
        nbrh.map(nbr => {
            nbr.totalClients = getTotalClients(nbr.name,data);
            nbr.totalAdults = getTotalAdults(nbr.name,data);
            nbr.totalChildren = getTotalChildren(nbr.name,data);
        })
        setNbrh(nbrh);
      }
      
       async function onLoad() {
        
       let data1 = await getData();
     
       let data = {users:[]}
       if(data1.length > 0){
           let usrs = [];
           data1.map(d => {
          
               let user = {};
               user.role = (d.role.S)?d.role.S:"Unknown";
               user.name = (d.clientName)?d.clientName.S:"Unknown";
               user.email = (d.email)?d.email.S:"Unknown";
               user.address = (d.address)?d.address.S:"Unknown";
               user.neighbourhood = (d.neighbourhood)?d.neighbourhood.S:"Unknown";
               user.city = (d.clientCity)?d.clientCity.S:"Unknown";
               user.phone_number = (d.phoneNumber)?d.phoneNumber.S:"Unknown";
               user.numberAdults = (d.adultsHome)?d.adultsHome.S:"Unknown";
               user.numberChildren = (d.childrenHome)?d.childrenHome.S:"Unknown";
               user.alergies = (d.clientAllergies)?d.clientAllergies.S:"Unknown";
               usrs.push(user);
           });
          
           data.users = usrs;
       }
       updateNbrh(data);
       setUserData(data);
       
   
   
 }
      function getTotalClients(nbrName,data){
        let totalClients = 0;
        data.users.map(user => {
            if (user.neighbourhood == nbrName){
                totalClients += 1;
            }
        })
        return totalClients
    }
    function getTotalAdults(nbrName,data){
        let totalAdults = 0;
        data.users.map(user => {
            if (user.neighbourhood == nbrName){
                if(user.numberAdults != null){
                    totalAdults += Number(user.numberAdults);
                }
            }
        })
        return totalAdults
    }
    function getTotalChildren(nbrName,data){
        let totalChildren = 0;
        data.users.map(user => {
            if (user.neighbourhood == nbrName){
               if(user.numberChildren != null) {
                   totalChildren += Number(user.numberChildren);
               }
            }
        })
        return totalChildren
    }
   
    const headerData = {
        labels:[
            "Name","Email","Address","Neighbourhood","City","Phone Number","Number of Adults","Number of Children","Alergies"
        ],
        labelsTableTwo:[
            "Neighbourhood","Total Clients", "Total Adults", "Total Children", "Total"
        ]
    }
    
    let key = 0;
    return (
        (userData &&
            
        <div>
            
            <Card>
            <Card.Header as="h3" class="p-3 mb-2 bg-secondary text-white card text-center" >Client Demographic Information</Card.Header>
            <Card.Body>
            
            <Table striped bordered hover  class="thead-light" responsive="md">
            {/* variant="dark"  */}
                <thead>
                    <tr>
                        {
                            headerData.labels.map(label => {
                                return(
                                    <th key={key++}>
                                    {
                                        (label == "")?"Unknown":label
                                    }
                                    </th>
                                ); 
                            })
                        }
                 
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.users.map(user => {
                            return (user.role == "CLI" &&
                                <tr key={key++}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.neighbourhood}</td>
                                    <td>{user.city}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.numberAdults}</td>
                                    <td>{user.numberChildren}</td>
                                    <td>{user.alergies}</td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
         </Table>
         </Card.Body>
         </Card>           
         <br />
         <Card>  
         <Card.Header as="h3" class="p-3 mb-2 bg-secondary text-white card text-center">Client Demographic Information</Card.Header>   
         
         <Table striped bordered hover variant="dark" responsive="md">
                <thead>
                    <tr>
                        {
                            headerData.labelsTableTwo.map(label => {
                                return(
                                    <th key={key++}>
                                    {
                                        (label == "")?"Unknown":label
                                    }
                                    </th>
                                ); 
                            })
                        }
                 
                    </tr>
                </thead>
                <tbody>
                    {
                        nbrh.map(nbr => {
                            return (
                                <tr key={key++}>
                                    <td> {nbr.name} </td>
                                    <td> {nbr.totalClients} </td>
                                    <td> {nbr.totalAdults} </td>
                                    <td> {nbr.totalChildren} </td>
                                    <td> {nbr.totalChildren + nbr.totalAdults} </td>
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
         </Table>
         </Card>  
        </div>)
      );
    }