const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const cors = require('cors')
const axios = require("axios");

const PORT = 4000;

const app = express()
const server = http.createServer(app)

const io = socketio(server,{
    cors:{
        origin:"*",
    }
})
app.use(cors())

io.on("connection", (socket) => {

    socket.on("join", (roomId) => {

        socket.join(roomId);
        socket.to(roomId).emit("welcome");
        console.log("j")
    });

    socket.on("offer", (offer, roomId) => {

        socket.to(roomId).emit("offer", offer);
        console.log("o")
    });

    socket.on("answer", (answer, roomId) => {

        socket.to(roomId).emit("answer", answer);
        console.log("a")
    });

    socket.on("ice", (ice, roomId) => {

        socket.to(roomId).emit("ice", ice);
        console.log("i")
    });
});
server.listen(PORT, () => console.log(`서버 포트 : ${PORT} `))