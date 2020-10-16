const { User, Sale, Product, Category }	= require('../models/models');
const express		= require('express');
const JwtDecode 	= require('jwt-decode');

const router	= express.Router();

router.get('/', async (req, res) => {
	const user	= await User.findById(req.body.id).select('-password');
	res.send(user);
});

router.get('/wishlist', async (req, res) => {
    const user	= JwtDecode(req.header('x-auth-token'));

	const cart	= await Sale.findAll({
		where: {
            userId: user.id,
            status: 'pending'
		},
		include:	{
			model:	Product,
			attributes:	[ 'displayName' ],
			include:	{
				model:	Category,
				attributes:	[ 'displayName' ]
			}
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
		const products	= await Product.findAll({
			where: { authorId: user.id },
			include: [{
				model: Category,
				attributes:	[ 'displayName' ]
			}],
            attributes: [
                'id',
                'displayName',
                'updatedAt'
			]
		});
		return res.send(products);
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
		const items	= await Product.findOne({
			where: { authorId: user.id },
			include: [{
				model: Category,
				attributes:	[ 'displayName' ]
			}],
            attributes: [
                'id',
                'displayName',
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