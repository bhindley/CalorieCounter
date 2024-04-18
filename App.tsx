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

import Home from "./src/views/Home.tsx";
import Profile from "./src/views/Profile.tsx";
import AddFood from "./src/views/AddFood.tsx";
import AddWorkout from "./src/views/AddWorkout.tsx";
import Statistics from "./src/views/Statistics.tsx";
import FirstTimeUseQuiz from "./src/views/FirstTimeUseQuiz.tsx";

import Dev_InsertDataModule from "./src/components/Dev_InsertDataModule.tsx";
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
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="Add Food" component={AddFood} />
				<Stack.Screen name="Add Workout" component={AddWorkout} />
				<Stack.Screen name="Statistics" component={Statistics} />
				<Stack.Screen name="First time use quiz" component={FirstTimeUseQuiz} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
