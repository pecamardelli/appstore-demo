const { Comment } = require('../../models/models');
const getRandomText  = require('./dummyText');
const printErrorMessage = require('./errorMessages');
const { getRandomProduct } = require('./products_old');
const { getRandomUser } = require('./users');

const comments = []
const quantity = 2000 + Math.round(Math.random()*2000);

for (let i=0;i<quantity;i++) {
    // Random date between now and the past five years.
    randomDate = new Date(Date.now() - Math.round(Math.random()*1000*84600*1875));

    const comment = {
        text:       getRandomText(),
        rating:     1+Math.round(Math.random()*4),
        UserId:     getRandomUser(),
        ProductId:  getRandomProduct(),
        createdAt:  randomDate,
        updatedAt:  randomDate
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