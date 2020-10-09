import http 		from './httpService';

const storeUrl	= '/store';

export function getDataFromStore(path) {
	return http.get(`${storeUrl}/${path}`);
}
