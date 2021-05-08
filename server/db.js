const mongoose = require('mongoose');

const initConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/data3',   { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = initConnection;