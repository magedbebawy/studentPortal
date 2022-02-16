const Grade = require('../models/Grade');
const Student = require('../models/Student');
const validatGrade = require('../validation/validateGrade');

module.exports = {
    createGrade: async (req, res) => {
        try {
            let output = {};

            // Validate req.body
            const validated = validatGrade.validate(req.body);
            if(validated != null){
                res.status(400).json(validated);
            }else{
                const { assignment, grade } = req.body;
                const {student_id} = req.params;

                const newGrade = new Grade({
                    assignment,
                    grade,
                    student: student_id
                });

                // Check if assignment exist
                const gradeExist = await Grade.find({
                    assignment: assignment,
                    student: student_id
                });
                if(gradeExist && gradeExist.length > 0){
                    res.status(500).json("Assignment already exist");
                }else{

                    // Save grade to DB
                    const savedGrade = await newGrade.save();
                    output.message = "Grade created successfully",
                    res.status(200).json(output);
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Error creating new grade");
        }
    },
    getGrade: async (req, res) => {
        let output = {};
        try {
            const { student_id, grade_id } = req.params;

            // Get grade for grad_id and student_id
            output.grade = await Grade.find({_id: grade_id, student: student_id});
            res.status(200).json(output);
        } catch (error) {
            console.log(error);
            res.status(500).json("Error getting grade");
        }
    },
    getAllGrades: async (req, res) => {
        try {
            let output = {};

            const { student_id } = req.params;

            // Get all grades for student ID
            output.grades = await Grade.find({student: student_id});
            res.status(200).json(output);
        } catch (error) {
            console.log(error);
            res.status(500).json("Error getting all grades");
        }
    },
    editGrade: async (req, res) => {
        try {
            let output = {};

            const { assignment, grade } = req.body;

            // Create updated fields
            const updatedFields = {};
            if(assignment) {
                updatedFields.assignment = assignment;
            } 
            if(grade) {
                updatedFields.grade = grade;
            }

            // Find and update grade
            const updatedGrade = await Grade.findByIdAndUpdate(req.params.grade_id,
                {$set: updatedFields}, {new: true});
            output.message = "Grade updated successfully";
            output.grade = updatedGrade;
            res.status(200).json(output);
        } catch (error) {
            console.log(error);
            res.status(500).json("Error updating grade");
        }
    },
    deleteGrade: async (req, res) => {
        try {
            let output = {};
            const { grade_id } = req.params;
            const grade = await Grade.deleteOne({_id: grade_id});
            if(grade.deletedCount == 1){
                output.message = "Grade deleted successfully"
                res.status(200).json(output);
            }else{
                res.status(500).json("Error deleting grade");
            }     
        } catch (error) {
            console.log(error);
            res.status(500).json("Error deleting grade");
        }
    },
    deleteAllGrades: async (req, res) => {
        try {
            let output = {};
            const { student_id } = req.params;
            const grade = await Grade.deleteMany({student: student_id});
            if(grade.deletedCount == 1){
                output.message = "All grades deleted successfully"
                res.status(200).json(output);
            }else{
                res.status(500).json("Error deleting all grades");
            }     
        } catch (error) {
            console.log(error);
            res.status(500).json("Error deleting all grades");
        }
    },
}