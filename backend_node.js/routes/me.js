const { User, Wish, Product, Category, Sale }	= require('../models/models');
const express		= require('express');
const JwtDecode 	= require('jwt-decode');

const router	= express.Router();

router.get('/', async (req, res) => {
	const user	= await User.findById(req.body.id).select('-password');
	res.send(user);
});

router.get('/wishlist', async (req, res) => {
    const user	= JwtDecode(req.header('x-auth-token'));

	const cart	= await Wish.findAll({
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

router.post('/checkout', async (req, res) => {
    let user;
    try {
        user	= await JwtDecode(req.header('x-auth-token'));
        if(!user) return res.status(400).send('Invalid token.');
    }
    catch (ex) {
        console.log(ex);
        return res.status(500).send('Internal Server Error.');
	}

	// Build a new sale first in order to get the ID
	// Not using Sale.create here because we need to calculate
	// the sale total before inserting it into the DB.
	const newSale = Sale.build({
		userId: user.id,
		total:	0,
		status:	'completed'
	});
	
	// Calculate the sale total manually for validation purposes.
	// We wanna know if all the items passed from the frontend
	// are valid user wishlist items.
	let	saleTotal	= 0;
	for (let wishId of req.body) {
		try {
			const wishListItem	= await Wish.findOne({
				where: {
					id:		wishId,
					userId:	user.id,
					status:	'pending'

				}
			});

			if (!wishListItem) return res.status(400).send('Invalid wishlist.');
			saleTotal	+= wishListItem.dataValues.salePrice;
			
			try {
				await wishListItem.update({
					status: 'completed',
					saleId:	newSale.getDataValue('id')
				});
			}
			catch (ex) {
				console.log(ex);
				return res.status(500).send('Internal Server Error.');
			}
		}
		catch (ex) {
			console.log(ex);
			return res.status(500).send('Internal Server Error.');
		}
	}

	// We should have the sale total by now.
	newSale.setDataValue('total', saleTotal);
	try {
		await newSale.save();
	}
	catch (ex) {
		console.log(ex);
		return res.status(500).send('Internal Server Error.');
	}

	res.send('Sale successfully submited!');
});

module.exports	= router;