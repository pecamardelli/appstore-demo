# App Store

This is my first work as a full stack javaScript developer. It originally was a challenge that I took from a software factory and it seemed to me a good project to start with.

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

### Setting up environment variables <hr>

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

// Environment: development,production,test,sandbox...
NODE_ENV=development
```

##### Database Setup <hr>

If you need to install MySQL server on your machine, check [this reference](https://dev.mysql.com/doc/refman/8.0/en/installing.html). If you have a remote host, then put all the data in the `.env` file.

Once MySQL is installed and accessible, create the database and a user and reflect this data with your `.env` file and config files.

The app will load example content automatically at the first run, so make sure you have access and permissions to the database and everything will be set up magically. It will check if the tables are empty and it will populate them if that's the case and do nothing otherwise.

## Frontend Installation

Same as the backend, head over the frontend folder and run

```sh
$ npm i
```

Once all packages are downloaded and installed, you can run `npm start` and the app will be ready to use.

## Usage

You can navigate across the site without logging in, but in order to do some persistent stuff, you need to create a user an log in.

### Things that you can do

There are two default roles available when registering: `developer` and `client`.

- `Clients` can add stuff to their wishlist and purchase them.
- `Developers` can also create and publish new products.

Other roles are `manager`, `administrator` and `site owner` but they are not available to all users.

The `Site Owner` has all access and permissions.