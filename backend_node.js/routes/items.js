const express	= require('express');
const { Item }      = require('../models/models');

const router	= express.Router();

router.get('/', async (req, res) => {
    const item	= await Item.findOne({
        where: {
            sectionId:  req.body.sectionId,
            categoryId: req.body.categoryId
        }
    });

    if(!item) return res.status(404).send('Item not found.');

	res.send(item);
});

router.post('/', async (req, res) => {
    // No need to implement validation here.
    // It's already done in the model.
    try {
		await Item.create(req.body);
		res.send('Item saved!');
	}
	catch (ex) {
		console.log(ex);
		res.status(400).send(ex);
    }
});

module.exports	= router;