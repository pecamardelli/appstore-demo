const express		= require('express');
const Section       = require('../models/modelSection');
const Category      = require('../models/modelCategory');
const Item          = require('../models/modelItem');

const router	= express.Router();

router.get('/:section', async (req, res) => {
    let section;
    // Let's check if the section parameter is valid
    try {
        section = await Section.findOne({ where: { displayName: req.params.section }});
        // Now let's see if the section has been found
        if(!section) return res.status(400).send(`Invalid section ${req.params.section}`);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        return res.status(500).send(`Internal Server Error: ${ex.message}`);
    }

    try {
        const categories     = await Category.findAll({ where: { sectionId: section.dataValues.id } });
        // Now let's see if the section has been found
        if(!categories) return res.status(404).send(`No categories found for ${section.dataValues.displayName}`);
        
        res.send(categories);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        return res.status(500).send(`Internal Server Error: ${ex.message}`);
    }
});

router.get('/:section/:category', async (req, res) => {
    let section;
    // Let's check if the section parameter is valid
    try {
        section = await Section.findOne({ where: { displayName: req.params.section }});
        // Now let's see if the section has been found
        if(!section) return res.status(400).send(`Invalid section: ${req.params.section}`);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        return res.status(500).send(`Internal Server Error: ${ex.message}`);
    }

    let category;

    try {
        category     = await Category.findOne({
            where: {
                sectionId:      section.dataValues.id,
                endPoint:       `/store/${req.params.section}/${req.params.category}`
            }
        });
        // Now let's see if the section has been found
        if(!category) return res.status(400).send(`Invalid category: ${req.params.category}`);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        return res.status(500).send(`Internal Server Error: ${ex.message}`);
    }

    // Looks like we found the section and the category.
    // Let's find the items corresponding to them.

    try {
        const items     = await Item.findAll({
            where: {
                sectionId:      section.dataValues.id,
                categoryId:     category.dataValues.id
            }
        });
        // Now let's see if the section has been found
        if(!items) return res.status(404).send(`No sections found!`);
        else res.send(items);
    }
    catch(ex) {
        // Some nasty thing has happened to the MySQL server...
        return res.status(500).send(`Internal Server Error: ${ex.message}`);
    }
});

module.exports	= router;