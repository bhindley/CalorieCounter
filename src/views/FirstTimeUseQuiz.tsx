import React, { useCallback, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import * as Styles from '../Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import * as dbm from '../services/DBManager';


export default function FirstTimeUseQuiz(): React.JSX.Element {
    const [selectedValue, setSelectedValue] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Sedentary (little to no exercise)', value: 'sedentary'},
        {label: 'Light (exercise 1-3 times per week)', value: 'light'},
        {label: 'Moderate (exercise 4-5 times per week)', value: 'moderate'},
        {label: 'Active (Intense exercise 3-4 times per week)', value: 'active'},
        {label: 'Very Active (Intense exercise 5-7 times per week)', value: 'veryActive'},
        {label: 'Extremely Active (Very intense everyday, or physically demanding job)', value: 'extremelyActive'}
    ]);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        {label: 'Severe weight loss', value: 'severeL'},
        {label: 'Moderate weight loss', value: 'moderateL'},
        {label: 'Light weight loss', value: 'lightL'},
        {label: 'Maintain weight', value: 'maintain'},
        {label: 'Light weight gain', value: 'lightG'},
        {label: 'Moderate weight gain', value: 'moderateG'},
        {label: 'Severe weight gain', value: 'severeG'},
    ]);
  
    // To make the opposing selector close once this one is opened
    const onOpen = useCallback(() => {
        setOpen2(false);
    }, []);
    
    // To also make the opposing selector close once this one is opened
    const onOpen2 = useCallback(() => {
        setOpen(false);
    }, []);

    function setText(newText: string): void {
        throw new Error('Function not implemented.');
    }

    const [goalShow, setGoalShow] = useState(true);
    const [endDateShow, setEndDateShow] = useState(false);
    function eitherGoalOrEndDate(){
        if(goalShow){
            setGoalShow(false)
            setEndDateShow(true)
        } 
        else{
            setGoalShow(true)
            setEndDateShow(false)
        }
    }

    const [date, setDate] = useState(new Date())

    // const setUserDetails = async () => {
    //     try {
         
    //       const db = await dbm.connectToDatabase();
      
    //       await dbm.setUserData(db, {
    //         name: userName,
    //         age: parseInt(userAge),
    //         height: parseFloat(userHeight),
    //         weight: parseInt(userWeight),
    //         goal: parseFloat(userGoal),
    //         daily: parseFloat(userDaily),
    //         howActive: parseInt(userActive),
    //         end: undefined 
    //       });
          
    //       await db.close();
      
    //     } catch (error) {
    //       console.error("Error updating user details:", error);
    //     }
    //   };

    return (
        <View>
            <Text style={Styles.TextStyles.title}>About You</Text>
            <Text style={Styles.TextStyles.text}>To determine your daily calorie goal, we need the following information</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={Styles.TextStyles.subtitle}>Sex</Text>
                <RadioButton.Group onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="male" color="blue" />
                        <Text style={Styles.TextStyles.text}>Male</Text>
                        
                        <RadioButton value="female" color="blue" />
                        <Text style={Styles.TextStyles.text}>Female</Text>
                    </View>
                </RadioButton.Group>
            </View>
            <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                <Text style={Styles.TextStyles.subtitle}>Age</Text>
                <TextInput placeholder="Enter here..." onChangeText={newText => setText(newText)} />
                <Text style={Styles.TextStyles.subtitle}>Height</Text>
                <TextInput placeholder="Enter here..." onChangeText={newText => setText(newText)} />
                <Text style={Styles.TextStyles.subtitle}>Weight</Text>
                <TextInput placeholder="Enter here..." onChangeText={newText => setText(newText)} />
                <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                    <Text style={Styles.TextStyles.subtitle}>Activity Rate</Text>
                    <DropDownPicker open={open} value={value} items={items} zIndex={5000} setOpen={setOpen} onOpen={onOpen} setValue={setValue} setItems={setItems} />
                    <Text></Text>
                    {goalShow && (
                        <View>
                            <Text style={Styles.TextStyles.subtitle}>Weight Goal</Text>
                            <DropDownPicker open={open2} value={value2} items={items2} zIndex={4000} setOpen={setOpen2} onOpen={onOpen2} setValue={setValue2} setItems={setItems2} />
                        </View>
                    )}
                    {endDateShow && (
                        <View>
                            <Text style={Styles.TextStyles.subtitle}>End-date Goal</Text>
                            <DatePicker date={date} onDateChange={setDate} mode="date"/>
                        </View>
                    )}
                    <Text></Text>
                    <TouchableOpacity style = {Styles.InputStyles.button_primary} onPress={eitherGoalOrEndDate}>
                        <Text style = {container.button}>Switch Goal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const container = StyleSheet.create({
	button: {
		fontSize: 14,
		fontWeight: "bold",
        color: 'red'
	}
});