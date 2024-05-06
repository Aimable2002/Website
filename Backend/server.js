import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'

import connectDB from './Model/db/connectDb.js';

import authRoute from './router/authRoute.js'


const app = express();

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT

app.use(express.json());
app.use(cors());


app.use('api/auth', authRoute);


app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})

app.listen(2000, () => {
    connectDB();
    console.log(`connect server : ${2000}`)
})