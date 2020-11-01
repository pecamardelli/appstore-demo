const { Product }           = require('../../models/models');
const getRandomDescription  = require('./dummyText');
const printErrorMessage     = require('./errorMessages');
const { categories }        = require('./categories');
const { getRandomUser }     = require('./users');

function getRandomPrice() {
    // Thirty percent probability to get a free app
    if (Math.random() <= 0.7) return Math.floor(Math.random()*20) + 0.99;
    return 0;
}

const products = [
    {
        id:             "01938e26-07c8-4b48-ae6e-30cc09a608dc",
        displayName:    "Accounting",
        categoryId:     categories.find(s => s.displayName === "Financial").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "47e12cd1-8e66-4ec9-90fc-9daa063b8ddb",
        displayName:    "Apple Pay",
        categoryId:     categories.find(s => s.displayName === "Mobile Payments").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "603a6924-1c08-4802-842b-6eb497a22648",
        displayName:    "Bit Wallet",
        categoryId:     categories.find(s => s.displayName === "Financial").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "6d7fe04d-20d1-4e57-99bb-846a1be37cf4",
        displayName:    "Bitcoin Wallet",
        categoryId:     categories.find(s => s.displayName === "Mobile Payments").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "cb52c636-dca2-4e9d-aaf6-2e0339b09e2b",
        displayName:    "Cocktail Bar",
        categoryId:     categories.find(s => s.displayName === "Food & Drinks").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "dad4ab7f-d6f4-469e-80d2-91c4db023adc",
        displayName:    "Counter Strike",
        categoryId:     categories.find(s => s.displayName === "Games").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "fd9a6eb3-335b-4236-96cb-09bd31b4f925",
        displayName:    "Delicious",
        categoryId:     categories.find(s => s.displayName === "Food & Drinks").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "d0d01ce5-3071-4919-895e-f19508476994",
        displayName:    "Doom II",
        categoryId:     categories.find(s => s.displayName === "Games").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "804c0bed-d5eb-4781-b479-72a1d290e7eb",
        displayName:    "Electronic Components",
        categoryId:     categories.find(s => s.displayName === "Education").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ede1436f-4b1f-4236-ad20-2eaeea1b437e",
        displayName:    "Facebook",
        categoryId:     categories.find(s => s.displayName === "Social").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "e713d805-6f0e-4c7d-8754-6c5f5846514b",
        displayName:    "Fitness Club",
        categoryId:     categories.find(s => s.displayName === "Health & Care").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "584a8f85-99bc-4ddb-962d-f998193aebe5",
        displayName:    "Instagram",
        categoryId:     categories.find(s => s.displayName === "Social").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "080d1d1c-763f-4936-9621-61acce3069b3",
        displayName:    "Learn Excel",
        categoryId:     categories.find(s => s.displayName === "Education").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "c9fa72da-5ba1-4d9d-ba0d-f9126a384e04",
        displayName:    "Loose Weight",
        categoryId:     categories.find(s => s.displayName === "Health & Care").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "10842203-1a08-48a4-814d-11a4858f843f",
        displayName:    "Mario Kart 64",
        categoryId:     categories.find(s => s.displayName === "Games").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9180b4f9-3b43-4c36-8bba-358e7b8c2df1",
        displayName:    "McDonald's",
        categoryId:     categories.find(s => s.displayName === "Food & Drinks").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ba7e1757-1e9b-4521-8aa8-d808e4be35b2",
        displayName:    "Meditation",
        categoryId:     categories.find(s => s.displayName === "Health & Care").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "0161bf29-2093-4fe1-b69b-042cb4168601",
        displayName:    "MercadoPago",
        categoryId:     categories.find(s => s.displayName === "Mobile Payments").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "86a0a36d-66ce-40af-af4b-6c1a56418b6b",
        displayName:    "Mesa Verde",
        categoryId:     categories.find(s => s.displayName === "Financial").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "94e84821-f062-4014-bac9-5ad7ad0643ee",
        displayName:    "Messenger",
        categoryId:     categories.find(s => s.displayName === "Messaging").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "eb5508a1-f5d5-4fc1-8cfc-cf75b4f6bc89",
        displayName:    "My Budget",
        categoryId:     categories.find(s => s.displayName === "Financial").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5d1b6acf-3124-4f73-bf0b-b6bf7fecce6b",
        displayName:    "PayPal",
        categoryId:     categories.find(s => s.displayName === "Mobile Payments").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "403a13d5-ea9b-43ca-b242-97deb2fe6d8b",
        displayName:    "Resident Evil",
        categoryId:     categories.find(s => s.displayName === "Games").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "895e0466-ff5f-41ee-ac2c-e98e9249dedf",
        displayName:    "Sci-Calc",
        categoryId:     categories.find(s => s.displayName === "Education").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "429a27d0-3062-44ea-89d9-3ad049f951f3",
        displayName:    "Skype",
        categoryId:     categories.find(s => s.displayName === "Messaging").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "53e6162e-5939-4b12-9618-1d90e381ea32",
        displayName:    "Snapchat",
        categoryId:     categories.find(s => s.displayName === "Social").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "5256a5b3-be01-4424-ae5e-604bd332fe7e",
        displayName:    "Speak English",
        categoryId:     categories.find(s => s.displayName === "Education").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "f3ea2060-911c-4bbf-8b68-5cb140921e4c",
        displayName:    "Street Rod",
        categoryId:     categories.find(s => s.displayName === "Games").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "8b2282cf-42b8-4aaf-9f95-6a61d323fc55",
        displayName:    "Tasty!",
        categoryId:     categories.find(s => s.displayName === "Food & Drinks").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "12ae2d52-6a0c-4059-bf42-e0d6f03d906e",
        displayName:    "Telegram",
        categoryId:     categories.find(s => s.displayName === "Messaging").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "ac7445be-e749-42b1-97e3-27c4dd14c3e6",
        displayName:    "Test Drive II - The Duel",
        categoryId:     categories.find(s => s.displayName === "Games").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "85e09c50-0d04-40b3-bcd3-573713ec292a",
        displayName:    "Tik Tok",
        categoryId:     categories.find(s => s.displayName === "Social").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "9c4ffbc7-4e88-478e-8d9f-0e2ee938a9df",
        displayName:    "WhatsApp",
        categoryId:     categories.find(s => s.displayName === "Messaging").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    },
    {
        id:             "2c5e2f15-8d9d-4569-b149-e25c9d8b86c5",
        displayName:    "WorkOut!",
        categoryId:     categories.find(s => s.displayName === "Health & Care").id,
        userId:       getRandomUser(),
        description:    getRandomDescription(),
        price:          getRandomPrice(),
        downloads:      Math.round(Math.random()*1000),
        rating:         Math.round(Math.random()*50)/10

    }
];

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
module.exports.setProducts  = setProducts;