const express		= require('express');
const Section       = require('../models/modelSection');

const router	= express.Router();

router.get('/', async (req, res) => {
	const sections	= await Section.findAll();
	res.send(sections);
});

router.post('/', async (req, res) => {
	try {
		await Section.create(req.body);
		res.send('Section saved!');
	}
	catch (ex) {
		res.status(400).send(ex.errors[0].message);
    }
});

module.exports	= router;