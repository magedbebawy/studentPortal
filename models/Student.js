const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    professor: {
        type: mongoose.Types.ObjectId,
        ref: 'professors'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('students', StudentSchema);