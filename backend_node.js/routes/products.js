const { Product, Category, Section }   = require('../models/models');
const express	    = require('express');
const JwtDecode     = require('jwt-decode');
const fs            = require('fs');

const router	= express.Router();
const imageDir  = './assets/images/products';

router.get('/:id', async (req, res) => {
    const product	= await Product.findOne({
        where: { id: req.params.id },
        include: [
            {
                model:      Category,
                attributes: [ 'id', 'displayName' ],
                include: [
                    {
                        model:      Section,
                        attributes: [ 'id', 'displayName' ]
                    }
                ]
            }
        ],
        attributes: [
            'id',
            'displayName',
            'description',
            'price'
        ]
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

    try {
        const result = await Product.create(product);

        // Save the image file received.
        // Remove the header from the base64 data chunk.
        const base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");

        fs.open(`${imageDir}/${result.dataValues.id}.png`, 'w', (err, fd) => {
            if (err) return;

            fs.writeFile(fd, base64Data, "base64", (err) => {
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

router.put('/', async (req, res) => {
    console.log(req.body);
    
    try {
        const result = await Product.update({
            displayName:    req.body.displayName,
            categoryId:     req.body.categoryId,
            description:    req.body.description,
            price:          req.body.price
        },
        {
            where: { id: req.body.id }
        });

        // Save the image file received, if any.
        // Remove the header from the base64 data chunk.
        if (req.body.photo) {
            const base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");
    
            fs.open(`${imageDir}/${req.body.id}.png`, 'w', (err, fd) => {
                if (err) return;
    
                fs.writeFile(fd, base64Data, "base64", (err) => {
                    console.log(err);
                });
            });
        }

		res.send('Product updated!');
	}
	catch (ex) {
		res.status(500).send(ex.errors);
    }
});

module.exports	= router;