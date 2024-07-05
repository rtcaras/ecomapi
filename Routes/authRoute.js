const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

// Register API
router.post('/register', async (req, res) => {     
    const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();   

        // Create a new user instance with the encrypted password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword,
        });
        try {
        // Save the new user to the database
        const savedUser = await newUser.save();

        // Respond with the created user object
        res.status(201).json(savedUser);
    } catch (err) {
        
            res.status(500).json({ error: err.message });
        }
    });

// Login API
router.post('/login', async (req, res) => {
    try {
        // Find the user by username
        const user = await User.findOne({ username: req.body.username });

        // If user is not found, return with an error
        if (!user) {
            return res.status(401).json("Wrong Credential!");
        }

        // Decrypt the stored password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        // Check if the decrypted password matches the provided password
        if (decryptedPassword !== req.body.password) {
            return res.status(401).json("Wrong Credential!");

            const accessToken = JWT.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SECRET, {expiresIn: "3days"}
        );
        }

        const { password, ...others } = user._doc;

        // Respond with the user object
        res.status(200).json(...othersthers, {accessToken});
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
