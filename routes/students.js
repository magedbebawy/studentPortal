const express = require('express');
const router = express.Router();
const studentController = require('../controller/StudentController');

router.post('/', (req, res) => {
    studentController.createStudent(req, res);
});

router.get('/', (req, res) => {
    studentController.getStudent(req, res);
});

router.get('/allstudents', (req, res) => {
    studentController.getAllStudents(req, res);
});

router.delete('/delete/:student_id', (req, res) => {
    studentController.deleteStudent(req, res);
});

router.delete('/deleteall', (req, res) => {
    studentController.deleteAllStudents(req, res);
});

router.put('/:id', (req, res) => {
    studentController.editStudent(req, res);
});

module.exports = router;