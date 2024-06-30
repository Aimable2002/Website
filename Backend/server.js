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
import {server, app, io} from './socket/socket.io.js';

import connectCloud from './Cloudinary/cloudinary.js';

import subRoute from './router/subscriptionRoute.js'
// import webRoute from './router/webRoute.js'

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

app.use('/api/subscription', subRoute)
// app.use('/api/webhook', webRoute)



app.get('/api/verify-transaction/:id', async (req, res) => {
    const transactionId = req.params.id;

    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
        });
        console.log('verified data :', response.data)
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            error: error.response ? error.response.data : 'An error occurred',
        });
    }
});


app.post('/webhook', async(req, res) => {
    try {
        const payload = req.body;
        console.log('webhokk notification :', payload)
        console.log('Webhook received with payload:', JSON.stringify(payload, null, 2));

        if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
            console.log('Payment Successful:', payload.data);

            // Save payment status in the database
            // Example: updateDatabaseWithPayment(payload.data);
            
            
        }

        res.status(200).send('Webhook received');
    } catch (error) {
        console.log('Error handling webhook:', error.message);
        res.status(500).send('Error handling webhook');
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