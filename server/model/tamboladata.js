const mongoose = require('mongoose');
module.exports = mongoose.model("tamboladata",{
    socketid:{
        type:String,
        required: true

    },
    name: {
        type:String,
        required: true
    },
    ticket:{
        type:Array,
        required: true
    },
    ticketbalanceno:{
        type:Array,
        required: true
    },
    room:{
        type:String,
        required: false,
        default: null
    }
})