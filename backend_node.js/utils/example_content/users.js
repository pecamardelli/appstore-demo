const { User }              = require('../../models/models');
const { roles }             = require('./roles');
const getRandomDescription  = require('./dummyText');
const printErrorMessage     = require('./errorMessages');

const users = [
    {
        id:         'baea9bfb-7fee-4186-bb4d-0d57de4ee1fd',
        firstname:  'Pablo',
        lastname:   'Camardelli',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 1).id,
        email:      'pecamardelli@gmail.com',
        username:   'elmaspablin',
        password:   'SuperPassword2020'
    },
    {
        id:         'fe51eb9f-75cf-445d-988d-ab124f214030',
        firstname:  'John',
        lastname:   'Lennon',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 3).id,
        email:      'twist&shout@gmail.com',
        username:   'johnny286',
        password:   'WinstonOno1968'
    },
    {
        id:         'cd9cb188-db83-4106-a4b9-f3d565df0c04',
        firstname:  'Marie',
        lastname:   'Flynn',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 2).id,
        email:      'marie3977@gmail.com',
        username:   'marief',
        password:   'SuperPassword2020'
    },
    {
        id:         '878539c9-bba2-4d39-a7c9-b19f73a1822d',
        firstname:  'Vasily',
        lastname:   'Petrov',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 4).id,
        email:      'vasipet@gmail.com',
        username:   'vasily22',
        password:   'SuperPassword2020'
    },
    {
        id:         '3acb6dc1-19bc-4275-9e23-27ba3825c074',
        firstname:  'Jean',
        lastname:   'Valjean',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 4).id,
        email:      'jeanny53@gmail.com',
        username:   'valjean',
        password:   'StoleBread3277'
    },
    {
        id:         'aaf34065-7c46-4e0f-ae00-22b2341a8e0e',
        firstname:  'Marty',
        lastname:   'McFly',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 2).id,
        email:      'irishguy@gmail.com',
        username:   'eastwood',
        password:   'outtatime1985'
    },
    {
        id:         '74c996ec-3146-4ec4-b7ba-c50b306c20f9',
        firstname:  'Jean Luc',
        lastname:   'Picard',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 3).id,
        email:      'the_capn@gmail.com',
        username:   'captain1701',
        password:   'EnterpriseD1701'
    },
    {
        id:         'b2156e38-9383-4295-a22e-ea48ca8ee329',
        firstname:  'Arnie',
        lastname:   'Cunningham',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 4).id,
        email:      'cuntface1983@gmail.com',
        username:   'arniec',
        password:   'Christine1958'
    },
    {
        id:         'd735cdf6-3dd8-47e6-a779-5533201d5af2',
        firstname:  'Sarah',
        lastname:   'Connor',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 4).id,
        email:      'sarah_connor@gmail.com',
        username:   'live4war',
        password:   'NoFate2029'
    },
    {
        id:         'fd741cf2-6e3d-4814-b8be-0886a3d3112f',
        firstname:  'David',
        lastname:   'Aames',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 4).id,
        email:      'pretty_boy@gmail.com',
        username:   'citizen_dildo',
        password:   'WakeUpMan1997'
    },
    {
        id:         'ebfddf40-2c97-46bb-8268-dfe22d3ab1ce',
        firstname:  'Walter',
        lastname:   'White',
        bio:        getRandomDescription(),
        roleId:     roles.find(r => r.accessLevel === 3).id,
        email:      'heisenberg@gmail.com',
        username:   'heisenberg',
        password:   'IamTheDanger2014'
    }
];

async function setUsers() {
    // ---------- Create Users ---------- //
    try {
        await User.bulkCreate(users);
    }
    catch (ex) {
        printErrorMessage('Creating users:', ex);
    }
}

module.exports.users    = users;
module.exports.setUsers = setUsers;