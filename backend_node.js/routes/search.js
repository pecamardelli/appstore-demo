const { Product, Category, Section } = require('../models/models');
const { Sequelize }         = require('../startup/dbConfig');
const express	            = require('express');

const Op		= Sequelize.Op;
const router	= express.Router();

router.post('/', async (req, res) => {
    const products	= await Product.findAll({
        where: {
            [Op.or]:[
            {displayName: {
                [Op.substring]: `${req.body.keywords}`
            }},
            {description: {
                [Op.substring]: `${req.body.keywords}`
            }}]
        },
        include: [{
            model:      Category,
            attributes: [ 'id', 'displayName', 'alias' ],
            include: [{
                model:      Section,
                attributes: [ 'id', 'displayName', 'alias' ]
            }]
        }],
        attributes: [
            'id',
            'displayName',
            'description',
            'price',
            'rating',
            'downloads',
            'alias',
            'createdAt',
            'updatedAt'
        ]
    });

    if(!products) return res.status(404).send('Item not found.');

	res.send(products);
});

module.exports	= router;
