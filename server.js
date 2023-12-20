const express = require('express');

require('./config/connect');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');

const app = express();

//to accept json files
app.use(express.json());

// http://127.0.0.1:3000/
app.use('/product',productRoute);
app.use('/user',userRoute)

//To let the project works and doesnt stop
app.listen(3000, () => {

    console.log("In Working Mode");

});



