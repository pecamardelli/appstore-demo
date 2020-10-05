import http 		from './httpService';
import userObject	from '../includes/userObject';

const userUrl	= '/users';

export function register(user) {
	const newUser	= {};

	for(const key in userObject) {
		newUser[key] = user[key];
	}

	return http.post(userUrl, newUser);
}

export function getRoles() {
	return http.get(`${userUrl}/signuproles`);
}
