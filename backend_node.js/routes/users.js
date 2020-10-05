const { User, Role, Sale }	= require('../models/models');
const { Sequelize } = require('../startup/dbConfig');
const express		= require('express');

const router	= express.Router();
const Op		= Sequelize.Op;

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
});

module.exports	= router;