import http from './httpService';

const meUrl = '/me';

export function getMyProducts() {
	return http.get(`${meUrl}/products`);
}

export function getMyWishlist() {
	return http.get(`${meUrl}/wishlist`);
}

export function submitPurchase(items) {
	return http.post(`${meUrl}/checkout`, items);
}
