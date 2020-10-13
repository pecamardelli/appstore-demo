const { User, Role }	= require('../models/models');
const Joi		= require('joi');
const bcrypt	= require('bcryptjs');
const express	= require('express');

const router	= express.Router();

router.post('/', async (req, res) => {
	// First of all, check the request's validity.
	const { error }	= validate(req.body);		// Grab the error object if any.
	if (error) return res.status(400).send(error.details[0].message);
	
	const { dataValues: user }	= await User.findOne({
		where:		{ email: req.body.email },
		include:	[
			{
				model:		Role,
				attributes:	[ 'accessValue', 'displayName' ]
			}
		],
		attributes:	[
			'id',
			'firstname',
			'lastname',
			'email',
			'password',
			'username'
		]
	});
	
	if (!user) return res.status(400).send('Invalid email or password.');

	const validPassword	= await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');
	//if (req.body.password !== user.password) return res.status(400).send('Invalid password.');

	const token	= User.prototype.generateAuthToken(user);

	//const token	= user.build().generateAuthToken();
	//console.log(user, validPassword, token)
	res.send(token);
});

function validate(req) {
	const schema	= Joi.object({
		email: 		Joi.string().min(5).max(255).required().email(),
		password:	Joi.string().min(8).max(255).required()
	});
	
	return schema.validate(req);
}

module.exports	= router;