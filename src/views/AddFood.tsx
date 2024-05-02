
import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import * as dbm from "../services/DBManager.ts";

export default function AddFood(): React.JSX.Element {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [sugars, setSugars] = useState("");
  const [fats, setFats] = useState("");
  const [saturates, setSaturates] = useState("");

  const handleAddFood = async () => {
    try {
      const db = await dbm.connectToDatabase();
      await dbm.addFood(db, {
        name: foodName,
        calories: parseInt(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        sugars: parseFloat(sugars),
        fats: parseFloat(fats),
        saturates: parseFloat(saturates),
      });
      Alert.alert("Success", "Food added successfully");
      // Optionally clear the form inputs after adding food
      setFoodName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setSugars("");
      setFats("");
      setSaturates("");
    } catch (error) {
      console.error("Error adding food:", error);
      Alert.alert("Error", "Failed to add food");
    }
  };

  return (
    <View>
      <Text>Add Food</Text>
      <TextInput
        placeholder="Food Name"
        value={foodName}
        onChangeText={setFoodName}
      />
      <TextInput
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Protein (g)"
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Carbs (g)"
        value={carbs}
        onChangeText={setCarbs}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Sugars (g)"
        value={sugars}
        onChangeText={setSugars}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Fats (g)"
        value={fats}
        onChangeText={setFats}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Saturates (g)"
        value={saturates}
        onChangeText={setSaturates}
        keyboardType="numeric"
      />
      <Button title="Add Food" onPress={handleAddFood} />
    </View>
  );
}


