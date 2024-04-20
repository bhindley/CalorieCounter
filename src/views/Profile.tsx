import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import * as styles from '../Styles'
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';



export default function Profile(): React.JSX.Element {

const [input, setInput] = useState(false)

const [user, setUser] = useState(false)

const [showRadioButton, setShowRadioButton] = useState(false);

const [selectedValue, setSelectedValue] = useState("option1");

const radioButtonPress = () => {
  setShowRadioButton(!showRadioButton);
};

const radioButtonChange = (value: string) => {
  setSelectedValue(value);
};

const userDetailsPress = () => {
  setUser(true);
}

const weightGoalPress = () => {
  setInput(true);
}

const unitPress = () => {
  setOpen(true);
}

const reminderPress = () => {
  setOpen(true);
}
const [text, setText] = useState("");
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([

		{label: "Kilograms", value: "kg"},
		{label: "Pounds", value: "lb/s"},
		
	]);



  return (
    <View style={container.container}>
      

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={radioButtonPress}>
        <Text style = {styles.TextStyles.subtitle}>Reminders & Notifications</Text>
      </TouchableOpacity>
      {showRadioButton && (
        <RadioButton.Group onValueChange={radioButtonChange} value={selectedValue}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <RadioButton value="male" color="blue" />
          <Text>Set Notifications?</Text>
        </View>
      </RadioButton.Group>
      )}

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={unitPress}>
        <Text style = {styles.TextStyles.subtitle}>Units</Text>
      </TouchableOpacity>
      {open && (
        <DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
			/>
        
      )}
      
      
      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={userDetailsPress}>
        <Text style = {styles.TextStyles.subtitle}>User Details</Text>
      </TouchableOpacity>
      {user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update Name"
        />
        
      )}
      {user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update Age"
        />
        
      )}

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={weightGoalPress}>
        <Text style = {styles.TextStyles.subtitle}>Weight Goals</Text>
      </TouchableOpacity>
      {input && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Enter new weight"
        />
      )}

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Display & Accessibility</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Statistics & Trends</Text>
      </TouchableOpacity>
    </View>
  );
}

const container = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 10,
  }
})


