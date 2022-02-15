const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        let output = [
            {
                assignment: "test 1",
                grade: 95
            },
            {
                assignment: "quiz 1",
                grade: 9
            }
        ];
        res.status(200).json(output);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;