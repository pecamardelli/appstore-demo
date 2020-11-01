const { Product, Category, Section }   = require('../models/models');
const express	= require('express');
const fs        = require('fs');
const authorize	= require('../middleware/mwAuthorize');
const auth		= require('../middleware/mwAuth');

const router	    = express.Router();
const imageDir      = './assets/images/products';
// Developers and above can post and put products.
const accessLevel   = 4;

router.get('/:id', async (req, res) => {
    const product	= await Product.findOne({
        where: { id: req.params.id },
        include: [{
            model:      Category,
            attributes: [ 'id', 'displayName' ],
            include: [{
                model:      Section,
                attributes: [ 'id', 'displayName' ]
            }]
        }],
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

router.post('/', [auth, authorize(accessLevel)], async (req, res) => {
    // No need to implement validation here.
    // It's already done in the model.
    const product   = { ...req.body, userId: req.user.id };
    delete product.photo;

    const result = await Product.create(product);

    // Save the image file received.
    // Remove the header from the base64 data chunk.
    const base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");

    fs.open(`${imageDir}/${result.dataValues.id}.png`, 'w', (err, fd) => {
        if (err) throw err;

        fs.writeFile(fd, base64Data, "base64", (err) => {
            if (err) throw err;
        });
    });

    res.send('Product saved!');
});

router.put('/', [auth, authorize(accessLevel)], async (req, res) => {
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
            if (err) throw err;

            fs.writeFile(fd, base64Data, "base64", (err) => {
                throw err;
            });
        });
    }

    res.send('Product updated!');
});

module.exports	= router;