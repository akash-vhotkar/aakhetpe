
const mongoose = required('mongoose');
const roomschema = new mongoose.Schema({
    socketid:{
        type:String,
        required: true
    },
    roomid:{
        type:String,
        required: true
    },
    usertype:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required: false
    },
    roomtype:{
        type:Number,
        required: true
    },
    roomamount: {
        type:Number,
        required: true
    },
    roomstatus: {
        type:String,
        required: true
    }
})
module.exports =  mongoose.model("Tambolaroom", roomschema);