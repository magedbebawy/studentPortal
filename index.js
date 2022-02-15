const config = require('config');
const express = require('express');
const connectToDB = require('./db/db');
const app = express();


app.use(express.json());

// Connect to DB
connectToDB();

// Use routes
app.use('/student', require('./routes/students'));
app.use('/grades', require('./routes/grades'));

app.get('/', (req, res) => {
    res.status(200).send("Welcome to student portal");
});

const port = config.get('app.port');

app.listen(port, () => {
    console.log("App is running on port", port);
});