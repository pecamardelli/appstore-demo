const { User, Sale, Item, Category }	= require('../models/models');
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

router.get('/products', async (req, res) => {
	let user;

	try {
		user	= JwtDecode(req.header('x-auth-token'));
	}
	catch (ex) {
		return res.status(400).send(ex);
	}

	try {
		const items	= await Item.findAll({
			where: { authorId: user.id },
			include: [{
				model: Category,
				attributes:	[ 'displayName' ]
			}],
            attributes: [
                'id',
                'displayName',
                'photo',
                'updatedAt'
			]
		});
		return res.send(items);
	}
	catch (ex) {
		return res.status(500).send(`Internal server error: ${ex}`);
	}

});

router.get('/products/:id', async (req, res) => {
	let user;

	try {
		user	= JwtDecode(req.header('x-auth-token'));
	}
	catch (ex) {
		return res.status(400).send(ex);
	}

	try {
		const items	= await Item.findOne({
			where: { authorId: user.id },
			include: [{
				model: Category,
				attributes:	[ 'displayName' ]
			}],
            attributes: [
                'id',
                'displayName',
                'photo',
                'updatedAt'
			]
		});
		return res.send(items);
	}
	catch (ex) {
		return res.status(500).send(`Internal server error: ${ex}`);
	}
});

module.exports	= router;