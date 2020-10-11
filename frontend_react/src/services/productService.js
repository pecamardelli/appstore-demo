import http 		from './httpService';

const productsUrl	= '/products';

export function getProduct(productId = '') {
	return http.get(`${productsUrl}/${productId}`);
}

export function submitProduct(product) {
	return http.post(productsUrl, product);
}

export function updateProduct(product) {
	return http.put(productsUrl, product);
}