import http 		from './httpService';

const productsUrl	= '/products';
const storeUrl		= '/store';

export function getProductById(productId = '') {
	return http.get(`${productsUrl}/${productId}`);
}

// In theese cases, we'll use the store endpoint.
export function getProductByPath(path = '') {
	return http.get(`${storeUrl}/${path}`);
}

export function getProductsByCategory(sectionAlias, categoryAlias) {
	return http.get(`${storeUrl}/${sectionAlias}/${categoryAlias}`);
}
// --------------------------------------------- //

export function submitProduct(product) {
	return http.post(productsUrl, product);
}

export function updateProduct(product) {
	return http.put(productsUrl, product);
}