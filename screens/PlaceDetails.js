import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import OutlineButton from '../components/UI/OutlineButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../utils/database';

const PlaceDetails = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [place, setPlace] = useState(null);

	const onViewOnMap = () => {
		navigation.navigate('Map', { lat: place.lat, lon: place.lon });
	};

	useEffect(() => {
		(async () => {
			const fetchedPlace = await fetchPlaceDetails(route.params.id);
			setPlace(fetchedPlace);
			navigation.setOptions({
				title: fetchedPlace.title,
			});
		})();
	}, [route]);

	if (!place) {
		return (
			<View style={styles.fallback}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<Image
				style={styles.image}
				source={{
					uri: place.imageUri,
				}}
			></Image>
			<View>
				<View style={styles.addressContainer}>
					<Text style={styles.addressText}>{place.address}</Text>
				</View>
				<OutlineButton icon={'map'} iconSize={24} onPress={onViewOnMap}>
					View on map
				</OutlineButton>
			</View>
		</ScrollView>
	);
};

export default PlaceDetails;

const styles = StyleSheet.create({
	fallback: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		marginHorizontal: 5,
		marginVertical: 10,
	},
	image: {
		width: '100%',
		height: 200,
		borderRadius: 3,
	},
	addressContainer: {
		margin: 5,
	},
	addressText: {
		color: Colors.primary500,
		textAlign: 'center',
	},
});
