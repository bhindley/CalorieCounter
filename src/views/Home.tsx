import React from "react";
import {Text, View, TouchableOpacity} from "react-native";

export default function Home({ navigation }: any): React.JSX.Element {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.push("Add Workout")}>
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
        </View>
    );
}
