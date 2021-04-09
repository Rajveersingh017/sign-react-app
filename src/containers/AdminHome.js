import React from "react";
import "./Home.css";
// import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck'
import {  Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


const styles = {
  card: {
    backgroundColor: '#EEFBFB',
    borderRadius: 55,
    padding: '3rem'
  },
  cardImage: {
    objectFit: 'cover',
    borderRadius: 55,
    height: '100%'
  }
}



export default function AdminHome() {

    //not sure if I did this right
    const history = useHistory();

  return (
    <div className="Home">
      <div className="lander">

      <CardDeck >
  <Card style={styles.card}>
    <Card.Img variant="top" src="https://www.canadahelps.org/media/charity_clipart.jpg" alt=""/>
    <Card.Body>
      <Card.Title>User Demographic Information</Card.Title>
      <Card.Text>
        Here you can view client data and demographic information
      </Card.Text>
      <Button variant="primary" onClick={() => history.push('/AdminUserData')} >View User Data</Button>
    </Card.Body>
  </Card>
  <Card style={styles.card}>
    <Card.Img variant="top" src="https://www.canadahelps.org/media/charity_clipart.jpg" alt=""/>
    <Card.Body>
      <Card.Title>Food Information</Card.Title>
      <Card.Text>
        Here you can update food information. Eg, Ingredients, pictures and so forth.{' '}
      </Card.Text>
      <Button variant="primary" onClick={() => history.push('/AdminUpdateFood')} >Update Food</Button>
    </Card.Body>
  </Card>
  
</CardDeck>
<br />
<CardDeck >
  <Card style={styles.card}>
    <Card.Img variant="top" src="https://www.canadahelps.org/media/charity_clipart.jpg" alt=""/>
    <Card.Body>
      <Card.Title>Food Order Info. (Add elsewhere Agency Information)</Card.Title>
      <Card.Text>
        Here you can view information about the orders that have been placed.
      </Card.Text>
      <Button variant="primary" onClick={() => history.push('/AdminFoodOrders')} >View New Orders</Button>
    </Card.Body>
  </Card>
  <Card style={styles.card}>
    <Card.Img variant="top" src="https://www.canadahelps.org/media/charity_clipart.jpg" alt=""/>
    <Card.Body>
      <Card.Title>Volunteer Information</Card.Title>
      <Card.Text>
        Here you can view information related to registered volunteers.{' '}
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>
<br />
<CardDeck >
  <Card style={styles.card} >
    <Card.Img variant="top" src="https://www.canadahelps.org/media/charity_clipart.jpg" alt=""/>
    <Card.Body>
      <Card.Title>Assign a Route</Card.Title>
      <Card.Text>
        Here you can assign volunteers to deliveries{' '}
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>

{/* <Container fluid>
      <CardGroup className="m-5 d-block">
        <Card className="m-5 border-0 shadow" style={styles.card}>
          <Row>
            <Col>
              <Card.Img src="https://www.canadahelps.org/media/charity_clipart.jpg" style={styles.cardImage} />
            </Col>
            <Col>
              <Card.Body>
              <Card.Title as="h1">Englishes of the World</Card.Title>
              <Card.Text>
                How do your grammar intuitions depend on when and where you learned English? Participants took a short grammar quiz, which we are using to understand how grammar differs in different parts of the English-speaking world (USA, Ireland, Australia, etc.). We are also investigating how grammar is different for people who learn English later in life: Do they make different mistakes if their first language is German as opposed to Japanese?
              </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </CardGroup>
    </Container> */}
    
        {/* <Card className="m-5 border-0 shadow" style={styles.card}>
          <Row>
            <Col>
              <Card.Img src="https://www.canadahelps.org/media/charity_clipart.jpg" style={styles.cardImage} />
            </Col>
            <Col>
              <Card.Body>
              <Card.Title as="h1">User Demographic Information</Card.Title>
              <Card.Text> Here you can view client data and demographic information  </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
       
        <Card className="m-5 border-0 shadow" style={styles.card}>
          <Row>
            <Col>
              <Card.Img src="https://www.canadahelps.org/media/charity_clipart.jpg" style={styles.cardImage} />
            </Col>
            <Col>
              <Card.Body>
              <Card.Title as="h1">User Demographic Information</Card.Title>
              <Card.Text> Here you can view client data and demographic information  </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
       
        <Card className="m-5 border-0 shadow" style={styles.card}>
          <Row>
            <Col>
              <Card.Img src="https://www.canadahelps.org/media/charity_clipart.jpg" style={styles.cardImage} />
            </Col>
            <Col>
              <Card.Body>
              <Card.Title as="h1">User Demographic Information</Card.Title>
              <Card.Text> Here you can view client data and demographic information  </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
    
        <Card className="m-5 border-0 shadow" style={styles.card}>
          <Row>
            <Col>
              <Card.Img src="https://www.canadahelps.org/media/charity_clipart.jpg" style={styles.cardImage} />
            </Col>
            <Col>
              <Card.Body>
              <Card.Title as="h1">User Demographic Information</Card.Title>
              <Card.Text> Here you can view client data and demographic information  </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card> */}
      
      </div>
      
    </div>
  );
}