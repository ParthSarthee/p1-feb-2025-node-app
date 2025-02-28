const express = require("express");
const router = express.Router();
const TodoModel = require("../models/TodoModel");


// List all the todos
async function listTodos(req, res, next) {
    try {
        const todoList = await TodoModel.find();
        res.json(todoList);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error fetching todos." });
    }
}

// Create a new todo in the list
async function createTodo(req, res, next) {
    if (!req.body.task) {
        res.status(400).json({ "message": "Task is required." });
        return next();
    }

    let newTodo = req.body;
    try {
        const todo = await TodoModel.create(newTodo);
        res.json(todo);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error creating todo." });
    }
}

// Update an existing todo in the list
async function updateTodo(req, res, next) {

    const todoId = req.params.id;
    if (!todoId) {
        res.status(400).json({ "message": "Id is required." });
        return next();
    }

    const updateData = req.body;
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, updateData, { new: true });
        res.json(updatedTodo);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error updating todo." });
    }

}

// Delete an existing todo from the list
async function deleteTodo(req, res, next) {
    const todoId = req.params.id;
    if (!todoId) {
        res.status(400).json({ "message": "Id is required." });
        return next();
    }

    try {
        const todo = await TodoModel.findByIdAndDelete(todoId);
        res.json(todo);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error deleting todo." });
    }
}



router.get("/", listTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
module.exports = router;