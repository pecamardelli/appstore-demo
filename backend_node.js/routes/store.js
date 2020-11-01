const { Product, Category } = require('../models/models');
const express	            = require('express');
const config                = require('config');
const setExampleContent     = require('../utils/exampleContent');

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

router.post('/loadcontent', async (req, res) => {
	if (req.body.password && req.body.password === config.get('db_password')) {
        await setExampleContent();
        return res.send('Done...');
	}

	return res.status(400).send('No action performed.');
});

module.exports	= router;