const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1); // Don't kill the server, let it try to reconnect or stay up
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;
