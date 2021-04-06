import React from 'react';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import "./css/SideBar.css";
import { useHistory } from "react-router-dom";

function SideBar(props) {
    const history = useHistory();

    // console.log(props.props.userInfo.clientName)
    return (
        <div>
            <Col md="auto" className="UserDataSidebar">
            <h1>Welcome back {props.props.userInfo.clientName}</h1>
            <span className="userinfoHead">Address: </span>{props.props.userInfo.address}<br></br>
                    <span className="userinfoHead">City: </span>{props.props.userInfo.clientCity}<br></br>
                    <span className="userinfoHead">Email: </span>{props.props.userInfo.email}<br></br>
                    <span className="userinfoHead">Phone: </span>{props.props.userInfo.phoneNumber}<br></br>
                    <span className="userinfoHead">Number Of Adults: </span>{props.props.userInfo.adultsHome}<br></br>
                    <span className="userinfoHead">Number Of Children: </span>{props.props.userInfo.childrenHome}<br></br>
                    <span className="userinfoHead">Allergies: </span>{props.props.userInfo.clientAllergies}<br></br>
            <Button className="PersonalEdit" onClick={() => history.push('/userinformation')}>Click Here To Edit/Update!</Button>
            </Col>
        </div>
    )
}

export default SideBar
