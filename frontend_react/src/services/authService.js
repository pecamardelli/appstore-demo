/*
 *	User authentication services are defined here.
*/

import http			from './httpService';
import jwtDecode	from 'jwt-decode';

// Extracting this key to a constant. Just to clean up the code.
const tokenKey	= 'token';

http.setJwt(getJwt());

// Send the login http request to the backend and store the token.
export async function login({ email, password }) {
	const { data: jwt }	= await http.post('/auth', { email, password });

	localStorage.setItem(tokenKey, jwt);
}

// Perform an automatic login when a new user is registered.
export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

// Decode the jwt and return the user. Otherwise, show the error message.
export function getCurrentUser() {
	try {
		const jwt	= localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	}
	catch (ex) {
		return null;
	}
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export default {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
	getJwt
};