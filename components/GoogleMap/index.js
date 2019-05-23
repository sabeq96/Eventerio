import { GOOGLE_MAPS_API_KEY } from '../../config';

const GoogleMap = ({ latitude, longitude }) => {
	if (latitude && longitude) {
		return (
			<iframe
				src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}`}
				width="100%"
				height="350px"
				frameborder="0"
				style="border:0"
				allowfullscreen
			/>
		);
	}
};

export default GoogleMap;