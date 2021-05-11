const mongoose = require('mongoose');
module.exports = mongoose.model("Tambolaroom",{
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
    },
    roombalancedraw : {
        type:Array,
        required: true
    },
    roomadmin: {
        type:String,
        required: true
    }
    
})