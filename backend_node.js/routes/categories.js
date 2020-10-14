const express		= require('express');
const Category   	= require('../models/category');
const fs            = require('fs');

const router	= express.Router();
const imageDir  = './assets/images/categories';

router.get('/one/:categoryId', async (req, res) => {
	try {
		const category	= await Category.findOne({
			where:	{ id: req.params.categoryId },
			attributes: [ 'displayName', 'id', 'sectionId', 'description' ]
		});
		res.send(category);
	}
	catch (ex) {
		res.status(500).send(ex.errors[0].message);
	}
});

router.get('/:sectionId', async (req, res) => {
	try {
		const categories	= await Category.findAll({
			where:	{ sectionId: req.params.sectionId },
			attributes: [ 'displayName', 'id', 'alias', 'description' ]
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
	let result;

	try {
		result = await Category.create(req.body);
	}
	catch (ex) {
		console.log(ex)
		return res.status(400).send(ex.errors[0].message);
	}

	if (req.body.photo) {
		try {
			// Save the image file received.
			// Remove the header from the base64 data chunk.
			const base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");

			fs.open(`${imageDir}/${result.dataValues.id}.png`, 'w', (err, fd) => {
				if (err) throw err;

				fs.writeFile(fd, base64Data, "base64", (err) => {
					console.log(err);
				});
			});
		}
		catch (ex) {
			return res.status(500).send(ex.errors[0].message);
		}
	}
	
	res.send('Category saved!');
});

router.put('/', async (req, res) => {
    console.log(req.body);
    
    try {
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
                if (err) return;
    
                fs.writeFile(fd, base64Data, "base64", (err) => {
                    console.log(err);
                });
            });
        }

		res.send('Category updated!');
	}
	catch (ex) {
		console.log(ex);
		res.status(500).send(ex.errors);
    }
});

module.exports	= router;