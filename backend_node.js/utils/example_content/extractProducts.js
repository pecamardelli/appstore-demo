require('dotenv').config();
process.env.NODE_ENV = 'development';
const { Product, Category, Section } = require('../../models/models');
const fs        = require('fs');

async function extract(){
    const extraction	= await Product.findAll({
        include: [{
            model:      Category,
            attributes: [ 'displayName' ],
            include: [{
                model: Section,
                attributes: ['id']
            }]
        }],
        attributes: [
            'id',
            'displayName'
        ]
    });
    
    const header    = `const { Product }           = require('../../models/models');
const getRandomText  = require('./dummyText');
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
        CategoryId:     categories.find(s => s.displayName === "${i.dataValues.Category.displayName}" && s.SectionId === "${i.dataValues.Category.Section.id}").id,
        UserId:       getRandomUser(),
        description:    getRandomText(),
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

function getRandomProduct() {
    return products[Math.floor(products.length * Math.random())].id;
}

module.exports.products     = products;
module.exports.setProducts  = setProducts;
module.exports.getRandomProduct  = getRandomProduct;`;

    const data  = header + array + footer;

    fs.open('./utils/example_content/products.js', 'w', (err, fd) => {
        if (err) throw err;

        fs.writeFile(fd, data, (err) => {
            if (err) throw err;
        });
    });


}

extract();
