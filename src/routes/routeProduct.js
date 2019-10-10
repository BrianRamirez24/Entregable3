const express = require('express');
const bcryst = require('bcryptjs');
const path = require('path');
const router = express.Router();
 const {createProduct,
        updateProduct,
        listProducts,
        destroyProduct,
        fiterProduct} = require('../controller/apicontroller/apiproductcontroller');

router.router('/api/product')
.get(listProducts)
.post(createProduct)

router.router('/api/product/:id')
.put(updateProduct)
.delete(destroyProduct)


router.route('/api/product/fiter')
.get(fiterProduct)




module.exports = router;