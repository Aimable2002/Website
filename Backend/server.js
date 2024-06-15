import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

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

const MTN_API_BASE_URL = 'https://sandbox.momodeveloper.mtn.com';
const API_PRIMARY_KEY = '0ea09030d08f4a91bf1036e7cfdc2ee7'; // Replace with your MTN primary key
const CALLBACK_HOST = 'https://website-s9ue.onrender.com'; // Replace with your callback URL

// Function to create API user
const createApiUser = async () => {
    const apiUserId = uuidv4();
    try {
        await axios.post(
            `${MTN_API_BASE_URL}/v1_0/apiuser`,
            { providerCallbackHost: CALLBACK_HOST },
            { headers: { 'Ocp-Apim-Subscription-Key': API_PRIMARY_KEY, 'Content-Type': 'application/json' } }
        );
        console.log(`API User created with ID: ${apiUserId}`);
        return apiUserId;
    } catch (error) {
        console.error('Error creating API user:', error.response.data);
    }
};

// Function to generate API key
const generateApiKey = async (apiUserId) => {
    try {
        const response = await axios.post(
            `${MTN_API_BASE_URL}/v1_0/apiuser/${apiUserId}/apikey`,
            {},
            { headers: { 'Ocp-Apim-Subscription-Key': API_PRIMARY_KEY } }
        );
        const apiKey = response.data.apiKey;
        console.log(`API Key: ${apiKey}`);
        return apiKey;
    } catch (error) {
        console.error('Error generating API key:', error.response.data);
    }
};

// Function to get access token
const getAccessToken = async (apiUserId, apiKey) => {
    const credentials = Buffer.from(`${apiUserId}:${apiKey}`).toString('base64');
    try {
        const response = await axios.post(
            `${MTN_API_BASE_URL}/collection/token/`,
            {},
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': API_PRIMARY_KEY,
                    'Authorization': `Basic ${credentials}`
                }
            }
        );
        const accessToken = response.data.access_token;
        console.log(`Access Token: ${accessToken}`);
        return accessToken;
    } catch (error) {
        console.error('Error obtaining access token:', error.response.data);
    }
};

// Create a payment request
app.post('/create-payment', async (req, res) => {
    const { amount, currency, externalId, payer, payerMessage, payeeNote } = req.body;
    const referenceId = uuidv4(); // Unique reference ID for the payment request

    try {
        const apiUserId = await createApiUser();
        const apiKey = await generateApiKey(apiUserId);
        const accessToken = await getAccessToken(apiUserId, apiKey);

        const response = await axios.post(`${MTN_API_BASE_URL}/collection/v1_0/requesttopay`, {
            amount,
            currency,
            externalId,
            payer,
            payerMessage,
            payeeNote
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Reference-Id': referenceId,
                'X-Target-Environment': 'sandbox', // Change to 'production' when going live
                'Ocp-Apim-Subscription-Key': API_PRIMARY_KEY,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
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