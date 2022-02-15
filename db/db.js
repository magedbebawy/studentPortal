const mongoose = require('mongoose');
const config = require('config');

const connectToDB = async () => {
    try {
        const dbURL = config.get('db.url');
        await mongoose.connect(dbURL); 
        console.log("Successfully connected to DB");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
    }
}

module.exports = connectToDB;