import React, {useState, useEffect, useCallback} from "react";
import {Text, View, StyleSheet} from "react-native";
import * as dbm from "../services/DBManager.js";

export default function ListItem_CommonFoods(props: {foodId: number}) {
	const [foodData, setFoodData] = useState<any>(null);

	const loadData = useCallback(async () => {
		try {
			const db = await dbm.connectToDatabase();
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<View>
			<Text>{foodData.name}</Text>
		</View>
	);
}

const localStyles = StyleSheet.create({
	
})