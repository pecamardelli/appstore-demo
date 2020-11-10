const { Category }          = require('../../models/models');
const getRandomText  = require('./dummyText');
const printErrorMessage     = require('./errorMessages');
const { sections }          = require('./sections');

const categories = [
    {
        id:             '67c93d3d-9f5b-462a-bc43-95bba1582ee6',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Education',
        description:    getRandomText()
    },
    {
        id:             '6aa27eb8-d738-4d6d-bf88-bdbf8186e55e',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Financial',
        description:    getRandomText()
    },
    {
        id:             '7dde6fc9-d5a9-4a5f-a470-71230a27b12c',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Food & Drinks',
        description:    getRandomText()
    },
    {
        id:             '3474cb44-f71b-4a1c-921b-82f57e7a59f3',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Games',
        description:    getRandomText()
    },
    {
        id:             '76f5bb22-1ce7-41ed-b130-d472e5037ad7',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Health & Care',
        description:    getRandomText()
    },
    {
        id:             'f3e2b123-23e2-418c-bda1-faa9c145dc50',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Messaging',
        description:    getRandomText()
    },
    {
        id:             '86c130d7-e98b-4e5a-a5b7-175569ca04b7',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Mobile Payments',
        description:    getRandomText()
    },
    {
        id:             '40428767-2201-4c15-a828-94cb5a20441e',
        SectionId:      sections.find(s => s.displayName === 'Apps').id,
        displayName:    'Social',
        description:    getRandomText()
    },
    {
        id:             '7cf34c2e-7619-4955-940b-e944b2dbb9ba',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Action',
        description:    getRandomText()
    },
    {
        id:             '1c05482f-8a76-4dd0-8219-c65c011e3cd4',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Adventure',
        description:    getRandomText()
    },
    {
        id:             'e011800c-3ab6-4343-bc16-97b9bacf2e64',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Animation',
        description:    getRandomText()
    },
    {
        id:             '1ad276b6-466f-4980-b183-31b4541e0a88',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Comedy',
        description:    getRandomText()
    },
    {
        id:             'd255f625-9d07-414e-8d10-a1e7b912cede',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Crime',
        description:    getRandomText()
    },
    {
        id:             '090415b0-4cc7-40ce-aa9e-e45d5c87a44e',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Drama',
        description:    getRandomText()
    },
    {
        id:             'ea982b6c-ded5-4e38-b53d-b5b18dc8a7c5',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Horror',
        description:    getRandomText()
    },
    {
        id:             '281b383e-376a-41cc-926d-fc45de679304',
        SectionId:      sections.find(s => s.displayName === 'Movies').id,
        displayName:    'Thriller',
        description:    getRandomText()
    },
    {
        id:             'd860482b-c6f3-40fb-8f1a-383f23810899',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Classical',
        description:    getRandomText()
    },
    {
        id:             '0a5e1ece-8183-4f09-9563-a7a0c681e3e6',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Country',
        description:    getRandomText()
    },
    {
        id:             '5a66d81c-228d-425e-8603-1d5fc97ff391',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Heavy Metal',
        description:    getRandomText()
    },
    {
        id:             '2fa71564-8a2d-41e6-a841-d474216bb3a5',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Hip Hop',
        description:    getRandomText()
    },
    {
        id:             '9d95361b-dbe4-4cf8-a4f5-bf32589e02fb',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Jazz',
        description:    getRandomText()
    },
    {
        id:             '4faff506-9c0e-45a1-821a-2c50755d2b3e',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Pop',
        description:    getRandomText()
    },
    {
        id:             '12bf1801-4500-4b4f-bab8-3dd31c79ef91',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Reggae',
        description:    getRandomText()
    },
    {
        id:             '6f48896e-0e34-452b-a81f-0823c5ef8282',
        SectionId:      sections.find(s => s.displayName === 'Music').id,
        displayName:    'Rock',
        description:    getRandomText()
    },
    {
        id:             '0512f161-697f-4975-b2f9-9e8de1b7a0b7',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Business Literature',
        description:    getRandomText()
    },
    {
        id:             '3b3e4cb2-6cbe-4947-95fa-37f4b04cdba3',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Detective',
        description:    getRandomText()
    },
    {
        id:             'fe34d4b8-3ad9-48ae-aadc-a668a7483016',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Fantasy',
        description:    getRandomText()
    },
    {
        id:             '8b88c83a-2147-4da6-8e33-d998b4e79c95',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Historical Fiction',
        description:    getRandomText()
    },
    {
        id:             '8e58bda9-5c59-44f6-814f-eebe3437021c',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Horror',
        description:    getRandomText()
    },
    {
        id:             '955c28b2-7998-4ddd-a532-827c21b836d1',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Poetry',
        description:    getRandomText()
    },
    {
        id:             '001ee76b-7d0e-4532-86d4-339eb51c641b',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Science Fiction',
        description:    getRandomText()
    },
    {
        id:             '2ddec592-e174-4118-837c-4250a17f6d1d',
        SectionId:      sections.find(s => s.displayName === 'Books').id,
        displayName:    'Young Adult',
        description:    getRandomText()
    }
];

async function setCategories() {
    // ---------- Create Categories ---------- //
    try {
        await Category.bulkCreate(categories);
        return true;
    }
    catch (ex) {
        printErrorMessage('Creating categories:', ex);
        return false;
    }
}

module.exports.categories     = categories;
module.exports.setCategories  = setCategories;