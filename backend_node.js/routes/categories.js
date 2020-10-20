const express	= require('express');
const Category  = require('../models/category');
const authorize	= require('../middleware/mwAccessLevel');
const auth		= require('../middleware/mwAuth');
const fs        = require('fs');

const router		= express.Router();
const imageDir  	= './assets/images/categories';
const accessLevel	= 2;

// There's no need to implement try/catch blocks in here because
// the module express-async-errors along with the error middleware
// will wrap all the routers callback functions in a template function
// that catches any async error that may occur in the route handlers.

router.get('/one/:categoryId', [auth, authorize(accessLevel)], async (req, res) => {
	const category	= await Category.findOne({
		where:	{ id: req.params.categoryId },
		attributes: [ 'displayName', 'id', 'sectionId', 'description' ]
	});
	res.send(category);
});

router.get('/:sectionId', async (req, res) => {
	const categories	= await Category.findAll({
		where:	{ sectionId: req.params.sectionId },
		attributes: [ 'displayName', 'id', 'alias', 'description' ]
	});
	res.send(categories);
});

router.post('/', [auth, authorize(accessLevel)], async (req, res) => {
	await Category.create(req.body);

	if (req.body.photo) {
		// Save the image file received.
		// Remove the header from the base64 data chunk.
		const base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");

		fs.open(`${imageDir}/${result.dataValues.id}.png`, 'w', (err, fd) => {
			if (err) throw err;
			fs.writeFile(fd, base64Data, "base64", (err) => {
				throw err;
			});
		});
	}
	
	res.send('Category saved!');
});

router.put('/', [auth, authorize(accessLevel)], async (req, res) => {
	const result = await Category.update({
		displayName:    req.body.displayName,
		sectionId:     	req.body.sectionId,
		description:    req.body.description
	},
	{
		where: { id: req.body.id }
	});

	if (req.body.photo) {
	// Save the image file received, if any.
	// Remove the header from the base64 data chunk.
		const base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");

		fs.open(`${imageDir}/${req.body.id}.png`, 'w', (err, fd) => {
			if (err) throw err;
			fs.writeFile(fd, base64Data, "base64", (err) => {
				throw err;
			});
		});
	}

	res.send('Category updated!');
});

module.exports	= router;