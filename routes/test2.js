const express = require("express");
const router = express.Router();

function testParam(req, res, next) {
    console.log(req.params.name);
    res.json({ name: req.params.name });
    return next();
}

function testQuery(req, res, next) {
    console.log(req.query);
    res.json({ name: req.query.name, email: req.query.email });
    return next();
}

function testBody(req, res, next) {
    console.log(req.body);
    res.json(req.body);
    return next();
}


router.get("/param/:name", testParam);
router.get("/query", testQuery);
router.post("/body", testBody);
module.exports = router;