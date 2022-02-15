const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        let output = [
            {
                name: "maged",
                email: "mbebawy@yahoo.com"
            },
            {
                name: "mark",
                email: "mark@yahoo.com"
            }
        ];
        res.status(200).json(output);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;