import http 		from './httpService';

export function submitProduct(product) {
	return http.post('/products', product);
}