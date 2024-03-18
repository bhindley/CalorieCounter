import React, {useState, useEffect} from "react";
import {Text, View} from "react-native";
import * as db from "../services/DBManager.js";

export default function ListItem_CommonFoods(props: {foodId: number}) {
	const [foodData, setFoodData] = useState<any>(null);

	useEffect(() => {
		db.selectFoodById(props.foodId).then(data => {
			setFoodData(data);
		});
	}, [props.foodId]);

	return (
		<View>
			<Text>{foodData.name}</Text>
		</View>
	);
}
