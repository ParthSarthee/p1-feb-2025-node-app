const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");



function getTest(req, res, next) {
    e = true;
    if (e) next(new Error("An error occured."));
    else res.status(200).json({ message: "Test GET route called." });
}

function postTest(req, res, next) {
    res.status(200).json({ message: "Test POST route called." });
}

function putTest(req, res, next) {
    res.status(200).json({ message: "Test PUT route called." });
}

function deleteTest(req, res, next) {
    res.status(200).json({ message: "Test DELETE route called." });
}

router.get("/", getTest);
router.post("/", postTest);
router.put("/", putTest);
router.delete("/", deleteTest);

module.exports = router;