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
<<<<<<< HEAD


=======
import Form from "react-bootstrap/Form";
>>>>>>> TableClientDemographic_2021-03-31


// import Tooltip from 'react-bootstrap/Tooltip'
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
// import Overlay from 'react-bootstrap/Overlay'
// import LoaderButton from "../components/LoaderButton";


export default function AdminUserData() {
    // const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    

    // const forceUpdate = React.useState()[1].bind(null, {});

    const [nbrh, setNbrh] = useState(
        [
            {
                name:"I am not sure",
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
            {
                name:"TOTAL",
                totalClients: 0,
                totalAdults: 0,
                totalChildren: 0,
            },
        ]
    );
    useEffect(() => {  
        onLoad();
      },[]);
      async function getData(name){
         
        let apiName= "production-DynamoAccess-api";
        // let path = "/scanUsersTable";
        let path = "/executestatement/";//?nghName=" + nghName;
        let bodyData =  {"nghName":name}
        let data = {};
        let init = {
            body: bodyData,   
          }

       try{
         data =  await API.put(apiName, path, init);
         return data.Items;
       }catch(error){
           data.message = error.message;
           alert(error.message)
           return null;
       }
      
        
    }
      
function updateNbrh(data){
        nbrh.map(nbr => {
            nbr.totalClients = getTotalClients(nbr.name,data);
            nbr.totalAdults = getTotalAdults(nbr.name,data);
            nbr.totalChildren = getTotalChildren(nbr.name,data);
        })
        // alert(JSON.stringify(nbrh))
        setNbrh(nbrh);
      }
      
async function onLoad(name) {
        
       let data1 = await getData(name);
       let data = {users:[]}
     if(data1 != undefined && data1 != null){
       
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
<<<<<<< HEAD
    
=======

    function handleNeighbourhoodChange (e) {
        let name = e.target.value;
        onLoad(name);
    }

>>>>>>> TableClientDemographic_2021-03-31
    let key = 0;
    return (
        (userData &&
            
        <div>
            
<<<<<<< HEAD
            <Card>
            <Card.Header as="h3" class="p-3 mb-2 bg-secondary text-white card text-center" >Client Demographic Information</Card.Header>
            <Card.Body>
            
            <Table striped bordered hover  class="thead-light" responsive="md">
            {/* variant="dark"  */}
                <thead>
                    <tr>
=======

        <Form.Group controlId="neighbourhood" size="lg">
            <Form.Label>Neighbourhood:</Form.Label>
            <Form.Control 
                as="select" 
                type="neighbourhood"
                // value={fields.neighbourhood}
                onChange={handleNeighbourhoodChange}            
            >
                <option value="0" selected>Select the neighbourhood</option>
                <option value="-1">All Neighbourhoods</option>
                <option value="I am not sure">I am not sure</option>
                <option value="Charleswood - Tuxedo - Westwood">Charleswood - Tuxedo - Westwood</option>
                <option value="Daniel McIntyre">Daniel McIntyre</option>
                <option value="Elmwood - East Kildonan">Elmwood - East Kildonan</option>
                <option value="Fort Rouge - East Fort Garry">Fort Rouge - East Fort Garry</option>
                <option value="Mynarski">Mynarski</option>
                <option value="North Kildonan">North Kildonan</option>   
                <option value="Old Kildonan">Old Kildonan</option>
                <option value="Point Douglas">Point Douglas</option>
                <option value="River Heights - Fort Garry">River Heights - Fort Garry</option>
                <option value="St. Boniface">St. Boniface</option>
                <option value="St. James">St. James</option>
                <option value="St. Norbert - Seine River">St. Norbert - Seine River</option>
                <option value="St. Vital">St. Vital </option> 
                <option value="Transcona">Transcona</option>
                <option value="Waverley West">Waverley West </option> 
            </Form.Control>
        </Form.Group>

            <Card>
            <Card.Header as="h3" class="p-3 mb-2 bg-secondary text-white card text-center" >Client Demographic Information</Card.Header>
            
            
            <Table striped bordered hover class="table-light "  responsive="md">
                
            {/* variant="dark"  */}
            {/* class="thead-light" */}
            {/* class="table-light" */}
            
                <thead class="table-secondary">
                    <tr >
>>>>>>> TableClientDemographic_2021-03-31
                        {
                            headerData.labels.map(label => {
                                return(
                                    <th  key={key++}>
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
                                <tr  key={key++}>
                                    <td >{user.name}</td>
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
<<<<<<< HEAD
         </Card.Body>
=======
        
>>>>>>> TableClientDemographic_2021-03-31
         </Card>           
         <br />
         <Card>  
         <Card.Header as="h3" class="p-3 mb-2 bg-secondary text-white card text-center">Client Demographic Information</Card.Header>   
         
         <Table striped bordered hover variant="dark" responsive="md">
                <thead >
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
                            return ((nbr.totalChildren + nbr.totalAdults + nbr.totalClients) != 0)?(
                              <tr key={key++}>
                                    <td> {nbr.name} </td>
                                    <td> {nbr.totalClients} </td>
                                    <td> {nbr.totalAdults} </td>
                                    <td> {nbr.totalChildren} </td>
                                    <td> {nbr.totalChildren + nbr.totalAdults} </td>
                                </tr>
                                ):null
                    })
                    }
                   
                </tbody>
         </Table>
         </Card>  
        </div>)
      );
    }