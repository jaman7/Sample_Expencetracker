import axios from 'axios';

const URL_DB_PATCH = 'expencedata-6763';
const restdbInstance = axios.create({
	baseURL: `https://${URL_DB_PATCH}.restdb.io/rest/`,
	responseType: 'json',
	headers: { 'x-apikey': process.env.RESTDB_API }
});

export default restdbInstance;
