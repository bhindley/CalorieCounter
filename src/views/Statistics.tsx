import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as dbm from "../services/DBManager.ts";
import { SQLiteDatabase } from "react-native-sqlite-storage";

export default function Statistics({ navigation }): React.JSX.Element {
  const [totalCalories, setTotalCalories] = useState(0);
  const [caloriesDifference, setCaloriesDifference] = useState(0); // Step 1: State variable for calories difference
  const [goalWeightUnit, setGoalWeightUnit] = useState(""); // Step 1: State variable for goal weight unit

  useEffect(() => {
    fetchTotalCalories();
    fetchUserData(); // Fetch user data when component mounts
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

  const fetchUserData = async () => {
    try {
      const db: SQLiteDatabase = await dbm.connectToDatabase();
      const userData = await dbm.selectUserData(db); // Fetch user data from database
      setGoalWeightUnit(userData.goalWeightUnit); // Set goal weight unit
      calculateCaloriesDifference(userData.goal); // Calculate calories difference
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const calculateCaloriesDifference = (goal: number) => {
    const difference = goal - totalCalories;
    setCaloriesDifference(difference);
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
      <View style={styles.goalContainer}>
        <Text style={styles.goalText}>Goal Progress:</Text>
        <View style={styles.rectangleBox}>
          <Text style={styles.goalAmount}>{caloriesDifference} {goalWeightUnit}</Text> {/* Step 4: Display calculated difference with goal weight unit */}
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
  goalContainer: {
    marginTop: 20, // Adjust spacing as needed
    alignItems: "center",
  },
  goalText: {
    marginBottom: 10,
  },
  rectangleBox: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  goalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
