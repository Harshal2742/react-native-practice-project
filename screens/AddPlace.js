import PlaceForm from '../components/places/PlaceForm';
import { useNavigation } from '@react-navigation/native';
import { insertPlace } from '../utils/database';

const AddPlace = () => {
	const navigation = useNavigation();

	const onCreatePlace = async (place) => {
		await insertPlace(place);
		navigation.navigate('AllPlaces', {
			place,
		});
	};

	return <PlaceForm onCreatePlace={onCreatePlace} />;
};

export default AddPlace;
