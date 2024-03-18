import {SQLiteDatabase, enablePromise, openDatabase} from "react-native-sqlite-storage";

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
	return openDatabase(
		{name: "calorieCounter.db", location: "default"},
		() => {},
		(error: any) => {
			console.error(error);
			throw Error("Could not connect to database");
		},
	);
};

export const createTables = async (db: SQLiteDatabase) => {
	const userDataQuery = `CREATE TABLE IF NOT EXISTS userData (name PRIMARY KEY NOT NULL TEXT, age INTEGER, weight REAL, goal REAL, weekly REAL)`;
	const intakeQuery = `CREATE TABLE IF NOT EXISTS intake (intakeId INTEGER PRIMARY KEY AUTOINCREMENT, foodId INTEGER, date TEXT)`;
	const nutritionalQuery = `CREATE TABLE IF NOT EXISTS nutritional (foodId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, calories INTEGER, protein REAL, carbs REAL, sugars REAL, fats REAL, saturates REAL, isVisible NUMBER)`;
	const workoutsQuery = `CREATE TABLE IF NOT EXISTS workouts (workoutId INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, caloriesBurned INTEGER, date TEXT, duration INTEGER)`;

	try {
		await db.executeSql(userDataQuery, []);
		await db.executeSql(intakeQuery, []);
		await db.executeSql(nutritionalQuery, []);
		await db.executeSql(workoutsQuery, []);
	} catch (error) {
		console.error(error);
		throw Error("Could not create tables");
	}
};

export const dev_getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
	try {
		const tableNames: string[] = [];
		const results = await db.executeSql(
			`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
			[],
		);
		results?.forEach(result => {
			for (let i = 0; i < result.rows.length; i++) {
				tableNames.push(result.rows.item(i).name);
			}
		});
		return tableNames;
	} catch (error) {
		console.error(error);
		throw Error("Could not get table names");
	}
};

export const dev_removeTable = async (db: SQLiteDatabase, tableName: String) => {
	const query = `DROP TABLE IF EXISTS ${tableName}`;
	try {
		await db.executeSql(query, []);
	} catch (error) {
		console.error(error);
		throw Error("Could not remove table");
	}
};

export const addFood = async (db: SQLiteDatabase, food: Food) => {
	const query = `INSERT INTO nutritional (name, calories, protein, carbs, sugars, fats, saturates, isVisible) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
	const vals = [
		food.name,
		food.calories,
		food.protein,
		food.carbs,
		food.sugars,
		food.fats,
		food.saturates,
		food.isVisible ? 1 : 0,
	];
};
