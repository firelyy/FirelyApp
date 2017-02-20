import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MainApp = () => {
	const name = 'Green Day - Nookie';
	const styles = StyleSheet.create({
		container: {
			margin: 10,
			marginTop: 100,
			backgroundColor: '#000',
			borderRadius: 5,
		},
		innerContainer: {
			backgroundColor: '#888',
			height: 50,
			width: 150,
			borderTopLeftRadius: 5,
			borderBottomLeftRadius: 5,

		},
		title: {
			fontSize: 18,
			fontWeight: '200',
			color: '#fff',
			position: 'absolute',
			backgroundColor: 'transparent',
			top: 12,
			left: 10,
		},
		subtitle: {
			fontWeight: 'bold',
		},

	});
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer} />
			<Text style={styles.title}>
				<Text style={styles.subtitle}>Playing:</Text> {name}
			 </Text>
		</View>
		);
}

export default MainApp;