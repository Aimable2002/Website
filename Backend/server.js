import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'

import connectDB from './Model/db/connectDb.js';

import authRoute from './router/authRoute.js'
import uploadRoute from './router/uploadRoute.js'
import messageRoute from './router/messageRoute.js'
import userRoute from './router/userRoute.js'
import storyRoute from './router/storyRoute.js'
import actionRoute from './router/actionRoute.js'
import {server, app} from './socket/socket.io.js';


//const app = express();

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT

app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/uploadStory', storyRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute)
app.use('/api/action', actionRoute)


// app.use(express.static(path.join(__dirname, "/Frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
// })



server.listen(PORT, () => {
    connectDB();
    console.log(`connect server : ${PORT}`)
})