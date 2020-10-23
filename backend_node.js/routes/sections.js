const express		= require('express');
const { Section }   = require('../models/models');
const authorize		= require('../middleware/mwAuthorize');
const auth			= require('../middleware/mwAuth');

const router		= express.Router();
const accessLevel	= 2;

router.get('/', async (req, res) => {
	const sections	= await Section.findAll({
		attributes: [ 'displayName', 'id', 'alias' ]
	});
	res.send(sections);
});

router.post('/', [auth, authorize(accessLevel)], async (req, res) => {
	// No need to implement validation here.
    // It's already done in the model.
	await Section.create(req.body);
	res.send('Section saved!');
});

module.exports	= router;