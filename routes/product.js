const express = require('express');
const Router = express.Router();
const Product = require('../models/product');

//Product CRUD
//Create request 
Router.post('/createprod', async (req, res) => {

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
Router.get('/getallprod', async (req, res) => {

    try {
        products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }

})

Router.get('/getprodbyid/:id', async (req, res) => {

    try {
        myid = req.params.id;
        prod = await Product.findOne({ _id: myid });
        res.status(200).send(prod);
    } catch (error) {
        res.status(400).send(error);
    }

})
//Update request
Router.put('/uptprod/:id', async (req, res) => {

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
Router.delete('/delprod/:id', async (req, res) => {

    try {
        myid = req.params.id;
        deleted = await Product.findByIdAndDelete({ _id: myid });
        res.status(200).send(deleted);
    } catch (error) {
        res.status(400).send(error);
    }

})



module.exports = Router;