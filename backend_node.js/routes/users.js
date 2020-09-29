//const	auth		= require('../middleware/middle_auth');
const { User, Role }	= require('../models/models');
//const jwt			= require('jsonwebtoken');
//const config		= require('config');
//const jpc			= require('joi-password-complexity');
//const bcrypt		= require('bcryptjs');
//const _				= require('lodash');
const express		= require('express');
const { Sequelize } = require('../startup/dbConfig');

const router	= express.Router();

const	Op		= Sequelize.Op;

router.get('/me', async (req, res) => {
	const user	= await User.findById(req.body.id).select('-password');
	res.send(user);
});

router.get('/signuproles', async (req, res) => {
	const roles	= await Role.findAll({ where: { accessValue: { [Op.gte]: 4 }}});
	res.send(roles);
});

router.post('/', async (req, res) => {
	//const user	= User.build(req.body);
	User.create(req.body)
		.then(() => {
			const token	= User.prototype.generateAuthToken(this);
			res.send(token);
		})
		.catch(ex => {
			const msg	= (ex.errors[0].type === 'unique violation') ?
				`${ex.errors[0].value} is registered` : ex.errors[0].message;
			res.status(400).send(msg);
		});
	
/*
	try {
		console.log('attempting to save')
		await User.Create(req.body);
		console.log('saved')
		const token	= user.generateAuthToken();
		console.log('token generated')
		//res.header('x-auth-token', token).send('User successfully registered!');
		
	}
	catch (ex) {
		
	}

	
	user.save()
		.then()
		//.catch(({ errors }) => console.log(errors));
		.catch(({ errors }) => {
			
		});
	/*
	let user	= await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('The user is already registered.');
	
	
	const jpc_res	= jpc().validate(req.body.password);
	console.log(jpc_res);
	if (jpc_res.error) return res.status(400).send(jpc_res.error.details[0].message);

	user 			= new User(_.pick(req.body, [ 'name', 'email', 'password' ]));
	const salt		= await bcrypt.genSalt(10);
	user.password	= await bcrypt.hash(user.password, salt);
	
	await user.save();
	const token	= user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, [ '_id', 'name', 'email' ]));
	*/
	//res.send('ok');
});

module.exports	= router;