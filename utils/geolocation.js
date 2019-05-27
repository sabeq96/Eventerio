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

	countDistanceBetweenCoordinates(latitude1, longitude1, latitude2, longitude2) {
		const R = 6371; // Radius of the earth in km

		const dLat = this.toRad(latitude2 - latitude1);  // Javascript functions in radians
		const dLon = this.toRad(longitude2 - longitude1);

		const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.toRad(latitude1)) * Math.cos(this.toRad(latitude2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // Distance in km
		
		return d;
	}

	toRad(value) {
		return value * Math.PI / 180;
	}

	getUserPosition() {
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