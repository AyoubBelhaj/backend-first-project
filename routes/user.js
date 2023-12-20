const express = require('express');
const Router = express.Router();

const User = require('../models/user');

//Post request
Router.post('/add', (req, res) => {

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
Router.post('/create', async (req, res) => {

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
Router.get('/getall', (req, res) => {

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
Router.get('/get', async (req, res) => {

    try {

        tab = await User.find(/* { age: 22 } */);
        res.send(tab);
        console.log(tab);

    } catch (err) {

        res.send(err);

    }

})

//Get by id request 
Router.get('/getbyid/:id', (req, res) => {

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
Router.get('/getid/:id', async (req, res) => {

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
Router.put('/update/:id', (req, res) => {

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
Router.put('/change/:id', async (req, res) => {

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
Router.delete('/delete/:id', (req, res) => {

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
Router.delete('/del/:id', async (req, res) => {

    try {
        myid = req.params.id
        DeletedUser = await User.findOneAndDelete({ _id: myid })
        res.send(DeletedUser)
    } catch (error) {
        res.send(error)
    }

})




module.exports = Router;