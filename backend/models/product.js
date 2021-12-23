const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    productName: {
        type:String ,
        required:true
    },
    price:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
})

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;