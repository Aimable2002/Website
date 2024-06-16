import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios'

import connectDB from './Model/db/connectDb.js';

import authRoute from './router/authRoute.js'
import uploadRoute from './router/uploadRoute.js'
import messageRoute from './router/messageRoute.js'
import userRoute from './router/userRoute.js'
import storyRoute from './router/storyRoute.js'
import actionRoute from './router/actionRoute.js'
import {server, app} from './socket/socket.io.js';

import connectCloud from './Cloudinary/cloudinary.js';

//const app = express();

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/uploadStory', storyRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute)
app.use('/api/action', actionRoute)

const FLW_PUBLIC_KEY = process.env.FLW_PUBLIC_KEY;
const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

app.post('/create-payment', async (req, res) => {

    const { amount, email, currency } = req.body;

    console.log('colled')
     
    
    try {
        const response = await axios.post('https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda', {
            tx_ref: `hooli-tx-${Date.now()}`,
            amount: amount,
            currency,
            redirect_url: 'http://localhost:2000/account',
            customer: {
                email,
            },
            customizations: {
                title: 'Payment for items in cart',
                description: 'Payment for items in cart',
            },
        }, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('email :', email)
        console.log('currency :', currency)
        console.log('phone_number :', amount)
        console.log('response.data :', response.data)
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

app.post('/mobile', async (req, res) => {
    console.log('called')
    const { amount, email, phoneNumber, currency } = req.body;
    // console.log('amount :', amount)
    //     console.log('email :', email)
    //     console.log('currency :', currency)
    //     console.log('phone_number :', phoneNumber)

    try {
        // const response = await axios.post('https://api.flutterwave.com/v3/charges', {
        const response = await axios.post('https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda', {
            tx_ref: `hooli-tx-${Date.now()}`,
            amount: amount,
            currency: currency,
            email: email,
            payment_type: "card",
            redirect_url: 'https://website-s9ue.onrender.com/', 
            phone_number: phoneNumber,
            customer: {
                email: email,
            },
            customizations: {
                title: 'Payment for items in cart',
                description: 'Payment for items in cart',
            },
        }, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('response :', response.data)
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment link:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})



server.listen(PORT, () => {
    connectDB();
    connectCloud()
    console.log(`connect server : ${PORT}`)
})