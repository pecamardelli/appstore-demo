import http	from './httpService';

export function getProducts() {
	return http.get('/products');
}

export function submitProduct(product) {
	return http.post('/products', product);
}
