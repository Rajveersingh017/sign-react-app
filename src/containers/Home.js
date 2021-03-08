import React from "react";
import "./Home.css";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';


export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
      <Card style={{ width: '36rem' }} className="flex" > 
        <Card.Img variant="top" src="https://www.canadahelps.org/media/charity_clipart.jpg" className="img-fluid" alt="" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
      <br />
      <Card style={{ width: '36rem' }}>
        <Card.Img variant="top" src="https://mdbootstrap.com/img/Others/documentation/1.jpg" className="img-fluid" alt="" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
      </div>
      <div>
        <Card className="text-center">
          <Card.Header>Please Consider Making a Difference and Donating</Card.Header>
          <Card.Body>
            <Card.Title>Donate</Card.Title>
            <Card.Text>
              With your support, together we can make a difference to those less fortunate
            </Card.Text>
            <Button variant="primary" href="https://www.paypal.com/donate?token=A16cJxDeAj3qmyY6pTO4WobvmA_egj5Keo8w0THOYweEkSF9j1R4Exzu1gEs0JTcDuL8wMxlGwXZdxTx" target="_blank">Donate through PayPal</Button>{' '}
            
            <Button variant="secondary" href="https://www.canadahelps.org/en/charities/the-sign-foundation-the-strength-in-greater-numbers-fou/" target="_blank" >Donate through our Website</Button>
          </Card.Body>
          <Card.Footer className="text-muted">Some text can go here</Card.Footer>
        </Card>
      </div>
    </div>
  );
}