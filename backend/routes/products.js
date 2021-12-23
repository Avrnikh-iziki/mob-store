const express = require('express')
const router = express.Router()
const { newproduct, products } = require('../controller/products')

router.post('/newproduct', newproduct);
router.get('/products', products);


module.exports = router