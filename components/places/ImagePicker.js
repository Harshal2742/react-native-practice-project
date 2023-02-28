import { View, StyleSheet, Alert, Image, Text } from 'react-native';
import {
	launchCameraAsync,
	PermissionStatus,
	useCameraPermissions,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import { useState } from 'react';
import OutlineButton from '../UI/OutlineButton';

const ImagePicker = ({onImageTaken}) => {
	const [imageUri, setImageUri] = useState(null);
	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions();

	const verifyPermission = async () => {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficent Permissions!',
				'You need to grant camera permission in order to use this app'
			);

			return false;
		}

		// granter permission
		return true;
	};
	const onImagePickHandler = async () => {
		const hasPersmission = await verifyPermission();

		if (!hasPersmission) {
			return;
		}

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		if (image.assets) {
			setImageUri(image.assets[0].uri);
			onImageTaken(image.assets[0].uri);
		}
	};

	const content = imageUri ? (
		<Image
			style={styles.image}
			source={{
				uri: imageUri,
			}}
		/>
	) : (
		<Text>Image not taken yet.</Text>
	);

	return (
		<View>
			<View style={styles.imageContainer}>{content}</View>
			<OutlineButton icon={'camera'} iconSize={24} onPress={onImagePickHandler}>
				Take Image
			</OutlineButton>
		</View>
	);
};

export default ImagePicker;

const styles = StyleSheet.create({
	imageContainer: {
		width: '100%',
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		marginTop: 15,
		marginBottom: 5,
		borderRadius:8,
		overflow:'hidden'
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
