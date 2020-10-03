const { User, Sale }	= require('../models/models');
const express		= require('express');
const JwtDecode 	= require('jwt-decode');

const router	= express.Router();

router.get('/', async (req, res) => {
	const user	= await User.findById(req.body.id).select('-password');
	res.send(user);
});

router.get('/cart', async (req, res) => {
    const user	= JwtDecode(req.header('x-auth-token'));

	const cart	= await Sale.findAll({
		where: {
            userId: user.id,
            status: 'pending'
        }
	});

	res.send(cart);
});

module.exports	= router;