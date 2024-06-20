const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.log('MongoDB connection error:', err);
    }
};

const checkConnected = () => {
    const status = mongoose.connection.readyState;
    return status === 1;
};

module.exports = {
    connectDb,
    checkConnected
};
