const express = require('express')
const router = express.Router()
const { order, deletorder ,orders } = require('../controller/order')

router.post('/neworder', order);
router.post('/delet', deletorder);
router.get('/orders', orders);

module.exports = router