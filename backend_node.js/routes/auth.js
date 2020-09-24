const { User, generateAuthToken }	= require('../models/modelUser');
const Joi		= require('joi');
const bcrypt	= require('bcryptjs');
const express	= require('express');

const router	= express.Router();

router.post('/', async (req, res) => {
	// Check the validity of the received data. If invalid, return a 400 error.
	const { error }	= validate(req.body);		// Grab the error object.
	if (error) return res.status(400).send(error.details[0].message);
	
	const user	= await User.findOne({ where: { email: req.body.email }})
	//let user	= await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	//const validPassword	= await bcrypt.compare(req.body.password, user.password);
	//if (!validPassword) return res.status(400).send('Invalid email or password.');
	if (req.body.password !== user.password) return res.status(400).send('Invalid password.');

	const token	= generateAuthToken(user.id, user.username, user.role);

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