import http	from './httpService';

const salesUrl  = '/sales';

export function getSale(id) {
	return http.get(`${salesUrl}/${id}`);
}

export function addToCart(sale) {
	return http.post(`${salesUrl}`, sale);
}

export function removeFromCart(saleId) {
	return http.delete(`${salesUrl}/${saleId}`);
}