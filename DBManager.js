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
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);  
  }
);
export default db;

export const createTable = () => {
    const query =
        `CREATE TABLE IF NOT EXISTS userData(name STRING PRIMARY KEY NOT NULL, age INTEGER, weight INTEGER, goal INTEGER, weekly INTEGER)`;

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                query,
                [],
                (tx, results) => {resolve(results);},
                (error) => {reject(error);
            });
        })
    })
}