// import express from 'express';
// import { Server } from 'socket.io';
// import http from 'https';


// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:2000"],
//         methods: ["GET", "POST"],
//     }
// });


// export const getRecievedSocketId = (recieverId) => {
//     return userSocketMap[recieverId]
// }

// const userSocketMap = {};

// io.on("connection", (socket) => {
//     console.log('connected user :', socket.id)

//     const userId = socket.handShake.query.userId;

//     if(userId !== "undefined") userSocketMap[userId] = socket.id;

//     io.emit("getOnlineUser", Object.keys(userSocketMap))

//     console.log('userSocketMap :', userSocketMap)
//     socket.on("disconnect", (socket) => {
//         console.log('disconnected user :', socket.id)
//         delete userSocketMap[userId];
//         io.emit("getOnlineUser", Object.keys(userSocketMap))
//     })
// })


// export {app, server, io}




import http from 'http'
import { Server } from 'socket.io';
import express from 'express';



const app = express();


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:2000"],
        methods: ["GET", "POST"],
    }
});

export const getRecievedSocketId = (receivedId) => {
    return userSocketMap[receivedId]
}

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log('connected user :', socket.id);

    const userId = socket.handshake.query.userId;

    if(userId != "undefined") userSocketMap[userId] = socket.id;


    io.emit("getOnlineUser", Object.keys(userSocketMap));

    console.log("userSocketMap :", userSocketMap)
    
    socket.on("disconnect", () => {
        console.log("disconnected user :", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap))
    })
})

export { server, app, io };