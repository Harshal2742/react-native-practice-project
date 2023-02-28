import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const OutlineButton = ({ icon, iconSize, onPress ,children}) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.container, pressed && styles.onPress]}
		>
			<View style={styles.innerContainer}>
				<FontAwesome name={icon} size={iconSize} color={Colors.primary500} />
				<Text style={styles.buttonText}>{children}</Text>
			</View>
		</Pressable>
	);
};

export default OutlineButton;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: Colors.primary500,
    marginVertical:5,
		paddingHorizontal:10
	},
	buttonText: {
		color: Colors.primary500,
		marginHorizontal: 5,
	},
	onPress: {
		opacity: 0.7,
    backgroundColor:Colors.primary50,
	},
	innerContainer: {
		marginVertical: 5,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
