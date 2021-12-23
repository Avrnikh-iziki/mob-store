const User = require('../models/user')
const { LoginValidation, SigninValidation } = require('../config/hapiJoi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Login = async (req, res) => {
    const { Email, Password } = req.body

    const { error } = LoginValidation({ Email, Password })
    if (error) return res.json({ message: { err: error.details[0].message } })

    const user = await User.findOne({ Email })
    if (!user) return res.json({ message: { err: ' Email or Password is wrong' } })

    const ValidPassword = await bcrypt.compare(Password, user.Password)
    if (!ValidPassword) return res.json({ message: { err: ' Email or Password is wrong' } })
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('Authorization', token).json({ token: token, Name: user.Name, id: user._id, Email: user.Email , admin:user.admin })
}

const Signin = async (req, res) => {
    const { Name, Email, Password } = req.body

    const { error } = SigninValidation({ Name, Email, Password })
    if (error) return res.json({ message: { faild: error.details[0].message } })

    const emailExist = await User.findOne({ Email });
    if (emailExist) return res.json({ message: { faild: 'Email already exists' } })

    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(Password, salt)

    const user = new User({
        Name: Name,
        Email: Email,
        Password: hashPassword,
    })

    try {
        const us = await user.save();
        res.json({ message: { sucs: "A new user Added", user: us._id, name: us.Name } })
    } catch (err) {
        res.json({ message: { faild: err } })
    }
}

module.exports = {
    Login,
    Signin
}