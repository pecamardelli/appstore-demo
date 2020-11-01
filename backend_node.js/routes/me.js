//const { Product, Category, Sale, User }	= require('../models/models');
const Product	= require('../models/product');
const Category	= require('../models/category');
const Sale		= require('../models/sale');
const User		= require('../models/user');
const Wish		= require('../models/wish');
const express	= require('express');
const auth		= require('../middleware/mwAuth');

const router	= express.Router();

router.get('/wishlist', auth, async (req, res) => {
	const cart	= await Wish.findAll({
		where: {
			UserId: req.user.id,
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
	
	return res.send(cart);
});

router.get('/products', auth, async (req, res) => {
	const products	= await Product.findAll({
		where: { UserId: req.user.id },
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
});

router.get('/purchases', auth, async (req, res) => {
	const purchases	= await Sale.findAll({
		where: { UserId: req.user.id },
		include: [{
			model: Wish,
			attributes:	[ 'ProductId', 'salePrice' ],
			include:	[{
				model:	Product,
				attributes:	[ 'displayName' ],
				include:	[{
					model:		Category,
					attributes:	[ 'displayName' ]
				}]
			}]
		}],
		attributes: [
			'id',
			'total',
			'updatedAt'
		]
	});
	return res.send(purchases);
});

router.get('/purchases/:invoiceId', auth, async (req, res) => {
	const details	= await Wish.findAll({
		where: {
			SaleId:	req.params.invoiceId,
			UserId: req.user.id,
		},
		include: [{
			model:	Product,
			attributes:	[ 'id', 'displayName' ],
			include:	[{
				model:		Category,
				attributes:	[ 'displayName' ]
			}]
		}],
		attributes: [
			'salePrice',
			'updatedAt'
		]
	});
	return res.send(details);
});

router.get('/products/:id', auth, async (req, res) => {
	const items	= await Product.findOne({
		where: { UserId: req.user.id },
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
});

router.post('/checkout', auth, async (req, res) => {
	// Create the sale and update the sale total next.
	// We need the sale to be saved in the db to avoid a foreign key constraint error
	// when saving the wishListItem.

	const newSale = await Sale.create({
		UserId: req.user.id,
		total:	0,
		status:	'completed'
	});
	
	// Calculate the sale total manually for validation purposes.
	// We wanna know if all the items passed from the frontend
	// are valid user wishlist items.
	let	saleTotal	= 0;
	for (let wishId of req.body) {
		const wishListItem	= await Wish.findOne({
			where: {
				id:		wishId,
				UserId:	req.user.id,
				status:	'pending'

			}
		});

		if (!wishListItem) return res.status(400).send('Invalid wishlist.');
		saleTotal	+= wishListItem.dataValues.salePrice;
		
		await wishListItem.update({
			status: 'completed',
			SaleId:	newSale.getDataValue('id')
		});
	}

	// We should have the sale total by now.
	newSale.setDataValue('total', saleTotal);
	await newSale.save();

	return res.send('Sale successfully submited!');
});

router.post('/profile', auth, async (req, res) => {
	if (req.body.password && req.body.confirmPassword) {
		const user	= await User.findOne({
			where: { id: req.user.id }
		});
		
		if(!user) return res.status(400).send('Invalid token!');

		user.password	= req.body.password;
		await user.save();
		return res.send('Password successfuly changed.');
	}

	return res.status(400).send('No action performed.');
});

module.exports	= router;