const { Wish, Product, Category, Sale }	= require('../models/models');
const express	= require('express');
const auth		= require('../middleware/mwAuth');

const router	= express.Router();

router.get('/wishlist', auth, async (req, res) => {
	const cart	= await Wish.findAll({
		where: {
			userId: req.user.id,
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
		where: { authorId: req.user.id },
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
		where: { userId: req.user.id },
		include: [{
			model: Wish,
			attributes:	[ 'productId', 'salePrice' ],
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
			saleId:	req.params.invoiceId,
			userId: req.user.id,
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
		where: { authorId: req.user.id },
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
	// Build a new sale first in order to get the ID
	// Not using Sale.create here because we need to calculate
	// the sale total before inserting it into the DB.
	const newSale = Sale.build({
		userId: req.user.id,
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
				userId:	req.user.id,
				status:	'pending'

			}
		});

		if (!wishListItem) return res.status(400).send('Invalid wishlist.');
		saleTotal	+= wishListItem.dataValues.salePrice;
		
		await wishListItem.update({
			status: 'completed',
			saleId:	newSale.getDataValue('id')
		});
	}

	// We should have the sale total by now.
	newSale.setDataValue('total', saleTotal);
	await newSale.save();

	return res.send('Sale successfully submited!');
});

module.exports	= router;