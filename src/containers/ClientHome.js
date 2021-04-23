import React from "react";
import "./Home.css";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Step1A from '../components/Images/Step1A.png';
import Step2A from '../components/Images/Step2A.png';
import Step3A from '../components/Images/Step3A.png';
import Step4A from '../components/Images/Step4A.png';
import Step5A from '../components/Images/Step5A.png';

import Image from 'react-bootstrap/Image';
export default function ClientHome() {
  return (
    <div className="Home">
      <div className="lander">
      <Card  className="flex" class="card border-0 w-50" > 
      {/* style={{ width: '36rem' }} */}
        <Card.Body>
          <Card.Title>
            <h1>Looking for a meal? Follow these easy steps: </h1>
          </Card.Title>
          <Card.Text>
            Please Note: Currently we only serve in Winnipeg. We deliver orders on thursdays only!
          </Card.Text>
          <hr></hr><br></br>
          <Row className="row">
            <h2>
              <Badge variant="secondary">Step 1</Badge> Client Account Sign Up
            </h2><br></br>
            <p>In order to request a meal, it is mandatory to create an account first. To make an order click on the "Client Sign Up" that appears on the top. Image is included for reference.</p>
            <Image src = {Step1A} fluid /><br></br><br></br>
          </Row><hr></hr><Row className="row">
          <h2>
          <Badge variant="secondary">Step 2</Badge> Sign up Using Your Email Address And Password!
        </h2><br></br>
            <Col sm={8}>
            <br></br>
            
            <p>Please enter you email address and password in the designated fields. It is required to read our privacy policy before creating an account.</p></Col>
            <Col sm={4}><Image src = {Step2A} fluid /></Col>

            </Row>
            <hr></hr>
            <Row className="row">
            <h2>
            <Badge variant="secondary">Step 3</Badge> Enter The confirmation Code
          </h2><br></br>
              <Col sm={6}>
              <Image src = {Step3A} fluid />
              </Col>
              <Col sm={6}>
                <p>The confirmation code can be found in your email account. Please make sure to check your "junk mail" folder as well.</p>
              </Col>
  
              </Row>
              <hr></hr>
              <Row className="row">
          <h2>
          <Badge variant="secondary">Step 4</Badge> Fill Out Your Personal Information!
        </h2><br></br>
            <Col sm={8}><br></br>
              <p>As soon as you verify your account you will see the page (image on right). We need this information to deliver the food to you.</p>
            </Col>
            <Col sm={4}>
            <Image src = {Step4A} fluid />
            </Col>

            </Row>
            <hr></hr>
            <Row className="row">
          <h2>
          <Badge variant="secondary">Step 5</Badge> Final Step - Order Food!
        </h2><br></br>
            
              <p><br></br>After fill out your personal information you can order your food by selecting the meal from the provided options. Please note that we only serve 6 meals/family and only one order is allowed within a week.</p>
            
            
            <Image src = {Step5A} fluid />
            

            </Row>
            
            <hr></hr>
          
        </Card.Body>

      </Card>
      

      <br />
      
        <Card className="text-center">
          <Card.Header>Please Consider Making a Difference and Donating</Card.Header>
          <Card.Body>
            <Card.Title>Donate</Card.Title>
            <Card.Text>
              With your support, together we can make a difference to those less fortunate
            </Card.Text>
            <Button variant="primary" href="https://www.paypal.com/ca/fundraiser/charity/3556917" target="_blank">Donate through PayPal</Button>{' '}
            
            <Button variant="secondary" href="https://www.canadahelps.org/en/charities/the-sign-foundation-the-strength-in-greater-numbers-fou/" target="_blank" >Donate through our Website</Button>
            <hr></hr>
            <br></br>
            <br></br>
            </Card.Body>
          <Card.Footer className="text-muted">Made with <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg> in Winnipeg</Card.Footer>
        </Card>
      </div>
    </div>
  );
}




