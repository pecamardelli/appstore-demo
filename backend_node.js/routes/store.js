const { User, Product, Category, Section }      = require('../models/models');
const express	    = require('express');
const { Sequelize } = require('sequelize');

const router	= express.Router();

async function getSection(req, res) {
    //let section;
    // Let's check if the section parameter is valid
    try {
        const section = await Section.findOne({
            where:      { displayName: req.params.section },
            attributes: [ 'displayName', 'id', 'description' ]
        });
        // Now let's see if the section has been found
        if(!section) {
            res.status(400).send(`Invalid section ${req.params.section}`);
            return null;
        }

        return section;
    }
    catch(ex) {
        // Some nasty thing has happened into the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
        return null;
    }
}

async function getCategories(res, section) {
    try {
        const categories     = await Category.findAll({
            where:      { sectionId: section.dataValues.id },
            attributes: [
                ['displayName', 'displayName'],
                ['id', 'id'],
                ['path', 'path'],
                ['description', 'description'],
                [Sequelize.fn("COUNT", Sequelize.col("products.id")), "total"]
            ],
            include: [
                { 
                    model:      Product,
                    attributes: []
                }
            ],
            group: ['Category.id'] 
        });
        // Now let's see if the section has been found
        if(!categories) {
            res.status(404).send(`No categories found for ${section.dataValues.displayName}`);
            return null;
        }
        
        return categories;
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
        return null;
    }
}

async function getCategory(req, res, section) {
    try {
        category     = await Category.findOne({
            where: {
                sectionId:      section.dataValues.id,
                path:           `/store/${req.params.section}/${req.params.category}`
            },
            attributes: [ 'displayName', 'id', 'path', 'description' ]
        });
        // Now let's see if the section has been found
        if(!category) {
            res.status(400).send(`Invalid category: ${req.params.category}`);
            return null;
        }

        return category;
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        res.status(500).send(`Internal Server Error: ${ex.message}`);
        return null;
    }
}

async function getProducts(res, category) {
    try {
        const products     = await Product.findAll({
            where: {
                categoryId:     category.dataValues.id
            },
            include: [
                {
                    model: User,
                    attributes: [ 'username' ]
                },
                {
                    model: Category,
                    attributes: [ 'displayName' ]
                }
            ],
            attributes: [ 'displayName', 'photo', 'description', 'price', 'rating', 'downloads', 'path' ]
        });
        // Now let's see if the section has been found
        if(!products) return res.status(404).send(`No products found!`);
        else res.send(products);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        return res.status(500).send(`Internal Server Error: ${ex.message}`);
    }
}

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
                'photo',
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

router.get('/:section', async (req, res) => {
    const section   = await getSection(req, res);
    if(!section) return;

    const categories    = await getCategories(res, section);
    if(!categories) return;

    res.send(categories);
});

router.get('/:section/:category', async (req, res) => {
    const section   = await getSection(req, res);
    if(!section) return;

    const category  = await getCategory(req, res, section);
    if(!category) return;

    // Looks like we found the section and the category.
    // Let's find the items corresponding to them.
    await getProducts(res, category);
});

router.get('/:section/:category/:product', async (req, res) => {
    const section   = await getSection(req, res);
    if(!section) return;

    const category  = await getCategory(req, res, section);
    if(!category) return;

    const product      = await getProduct(req, res, category);
    if(product) res.send(product);
});

module.exports	= router;