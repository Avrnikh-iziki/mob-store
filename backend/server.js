const express = require("express");
const db = require('./config/db');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const user = require('./routes/user')
const order = require('./routes/order')
const newproduct = require('./routes/products')
db();
app.use(express.json())
const corsOption = {
    origin: "*",
    Credential: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOption))
app.use('/user', user)
app.use('/', order)
app.use('/', newproduct)
app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})