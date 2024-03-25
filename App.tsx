/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from "react";
import * as dbm from "./src/services/DBManager.ts";
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {Home} from "./src/views/Home";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

	const loadData = useCallback(async () => {
		try {
			const db = await dbm.connectToDatabase();
			await dbm.createTables(db);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={} />
				<Stack.Screen name="Profile" component={} />
				<Stack.Screen name="Add Food" component={} />
				<Stack.Screen name="Add Workout" component={} />
				<Stack.Screen name="Statistics" component={} />
				<Stack.Screen name="First time use quiz" component={} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
