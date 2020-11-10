const { Section }           = require('../../models/models');
const getRandomText  = require('./dummyText');
const printErrorMessage     = require('./errorMessages');

const sections = [
    {
        id:             '5940b2c7-2956-4879-889b-14f17a37cac0',
        displayName:    'Apps',
        description:    getRandomText()
    },
    {
        id:             'aba75ec7-9133-4aa2-a56c-a23f4a4fed11',
        displayName:    'Movies',
        description:    getRandomText()
    },
    {
        id:             'b917ad5d-96d7-470b-9d8e-a0cd3fbfbc26',
        displayName:    'Music',
        description:    getRandomText()
    },
    {
        id:             'ec1a7377-3970-43d4-8556-8417e7a9d3ab',
        displayName:    'Books',
        description:    getRandomText()
    }
];

async function setSections() {
    // ---------- Create Sections ---------- //
    try {
        await Section.bulkCreate(sections);
        return true;
    }
    catch (ex) {
        printErrorMessage('Creating sections:', ex);
        return false;
    }
}

module.exports.sections     = sections;
module.exports.setSections  = setSections;