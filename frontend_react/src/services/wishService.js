import http	from './httpService';

const wishesUrl  = '/wishes';

export function getWish(id) {
	return http.get(`${wishesUrl}/${id}`);
}

export function addToCart(wish) {
	return http.post(`${wishesUrl}`, wish);
}

export function removeFromCart(wishId) {
	return http.delete(`${wishesUrl}/${wishId}`);
}