import React from 'react';
import { Card, Col } from 'react-bootstrap';


function MealDisplayJSXjs(props) {
    return (
        <div>
            <Card> 
                <Card.Header>
                    {props.MealTitle}s
                </Card.Header>
                <Card.Body>
                    <div className="mealLeftFloat">
                        {props.MealDescription}
                    </div>
                    <div className="mealRightFloat">
                        <button  value={props.ID}>Select</button>
                    </div>
                </Card.Body>
            </Card><br></br>
        </div>
    )
}

export default MealDisplayJSXjs
