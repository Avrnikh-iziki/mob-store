const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        require: true
    },
    admin: {
        type:Boolean,
        default:false
    },
    date: {
        type: String,
        default: Date.now
    }
})

const User = mongoose.model("user", UserSchema);
module.exports = User;