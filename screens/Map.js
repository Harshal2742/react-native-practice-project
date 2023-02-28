import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../components/UI/IconButton';

const Map = () => {
	const route = useRoute();
	const initialLocation = route.params && {
		lat: route.params.lat,
		lon: route.params.lon,
	};

	const [selectedLocation, setSelectedLocation] = useState(initialLocation);
	const navigation = useNavigation();

	const region = {
		latitude: initialLocation ? initialLocation.lat : 37.78825,
		longitude: initialLocation ? initialLocation.lon : -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const onSelectHandler = (event) => {

		if(initialLocation){
			return;
		}

		const lat = event.nativeEvent.coordinate.latitude;
		const lon = event.nativeEvent.coordinate.longitude;
		setSelectedLocation({
			lat,
			lon,
		});
	};

	const onSaveSeletedLocation = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert(
				'Location not selected',
				'You have to select location by tapping on map first.'
			);
		} else {
			navigation.navigate('AddPlace', { pickedLocation: selectedLocation });
		}
	}, [navigation, selectedLocation]);

	useLayoutEffect(() => {
		if (initialLocation) {
			return () => {};
		}

		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					color={tintColor}
					size={24}
					name="save"
					onPress={onSaveSeletedLocation}
				/>
			),
		});
	}, [navigation, onSaveSeletedLocation, initialLocation]);

	return (
		<MapView
			style={styles.container}
			initialRegion={region}
			onPress={onSelectHandler}
		>
			{selectedLocation && (
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.lon,
					}}
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
