import Geolocation from './geolocation';

class EventsHelper {
	constructor() {
		this.geolocation = Geolocation;
	}

	getEventsInArea(latitude, longitude, maxDistance) {
		this.geolocation.getDistanceFromPositionToLocation(latitude, longitude).then((distance) => {
			console.log(distance);
		});
	}
}

export default new EventsHelper();