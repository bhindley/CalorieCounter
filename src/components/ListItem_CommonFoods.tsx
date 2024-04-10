import React, {useState, useEffect, useCallback} from "react";
import {Text, View, StyleSheet} from "react-native";
import * as dbm from "../services/DBManager.ts";

export default function ListItem_CommonFoods(props: {foodId: number}) {
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

	return <View></View>;
}

const localStyles = StyleSheet.create({});
