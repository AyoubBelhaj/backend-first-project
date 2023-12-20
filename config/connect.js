const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(() => {
    console.log('Connected with Data Base');
})
.catch((err) => {
    console.log(err);
});

//to share it in all files 
module.exports = mongoose;