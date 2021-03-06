const { Product, Category, Section, Comment, User }   = require('../models/models');
const express	= require('express');
const fs        = require('fs');
const authorize	= require('../middleware/mwAuthorize');
const auth		= require('../middleware/mwAuth');
const saveImage = require('../utils/saveImage');

const router	    = express.Router();
const imageDir      = './assets/images/products';
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
            },{
            model:  Comment,
            attributes: ['id', 'text'],
            include: [{
                model:  User,
                attributes: ['id', 'username']
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
    const product   = { ...req.body, UserId: req.user.id };
    delete product.photo;

    const result = await Product.create(product);
    if (req.body.photo) saveImage(req.body.photo, `${imageDir}/${result.dataValues.id}.png`);

    res.send('Product saved!');
});

router.put('/', [auth, authorize(accessLevel)], async (req, res) => {
    const result = await Product.update({
        displayName:    req.body.displayName,
        CategoryId:     req.body.CategoryId,
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