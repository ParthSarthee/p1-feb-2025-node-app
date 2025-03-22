const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const secret = "test-test-test-test-test-test-test";

async function listUsers(req, res, next) {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong when fetching users." });
    }
}



async function login(req, res, next) {
    const loginData = { username: req.body.username, password: req.body.password };

    try {
        const user = await UserModel.findOne(loginData);
        if (user) {
            const token = jwt.sign({ username: user.username, id: user._id }, secret);
            res.json({ user: user, token: token });
        }
        else res.status(404).json({ message: "Wrong username or password." });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong when logging in." });
    }
}

async function signup(req, res, next) {
    const userData = { name: req.body.name, username: req.body.username, password: req.body.password };

    try {
        const user = await UserModel.create(userData);
        const token = jwt.sign({ username: user.username, id: user._id }, secret);
        res.json({ user: user, token: token });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong when creating new user." });
    }
}


router.get("/", listUsers);
router.post("/login", login);
router.post("/signup", signup);
module.exports = router;