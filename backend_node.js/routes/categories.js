const express		= require('express');
const { Category }  = require('../models/models');

const router	= express.Router();

router.get('/:sectionId', async (req, res) => {
	console.log(req.body);
	try {
		const categories	= await Category.findAll({
			where:	{ sectionId: req.params.sectionId || true },
			attributes: [ 'displayName', 'id', 'path', 'description' ]
		});
		res.send(categories);
	}
	catch (ex) {
		res.status(500).send(ex.errors[0].message);
	}
});

router.post('/', async (req, res) => {
	// No need to implement validation here.
	// It's already done in the model.
	console.log(req.body)
	try {
		await Category.create(req.body);
		res.send('Category saved!');
	}
	catch (ex) {
		console.log(ex)
		res.status(500).send(ex.errors[0].message);
    }
});

module.exports	= router;