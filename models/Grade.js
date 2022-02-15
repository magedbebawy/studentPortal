const mongoose = require('mongoose');

const GradesSchema = mongoose.Schema({
    assignment: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('grades', GradesSchema);