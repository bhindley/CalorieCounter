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

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import Dev_InsertDataModule from "./src/components/Dev_InsertDataModule.tsx";

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
		
			<Dev_InsertDataModule />
		
	);
}

export default App;
