const mongoose = require('mongoose');
module.exports = mongoose.model("Tambolaroom",{
    socketid:{
        type:String,
        required: true

    },
    name: {
        type:String,
        required: true
    },
    usertype:{
        type:String,
        required: true
    },
    ticket:{
        type:Array,
        required: false
    },
    ticketbalanceno:{
        type:Array,
        required: false
    },
    roomid:{
        type:String,
        required: false,
        default: null
    },
    roomtype:{
        type:Number,
        required: false
    },
    roomamount : {
        type:Number,
        required: true
    }
    
})