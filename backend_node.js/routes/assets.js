const express		= require('express');
const { Category }  = require('../models/models');

const router	= express.Router();

router.get('/', async (req, res) => {
	const categories	= await Category.findAll({
		attributes: [ 'displayName', 'id', 'endPoint', 'description' ]
	});
	res.send(categories);
});

module.exports	= router;