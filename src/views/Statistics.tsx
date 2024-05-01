import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as dbm from "../services/DBManager.ts";
import { SQLiteDatabase } from "react-native-sqlite-storage";

export default function Statistics({ navigation }): React.JSX.Element {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0); // Step 1: State variable for total workouts

  useEffect(() => {
    fetchTotalCalories();
    fetchTotalWorkouts(); // Fetch total workouts when component mounts
  }, []);

  const fetchTotalCalories = async () => {
    try {
      const db: SQLiteDatabase = await dbm.connectToDatabase();
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      const intakes = await dbm.selectIntakeByDate(db, formattedDate);
      let total = 0;
      for (const intake of intakes) {
        const food = await dbm.selectFoodById(db, intake.foodId);
        total += food.calories;
      }
      setTotalCalories(total);
    } catch (error) {
      console.error("Error fetching total calories:", error);
    }
  };

  const fetchTotalWorkouts = async () => {
    try {
      const db: SQLiteDatabase = await dbm.connectToDatabase();
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      const workouts = await dbm.selectWorkoutsByDate(db, formattedDate); // Fetch workouts for today
      setTotalWorkouts(workouts.length); // Update total workouts
    } catch (error) {
      console.error("Error fetching total workouts:", error);
    }
  };

  const navigateToPage = (pageName: string) => {
    navigation.navigate(pageName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigateToPage("Home")}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigateToPage("Profile")}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigateToPage("Quiz")}>
          <Text>Quiz</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesText}>Total Calories Consumed Today:</Text>
        <View style={styles.circle}>
          <Text style={styles.caloriesAmount}>{totalCalories} kcal</Text>
        </View>
      </View>
      <View style={styles.workoutsContainer}> {/* Display box for workouts */}
        <Text style={styles.workoutsText}>Total Workouts Today:</Text>
        <View style={styles.rectangleBox}>
          <Text style={styles.workoutsAmount}>{totalWorkouts}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  navigationContainer: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 20,
  },
  navButton: {
    marginRight: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  caloriesContainer: {
    alignItems: "center",
  },
  caloriesText: {
    marginBottom: 10,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#00f",
    justifyContent: "center",
    alignItems: "center",
  },
  caloriesAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  workoutsContainer: {
    marginTop: 20, // Adjust spacing as needed
    alignItems: "center",
  },
  workoutsText: {
    marginBottom: 10,
  },
  rectangleBox: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  workoutsAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});