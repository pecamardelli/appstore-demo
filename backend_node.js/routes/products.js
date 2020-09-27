const express		= require('express');
const Product       = require('../models/modelProduct');

const router	= express.Router();

router.get('/', async (req, res) => {
	const products	= await Product.findAll();
	res.send(products);
});

router.post('/', async (req, res) => {

	try {
		await Product.create(req.body);
		res.send('Product saved!');
	}
	catch (ex) {
		console.log(ex)
		res.status(400).send(ex.errors[0].message);
    }
});

module.exports	= router;