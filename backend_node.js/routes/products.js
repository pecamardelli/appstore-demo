const express		= require('express');
const Product       = require('../models/modelProduct');

const router	= express.Router();

router.get('/', async (req, res) => {
	const products	= await Product.findAll();
	res.send(products);
});

module.exports	= router;