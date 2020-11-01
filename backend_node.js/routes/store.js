const { Product, Category } = require('../models/models');
const express	            = require('express');

const router	= express.Router();

router.get('/:sectionAlias', async (req, res) => {
    const categories    = await Category.prototype.findBySectionAlias(req.params.sectionAlias);
    if (!categories) return res.status(404).send('No categories found.');
    return res.send(categories);
});

router.get('/:sectionAlias/:categoryAlias', async (req, res) => {
    const products  = await Product.prototype.findAllByPath(
        req.params.sectionAlias,
        req.params.categoryAlias
    );

    if (!products) return res.status(404).send('No products found.');
    return res.send(products);
});

router.get('/:sectionAlias/:categoryAlias/:productAlias', async (req, res) => {
    const product      = await Product.prototype.findOneByPath(
        req.params.sectionAlias,
        req.params.categoryAlias,
        req.params.productAlias
    );
    if(product) return res.send(product);
    return res.status(404).send('Product not found.');
});

module.exports	= router;