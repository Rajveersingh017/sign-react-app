import React from "react";
import "./Home.css";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function Home() {
  return (
    // <div className="Home">
    //   <div className="lander">
    //   <Card style={{ width: '36rem' }} className="flex" > 
    //     <Card.Img variant="top" src="https://www.canadahelps.org/media/charity_clipart.jpg" className="img-fluid" alt="" />
    //     <Card.Body>
    //       <Card.Title>Card Title</Card.Title>
    //       <Card.Text>
    //         Some quick example text to build on the card title and make up the bulk of
    //         the card's content.
    //       </Card.Text>
    //     </Card.Body>
    //     <Card.Body>
    //       <Card.Link href="#">Card Link</Card.Link>
    //       <Card.Link href="#">Another Link</Card.Link>
    //     </Card.Body>
    //   </Card>
    //   <br />
    //   <Card style={{ width: '36rem' }}>
    //     <Card.Img variant="top" src="https://mdbootstrap.com/img/Others/documentation/1.jpg" className="img-fluid" alt="" />
    //     <Card.Body>
    //       <Card.Title>Card Title</Card.Title>
    //       <Card.Text>
    //         Some quick example text to build on the card title and make up the bulk of
    //         the card's content.
    //       </Card.Text>
    //     </Card.Body>
    //     <Card.Body>
    //       <Card.Link href="#">Card Link</Card.Link>
    //       <Card.Link href="#">Another Link</Card.Link>
    //     </Card.Body>
    //   </Card>
    //   </div>
    //   <div>
    //     <Card className="text-center">
    //       <Card.Header>Please Consider Making a Difference and Donating</Card.Header>
    //       <Card.Body>
    //         <Card.Title>Donate</Card.Title>
    //         <Card.Text>
    //           With your support, together we can make a difference to those less fortunate
    //         </Card.Text>
    //         <Button variant="primary" href="https://www.facebook.com/TheSIGNFoundation" target="_blank">Donate through Facebook</Button>{' '}
            
    //         <Button variant="secondary" href="https://www.thesignfoundation.org/" target="_blank" >Donate through our Website</Button>
    //       </Card.Body>
    //       <Card.Footer className="text-muted">Some text can go here</Card.Footer>
    //     </Card>
    //   </div>
    // </div>
    <div>
      <Container>
      <Row>
        <Carousel>
          <Carousel.Item>
            <Col sm class="cardAgency">
            <Image src="https://www.canadahelps.org/media/charity_clipart.jpg" fluid />
            sm=true
            </Col></Carousel.Item>
            <Carousel.Item><Col sm class="cardAgency">sm=true
            <Image src="https://www.canadahelps.org/media/charity_clipart.jpg" fluid />
            </Col></Carousel.Item>
            <Carousel.Item><Col sm class="cardAgency">sm=true
            <Image src="https://www.canadahelps.org/media/charity_clipart.jpg" fluid />
            </Col></Carousel.Item>
          
        </Carousel>
      </Row>
    </Container>
    </div> 
  );
}




