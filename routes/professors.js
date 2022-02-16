const express = require('express');
const router = express.Router();
const professorController = require('../controller/ProfessorController');

router.post('/register', (req, res) => {
    professorController.registerProfessor(req, res);
});

router.post('/login', (req, res) => {
    professorController.signIn(req, res);
});

module.exports = router;