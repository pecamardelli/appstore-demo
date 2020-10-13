const { User, Product, Category, Section }      = require('../models/models');
const express	    = require('express');
const { Sequelize } = require('sequelize');

const router	= express.Router();

async function getProduct(req, res, category) {
    try {
        const product     = await Product.findOne({
            where: {
                categoryId:     category.dataValues.id,
                path:           `/store/${req.params.section}/${req.params.category}/${req.params.product}`
            },
            include: [
                {
                    model: User,
                    attributes: [ 'firstname', 'lastname' ]
                },
                {
                    model: Category,
                    attributes: [ 'displayName' ]
                }
            ],
            attributes: [
                'id',
                'displayName',
                'description',
                'price',
                'rating',
                'downloads',
                'createdAt',
                'updatedAt'
            ]
        });
        
        if(!product) {
            res.status(404).send(`Product not found, baby!`);
            return null;
        }
        
        return product;
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
        return null;
    }
}

router.get('/:sectionAlias', async (req, res) => {
    let section;

    try {
        section   = await Section.prototype.findByAlias(req.params.sectionAlias);
        if(!section) return res.status(400).send(`Invalid section alias: ${req.params.sectionAlias}`);
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${req.params.sectionAlias}`);
    }
    
    try {
        const categories    = await Category.prototype.findBySectionId(section.dataValues.id);
        return res.send(categories);
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:sectionAlias/:categoryAlias', async (req, res) => {
    let section;
    try {
        section   = await Section.prototype.findByAlias(req.params.sectionAlias);
        if(!section) return res.status(400).send(`Invalid section alias: ${req.params.sectionAlias}`);
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${req.params.sectionAlias}`);
    }

    let category;
    try {
        category    = await Category.prototype
                        .findByAliasAndSectionId(req.params.categoryAlias, section.dataValues.id);
        if(!category) return res.status(400).send(`Invalid category alias: ${ex}`);
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
    
    try{ 
        const products  = await Product.prototype.findByCategoryId(category.dataValues.id);
        return res.send(products);
    }
    catch (ex) {
        console.log(ex)
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:section/:category/:product', async (req, res) => {
    let section;

    try {
        section   = await Section.prototype.findByAlias(req.params.sectionAlias);
    }
    catch (ex) {
        return res.status(400).send(`Invalid section alias: ${req.params.sectionAlias}`);
    }

    const category  = await getCategory(req, res, section);
    if(!category) return;

    const product      = await getProduct(req, res, category);
    if(product) res.send(product);
});

module.exports	= router;