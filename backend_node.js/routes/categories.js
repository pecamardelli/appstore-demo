const express	= require('express');
const Category  = require('../models/modelCategory');
const Product   = require('../models/modelProduct');

const router	= express.Router();

router.get('/', async (req, res) => {
	const categories	= await Category.findAll();
	res.send(categories);
});

router.post('/', async (req, res) => {

	try {
		await Category.create(req.body);
		res.send('Category successfully submitted!');
	}
	catch (ex) {
		res.status(400).send(ex.message);
    }
});

module.exports	= router;