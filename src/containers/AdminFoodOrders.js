import { Card, Table } from "react-bootstrap";


const headerData = {
    labels:[
        "Email", "Order ID", "Meal ID", "Quantity"
    ]
}

export default function AdminFoodOrders() {

    let key = 0;

    return(
        <div>
        <Card>
            <Card.Header> Food Orders Table Goes Here</Card.Header>
            <Table striped bordered hover class="table-light "  responsive="md">
                <thead class="table-secondary">
                    <tr>
                       {
                           headerData.labels.map(label => {
                               return(
                                   <th key = {key++}>
                                       {
                                       label == ""?"Unknown":label
                                       }
                                   </th>
                               );
                           })
                       }
                    </tr>
                </thead>
            </Table>
        </Card>
        </div>
    );
}

