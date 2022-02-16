const valideStudent = require('../validation/validateStudent');
const Student = require('../models/Student');

module.exports = {
    createStudent: async (req, res) => {
        try {
            let output = {};
            // Validate req.body
            const validated = valideStudent.validate(req.body);
            
            if(validated != null){
                res.status(400).json(validated);
            }else{
                const { name, email } = req.body;
                // Create a new student object
                const newStudent = new Student({
                    name,
                    email
                });

                // Save student to DB
                let students = await Student.find({email: email});
                if(students.length > 0){
                    res.status(400).json({"msg":"Email already in use"}); 
                }else{
                    output.message = "New student created successfully";
                    output.student = await newStudent.save();
                    res.status(200).json(output);
                }
                
            }

        } catch (error) {
            console.log(error);
            res.status(500).json("Error creating new student");
        }
    },

    getStudent: async (req, res) => {
        try {
            let output = {};

            // Validate req.body
            const validated = valideStudent.validateEmail(req.body);
            if(validated != null){
                res.status(400).json(validated);
            }else{
                // Find student
                const { email } = req.body;
                output.student = await Student.findOne({email: email});
                res.status(200).json(output);
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json("Error getting student");
        }
    },


    getAllStudents: async (req, res) => {
        try {
            let output = {};
            // Get all students
            output.students = await Student.find();
            res.status(200).json(output);
        } catch (error) {
            console.log(error);
            res.status(500).json("Error getting all students");
        }
    },

    deleteStudent: async (req, res) => {
        try {
            let output = {};
            const { student_id } = req.params;
            const student = await Student.deleteOne({_id: student_id});
            if(student.deletedCount == 1){
                output.message = "Student deleted successfully"
                res.status(200).json(output);
            }else{
                res.status(500).json("Error deleting student");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Error deleting student");
        }
    },

    deleteAllStudents: async (req, res) => {
        try {
            let output = {};
            const student = await Student.deleteMany();
            if(student.deletedCount > 0){
                output.message = "Successfully deleted " + student.deletedCount;
                res.status(200).json(output);
            }else{
                res.status(500).json("Error deleting all students");
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json("Error deleting all students");
        }
    },

    editStudent: async (req, res) => {
        try {
            let output = {};

            // Build updated fields
            const { name, email } = req.body;
            const updatedFields = {};

            if(name) {
                updatedFields.name = name;
            }
            if(email) {
                updatedFields.email = email;
            }

            // Find student and update
            output.student = await Student.findByIdAndUpdate(req.params.id,
                {$set: updatedFields}, {new: true});
            res.status(200).json(output);
        } catch (error) {
            console.log(error);
            res.status(500).json("Error editing student");
        }
    }
}