const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

const io = socketio(server,{
    cors:{
        origin: "http://localhost:3000"
    }
});
io.on('connection', (socket) => {
    
    socket.on('disconnect', () =>{
        console.log("disconned is fired ")
    });   
    socket.on('message',(message)=>{
        console.log("server received the messages ", message);
    })
    socket.on('joinroom',()=>{
        console.log("join room is fired");
    
    })
    socket.on('createroom',()=>{
        console.log("createroom is fired");

    })
    
    
    socket.on('playonline', () => {
        console.log("play online is fired ");

    });


 });

server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));