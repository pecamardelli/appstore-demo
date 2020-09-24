import http 		from './httpService';
import userObject	from '../includes/userObject';

export function register(user) {
	const newUser	= {};

	for(const prop in userObject) {
		newUser[prop] = user[prop];
	}

	return http.post('/users', newUser);
}

export function getRoles() {
	return http.get('/users/signuproles');
}