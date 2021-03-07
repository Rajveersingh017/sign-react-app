import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import Table from 'react-bootstrap/Table'

export default function AdminUserData() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const headerData = {
        labels:[
            "Name","Email","Address","Neighbourhood","City","Phone Number","Number of Adults","Number of Children","Alergies"
        ]
    }
    const usersData = {
        users:[
            {
                name:"Haris Saran",
                email:"Test@hotmail.com",
                address:"123 Test st",
                neighbourhood:"St vital",
                city:"Winnipeg",
                phone_number:"2041234567",
                numberAdults:2,
                numberChildren:4,
                alergies:"none"

            },
            {
                name:"Haris Saran",
            email:"Test@hotmail.com",
            address:"123 Test st",
            neighbourhood:"St vital",
            city:"Winnipeg",
            phone_number:"2041234567",
            numberAdults:2,
            numberChildren:4,
            alergies:"none"
        },
            {
                name:"Haris Saran",
            email:"Test@hotmail.com",
            address:"123 Test st",
            neighbourhood:"St vital",
            city:"Winnipeg",
            phone_number:"2041234567",
            numberAdults:2,
            numberChildren:4,
            alergies:"none"
        }
        ]
    }
    let key = 0;
    return (
        <div >
            {/* className="Settings"  key={key++} */}
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
                    {/* <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Neighbourhood</th>
                    <th>City</th>
                    <th>Phone Number</th>
                    <th>Number of Adults</th>
                    <th>Number of Children</th>
                    <th>Allergies</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        usersData.users.map(user => {
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
                    {/* <tr>
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
                    </tr> */}
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
        </div>
      );
    }