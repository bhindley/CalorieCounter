import React, {useState, useEffect, useCallback} from "react";
import {Text, View, StyleSheet, TextInput, Button} from "react-native";
import * as dbm from "../services/DBManager.ts";
import { SQLiteDatabase } from "react-native-sqlite-storage";

export default function Dev_InsertDataModule() {
	const [insertData, setInsertData] = useState<string>("{description: 'T', caloriesBurned: 0, date: '1-1-1990', length: 0}");
    const handleChange_insertData = (e: any) => setInsertData(e.target.value)

    var db: SQLiteDatabase;

	const loadData = useCallback(async () => {
		try {
			db = await dbm.connectToDatabase();
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<View>
			<Text>Insert data to DB</Text>

			<Text>data,data,data</Text>
			<TextInput onChange={handleChange_insertData}/>
			<Button title="Execute"></Button>
		</View>
	);
}

const localStyles = StyleSheet.create({});
