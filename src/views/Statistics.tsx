
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as dbm from "../services/DBManager.ts";
import { SQLiteDatabase } from "react-native-sqlite-storage";

export default function Statistics({ navigation }): React.JSX.Element {
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    fetchTotalCalories();
  }, []);

  const fetchTotalCalories = async () => {
    try {
      const db: SQLiteDatabase = await dbm.connectToDatabase();
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      const intakes = await dbm.selectIntakeByDate(db, formattedDate);
      let total = 0;
      intakes.forEach(intake => {
        // Retrieve food information for each intake record
        dbm.selectFoodById(db, intake.foodId).then(food => {
          total += food.calories; // Sum up the calorie amounts
          setTotalCalories(total);
        });
      });
    } catch (error) {
      console.error("Error fetching total calories:", error);
    }
  };

  const navigateToPage = (pageName: string) => {
    navigation.navigate(pageName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigateToPage("Home")}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToPage("Profile")}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToPage("Quiz")}>
          <Text>Quiz</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesText}>Total Calories Consumed Today:</Text>
        <View style={styles.rectangleBox}>
          <Text style={styles.caloriesAmount}>{totalCalories} kcal</Text>
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
  },
  navigationContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  caloriesContainer: {
    alignItems: "center",
  },
  caloriesText: {
    marginBottom: 10,
  },
  rectangleBox: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  caloriesAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});