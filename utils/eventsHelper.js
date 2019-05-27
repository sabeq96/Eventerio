import _ from 'lodash';
import Firebase from './firebase';
import Geolocation from './geolocation';

class EventsHelper {
	constructor() {
		this.geolocation = Geolocation;
		this.firebase = Firebase;
	}

	isEventInArea(event, position, maxDistance) {
		const distance = this.geolocation.countDistanceBetweenCoordinates(position.latitude, position.longitude, event.coordinates.latitude, event.coordinates.longitude);

		return distance <= maxDistance;
	}

	getEventsInArea(maxDistance) {
		return new Promise((resolve, reject) => {
			this.geolocation.getUserPosition().then((position) => {
				this.firebase.getEvents().then((events) => {
					const eventsInArea = [];

					_.forEach(events, (event) => {
						if (event.coordinates) {
							if (this.isEventInArea(event, position, maxDistance)) {
								eventsInArea.push(event);
							}
						}
					});

					resolve(eventsInArea);
				}).catch((error) => {
					reject(error);
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}
}

export default new EventsHelper();