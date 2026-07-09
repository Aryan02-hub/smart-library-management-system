const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({

    studentEmail: {
        type: String,
        required: true
    },

    bookTitle: {
        type: String,
        required: true
    },

    author: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    issueDate: {
        type: Date,
        default: Date.now
    },

    returned: {
        type: Boolean,
        default: false
    },

    returnDate: Date,

    fine: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model("Issue", issueSchema);