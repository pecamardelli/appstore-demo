import http 		from './httpService';

const storeUrl	= '/store';

export function getCategoryItems(path) {
	return http.get(`${storeUrl}/${path}`);
}
