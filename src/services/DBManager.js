import SQLite from "react-native-sqlite-storage";
SQLite.enablePromise(true);

const database_name = "Database.db";
const database_version = "1.0";
const database_displayname = "Calorie Counter Database";
const database_size = 200000;

const db = SQLite.openDatabase(
	{
		name: database_name,
		version: database_version,
		displayName: database_displayname,
		size: database_size,
		location: "default",
	},
	() => {},
	error => {
		console.log(error);
	},
);

export default db;

export const setupTables = () => {
	const sqlTableOne = `CREATE TABLE IF NOT EXISTS userData(name STRING PRIMARY KEY NOT NULL, age 
    INTEGER, weight INTEGER, goal INTEGER, weekly INTEGER)`;
	const sqlTableTwo = `CREATE TABLE IF NOT EXISTS intake(intakeId INTEGER PRIMARY KEY AUTOINCREMENT,  
    foodId INTEGER NOT NULL, date STRING NOT NULL)`;
	const sqlTableThree = `CREATE TABLE IF NOT EXISTS food(foodId INTEGER PRIMARY KEY AUTOINCREMENT, 
    name STRING NOT NULL, calories INTEGER NOT NULL, protein REAL NOT NULL, carbs REAL NOT NULL, sugars
    REAL NOT NULL, fats REAL NOT NULL, saturates REAL NOT NULL, isVisible NUMERIC NOT NULL DEFAULT 1)`;
	const sqlTableFour = `CREATE TABLE IF NOT EXISTS workouts(workoutId INTEGER PRIMARY KEY AUTOINCREMENT, 
    description STRING NOT NULL, date STRING NOT NULL, length STRING NOT NULL)`;

	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				sqlTableOne,
				[],
				(tx, result) => {
					console.log(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
			tx.executeSql(
				sqlTableTwo,
				[],
				(tx, result) => {
					console.log(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
			tx.executeSql(
				sqlTableThree,
				[],
				(tx, result) => {
					resolve(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
			tx.executeSql(
				sqlTableFour,
				[],
				(tx, result) => {
					console.log(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
		});
	});
};

export const insertUserData = (name, age, weight, goal, weekly) => {
	const sql = `INSERT INTO userData (name, age, weight, goal, weekly) VALUES (?, ?, ?, ?, ?)`;
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				sql,
				[name, age, weight, goal, weekly],
				(tx, result) => {
					resolve(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
		});
	});
};

export const insertIntake = (foodId, date) => {
	const sql = `INSERT INTO intake (foodId, date) VALUES (?, ?)`;
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				sql,
				[foodId, date],
				(tx, result) => {
					resolve(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
		});
	});
};

export const insertFood = (name, calories, protein, carbs, sugars, fats, saturates) => {
	const sql = `INSERT INTO food (name, calories, protein, carbs, sugars, fats, saturates) VALUES (?, ?, ?, ?, ?, ?, ?)`;
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				sql,
				[name, calories, protein, carbs, sugars, fats, saturates],
				(tx, result) => {
					resolve(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
		});
	});
};

export const insertWorkout = (description, date, length) => {
	const sql = `INSERT INTO workouts (description, date, length) VALUES (?, ?, ?)`;
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				sql,
				[description, date, length],
				(tx, result) => {
					resolve(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
		});
	});
};

export const selectUserData = () => {};

export const selectIntake = () => {};

export const selectFoodById = id => {
	const sql = `SELECT * FROM food WHERE foodId = ?`;
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				sql,
				[id],
				(tx, result) => {
					resolve(result);
				},
				(tx, error) => {
					reject(error);
				},
			);
		});
	});
};
