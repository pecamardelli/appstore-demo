import http 		from './httpService';

const categoriesUrl	= '/categories';

export function getCategories(sectionId = true) {
	return http.get(`${categoriesUrl}/${sectionId}`);
}

export function submitCategory(category) {
	return http.post(categoriesUrl, category);
}