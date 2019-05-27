import axios from 'axios';
import { GOOGLE_MAPS_API_KEY, GOOGLE_GEOLOCATION_URL } from '../config';

class Geolocation {
	constructor() {
		this.apiKey = GOOGLE_MAPS_API_KEY;
		this.geolocationBaseUrl = GOOGLE_GEOLOCATION_URL;
	}

	getCoordinates(address) {
		const url = `${this.geolocationBaseUrl}?address=${address}&key=${this.apiKey}`;

		return axios.get(url).then((response) => (
			Promise.resolve({
				latitude: response.data.results[0].geometry.location.lat,
				longitude: response.data.results[0].geometry.location.lng
			})
		)).catch((error) => (
			Promise.reject({ message: error.message })
		));
	}

	getUserLocation() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((position) => {
				resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
			}, (error) => {
				reject(error);
			});
		});
	}
}

export default new Geolocation();