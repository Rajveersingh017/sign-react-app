import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import Table from 'react-bootstrap/Table';
import swal from "sweetalert";

export default function AdminUserData() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {   
        onLoad();
      }, []);

      async function getData(){
        let apiName= "production-DynamoAccess-api";
        let path = "/scanUsersTable";
        let data =  {message:"empty"}
       try{
         data =  await API.get(apiName, path, null);
       }catch(error){
        data.message = error.message;
       }
         return data;
      }
      
       async function onLoad() {
        
       let data1 = await getData();
       let data = {users:[]}
       if(data1.length > 0){
           let usrs = [];
           data1.map(d => {
               let user = {};
               user.name = (d.clientName)?d.clientName:"Unknown";
               user.email = (d.email)?d.email:"Unknown";
               user.address = (d.address)?d.address:"Unknown";
               user.neighbourhood = (d.neighbourhood)?d.neighbourhood:"Unknown";
               user.city = (d.clientCity)?d.clientCity:"Unknown";
               user.phone_number = (d.phoneNumber)?d.phoneNumber:"Unknown";
               user.numberAdults = (d.adultsHome)?d.adultsHome:"Unknown";
               user.numberChildren = (d.childrenHome)?d.childrenHome:"Unknown";
               user.alergies = (d.clientAllergies)?d.clientAllergies:"Unknown";
               usrs.push(user);
           });
           data.users = usrs;
       }
       setUserData(data);
    //    if(users){
        //    let strUsers = JSON.stringify(users);
    //        console.log(strUsers);
        //    alert(strUsers)
    //    }

        //  let data = {
        //         users:[
        //             {
        //                 name:"Haris Saran",
        //                 email:"Test@hotmail.com",
        //                 address:"123 Test st",
        //                 neighbourhood:"St vital",
        //                 city:"Winnipeg",
        //                 phone_number:"2041234567",
        //                 numberAdults:2,
        //                 numberChildren:4,
        //                 alergies:"none"
            
        //             },
        //             {
        //                 name:"Haris Saran",
        //             email:"Test@hotmail.com",
        //             address:"123 Test st",
        //             neighbourhood:"St vital",
        //             city:"Winnipeg",
        //             phone_number:"2041234567",
        //             numberAdults:2,
        //             numberChildren:4,
        //             alergies:"none"
        //         },
        //             {
        //                 name:"Haris Saran",
        //             email:"Test@hotmail.com",
        //             address:"123 Test st",
        //             neighbourhood:"St vital",
        //             city:"Winnipeg",
        //             phone_number:"2041234567",
        //             numberAdults:2,
        //             numberChildren:4,
        //             alergies:"none"
        //         }
        //         ]
        //     }
                
      }
   
    const headerData = {
        labels:[
            "Name","Email","Address","Neighbourhood","City","Phone Number","Number of Adults","Number of Children","Alergies"
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
                            return (
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
         <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
         </Table>
        </div>)
      );
    }