require('dotenv').config();
const { Product, Category } = require('../../models/models');
const fs        = require('fs');

async function extract(){
    const extraction	= await Product.findAll({
        include: [{
            model:      Category,
            attributes: [ 'displayName' ]
        }],
        attributes: [
            'id',
            'displayName'
        ]
    });
    
    const header    = `const { Product }           = require('../../models/models');
const getRandomDescription  = require('./dummyText');
const printErrorMessage     = require('./errorMessages');
const { categories }        = require('./categories');
const { getRandomUser }     = require('./users');

function getRandomPrice() {
    // Thirty percent probability to get a free app
    if (Math.random() <= 0.7) return Math.floor(Math.random()*20) + 0.99;
    return 0;
}

`;

    const array = `const products = [${extraction.map(i => (`
    {
        id:             "${i.dataValues.id}",
        displayName:    "${i.dataValues.displayName}",
        categoryId:     categories.find(s => s.displayName === "${i.dataValues.Category.displayName}").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    }`)
)}
];
`;

    const footer    = `
async function setProducts() {
    // ---------- Create Categories ---------- //
    try {
        await Product.bulkCreate(products);
    }
    catch (ex) {
        printErrorMessage('Creating categories:', ex);
    }
}

module.exports.products     = products;
module.exports.setProducts  = setProducts;`;

    const data  = header + array + footer;

    fs.open('./utils/example_content/products.js', 'w', (err, fd) => {
        if (err) throw err;

        fs.writeFile(fd, data, (err) => {
            if (err) throw err;
        });
    });


}

extract();
