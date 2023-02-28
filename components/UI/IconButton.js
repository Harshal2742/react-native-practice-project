import { Pressable, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const IconButton = ({ name, size, color, onPress }) => {
	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.onPress]}
			onPress={onPress}
		>
			<FontAwesome name={name} size={size} color={color} />
		</Pressable>
	);
};

export default IconButton;

const styles = StyleSheet.create({
	container: {
		padding: 8,
		alignContent: 'center',
		justifyContent: 'center',
	},
	onPress: {
		opacity: 0.7,
	},
});
