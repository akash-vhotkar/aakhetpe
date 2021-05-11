const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const tambola  = require('tambola-generator');

mongoose.connect("mongodb+srv://akash:akash1234@cluster0.4ayge.mongodb.net/bookmytaxi?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("database connected successfully");
}).catch(err => {
    if (err) console.log(err);
})

const server = http.createServer(app);
const tambolacontroller = require('./controller/tambolaroomcontroller');
const { ScreenLockLandscapeTwoTone } = require('@material-ui/icons');
const io = socketio(server,{
    cors:{
        origin: "http://localhost:3000"
    }
});
io.on('connection', (socket) => {
    socket.on('tamboladisconnect', () =>{
        console.log("disconned is fired ")
    });   
    socket.on('tambolamessage',(message)=>{
        
    })
    socket.on('getusers', async (roomid)=>{
        const allusers = await tambolacontroller().getusers(roomid);
        console.log("allusers is ", allusers);
        socket.emit('getusers',  allusers)
    })
    socket.on('tambolajoinroom', async (roomid, name)=>{
        const res  = await tambolacontroller().joinroom(socket.id,roomid, name);
        socket.emit("tambolajoinusers", res);
    })
    socket.on('tambolacreateroom', async (name,roomtype, roomamount)=>{
     const roomadmin=  await tambolacontroller().createroom(socket.id, name, roomtype, roomamount );
     console.log("thise is room admin ",roomadmin);
     socket.join(roomadmin.data.roomid);
     io.emit("tambolacreateroom", roomadmin);
    
    })
    socket.on("tambolaticket", async (roomid , name )=>{
        const ticket =  tambola.generateTicket();
        console.log(ticket);
        socket.emit("ticket" , ticket)
        
    })
    socket.on('tambolagetdraw',  async (roomid , name)=>{
        const draw = tambola.getDrawSequence();
        socket.emit("draw",  draw)
    })
    
    
    socket.on('tambolaplayonline', () => {
        console.log("play online is fired ");

    });


 });

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));