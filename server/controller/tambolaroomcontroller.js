const http =  require('http');
const tambolaroommodel = require('../model/Tambolaroom');
const tambolauser = require('../model/Tambolauser');
const io = require('socket.io');
const generator = require('generate-password');
const tambola = require('tambola-generator');
const Tambolaroom = require('../model/Tambolaroom');
const tambolafun =()=>{
    return {
        // getusers of the room
        async getusers(roomid){
            try{
            const roomusers = await tambolauser.find({roomid: roomid});
            const users = [];
            roomusers.forEach(user=>{
                users.push(user.name);
            })
            return {err: 0 , data : users}
            
            }
            catch(err){
                if(err) console.log(err);
            }

        },
        // name amount  roomtype
        async  createroom(socketid , name, roomtype,  roomamount){
            const roomid = generator.generate({length:8, numbers: true});
            const ticket = tambola.getTickets(1);
            const draw =  tambola.getDrawSequence();
       
            const roomadmin =      {
                name:name,
                socketid:socketid ,
                usertype:"Admin",
                ticket:ticket ,
                balanceticket : ticket,
                roomid: roomid ,
                useramount : roomamount
        }
        const newroom = {
           roomid : roomid,
           roomtype: roomtype,
           roomamount: roomamount,
           roombalancedraw: draw,
           roomadmin: name
       }
       try{
           const user = await tambolauser.create(roomadmin);
           const room = await tambolaroommodel.create(newroom);
           return  {err: 0 , message : "Room created successfully" , data: user};
           

       }catch(err){
           if(err) console.log(err);
           return {err: 1, message :"Internal server error "};
       }
            
            
                      
        },// name roomid
        async joinroom(socketid,  roomid, name){
            try{
                const roomdata = await tambolaroommodel.find({roomid: roomid});
                const roomtype = roomdata.roomtype;
                const roomamount = roomdata.roomamount;
                const  usersinroom = await tambolauser.find({roomid: roomid}).count();
                if(usersinroom>  roomtype){
                    const  ticket = tambola.getTickets(1);
                    const newuser = {
                        name : name ,
                        socketid: socketid,
                        roomid: roomid,
                        ticket: ticket,
                        usertype: "Player",
                        balanceticket:  ticket,
                        useramount : roomamount
                    }   
                    const newuser =  await  tambolauser.create(newuser);
                    return {err: 1, message:" Room is full ", data: newuser}
                } 
                else{

                    
                return {err: 0, message: "Room jpined successfully"}
                }

            }catch(err){
                if(err) console.log(err);
                return {err: 1, message: "Internal server error"}
            }
        }
    }
}
module.exports = tambolafun;