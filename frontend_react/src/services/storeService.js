import http 		from './httpService';

const storeUrl	= '/store';

export function getDataFromStore(sectionAlias, categoryAlias) {
	return http.get(`${storeUrl}/${sectionAlias}/${categoryAlias}`);
}
