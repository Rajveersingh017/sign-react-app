const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "	haris-notes-app-upload",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL:  "https://j74neyb1dc.execute-api.us-east-2.amazonaws.com/production",
  },   
  // apiGateway: {
  //   REGION: "us-east-2",
  //   URL:  "https://z6i4s4dis4.execute-api.us-east-2.amazonaws.com/production",
  // },       
  // apiGateway: {
  //   REGION: "us-east-2",
  //   URL:  "https://5om1g7muy9.execute-api.us-east-2.amazonaws.com/production",
  // },
  // apiGateway: { 
  //   REGION: "us-east-2",
  //   URL: "https://ok811mbo76.execute-api.us-east-2.amazonaws.com/prod",
  // },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_bAmwtgYqN",
    APP_CLIENT_ID: "61tk5i5rvvr6a98h4dnqmdugrc",
    IDENTITY_POOL_ID: "ed1c32a6-93c5-4d47-9ee5-be38db7baf36",
  },
  social: {
    FB: "711969332835096"
  }
  
};
//URL: "https://ok811mbo76.execute-api.us-east-2.amazonaws.com/prod
// URL: "https://kf6opb6831.execute-api.us-east-2.amazonaws.com/prod",
export default config;