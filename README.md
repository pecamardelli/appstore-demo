# App Store

A Google Play like app store.
- RESTful API.
- Backend developed using [Node.js](https://nodejs.org/en/) and [Express.js](http://expressjs.com/en/) as the `http` framework.
- All the data is stored in a relational database. I preferred to use the old and trusty [MySQL](https://www.mysql.com/).
- Frontend developed using [React.js](https://reactjs.org/)

## Backend Installation

##### Installing dependencies <hr>

In order to install all of them, move to the backend folder and run the following command:

```sh
$ npm i
```

All dependency references are stored in the `package.json` file, so `npm` should know what to do.

##### Setting up environment variables <hr>

Now create the `.env` file at the root of the project. This file is gitignored, so sensitive variables can be declared here.

This file should look like this:

```js
// Database variables
DB_HOST=yourmysqlhost
DB_PORT=yourmysqlport
DB_USER=yourmysqluser
DB_PASSWORD=yourmysqlpassword
DB_NAME=yourdbname

// Debug messages.
DEBUG=app:startup,app:db

// Environment: development,production,testing,etc...
NODE_ENV=development
```

##### Database Setup <hr>

If you need to install MySQL server on your machine, check [this reference](https://dev.mysql.com/doc/refman/8.0/en/installing.html). If you have a remote host, provide all information in the `.env` file.

Once MySQL is installed and accessible, create the database and a user and reflect this data with your `.env` file.

To be continued...
