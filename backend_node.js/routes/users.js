const { User, Role }	= require('../models/models');
const { Sequelize } 	= require('../startup/dbConfig');
const express			= require('express');
const fs            	= require('fs');

const router	= express.Router();
const Op		= Sequelize.Op;
const avatarDir	= './assets/images/users/avatar';

router.get('/signuproles', async (req, res) => {
	const roles	= await Role.findAll({
		where: {
			accessLevel: {
				[Op.gte]: 4
			}
		},
		attributes:	[ 'id', 'displayName', 'accessLevel' ]
	});
	res.send(roles);
});

router.post('/', async (req, res) => {
	// First, check if the roleId is valid.
	const role	= await Role.findOne({
		where: { id: req.body.roleId },
		attributes:	[ 'displayName', 'accessLevel' ]
	})

	// Since we are registering a new user, it's a good idea to check
	// if the roleId passed in the body corresponds to a developer or a client.
	if (role.dataValues.accessLevel < 4) return res.status(400).send('Invalid role!');
	
	// We're gonna override the exception handling implemented by express-async-errors.
	// We wanna send a custom message.
	let user;
	try {
		user	= await User.create(req.body);
	}
	catch (ex) {
		const msg	= (ex.errors[0].type === 'unique violation') ?
		`${ex.errors[0].value} is registered` : ex.errors[0].message;
		return res.status(400).send(msg);
	}
	
	if (req.body.photo) {
		// Save the image file received.
		// Remove the header from the base64 data chunk.
		const base64Data = req.body.photo.replace(/^data:image\/png;base64,/,"");
		
		fs.open(`${avatarDir}/${user.dataValues.id}.png`, 'w', (err, fd) => {
			if (err) throw err;
			
			fs.writeFile(fd, base64Data, "base64", (err) => {
				throw err;
			});
		});
	}

	user.Role	= role;
	return res.send(User.prototype.generateAuthToken(user));
});

module.exports	= router;