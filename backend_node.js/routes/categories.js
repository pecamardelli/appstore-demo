const express	= require('express');
const Category  = require('../models/modelCategory');
const Product   = require('../models/modelProduct');

const router	= express.Router();

router.get('/', async (req, res) => {
	const products	= await Product.findAll();
	res.send(products);
});

router.post('/', async (req, res) => {

	try {
		await Category.create(req.body);
console.log(req.body)
		res.send('Category successfully submitted!');
	}
	catch (ex) {
		res.status(400).send(ex.message);
    }
});

module.exports	= router;