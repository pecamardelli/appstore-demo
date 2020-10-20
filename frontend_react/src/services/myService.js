import http from './httpService';

const meUrl = '/me';

export function getMyProducts() {
	return http.get(`${meUrl}/products`);
}

export function getMyWishlist() {
	return http.get(`${meUrl}/wishlist`);
}

export function getMyPurchases() {
	return http.get(`${meUrl}/purchases`);
}

export function getPurchaseDetail(invoiceId) {
	return http.get(`${meUrl}/purchases/${invoiceId}`);
}

export function submitPurchase(items) {
	return http.post(`${meUrl}/checkout`, items);
}
