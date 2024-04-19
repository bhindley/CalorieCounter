import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import * as styles from '../Styles'
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';



export default function Profile(): React.JSX.Element {

const [input, setInput] = useState(false)

const weightGoalPress = () => {
  setInput(true);
}
const [selectedUnit, setSelectedUnit] = useState(null);

  const units = [
    { label: 'Kilograms', value: 'Kilograms' },
    { label: 'Pounds', value: 'Pounds' },
    
  
  ];

  return (
    <View style={container.container}>
      <Text style = {styles.TextStyles.title}>Settings</Text>

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Reminders & Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Units</Text>
      </TouchableOpacity>
      
      
      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>User Details</Text>
      </TouchableOpacity>

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


