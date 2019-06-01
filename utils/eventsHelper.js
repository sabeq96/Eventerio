import _forEach from 'lodash/forEach';
import Firebase from './firebase';
import Geolocation from './geolocation';

class EventsHelper {
	constructor() {
		this.firebase = Firebase;
		this.geolocation = Geolocation;
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

					_forEach(events, (event) => {
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