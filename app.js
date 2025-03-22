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

// Models => Todo, User
// Model Based Routes => /todo, /user
// "/login" => tokenise and encrypt user data (jwt) => client => jwt in header => server look for the header to verify the identity of the user


const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));


const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");
const authHandler = require("./middlewares/authHandler");

app.use(authHandler.verifyToken);
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
app.use(errorHandler);



//ORM - Backend Server <=> Database Server
// nSovxzqVW03jU9Mg
app.listen(3001, () => { console.log("Server is running on port 3001") });