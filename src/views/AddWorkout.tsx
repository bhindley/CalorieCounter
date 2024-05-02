import {Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from "react-native";
import {useState} from "react";
import Slider from "react-slider";
import {Dropdown} from "react-native-element-dropdown";
import {PieChart} from "react-native-chart-kit";
import React from "react";
 
const activities = [
	{label: "Running", value: "running"},
	{label: "Cycling", value: "cycling"},
	{label: "Weightlifting", value: "weightlifting"},
];
 
export default function AddWorkout(): React.JSX.Element {
	const [activity, setActivity] = useState(null);
	const [duration, setDuration] = useState(0);
	const [intensity, setIntensity] = useState(0);
	const [notes, setNotes] = useState("");
	const [workoutLog, setWorkoutLog] = useState([]);
	const handleSaveWorkout = () => {
		const newWorkout = {
			activity: activity.label,
			duration,
			intensity,
			notes,
		};
		setWorkoutLog([...workoutLog, newWorkout]);
		setActivity(null);
		setDuration(0);
		setIntensity(0);
		setNotes("");
	};
	const chartData = workoutLog.map(workout => ({
		name: workout.activity,
		calories: calculateCalories(workout.duration, workout.intensity),
	}));
	const calculateCalories = (duration: number, intensity: number) => {
		// Assuming a simple calculation where calories burned = duration (minutes) * intensity
		return duration * intensity;
	};
 
	return (
		<ScrollView style={styles.container}>
			<View style={styles.overview}>
				<Text style={styles.overviewTitle}>Calorie Spending Overview</Text>
				<Text style={styles.overviewText}>
                    Total Calories Burned:{" "}
					{workoutLog.reduce(
						(total, workout) => total + calculateCalories(workout.duration, workout.intensity),
						0,
					)}{" "}
                    Calories
				</Text>
				<View>
					{activities.map(act => (
						<Text key={act.value}>
                            - {act.label}:{" "}
							{workoutLog
								.filter(workout => workout.activity === act.label)
								.reduce(
									(total, workout) =>
										total + calculateCalories(workout.duration, workout.intensity),
									0,
								)}{" "}
                            Calories
						</Text>
					))}
				</View>
				<Text style={styles.overviewText}>
                    Progress Towards Goals:{" "}
					{(
						(workoutLog.reduce(
							(total, workout) => total + calculateCalories(workout.duration, workout.intensity),
							0,
						) /
                            2000) *
                        100
					).toFixed(2)}
                    % of Goal
				</Text>
			</View>
			<View style={styles.workoutLogging}>
				<Text style={styles.workoutLoggingTitle}>Workout Logging</Text>
				<Dropdown
					style={styles.dropdown}
					data={activities}
					labelField="label"
					valueField="value"
					placeholder="Select activity type"
					value={activity}
					onChange={item => setActivity(item)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Duration (mins)"
					keyboardType="numeric"
					value={duration.toString()}
					onChangeText={text => setDuration(parseInt(text))}
				/>
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={100}
					value={intensity}
					onValueChange={value => setIntensity(value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Notes"
					value={notes}
					onChangeText={text => setNotes(text)}
				/>
				<TouchableOpacity style={styles.button} onPress={handleSaveWorkout}>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.chart}>
				<Text style={styles.chartTitle}>Calories Burned Chart</Text>
				<PieChart
					data={chartData}
					width={250}
					height={250}
					chartConfig={{
						backgroundColor: "#ffffff",
						backgroundGradientFrom: "#ffffff",
						backgroundGradientTo: "#ffffff",
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						style: {
							borderRadius: 16,
						},
					}}
					accessor="calories"
					backgroundColor="transparent"
					paddingLeft="15"
					absolute
				/>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	overview: {
		padding: 10,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		marginBottom: 10,
	},
	overviewTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	overviewText: {
		fontSize: 16,
	},
	workoutLogging: {
		padding: 10,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		marginBottom: 10,
	},
	workoutLoggingTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	dropdown: {
		width: "100%",
		marginBottom: 10,
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#a1a1a1",
		borderRadius: 5,
		padding: 5,
		marginBottom: 10,
	},
	slider: {
		width: "100%",
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#000000",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	buttonText: {
		color: "#ffffff",
		fontSize: 16,
	},
	chart: {
		padding: 10,
		backgroundColor: "#ffffff",
		borderRadius: 10,
	},
	chartTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
});