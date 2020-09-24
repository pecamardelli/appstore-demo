import http 		from './httpService';

export function submitCategory(category) {
	return http.post('/categories', category);
}