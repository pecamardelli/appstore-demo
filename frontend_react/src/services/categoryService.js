import http 		from './httpService';

const categoriesUrl	= '/categories';

export function getCategory(categoryId = true) {
	return http.get(`${categoriesUrl}/one/${categoryId}`);
}

export function getCategories(sectionId = true) {
	return http.get(`${categoriesUrl}/${sectionId}`);
}

export function submitCategory(category) {
	return http.post(categoriesUrl, category);
}

export function updateCategory(category) {
	return http.put(categoriesUrl, category);
}