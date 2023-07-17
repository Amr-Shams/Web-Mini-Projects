// upload all the data from the json file to the database
//

require('dotenv').config();
require('express-async-errors');
 const MONGO_URI='mongodb+srv://amrshams2015as:7z3U8DTGuKFwzMDu@nodejs.z1e2fpt.mongodb.net/';

const express = require('express');
const { connect } = require('mongoose');

const connectDB = require('./db/connect');
const Product = require('./models/product');
const products = require('./products.json');

const start = async () => {
    try{
        await connectDB(MONGO_URI);
        await Product.deleteMany();
        await Product.create(products);
        console.log("success");
        process.exit(0);
    }catch(error){
        console.log(error);
    }
}
start();