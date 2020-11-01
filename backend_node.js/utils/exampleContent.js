/*
*  Database population script
*  
*/

// Load and set environment variables
require('dotenv').config();
process.env.NODE_ENV    = 'development';
const { setRoles }      = require('./example_content/roles');
const { setUsers }      = require('./example_content/users');
const { setSections }   = require('./example_content/sections');
const { setCategories } = require('./example_content/categories');
const { setProducts }   = require('./example_content/products');

// Wrapping all this code into an async function. Sequelize works asynchronously and
// we need to create all the stuff step by step.
async function setExampleContent() {
    await setRoles();
    await setUsers();
    await setSections();
    await setCategories();
    await setProducts();
}

module.exports  = setExampleContent;