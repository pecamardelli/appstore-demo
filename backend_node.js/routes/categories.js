const express	= require('express');
const Category  = require('../models/modelCategory');

const router	= express.Router();

router.get('/', async (req, res) => {
	const categories	= await Category.findAll();
	res.send(categories);
});

router.post('/', async (req, res) => {
	try {
		await Category.create(req.body);
		res.send('Category saved!');
	}
	catch (ex) {
		console.log(ex)
		res.status(400).send(ex);
    }
});

module.exports	= router;