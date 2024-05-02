import React, { useCallback, useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Button} from "react-native";
import * as Styles from "../Styles";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import * as dbm from "../services/DBManager";


export default function FirstTimeUseQuiz(): React.JSX.Element {
	const [selectedValue, setSelectedValue] = useState("");

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{label: "Sedentary (little to no exercise)", value: 0},
		{label: "Light (exercise 1-3 times per week)", value: 1},
		{label: "Moderate (exercise 4-5 times per week)", value: 2},
		{label: "Active (Intense exercise 3-4 times per week)", value: 3},
		{label: "Very Active (Intense exercise 5-7 times per week)", value: 4},
		{label: "Extremely Active (Very intense everyday, or physically demanding job)", value: 5}
	]);

	const [open2, setOpen2] = useState(false);
	const [value2, setValue2] = useState(null);
	const [items2, setItems2] = useState([
		{label: "Severe weight loss", value: 0},
		{label: "Moderate weight loss", value: 1},
		{label: "Light weight loss", value: 2},
		{label: "Maintain weight", value: 3},
		{label: "Light weight gain", value: 4},
		{label: "Moderate weight gain", value: 5},
		{label: "Severe weight gain", value: 6},
	]);
  
	// To make the opposing selector close once this one is opened
	const onOpen = useCallback(() => {
		setOpen2(false);
	}, []);
    
	// To also make the opposing selector close once this one is opened
	const onOpen2 = useCallback(() => {
		setOpen(false);
	}, []);

	let userName: string;
	let userSex: boolean;
	let userAge: string;
	let userHeight: string;
	let userWeight: string;
	let userGoal: number;
	let userDaily: number; // To be calculated based on the user's input into the fields on the form.
	let userActive: number;
	let userEndDate: Date;
    

	function setName(newText: string) {
		userName = newText;
	}

	function setAge(newText: string) {
		userAge = newText;
	}

	function setHeight(newText: string) {
		userHeight = newText;
	}

	function setWeight(newText: string) {
		userWeight = newText;
	}

	function handleSexRadioSelect(sex: string){
		if(sex == "male") userSex = true;
		else userSex = false;
	}

	const [goalShow, setGoalShow] = useState(true);
	const [endDateShow, setEndDateShow] = useState(false);
	function eitherGoalOrEndDate(){
		if(goalShow){
			setGoalShow(false);
			setEndDateShow(true);
		} 
		else{
			setGoalShow(true);
			setEndDateShow(false);
		}
	}

	const [date, setDate] = useState(new Date());

	const setUserDetails = async () => {
		try {
         
			const db = await dbm.connectToDatabase();
      
			await dbm.setUserData(db, {
				name: userName,
				sex: userSex,
				age: parseInt(userAge),
				weight: parseInt(userWeight),
				height: parseInt(userHeight),
				goal: userGoal,
				daily: userDaily,
				howActive: userActive,
				end: userEndDate 
			});
          
			await db.close();
      
		} catch (error) {
			console.error("Error updating user details:", error);
		}
	};

	return (
		<View>
			<Text style={Styles.TextStyles.title}>About You</Text>
			<Text style={Styles.TextStyles.text}>To determine your daily calorie goal, we need the following information</Text>
			<Text></Text>
			<View style={{flexDirection:"column", justifyContent:"space-between"}}>
				<Text style={Styles.TextStyles.subtitle}>Name</Text>
				<TextInput placeholder="Enter here..." onChangeText={newText => setName(newText)} />

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={Styles.TextStyles.subtitle}>Sex</Text>
					<RadioButton.Group onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<RadioButton value="male" color="blue" onPress={() => handleSexRadioSelect("male")}/>
							<Text style={Styles.TextStyles.text}>Male</Text>
                            
							<RadioButton value="female" color="blue" onPress={() => handleSexRadioSelect("female")}/>
							<Text style={Styles.TextStyles.text}>Female</Text>
						</View>
					</RadioButton.Group>
				</View>
				<Text style={Styles.TextStyles.subtitle}>Age</Text>
				<TextInput placeholder="Enter here..." onChangeText={newText => setAge(newText)} />
				<Text style={Styles.TextStyles.subtitle}>Height</Text>
				<TextInput placeholder="Enter here..." onChangeText={newText => setHeight(newText)} />
				<Text style={Styles.TextStyles.subtitle}>Weight</Text>
				<TextInput placeholder="Enter here..." onChangeText={newText => setWeight(newText)} />
				<View style={{flexDirection: "column", justifyContent: "space-between"}}>
					<Text style={Styles.TextStyles.subtitle}>Activity Rate</Text>
					<DropDownPicker open={open} value={value} items={items} zIndex={5000} setOpen={setOpen} onOpen={onOpen} setValue={setValue} setItems={setItems} onChangeValue={value => {if(value != null) userActive = value;}}/>
					<Text></Text>
					{goalShow && (
						<View>
							<Text style={Styles.TextStyles.subtitle}>Pace of Weight Change</Text>
							<DropDownPicker open={open2} value={value2} items={items2} zIndex={4000} setOpen={setOpen2} onOpen={onOpen2} setValue={setValue2} setItems={setItems2} onChangeValue={value => {if(value != null) userGoal = value;}}/>
						</View>
					)}
					{endDateShow && (
						<View>
							<Text style={Styles.TextStyles.subtitle}>End-Date Goal</Text>
							<DatePicker date={date} mode="date" onDateChange={value => {if(value != null) userEndDate = value;}}/>
						</View>
					)}
					<Text></Text>
					<TouchableOpacity style = {Styles.InputStyles.button_primary} onPress={eitherGoalOrEndDate}>
						<Text style = {container.changeButton}>Switch Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity style = {Styles.InputStyles.button_primary} onPress={setUserDetails}>
						<Text style = {container.submitButton}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const container = StyleSheet.create({
	changeButton: {
		fontSize: 14,
		fontWeight: "bold",
		color: "red"
	},
	submitButton: {
		fontSize: 30,
		margin: "25%",
		fontWeight: "bold",
		color: "black"
	}
});