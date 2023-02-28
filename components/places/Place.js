import { Pressable, View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

const Place = ({ place, onPress }) => {
	return (
		<Pressable
			onPress={onPress.bind(this, place.id)}
			style={({ pressed }) => [styles.container, pressed && styles.onPress]}
		>
			<Image style={styles.image} source={{ uri: place.imageUri }} />
			<View style={styles.titleAddressContainer}>
				<Text style={styles.title}>{place.title}</Text>
				<Text style={styles.address}>{place.address}</Text>
			</View>
		</Pressable>
	);
};

export default Place;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: Colors.primary400,
		marginVertical: 10,
		marginHorizontal: 10,
		height: 100,
		borderRadius: 4,
		overflow: 'hidden',
		elevation: 3,
		shadowOffset: { width: 0, height: 2 },
		borderColor: 'black',
		shadowOpacity: 0.8,
		shadowRadius: 4,
	},
	onPress: {
		opacity: 0.9,
	},
	image: {
		height: '100%',
		width: 100,
	},
	titleAddressContainer: {
		marginHorizontal: 8,
		flex: 1,
		justifyContent: 'flex-start',
	},
	title: {
		// flex:1,
		fontWeight: 'bold',
		fontSize: 18,
		marginVertical: 5,
	},
	address: {
		// flex:2,
		width: '100%',
	},
});
