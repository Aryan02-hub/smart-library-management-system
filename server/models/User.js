const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: String,

    email: String,

    password: String,

    role: String,

    mobile: {
        type: String,
        default: ""
    },

    photo: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("User", userSchema);
