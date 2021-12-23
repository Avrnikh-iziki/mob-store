const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
   _id:String,
    Name: String,
    Email: String,
    order: []
})

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;