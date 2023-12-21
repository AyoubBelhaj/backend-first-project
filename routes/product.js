const express = require('express');
const Router = express.Router();
const Product = require('../models/product');

const multer = require('multer');

filname ='';

const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req,file,redirect) => {
        date = Date.now();
        fl = date + '.' + file.mimetype.split('/')[1];
        filname = fl;
        redirect(null,fl);
        
    }
})

//middleware
const upload = multer({storage: myStorage});

//Product CRUD
//Create request 
Router.post('/createprod', upload.any('image') ,async (req, res) => {

    try {
        newData = req.body;
        newData.image = filname;
        prod = new Product(newData);
        saved = await prod.save();
        filname ='';
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
Router.put('/uptprod/:id', upload.any('image'), async (req, res) => {

    try {
        myid = req.params.id;
        newData = req.body;
        newData.image = filname;
        updated = await Product.findByIdAndUpdate({ _id: myid }, newData);
        filname = '';
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