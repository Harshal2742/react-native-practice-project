import { Children } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

const Button = ({ children, onPress }) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
		>
			<View>
				<Text style={styles.text}>{children}</Text>
			</View>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		margin: 4,
		padding: 4,
		borderWidth: 2,
		// borderColor: Colors.primary500,
		backgroundColor: Colors.primary500,
	},
	text: {
		textAlign: 'center',
		fontWeight: 'bold',
    marginVertical:5
	},
	pressed: {
		opacity: 0.7,
	},
});
