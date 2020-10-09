const express	    = require('express');
const { Product }   = require('../models/models');
const JwtDecode     = require('jwt-decode');

const router	= express.Router();

router.get('/', async (req, res) => {
    const item	= await Product.findOne({
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
    let user;

    try {
        user	= await JwtDecode(req.header('x-auth-token'));
    }
    catch (ex) {
        return res.status(500).send(ex.message);
    }

    const product   = { ...req.body, authorId: user.id };

    console.log(product);

    try {
		await Product.create(product);
		res.send('Product saved!');
	}
	catch (ex) {
		console.log(ex);
		res.status(500).send(ex.errors);
    }
});

module.exports	= router;