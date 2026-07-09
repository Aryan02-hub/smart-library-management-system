const express = require("express");

const router = express.Router();

const User = require("../models/User");


// REGISTER

router.post("/register", async (req, res) => {

    const { username, email, password, role } = req.body;

    const user = new User({
        username,
        email,
        password,
        role
    });

    await user.save();

    res.json({
        message: "Registered Successfully"
    });

});


// LOGIN

router.post("/login", async (req, res) => {

    const { email, password, role } = req.body;

    const user = await User.findOne({
        email,
        password,
        role
    });

    if (!user) {
        return res.json({
            message: "Invalid Credentials"
        });
    }

    res.json({
        message: "Login Success",
        user
    });

});

router.put("/update-profile", async (req, res) => {

    const {
        email,
        username,
        mobile,
        photo
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

        return res.json({
            message: "User not found"
        });

    }

    user.username = username;

    user.mobile = mobile;

    user.photo = photo;

    await user.save();

    res.json({
        message: "Profile Updated",
        user
    });

});

module.exports = router;