const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose.connect("mongodb+srv://admin:nSovxzqVW03jU9Mg@main.7cyia.mongodb.net/todo_main?retryWrites=true&w=majority&appName=Main");

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));


const testRoutes = require("./routes/test");
const test2Routes = require("./routes/test2");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");

app.use("/test", testRoutes);
app.use("/test2", test2Routes);
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
app.use(errorHandler);



//ORM - Backend Server <=> Database Server
// nSovxzqVW03jU9Mg
app.listen(3000, () => { console.log("Server is running on port 3000") });