import express from 'express';
import { server } from 'socket.io';
import http from 'https';
import { METHODS, Server } from 'http';
import { Socket } from 'dgram';


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    }
});


export const getRecievedSocketId = (recieverId) => {
    return userSocketMap[recieverId]
}

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log('connected user :', socket.id)

    const userId = socket.handShake.query.userId;

    if(userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUser", Object.keys(userSocketMap))

    console.log('userSocketMap :', userSocketMap)
    socket.on("disconnected", (socket) => {
        console.log('disconnected user :', socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap))
    })
})


export default {app, server, io}