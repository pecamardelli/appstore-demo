import http	from './httpService';

const salesUrl  = '/sales';

export function getSale(id) {
	return http.get(`${salesUrl}/${id}`);
}

export function submitSale(sale) {
	return http.post(`${salesUrl}`, sale);
}