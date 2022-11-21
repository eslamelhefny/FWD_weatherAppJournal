// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());


// Initialize the main project folder
app.use(express.static('Weather_app_jornal_project'));


// Setup Server
// make variable to save port number
const port = 4000;
// varible to save host name and make it local hosr 
const hostname ="127.0.0.1";
// fuction to handle http get request 
app.get("/all",(req , res) => { 
  res.status(200).send(projectData);
 });
//  fuction to handle http post request 
app.post("/add",(req , res) => { 
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
 });
 
 const listen = () => {
  console.log(`Server Started Sucessfully URL http://${hostname}:${port}`);

 }
 const server = app.listen(port , listen);