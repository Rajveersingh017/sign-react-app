// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: 'MealOrders',
  Item: {
    'OrderId' : {S: "12"}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});