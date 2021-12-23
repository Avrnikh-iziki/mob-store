const Product = require('../models/product')
const newproduct = async (req, res) => {
    const { ProductName, Imageurl, Price, categoryName } = req.body
    const product = new Product({
        category: categoryName,
        productName: ProductName,
        price: Price,
        image: Imageurl,
    })
    try {
        const newProduct = await product.save();
        res.json({ message: { sucs: "A new product Added" } })
    } catch (err) {
        res.json({ message: { faild: err } })
    }
}
const products = async (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.json({ err: err })
        } else {
            res.json({ products })
        }
    })
}
module.exports = {
    newproduct,
    products
}