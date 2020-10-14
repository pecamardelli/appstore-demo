const { Product, Category } = require('../models/models');
const express	            = require('express');

const router	= express.Router();

router.get('/:sectionAlias', async (req, res) => {
    try {
        const categories    = await Category.prototype.findBySectionAlias(req.params.sectionAlias);
        if (!categories) return res.status(404).send('No categories found.');
        return res.send(categories);
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:sectionAlias/:categoryAlias', async (req, res) => {
    try{ 
        const products  = await Product.prototype.findAllByPath(
            req.params.sectionAlias,
            req.params.categoryAlias
        );

        if (!products) return res.status(404).send('No products found.');
        return res.send(products);
    }
    catch (ex) {
        console.log(ex)
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:sectionAlias/:categoryAlias/:productAlias', async (req, res) => {
    try {
        const product      = await Product.prototype.findOneByPath(
            req.params.sectionAlias,
            req.params.categoryAlias,
            req.params.productAlias
        );
        if(product) return res.send(product);
        return res.status(404).send('Product not found.');
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports	= router;