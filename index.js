const express = require('express');
require('dotenv').config(); // this is going to give us access to the .env file 
const morgan = require('morgan');


// TESTING COLORS PACKAGE
const colors = require("colors");
console.log("Index.js working!");
console.log("Colors is working".rainbow);

const server = express();  // here I'm initializing my server with express 🤖
// it can also be called app or whatever you want

const PORT = process.env.PORT; // every time we want to use an enviromne tvariable we need to use process

server.listen(PORT, () => {
    console.log("Server running on port http://localhost:" + PORT); // This console.log is just to see if the server is running
});

const displayDate = (request, response, next) => { // This is going to be my middleware
    const date = new Date;
    request.date = date; // I'm adding a new property in the request
    next();
};

const displayReqType = (request, response, next) => {
    console.log("The date is: " + request.date); // Now the request has access to this new property
    console.log("Request type: " + request.method);
    next();
};

server.use(morgan('dev')); // Morgan will display in the console the endpoint, status code and ms
server.use(displayDate); // This function is running every time we make a request. MIDDLEWARE
server.use(displayReqType);
server.use(express.static('public'));

server.get("/", (request, response) => { // first Route /
    response.send("Hello server!");
});

server.get("/users", (request, response) => { // second Route /users
    console.log("hello this is the console log in the /users endpoint");
    response.json({ "users": ["mike", "mark"] }); // We spicify it's a json reponse with response.json()
});

server.get("/*", (request, response) => {  // 🔔THIS ONE IS TO CHECK NON EXISTING ROUTES. IMPORTANT! IT HAS TO BE AT THE END
    response.status(404).send("This route doesn't exist")
});