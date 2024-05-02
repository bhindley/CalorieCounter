/* eslint-disable react/prop-types */
import React from "react";
import {Text, View, TouchableOpacity, ScrollView, TextInput} from "react-native";

export default function Home({navigation}): React.JSX.Element {
	return (
		<ScrollView style={{padding: 20}}>
			{/* Calorie Counter Title */}
			<Text style={{fontSize: 24, fontWeight: "bold", marginBottom: 20}}>Calorie Counter</Text>
			{/* Search Bar */}
			<View style={{flexDirection: "row", alignItems: "center", marginBottom: 20}}>
				<TextInput
					style={{flex: 1, borderWidth: 1, borderColor: "black", borderRadius: 5, padding: 10}}
					placeholder="Search"
				/>
				<TouchableOpacity
					style={{marginLeft: 10, backgroundColor: "blue", padding: 10, borderRadius: 5}}
				>
					<Text style={{color: "white"}}>Search</Text>
				</TouchableOpacity>
			</View>
			{/* Recent Foods */}
			<View style={{marginBottom: 20}}>
				<Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 10}}>Recent Foods:</Text>
				{/* Food Item 1 */}
				<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
					<Text style={{marginRight: 10}}>1. Food Item 1</Text>
					<TouchableOpacity style={{backgroundColor: "green", padding: 5, borderRadius: 5}}>
						<Text style={{color: "white"}}>Add</Text>
					</TouchableOpacity>
					<Text style={{marginLeft: 10}}>Calories: 100</Text>
				</View>
				{/* Food Item 2 */}
				<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
					<Text style={{marginRight: 10}}>2. Food Item 2</Text>
					<TouchableOpacity style={{backgroundColor: "green", padding: 5, borderRadius: 5}}>
						<Text style={{color: "white"}}>Add</Text>
					</TouchableOpacity>
					<Text style={{marginLeft: 10}}>Calories: 150</Text>
				</View>
				{/* Food Item 3 */}
				<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
					<Text style={{marginRight: 10}}>3. Food Item 3</Text>
					<TouchableOpacity style={{backgroundColor: "green", padding: 5, borderRadius: 5}}>
						<Text style={{color: "white"}}>Add</Text>
					</TouchableOpacity>
					<Text style={{marginLeft: 10}}>Calories: 200</Text>
				</View>
				{/* More Foods */}
				{/* Add here as needed */}
			</View>
			{/* Your Daily Log */}
			<View style={{marginBottom: 20}}>
				<Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 10}}>Your Daily Log:</Text>
				{/* Daily Log Entry 1 */}
				<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
					<Text style={{marginRight: 10}}>Date: MM/DD/YYYY</Text>
					<TouchableOpacity style={{backgroundColor: "red", padding: 5, borderRadius: 5}}>
						<Text style={{color: "white"}}>Remove</Text>
					</TouchableOpacity>
					<Text style={{marginLeft: 10}}>Calories: 250</Text>
				</View>
				{/* Daily Log Entry 2 */}
				<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
					<Text style={{marginRight: 10}}>Date: MM/DD/YYYY</Text>
					<TouchableOpacity style={{backgroundColor: "red", padding: 5, borderRadius: 5}}>
						<Text style={{color: "white"}}>Remove</Text>
					</TouchableOpacity>
					<Text style={{marginLeft: 10}}>Calories: 300</Text>
				</View>
				<TouchableOpacity style={{backgroundColor: "red", padding: 10, borderRadius: 5}}>
					<Text style={{color: "white"}}>Clear Log</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={navigation.push("Add Workout")}>
					<Text>Add Workout</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.push("Add Food")}>
					<Text>Add Meal</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.push("Profile")}>
					<Text>View Profile</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.push("Statistics")}>
					<Text>View Trends</Text>
				</TouchableOpacity>
				{/* More Daily Log Entries */}
				{/* Add here as needed */}
			</View>
			{/* View Log and Clear Log Buttons */}
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<TouchableOpacity style={{backgroundColor: "blue", padding: 10, borderRadius: 5}}>
					<Text style={{color: "white"}}>View Log</Text>
				</TouchableOpacity>
				
			</View>
		</ScrollView>
	);
}
