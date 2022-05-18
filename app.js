const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/KollabKaro-Register', { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log("MONGO CONNECTION IS OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const app = express();  

app.use(express.static("public"));

const user_route = require('./routes/user_route');
app.use('/',user_route)


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });