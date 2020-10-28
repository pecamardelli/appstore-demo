const { Role }          = require('../../models/models');
const printErrorMessage = require('./errorMessages');

const roles = [
    {
        id:          '619ee640-3d3a-4fc7-8927-56583255f60a',
        displayName: 'Site Owner',
        accessLevel: 1
    },
    {
        id:          '0283257f-f85f-426b-88b8-ed830a30604d',
        displayName: 'Administrator',
        accessLevel: 2
    },
    {
        id:          'f86d2e87-7db4-44dc-a69c-9c20286da68a',
        displayName: 'Manager',
        accessLevel: 3
    },
    {
        id:          '1bd36c19-84bf-4337-bba6-9525667eab11',
        displayName: 'Developer',
        accessLevel: 4
    },
    {
        id:          '9034d4c9-07e1-4978-9380-0fae463f4a48',
        displayName: 'Client',
        accessLevel: 5
    }
];

async function setRoles() {
    // ---------- Set user roles ---------- //
    try {
        await Role.bulkCreate(roles);
    }
    catch (ex) {
        printErrorMessage('Creating roles:', ex);
    }
}

module.exports.roles    = roles;
module.exports.setRoles = setRoles;