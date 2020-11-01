import http 		from './httpService';

const productsUrl	= '/products';
const storeUrl		= '/store';
const searchUrl		= '/search';

export function getProductById(ProductId = '') {
	return http.get(`${productsUrl}/${ProductId}`);
}

// We'll using POST here because we're sending a string, probably with spaces and other stuff.
export function searchProducts(keywords) {
	return http.post(`${searchUrl}`, { keywords });
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