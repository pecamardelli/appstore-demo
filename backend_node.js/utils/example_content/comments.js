const { Comment } = require('../../models/models');
const getRandomText  = require('./dummyText');
const printErrorMessage = require('./errorMessages');
const { getRandomProduct } = require('./products');
const { getRandomUser } = require('./users');

const comments = []
const quantity = 1000 + Math.round(Math.random()*2000);

for (let i=0;i<quantity;i++) {
    const comment = {
        text:       getRandomText(),
        UserId:     getRandomUser(),
        ProductId:  getRandomProduct()
    };

    if (!comments.find(c => c.UserId === comment.UserId && c.ProductId === comment.ProductId))
        comments.push(comment);
}

async function setComments() {
    // ---------- Create Comments ---------- //
    try {
        await Comment.bulkCreate(comments);
        return true;
    }
    catch (ex) {
        printErrorMessage('Creating comments:', ex);
        return false;
    }
}

module.exports.comments     = comments;
module.exports.setComments  = setComments;