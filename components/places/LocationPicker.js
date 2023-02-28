import { StyleSheet, View, Alert, Image } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from 'expo-location';
import { getAddress, getMapUri } from '../../utils/getMap';
import { useEffect, useState } from 'react';
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from '@react-navigation/native';

const LocationPicker = ({ onLocationPick }) => {
	const [locationPermissionInfromation, requestPermission] =
		useForegroundPermissions();
	const [latlong, setLatLong] = useState({ lat: null, lon: null });
	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused && route.params) {
			setLatLong(route.params.pickedLocation);
		}
	}, [isFocused, route]);

	useEffect(() => {
		(async () => {
			if (latlong.lat && latlong.lon) {
				const address = await getAddress(latlong.lon, latlong.lat);
				onLocationPick({ ...latlong, address });
			}
		})();
	}, [latlong, onLocationPick]);

	const verifyPermission = async () => {
		if (
			locationPermissionInfromation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInfromation.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficent Permissions!',
				'You need to grant camera permission in order to use this app'
			);

			return false;
		}

		// granter permission
		return true;
	};

	const getLocationHandler = async () => {
		const hasPersmission = await verifyPermission();

		if (!hasPersmission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		setLatLong({
			lat: location.coords.latitude,
			lon: location.coords.longitude,
		});
	};

	const pickOnMapHandler = () => {
		navigation.navigate('Map');
	};

	return (
		<View>
			<View style={styles.locationPreview}>
				<Image
					style={styles.mapPreview}
					source={{ uri: getMapUri(latlong.lon, latlong.lat) }}
				/>
			</View>
			<View style={styles.buttonCotainer}>
				<OutlineButton
					icon={'map-marker'}
					iconSize={24}
					onPress={getLocationHandler}
				>
					Locate User
				</OutlineButton>
				<OutlineButton icon={'map'} iconSize={24} onPress={pickOnMapHandler}>
					Pick on Map
				</OutlineButton>
			</View>
		</View>
	);
};

export default LocationPicker;

const styles = StyleSheet.create({
	locationPreview: {
		width: '100%',
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
		backgroundColor: Colors.primary100,
		borderRadius: 8,
		overflow: 'hidden',
	},
	buttonCotainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	mapPreview: {
		width: '100%',
		height: 200,
	},
});
