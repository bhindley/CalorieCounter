import React, { useState } from 'react';
import { Text, View, TextInput} from 'react-native';
import * as Styles from '../Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';


export default function FirstTimeUseQuiz(): React.JSX.Element {
    const [selectedValue, setSelectedValue] = useState('option1');

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Sedentary (little to no exercise)', value: 'sedentary'},
        {label: 'Light (exercise 1-3 times per week)', value: 'light'},
        {label: 'Moderate (exercise 4-5 times per week)', value: 'moderate'},
        {label: 'Active (Intense exercise 3-4 times per week)', value: 'active'},
        {label: 'Very Active (Intense exercise 5-7 times per week)', value: 'veryActive'},
        {label: 'Extremely Active (Very intense everyday, or pyhsically demanding job)', value: 'extremelyActive'}
    ]);
  
    return (
        <View>
            <Text style={Styles.TextStyles.title}>About You</Text>
            <Text style={Styles.TextStyles.text}>To determine your daily calorie goal, we need the following information</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={Styles.TextStyles.subtitle}>Sex</Text>
                {/* <Text>Choose an option:</Text> */}
                <RadioButton.Group onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="male" color="blue" />
                        <Text style={Styles.TextStyles.text}>Male</Text>
                        
                        <RadioButton value="female" color="blue" />
                        <Text style={Styles.TextStyles.text}>Female</Text>
                    </View>
                </RadioButton.Group>
                {/* <Text>Selected Value: {selectedValue}</Text> */}
            </View>
            <Text style={Styles.TextStyles.subtitle}>Age</Text>
            <TextInput placeholder="Enter here..." onChangeText={newText => setText(newText)} />
            <Text style={Styles.TextStyles.subtitle}>Height</Text>
            <TextInput placeholder="Enter here..." onChangeText={newText => setText(newText)} />
            <Text style={Styles.TextStyles.subtitle}>Weight</Text>
            <TextInput placeholder="Enter here..." onChangeText={newText => setText(newText)} />
            <Text style={Styles.TextStyles.subtitle}>Activity Rate</Text>
            <DropDownPicker open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} />
            <View>
                <View style={{ marginTop: 30, width: '90%', height: '50%', borderRadius: 15, backgroundColor: '#8a8a8a', flexDirection: 'row', justifyContent: 'space-around', alignSelf:'center'}}>
                    <Text style={Styles.TextStyles.heading}>Calorie Goal:</Text>
                    <View style={{ flexDirection: 'row', alignContent: 'space-between'}}>
                        <Text style={Styles.TextStyles.heading}>Weight Loss</Text>
                        <Text style={Styles.TextStyles.heading}>Weight Gain</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
