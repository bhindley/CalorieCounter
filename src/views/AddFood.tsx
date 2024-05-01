import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import * as dbm from "../services/DBManager.ts";
import { SQLiteDatabase } from "react-native-sqlite-storage";

export default function AddFood({ navigation }): React.JSX.Element {
  const [foodName, setFoodName] = useState("");
  const [calorieAmount, setCalorieAmount] = useState("");

  const handleFoodNameChange = (value: string) => {
    setFoodName(value);
  };

  const handleCalorieAmountChange = (value: string) => {
    setCalorieAmount(value);
  };

  const handleSubmit = async () => {
    try {
      const db: SQLiteDatabase = await dbm.connectToDatabase();
      const foodData = {
        name: foodName,
        calories: parseInt(calorieAmount),
      };
      await dbm.addFood(db, foodData);
      // Navigate to the Statistics page after adding food
      navigation.navigate("Statistics");
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Food Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleFoodNameChange}
        value={foodName}
      />
      <Text style={styles.label}>Calorie Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCalorieAmountChange}
        value={calorieAmount}
        keyboardType="numeric"
      />
      <Button title="Add Food" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});