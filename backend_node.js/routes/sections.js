const express		= require('express');
const { Section }   = require('../models/models');

const router	= express.Router();

router.get('/', async (req, res) => {
	const sections	= await Section.findAll({
		attributes: [ 'displayName', 'id' ]
	});
	res.send(sections);
});

router.post('/', async (req, res) => {
	// No need to implement validation here.
    // It's already done in the model.
	try {
		await Section.create(req.body);
		res.send('Section saved!');
	}
	catch (ex) {
		res.status(400).send(ex.errors[0].message);
    }
});

module.exports	= router;