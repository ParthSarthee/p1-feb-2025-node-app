const mongoose = require("mongoose");

// Create a file for the collection/model/schema
// Declare the schema (structure) of the collection
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// Create the model (create a collection using the schema)
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;