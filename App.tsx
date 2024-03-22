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

import ListItem_CommonFoods from "./src/components/ListItem_CommonFoods";

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
		<SafeAreaView>
			<ListItem_CommonFoods foodId={1} />
		</SafeAreaView>
	);
}

export default App;
