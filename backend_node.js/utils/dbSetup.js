/*
 *  Database population script
 *  
*/
require('dotenv').config();

//const { Role }  = require('../models/models');
const config    = require('config');

// Load and set environment variables

console.log(config.get('jwtPrivateKey'));
// ---------- Set user roles ---------- //
//Role.bulkCreate([
 //   {}
//])