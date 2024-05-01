import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as dbm from "../services/DBManager.ts";
import { SQLiteDatabase } from "react-native-sqlite-storage";

export default function Statistics({ navigation }): React.JSX.Element {
  const [totalCalories, setTotalCalories] = useState(0);
  const [caloriesDifference, setCaloriesDifference] = useState(0);
  const [goalWeightUnit, setGoalWeightUnit] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

      const userData = await dbm.selectUserData(db);
      if (!userData || !userData.goal) {
        setGoalWeightUnit("No goal yet");
        setCaloriesDifference(0); // Reset calories difference
      } else {
        const goal = userData.goal;
        const difference = goal - total;
        setCaloriesDifference(difference);
        setGoalWeightUnit("calories"); // Assuming the goal is in calories
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      <View style={styles.goalContainer}>
        <Text style={styles.goalText}>Goal Progress:</Text>
        <View style={styles.rectangleBox}>
          <Text style={styles.goalAmount}>{caloriesDifference} {goalWeightUnit}</Text>
        </View>
      </View>
      <View style={styles.letsGetFitContainer}>
    <Text style={styles.letsGetFitText}>LET'S GET FIT</Text>
  </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f3ff", // Lighter colorful background
  },
  navigationContainer: {
    flexDirection: "row",
    marginTop: 20, // Adjusted marginTop
    marginBottom: 20,
  },
  navButton: {
    marginRight: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  navButtonText: {
    fontWeight: "bold",
  },
  caloriesContainer: {
    marginTop: 50, // Adjusted marginTop
    alignItems: "center",
  },
  caloriesText: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  caloriesRectangleBox: {
    backgroundColor: "#00f",
    padding: 10,
    borderRadius: 10,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#00f",
    justifyContent: "center",
    alignItems: "center",
  },
  caloriesAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  goalContainer: {
    position: "absolute",
    top: 20, // Positioned on top of the buttons
    alignItems: "center",
  },
  goalText: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  goalRectangleBox: {
    backgroundColor: "#ccc",
    padding: 15, // Increased padding
    borderRadius: 10,
  },
  goalAmount: {
    fontSize: 36, // Increased fontSize
    fontWeight: "bold",
  },
  letsGetFitContainer: {
    marginTop: 20, // Adjusted marginTop
    alignItems: "center",
  },
  letsGetFitText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker text color
  },
});

