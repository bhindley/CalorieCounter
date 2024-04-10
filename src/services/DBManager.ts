import {ResultSet, SQLiteDatabase, enablePromise, openDatabase} from "react-native-sqlite-storage";
import {valDate} from "./Validator";

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
	const userDataQuery = `CREATE TABLE IF NOT EXISTS userData (name PRIMARY KEY NOT NULL TEXT, age INTEGER, sex INTEGER, weight REAL, height REAL, goal REAL, daily INTEGER, howActive INTEGER, end TEXT)`;
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

export const setUserData = async (db: SQLiteDatabase, user: User) => {
	const checkQuery = `SELECT * FROM userData`;
	try {
		const results = await db.executeSql(checkQuery, []);
		if (results[0].rows.length > 0) {
			throw Error("User data already set");
		} else {
			const s: number = user.sex ? 1 : 0 | 2;
			const query = `INSERT INTO userData (name, age, sex, weight, height, goal, daily, howActive, end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
			const vals = [
				user.name,
				user.age,
				s,
				user.weight,
				user.height,
				user.goal,
				user.daily,
				user.howActive,
				user.end.day + "-" + user.end.month + "-" + user.end.year,
			];
			try {
				await db.executeSql(query, vals);
			} catch (error) {
				console.error(error);
				throw Error("Could not set user data");
			}
		}
	} catch (error) {
		console.error(error);
		throw Error("Could not check if user data is already set");
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
	try {
		await db.executeSql(query, vals);
	} catch (error) {
		console.log(error);
		throw Error("Could not insert food into table");
	}
};

export const addWorkout = async (db: SQLiteDatabase, workout: Workout) => {
	const query = `INSERT INTO workouts (description, caloriesBurned, date, length)`;
	const vals = [
		workout.description,
		workout.caloriesBurned,
		workout.date.day + "-" + workout.date.month + "-" + workout.date.year,
		workout.length,
	];
	try {
		await db.executeSql(query, vals);
	} catch (error) {
		console.log(error);
		throw Error("Could not insert food into table");
	}
};

export const addIntake = async (db: SQLiteDatabase, intake: Intake) => {
	const query = `INSERT INTO intake (foodId, date) VALUES (?, ?)`;
	const vals = [intake.foodId, intake.date.day + "-" + intake.date.month + "-" + intake.date.year];
	try {
		await db.executeSql(query, vals);
	} catch (error) {
		console.log(error);
		throw Error("Could not insert intake into table");
	}
};

export const selectUserData = async (db: SQLiteDatabase): Promise<User> => {
	const query = `SELECT * FROM userData`;
	try {
		const results = await db.executeSql(query, []);
		return results[0].rows.item(0);
	} catch (error) {
		console.error(error);
		throw Error("Could not select user data");
	}
};

export const selectFoodById = async (db: SQLiteDatabase, foodId: number): Promise<Food> => {
	const query = `SELECT * FROM nutritional WHERE foodId = ?`;
	const vals = [foodId];
	try {
		const results = await db.executeSql(query, vals);
		return results[0].rows.item(0);
	} catch (error) {
		console.error(error);
		throw Error("Could not select food by ID");
	}
};

export const selectVisibleFoods = async (db: SQLiteDatabase): Promise<Food[]> => {
	const query = `SELECT * FROM nutritional WHERE isVisible = 1`;
	try {
		const results = await db.executeSql(query, []);
		const foods: Food[] = [];
		for (let i = 0; i < results[0].rows.length; i++) {
			foods.push({...results[0].rows.item(i), isVisible: results[0].rows.item(i).isVisible === 1});
		}
		return foods;
	} catch (error) {
		console.error(error);
		throw Error("Could not select visible foods");
	}
};

export const selectIntakeByDate = async (
	db: SQLiteDatabase,
	date: BasicDate,
): Promise<Intake[]> => {
	if (valDate(date)) {
		const query = `SELECT * FROM intake WHERE date = ?`;
		const vals = [date.day + "-" + date.month + "-" + date.year];
		try {
			const results = await db.executeSql(query, vals);
			const intakes: Intake[] = [];
			for (let i = 0; i < results[0].rows.length; i++) {
				intakes.push({...results[0].rows.item(i), date: date});
			}
			return intakes;
		} catch (error) {
			console.error(error);
			throw Error("Could not select intake by date");
		}
	} else {
		throw Error("Invalid date");
	}
};

export const selectWorkoutsByDate = async (
	db: SQLiteDatabase,
	date: BasicDate,
): Promise<Workout[]> => {
	if (valDate(date)) {
		const query = `SELECT * FROM workouts WHERE date = ?`;
		const vals = [date.day + "-" + date.month + "-" + date.year];
		try {
			const results = await db.executeSql(query, vals);
			const workouts: Workout[] = [];
			for (let i = 0; i < results[0].rows.length; i++) {
				workouts.push({...results[0].rows.item(i), date: date});
			}
			return workouts;
		} catch (error) {
			console.error(error);
			throw Error("Could not select workouts by date");
		}
	} else {
		throw Error("Invalid date");
	}
};
