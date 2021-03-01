import React from "react";
import "./Home.css";
import Card from 'react-bootstrap/Card'

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
      <Card style={{ width: '36rem' }}>
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
    </div>
  );
}