import { useEffect, useState } from 'react';
import PlacesList from '../components/places/PlacesList';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { fetchPlaces } from '../utils/database';

const AllPlaces = () => {
	const route = useRoute();
	const isFocused = useIsFocused();

	const [locationList, setLocationList] = useState([]);

	useEffect(() => {
		(async () => {
			const places = await fetchPlaces();
			setLocationList(places);
		})();
	}, [isFocused]);

	return <PlacesList places={locationList} />;
};

export default AllPlaces;
