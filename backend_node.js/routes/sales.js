const express	= require('express');
const { Sale }  = require('../models/models');
const JwtDecode = require('jwt-decode');

const router	= express.Router();

router.get('/', async (req, res) => {
    /*
    const item	= await Sale.findOne({
        where: {
            sectionId:  req.body.sectionId,
            categoryId: req.body.categoryId
        }
    });

    if(!item) return res.status(404).send('Sale not found.');
    */
	res.send('It works!');
});

router.get('/:itemId', async (req, res) => {
    let user;
    let item;

    try {
        user	= await JwtDecode(req.header('x-auth-token'));
    }
    catch (ex) {
        return res.status(400).send(ex.message);
    }
    
    try {
        item	= await Sale.findOne({
            where: {
                itemId: req.params.itemId,
                userId: user.id
            }
        });
    }
    catch (ex) {
        return res.status(500).send(ex);
    }

    if(!item) return res.status(404).send('Sale not found.');

    res.send(item);
});

router.post('/', async (req, res) => {
    // No need to implement validation here.
    // It's already done in the model.

    let user;

    try {
        user	= await JwtDecode(req.header('x-auth-token'));
    }
    catch (ex) {
        return res.status(400).send(ex.message);
    }

    const sale  = { ...req.body, userId: user.id };

    try {
		await Sale.create(sale);
		res.send('Sale saved!');
	}
	catch (ex) {
		console.log(ex);
		res.status(400).send(ex);
    }
});

module.exports	= router;