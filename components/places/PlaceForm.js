import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import { Place } from '../../models/place';

const PlaceForm = ({onCreatePlace}) => {
	const [enteredTitle, setEnteredTitle] = useState();
	const [takenImage,setTakenImage] = useState();
	const [pickedLocation,setPickedLocation] = useState();

	const onTitleChange = (title) => {
		setEnteredTitle(title);
	};

	const onSaveHandler = () =>{
		const place = new Place(enteredTitle,takenImage,pickedLocation);
		onCreatePlace(place)
	}

	const onImageTakenHandler = (imageUri) => {
		setTakenImage(imageUri);
	}

	const onLocationPickedHandler = useCallback((location) => {
		setPickedLocation(location);
	},[])

	return (
		<ScrollView style={styles.container}>
			<View>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					onChangeText={onTitleChange}
					value={enteredTitle}
				/>
			</View>
      <ImagePicker onImageTaken={onImageTakenHandler} />
			<LocationPicker onLocationPick={onLocationPickedHandler} />
			<Button onPress={onSaveHandler}>Add Place</Button>
		</ScrollView>
	);
};

export default PlaceForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 4,
		color: Colors.primary500,
	},
	input: {
		borderWidth: 2,
		borderColor: Colors.primary700,
		fontSize: 14,
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 4,
    color:Colors.primary800,
    backgroundColor:Colors.primary200
	},
});
