const express = require('express');
const router = express.Router();
const studentController = require('../controller/StudentController');
const auth = require('../middleware/auth');

router.post('/', auth, (req, res) => {
    studentController.createStudent(req, res);
});

router.get('/', auth, (req, res) => {
    studentController.getStudent(req, res);
});

router.get('/allstudents', auth, (req, res) => {
    studentController.getAllStudents(req, res);
});

router.delete('/delete/:student_id', auth, (req, res) => {
    studentController.deleteStudent(req, res);
});

router.delete('/deleteall', auth,(req, res) => {
    studentController.deleteAllStudents(req, res);
});

router.put('/:id', auth, (req, res) => {
    studentController.editStudent(req, res);
});

module.exports = router;