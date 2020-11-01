const express	= require('express');
const { Wish }  = require('../models/models');
const JwtDecode = require('jwt-decode');
const authorize	= require('../middleware/mwAuthorize');
const auth		= require('../middleware/mwAuth');

const router	= express.Router();

router.get('/', async (req, res) => {
	res.send('It works!');
});

router.get('/:ProductId', auth, async (req, res) => {
    const sale	= await Wish.findOne({
        where: {
            ProductId:  req.params.ProductId,
            UserId:     req.user.id,
            status:     'pending'
        }
    });

    if(!sale) return res.status(404).send('Sale not found.');

    res.send(sale);
});

router.post('/', auth, async (req, res) => {
    const wish  = { ...req.body, UserId: req.user.id };
    await Wish.create(wish);
    res.send('Wish saved!');
});

router.delete('/:wishId/', auth, async (req, res) => {
    const deleted = await Wish.destroy({
        where:  {
            id:         req.params.wishId,
            UserId:     req.user.id,
            status:     'pending'
        }
    });
    
    if(deleted) return res.send('Product removed from cart!');
    return res.status(404).send('Nothing deleted!');
});

module.exports	= router;