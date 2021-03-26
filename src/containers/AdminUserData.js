import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
// import { useHistory } from "react-router-dom";
// import { onError } from "../libs/errorLib";
// import config from "../config";
// import { LinkContainer } from "react-router-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import Table from 'react-bootstrap/Table';

export default function AdminUserData() {
    // const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
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
       setUserData(data);
  
      }
   
    const headerData = {
        labels:[
            "Name","Email","Address","Neighbourhood","City","Phone Number","Number of Adults","Number of Children","Alergies"
        ],
        labelsTableTwo:[
            "Neighbourhood","Total"
        ]
    }
    
    let key = 0;

    return (
        (userData &&
        <div>
            <h2>This table displays Client Demographic Information</h2>
            <Table striped bordered hover variant="dark" responsive="md">
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

         <br />

         <h2>This table displays Total Demographic Information</h2>
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
                   <tr>Charleswood - Tuxedo - Weswood
                    {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }    
                   </tr>
                   <tr>Daniel McIntyre
                    {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }  
                   </tr>
                   <tr>Elmwood - East Kildonan
                    {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }  
                   </tr>
                   <tr>Fort Rouge - East Fort Garry
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>Mynarski
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Mynarski" &&
                              <td> {user.neighbourhood.match("Mynarski").length}</td> )
                            //   match(new RegExp("str", "g")) || []).length
                            // match("Mynarski").length
                            // for(var i=count=0; i<str.length; count+=+(stringsearch===str[i++]))
                           })
                       }
                   </tr>
                   <tr>North Kildonan
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>Old Kildonan
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>Point Douglas
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>River Heights - Fort Garry
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>St. Boniface
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>St. James
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>St. Norbert - Seine River
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>St. Vital 
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>Transcona
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>Waverley West 
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                   <tr>I'm not sure
                   {
                           userData.users.map(user => {
                               return (user.neighbourhood == "Charleswood - Tuxedo - Weswood" &&
                              <td> {user.neighbourhood}</td> )
                           })
                       }
                   </tr>
                </tbody>
         </Table>
        </div>)
      );
    }