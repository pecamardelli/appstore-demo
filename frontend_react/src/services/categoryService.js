import http 		from './httpService';

export function getCategories(sectionId = '') {
	return http.get(`/categories/${sectionId}`);
}

export function submitCategory(category) {
	return http.post('/categories', category);
}