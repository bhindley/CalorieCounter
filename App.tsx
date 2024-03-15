/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import * as db from "./src/services/DBManager.js";
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
	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	useEffect(() => {
		db.setupTables();
	}, []);

	return (
		<SafeAreaView style={backgroundStyle}>
			<ListItem_CommonFoods foodId={1} />
		</SafeAreaView>
	);
}

export default App;