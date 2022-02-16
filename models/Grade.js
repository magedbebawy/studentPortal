const mongoose = require('mongoose');

const GradesSchema = mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'students'
    },
    assignment: {
        type: String,
        required: true,
        unique: true
    },
    grade: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('grades', GradesSchema);