require('dotenv').config()
const functions = require("firebase-functions");
const express = require('express');
const app = express()

const cors  = require('cors')
const Stripe = require('stripe')
const stripe = Stripe(process.env.SECRET_KEY)

// API

// Middlewares

app.use(cors())
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", ["http://localhost:3000" , "https://clone-e456f.web.app/"]); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Api Routes

app.get('/' , (req,res) => {
    res.status(200).send('Hello World')
})

app.post('/payments/create' , async (req,res) => {
    const total = req.query.total
    console.log('Payment req received ' , total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits
        currency: 'usd'
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen

exports.api = functions.https.onRequest(app)

// Endpoint
// http://localhost:5001/clone-e456f/us-central1/api