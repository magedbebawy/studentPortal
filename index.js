const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Welcome to student portal");
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});