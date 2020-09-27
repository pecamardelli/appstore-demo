import http	from './httpService';

export function getSections() {
	return http.get('/sections');
}

export function submitSection(sections) {
	return http.post('/sections', sections);
}
