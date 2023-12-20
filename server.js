const express = require('express');
require('./config/connect');
const User = require('./models/user');
const Product = require('./models/product');
const app = express();

//to accept json files
app.use(express.json());

//Post request
app.post('/add', (req, res) => {

    data = req.body;
    console.log(data);

    usr = new User(data);
    usr.save()
        .then((savedUser) => {
            res.status(200).send(savedUser);
        })
        .catch((err) => {
            res.status.apply(400).send(err);
        })

});

//Post async and await 
app.post('/create', async (req, res) => {

    try {

        data = req.body;
        console.log(data);
        usr = new User(data);
        SavedUser = await usr.save();
        res.send(SavedUser);

    } catch (error) {
        res.send(error);
    }

})

//Get request
app.get('/getall', (req, res) => {

    //find function of moongoose to bring all users from data base 
    User.find()
        .then(
            (AllUsers) => {
                res.send(AllUsers);
            }
        )
        .catch(
            (err) => {
                res.send(err);
            }
        )

    console.log("Get Working");

});

//Get with async and await 
app.get('/get', async (req, res) => {

    try {

        tab = await User.find(/* { age: 22 } */);
        res.send(tab);
        console.log(tab);

    } catch (err) {

        res.send(err);

    }

})

//Get by id request 
app.get('/getbyid/:id', (req, res) => {

    myid = req.params.id;
    User.findOne({ _id: myid })
        .then(
            (user) => {
                res.send(user);
                console.log(user);
            }
        )
        .catch(
            (err) => {
                res.send(err);
            }
        )

})

//Get By id async and await 
app.get('/getid/:id', async (req, res) => {

    try {
        myid = req.params.id;
        user = await User.findOne({ _id: myid });
        res.send(user);
        console.log(user);
    } catch (error) {
        res.send(error);
    }

})

//Put request
app.put('/update/:id', (req, res) => {

    myid = req.params.id;
    newData = req.body;
    User.findByIdAndUpdate({ _id: myid }, newData)
        .then(
            (UpdatedUser) => {
                res.send(UpdatedUser)
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )
    console.log("Put Working")
    console.log(newData)

});
//Put async await request
app.put('/change/:id', async (req, res) => {

    try {
        myid = req.params.id;
        newData = req.body;
        UpdatedUser = await User.findByIdAndUpdate({ _id: myid }, newData);
        res.send(UpdatedUser);
        console.log(UpdatedUser);

    } catch (error) {
        res.send(error)
    }

})

//Delete request 
app.delete('/delete/:id', (req, res) => {

    myid = req.params.id;
    User.findOneAndDelete({ _id: myid })
        .then(
            (DeleteldUser) => {
                res.send(DeletedUser);
                /* console.log(DeletedUser); */
            }
        )
        .catch(
            (err) => {
                res.send(err);
            }
        )
    console.log('Delete Working');

})

//Delete request async await 
app.delete('/del/:id', async (req, res) => {

    try {
        myid = req.params.id
        DeletedUser = await User.findOneAndDelete({ _id: myid })
        res.send(DeletedUser)
    } catch (error) {
        res.send(error)
    }

})

//Product CRUD
//Create request 
app.post('/createprod', async (req, res) => {

    try {
        newData = req.body;
        prod = new Product(newData);
        saved = await prod.save();
        res.status(200).send(saved);
    } catch (error) {
        res.status(400).send(error);
    }

})
//Get requests 
app.get('/getallprod', async (req, res) => {

    try {
        products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }

})

app.get('/getprodbyid/:id', async (req, res) => {

    try {
        myid = req.params.id;
        prod = await Product.findOne({ _id: myid });
        res.status(200).send(prod);
    } catch (error) {
        res.status(400).send(error);
    }

})
//Update request
app.put('/uptprod/:id', async (req, res) => {

    try {
        myid = req.params.id;
        newData = req.body;
        updated = await Product.findByIdAndUpdate({ _id: myid }, newData);
        res.status(200).send(updated);
    } catch (error) {
        res.status(400).send(error);
    }

})
//Delete request
app.delete('/delprod/:id', async (req, res) => {

    try {
        myid = req.params.id;
        deleted = await Product.findByIdAndDelete({ _id: myid });
        res.status(200).send(deleted);
    } catch (error) {
        res.status(400).send(error);
    }

})

//To let the project works and doesnt stop
app.listen(3000, () => {

    console.log("In Working Mode");

});



