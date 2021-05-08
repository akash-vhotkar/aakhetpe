const http =  require('http');
const tambolaroommodel = require('../model/Tambolaroom')
const io = require('socket.io');
const generator = require('generate-password');
const tambolafun =()=>{
    return {
        // getusers of the room
        async getusers(roomid){
            try{
            const roomusers = await tambolaroommodel.find({roomid: roomid});
            return {err: 0 , data : roomusers}
            
            }
            catch(err){
                if(err) console.log(err);
            }

        },
        // name amount  roomtype
        async  createroom(socketid , name, roomtype,  roomamount){
            const roomid = generator.generate({length:8, numbers: true});
            console.log(roomid); 
            console.log("   name ", name, " thise s roomtype" , roomtype,"  thise is roomamount ", roomamount);
            const roomadmin = {
                name: name,
                socketid: socketid,
                roomtype: parseInt(roomtype),
                usertype:"Admin",
                roomamount : roomamount,
                roomid: roomid
            }
            
            try{
                const roomdata = await tambolaroommodel.create(roomadmin);
                return {err:0, message:"Room created successfully", data: roomdata};
            }
            catch(err){
                if(err) console.log(err);
            }       
                    
                      
        },// name roomid
        async joinroom(socketid, name, roomid , ticket){
            try{
                const roomadmin = await tambolaroommodel.findOne({roomid: roomid, usertype: "Admin"});
                const roomtype = roomadmin.roomtype;
                const noofusersinroom =  await tambolaroommodel.find({roomid: roomid});
                const adminamount =  roomadmin.roomamount;
                const adminroomtype  = roomadmin.roomtype;
                if(noofusersinroom>= roomtype){
                    return {err:1 , message:"Room is full"};
                }
                else {

                    const  newroommembar = {
                        roomid: roomid,
                        name : name,
                        ticket: ticket,
                        usertype: "player",
                        roomamount : adminamount,
                        socketid: socketid,
                        roomtype: adminroomtype
                        
                    }
                    const newplayer = await tambolaroommodel.create(newroommembar);
                    if(newplayer)  return  {err:0 , message:"player added in room ", data :  newplayer};
                    else return {err: 1 ,message: "Server error "};
                }     
            }catch(err){
                if(err) console.log(err);
                return {err: 0 , message :"Internal server error"}
            }
        }
    }
}
module.exports = tambolafun;