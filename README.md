# App Store

This is my first work as a full stack javaScript developer. It originally was a challenge that I took from a software factory and it seemed a good project to start with.

Well, here it is. Theese are the main features:

- RESTful API.
- Backend developed using [Node.js](https://nodejs.org/en/) and [Express.js](http://expressjs.com/en/) as the `http` framework.
- Data is stored in a relational database. I preferred to use the old and trusty [MySQL](https://www.mysql.com/).
- Frontend developed using [React.js](https://reactjs.org/)

## Backend Installation

##### Installing dependencies <hr>

Go to the backend folder and run the following command:

```sh
$ npm i
```

All dependency references are stored in the `package.json` file, so `npm` should know what to do.

##### Setting up environment variables <hr>

Create the `.env` file at the root of the project. This file is gitignored, so sensitive variables can be declared here.

This file should look like this:

```js
// Jason Web Token Private Key
APP_STORE_JWT_PRIV_KEY=yourjwtprivatekey

// Database variables
DB_USER=yourmysqluser
DB_PASSWORD=yourmysqlpassword

// Debug messages.
DEBUG=app:startup,app:db

// Environment: development,production,testing,etc...
NODE_ENV=development
```

##### Database Setup <hr>

If you need to install MySQL server on your machine, check [this reference](https://dev.mysql.com/doc/refman/8.0/en/installing.html). If you have a remote host, put tje information in the `.env` file.

Once MySQL is installed and accessible, create the database and a user and reflect this data with your `.env` file.

The app will load example content automatically at the first run, so make sure you have access and permissions to the database and everything will be set up magically.

## Frontend Installation

Same as with the backend, head over the frontend folder and run

```sh
$ npm i
```

Once all packages are downloaded and installed, you can run `npm start` and the app will be ready to use.