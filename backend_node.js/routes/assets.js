const express		= require('express');
const { Category }  = require('../models/models');
const fs            = require('fs');

const router	= express.Router();

router.get('/', async (req, res) => {
    const image = '1cd60c1f-c89a-4660-b280-ff9ee9e62f81_logo.png';
    fs.readFile(image, function(err, data) {
        if (err) throw err // Fail if the file can't be read.
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data) // Send the file data to the browser.
      });
    /*
	const categories	= await Category.findAll({
		attributes: [ 'displayName', 'id', 'endPoint', 'description' ]
	});
    res.send(categories);
    */
});

module.exports	= router;