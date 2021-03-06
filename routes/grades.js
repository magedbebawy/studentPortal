const express = require('express');
const router = express.Router();
const gradeController = require('../controller/GradesController');
const auth = require('../middleware/auth');

router.post('/:student_id', auth, (req, res) => {
    gradeController.createGrade(req, res);
});

router.get('/:student_id/:grade_id', (req, res) => {
    gradeController.getGrade(req, res);
});

router.get('/grades/allGrades/:student_id', (req, res) => {
    gradeController.getAllGrades(req, res);
});

router.delete('/delete/:grade_id', auth, (req, res) => {
    gradeController.deleteGrade(req, res);
});

router.delete('/deleteall/:student_id', auth, (req, res) => {
    gradeController.deleteAllGrades(req, res);
});

router.put('/:grade_id', auth, (req, res) => {
    gradeController.editGrade(req, res);
});

module.exports = router;