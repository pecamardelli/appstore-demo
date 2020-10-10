const express	    = require('express');
const { Product }   = require('../models/models');
const JwtDecode     = require('jwt-decode');
const fs            = require('fs');

const router	= express.Router();
const imageDir  = './assets/items';

router.get('/', async (req, res) => {
    const product	= await Product.findOne({
        where: {
            sectionId:  req.body.sectionId,
            categoryId: req.body.categoryId
        }
    });

    if(!product) return res.status(404).send('Item not found.');

	res.send(product);
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
    delete product.photo;
    console.log(product);

    try {
        const result = await Product.create(product);

        // Save the image file received.
        // Remove the header from the encoded data chunk.
        // Then, decode it.
        let base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");
        //let binaryData = Buffer.from(base64Data, 'base64').toString('binary');

        fs.open(`${imageDir}/${result.dataValues.id}_logo.png`, 'wx', (err, fd) => {
            fs.writeFile(`${imageDir}/${result.dataValues.id}_logo.png`, base64Data, "base64", (err) => {
                console.log(err);
            });
        });

		res.send('Product saved!');
	}
	catch (ex) {
		console.log(ex);
		res.status(500).send(ex.errors);
    }
});

module.exports	= router;