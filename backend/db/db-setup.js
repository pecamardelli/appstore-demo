require('dotenv').config();					// Load sensitive values and store them in environment variables.

const mysql			= require('mysql');		// Using MySQL as the relational database.

var query;

if (!process.env.DB_HOST || !process.env.DB_PASSWORD || !process.env.DB_USER || !process.env.DB_PORT) {
	console.log('Not connecting to database: env variables undefined.');
	return;
}

const connection = mysql.createConnection({
 	host:		process.env.DB_HOST,
	port:		process.env.DB_PORT,
 	user:		process.env.DB_USER,
 	password:	process.env.DB_PASSWORD
});

if (!process.env.DB_NAME) {
	console.log('Error: Database name not defined.');
	return;
}

connection.connect((err) => {
	if (err) {
		console.log(`Error: Could not connect to \`${process.env.DB_HOST}\`on port \`${process.evn.DB_PORT}\``, err.message);
		return;
	}
	
	console.log('Successfully connected to database.');
	
	connection.query("CREATE DATABASE IF NOT EXISTS appstore", (err, result) => {
		if (err) {
			console.log("Could not create database", err.message);
			return;
		}		
		console.log(`Database \`${process.env.DB_NAME}\` successfully created:`, result);		
	});
	
	// Create users table
	query	= `CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.users (
		id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		first_name VARCHAR(32) NOT NULL,
		last_name VARCHAR(32) NOT NULL,
		user_bio VARCHAR(1024) NOT NULL,
		user_photo VARCHAR(256),
		username VARCHAR(64) UNIQUE NOT NULL,
		password VARCHAR(128) NOT NULL,
		email VARCHAR(64) NOT NULL,
		role ENUM('client', 'developer'),
		reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`;
	
	connection.query(query, (err, result) => {
		if (err) {
			console.log("Could not create table 'users'", err.message);
			return;
		}		
		console.log("users table successfully created.", result);		
	});
	
	// Populate the users table with some fancy names.
	const first_names	= [ 'Jack', 'John', 'Debbie', 'Lucas', 'Vivian', 'Klaus', 'Mikaela', 'Samar', 'Aram', 'Stella' ];
	const last_names	= [ 'Johnson', 'Dalton', 'Petkov', 'George', 'Foe', 'Meine', 'Pereyra', 'Navabi', 'Mojtabai', 'Artoiz' ];
	const roles			= [ 'developer', 'client' ];
	
	console.log('Populating users table...');
	
	for (let i=0;i<10;i++) {
		query	= `INSERT INTO ${process.env.DB_NAME}.users (
			first_name,
			last_name,
			user_bio,
			user_photo,
			username,
			password,
			email,
			role
		) VALUES (
			'${first_names[i]}',
			'${last_names[i]}',
			"${first_names[i]}\'s bio",
			'default.jpg',
			'${first_names[i]}',
			SHA('12345678'),
			'${first_names[i]}_${last_names[i]}@email.com',
			'${roles[i%2]}'
		)`;
		
		connection.query(query, (err, result) => {
			if (err) {
				console.log("Error populating users table:", err.message);
				return;
			}		
		});
	}
	
	// Create the app categories table
	query	= `CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.app_categories (
		id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		cat_name VARCHAR(32) UNIQUE NOT NULL,
		cat_parent INT(10) UNSIGNED NULL,
		create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`;
	
	connection.query(query, (err, result) => {
		if (err) {
			console.log("Could not create table 'categories'", err.message);
			return;
		}		
		console.log("categories table successfully created:", result);		
	});
	
	// Populate the app categories table
	const categories	= [
		'Video',
		'Art & Design',
		'Travel',
		'Comics',
		'Finance',
		'Games',
		'Social',
		'Food',
		'Sports',
		'Enterteinment',
		'Tools',
		'Books',
		'Business',
		'Weather',
		'Music',
		'Education'
	];
	
	console.log('Populating catefories table...');
	
	for (let i=0;i<10;i++) {
		query	= `INSERT INTO ${process.env.DB_NAME}.app_categories ( cat_name ) VALUES ( '${categories[i]}' )`;
		
		connection.query(query, (err, result) => {
			if (err) {
				console.log("Error populating categories table:", err.message);
				return;
			}		
		});
	}
	
	// Create the apps table
	query	= `CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.apps (
		id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		app_name VARCHAR(32) UNIQUE NOT NULL,
		app_description VARCHAR(256),
		app_logo VARCHAR(256),
		author INT(10) UNSIGNED,
		category INT(10) UNSIGNED,
		price float(10),
		buys INT(10),
		create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`;
	
	connection.query(query, (err, result) => {
		if (err) {
			console.log("Could not create table 'apps'", err.message);
			return;
		}		
		console.log("apps table successfully created:", result);		
	});
	
	// Populate the apps table with some fancy fictional apps.
	
	console.log('Populating apps table...');
	
	for (let i=0;i<10;i++) {
		query	= `INSERT INTO ${process.env.DB_NAME}.apps (
			app_name,
			app_description,
			app_logo,
			author,
			category,
			price,
			buys
		) VALUES (
			'App${i}',
			'App${i} description',
			'default.jpg',
			'${i}',
			'${i}',
			'${Math.floor(Math.random()*1000)/100}',
			'${Math.floor(Math.random()*100000)}'
		)`;
		
		connection.query(query, (err, result) => {
			if (err) {
				console.log("Error populating users table:", err.message);
				return;
			}		
		});
	}
});