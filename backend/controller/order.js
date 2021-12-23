const Order = require('../models/order')
const order = async (req, res) => {
    const { id, Name, item, Email } = req.body
    const clientExist = await Order.findOne({ _id: id })
    if (!clientExist) {
        const order = new Order({
            _id: id,
            Name: Name,
            Email: Email,
            order: item
        })
        try {
            const lastOrder = await order.save();
            res.json({ message: { sucs: "new order", name: Name } })
        } catch (err) {
            res.json({ message: { faild: err } })
        }
    } else {
        Order.findByIdAndUpdate({ _id: id }, { $push: { "order": item } }, (err, docs) => {
            if (err) res.json({ message: { faild: err } })
            res.json({ message: { sucs: "new order", name: Name } })
        })
    }
}
const deletorder = async (req, res) => {
    const { id } = req.body
    Order.findOneAndDelete(id, (err, docs) => {
        if (err) {
            res.json({ message: { faild: err } })
        } else {
            res.json({ message: { id: docs._id } })
        }
    })
}
const orders = async (req, res) => {
    Order.find({}, (err, orders) => {
        if (err) {
            res.json({ err: err })
        } else {
            res.json({ order: orders })
        }
    })
}
module.exports = {
    order,
    deletorder,
    orders
}