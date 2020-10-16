const express	= require('express');
const { Sale }  = require('../models/models');
const JwtDecode = require('jwt-decode');

const router	= express.Router();

router.get('/', async (req, res) => {
	res.send('It works!');
});

router.get('/:productId', async (req, res) => {
    let user;
    let sale;

    try {
        user	= await JwtDecode(req.header('x-auth-token'));
    }
    catch (ex) {
        return res.status(400).send(ex.message);
    }
    
    try {
        sale	= await Sale.findOne({
            where: {
                productId:  req.params.productId,
                userId:     user.id,
                status:     'pending'
            }
        });
    }
    catch (ex) {
        console.log(ex);
        return res.status(500).send(ex);
    }

    if(!sale) return res.status(404).send('Sale not found.');

    res.send(sale);
});

router.post('/', async (req, res) => {
    // No need to implement validation here.
    // It's already done in the model.
    let user;
    try {
        user	= await JwtDecode(req.header('x-auth-token'));
    }
    catch (ex) {
        console.log(ex);
        return res.status(500).send('Internal Server Error.');
    }

    const sale  = { ...req.body, userId: user.id };
    try {
		await Sale.create(sale);
		res.send('Sale saved!');
	}
	catch (ex) {
		console.log(ex);
		res.status(500).send('Internal Server Error.');
    }
});

router.delete('/:saleId/', async (req, res) => {
    // No need to implement validation here.
    // It's already done in the model.
    let user;
    try {
        user	= await JwtDecode(req.header('x-auth-token'));
        if(!user) return res.status(400).send('Invalid token.');
    }
    catch (ex) {
        console.log(ex);
        return res.status(500).send('Internal Server Error.');
    }
    
    try {
		const deleted = await Sale.destroy({
            where:  {
                id:         req.params.saleId,
                userId:     user.id,
                status:     'pending'
            }
        });
        if(deleted) return res.send('Product removed from cart!');
        return res.status(404).send('Nothing deleted!');
	}
	catch (ex) {
		console.log(ex);
		res.status(500).send('Internal Server Error.');
    }
});

module.exports	= router;