const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");


async function listUsers(req, res, next) {
    const filter = req.query;

    try {
        const users = await UserModel.find(filter);
        res.json({ users: users });
    } catch (e) {
        return next(e);
    }
}

async function oneUserId(req, res, next) {
    const uid = req.params.uid;

    try {
        const user = await UserModel.findById(uid);
        res.json({ user: user });
    } catch (e) {
        return next(e);
    }
}

async function oneUserFilter(req, res, next) {
    const filter = req.query;
    try {
        const user = await UserModel.findOne(filter);
        res.json({ user: user });
    } catch (e) {
        return next(e);
    }
}


async function createUser(req, res, next) {
    const data = req.body;

    try {
        const user = await UserModel.create(data);
        res.json({ user: user });
    } catch (e) {
        return next(e);
    }
}

async function updateUser(req, res, next) {
    const uid = req.params.uid;
    const data = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(uid, data, { new: true });
        res.json({ user: updatedUser });
    } catch (e) {
        return next(e);
    }
}


async function deleteUser(req, res, next) {
    const uid = req.params.uid;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(uid);
        res.json({ user: deletedUser });
    } catch (e) {
        return next(e);
    }
}



router.get("/list", listUsers);
router.get("/one/id/:uid", oneUserId);
router.get("/one/filter", oneUserFilter);
router.post("/", createUser);
router.put("/:uid", updateUser);
router.delete("/:uid", deleteUser);
module.exports = router;