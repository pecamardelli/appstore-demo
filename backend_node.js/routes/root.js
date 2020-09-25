const express		= require('express');
const Category      = require('../models/modelCategory');
const Product       = require('../models/modelProduct');

const router	= express.Router();

router.get('/:product', async (req, res) => {
    let productId;

    // Let's check if the product parameter is valid
    try {
        productId     = await Product.findOne({ where: { displayName: req.params.product }});
        // Now let's see if the product has been found
        if(!productId) res.status(400).send(`Invalid product ${req.params.product}`);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
    }

    // Ok. We've got a valid product name and ID. Now let's find the categories
	try {
        const categories     = await Category.findAll({
            where: {
                productId:      productId.dataValues.id
            }
        });
        // Now let's see if the product has been found
        if(!categories) res.status(400).send(`No categories found for ${req.params.product}`);
        else res.send(categories);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
    }
});

router.get('/:product/:category', async (req, res) => {
    let productId;

    // Let's check if the product parameter is valid
    try {
        productId     = await Product.findOne({ where: { displayName: req.params.product }});
        // Now let's see if the product has been found
        if(!productId) res.status(400).send(`Invalid product ${req.params.product}`);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
    }

    // Ok. We've got a valid product name and ID. Now let's find the categories
	try {
        const categories     = await Category.findAll({
            where: {
                productId:      productId.dataValues.id,
                displayName:    req.params.category
            }
        });
        // Now let's see if the product has been found
        if(!categories) res.status(400).send(`No categories found for ${req.params.product}`);
        else res.send(categories);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
    }
});

module.exports	= router;