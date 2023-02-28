import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import Place from './Place';

const PlacesList = ({ places }) => {
	const navigation = useNavigation();

	const onSelectedPlace = (id) => {
		navigation.navigate('PlaceDetails', {
			id,
		});
	};

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallBackContainer}>
				<Text style={styles.fallBackText}>Not added places yet</Text>
			</View>
		);
	}

	return (
		<FlatList
			style={styles.list}
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Place place={item} onPress={onSelectedPlace} />
			)}
		/>
	);
};

export default PlacesList;

const styles = StyleSheet.create({
	list: {
		marginVertical: 10,
	},
	fallBackContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fallBackText: {
		color: Colors.primary200,
	},
});
