import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import * as styles from '../Styles';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import * as dbm from '../services/DBManager';
import * as validate from '../services/Validator'




export default function Profile(): React.JSX.Element {

  // states for different components and storing user data

const [input, setInput] = useState(false);

const [user, setUser] = useState(false);

const [userName, setUserName] = useState(""); 

const [userAge, setUserAge] = useState(""); 

const [userHeight, setUserHeight] = useState(""); 

const [userWeight, setUserWeight] = useState(""); 

const [userGoal, setUserGoal] = useState(""); 

const [userDaily, setUserDaily] = useState(""); 

const [userActive, setUserActive] = useState(""); 

const [userEnd, setUserEnd] = useState(""); 

// database function to update stored user details

const updateUserDetails = async () => {
  try {
   
    const db = await dbm.connectToDatabase();

    await dbm.setUserData(db, {
      name: userName,
      age: parseInt(userAge),
      height: parseFloat(userHeight),
      weight: parseInt(userWeight),
      goal: parseFloat(userGoal),
      daily: parseFloat(userDaily),
      howActive: parseInt(userActive),
      end: undefined 
    });
    
    await db.close();

  } catch (error) {
    console.error("Error updating user details:", error);
  }
};




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
          <RadioButton value="user" color="blue" />
          <Text>Set Notifications</Text>
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
          value={userName}
          onChangeText={setUserName}
        />
        
      )}
      {user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update Age"
          value={userAge}
          onChangeText={setUserAge}
        />
        
      )}
      {user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update Height"
          value={userHeight}
          onChangeText={setUserHeight}
        />
        
      )}
      {user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update Weight"
          value={userWeight}
          onChangeText={setUserWeight}
        />
        
      )}
       {user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update Daily Intake"
          value={userDaily}
          onChangeText={setUserDaily}
        />
        
      )}
       {user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update Activity Level"
          value={userActive}
          onChangeText={setUserActive}
        />
        
      )}

{user && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Update end date"
          value={userEnd}
          onChangeText={setUserEnd}
        />
        
      )}

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={weightGoalPress}>
        <Text style = {styles.TextStyles.subtitle}>Weight Goals</Text>
      </TouchableOpacity>
      {input && (
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 5, width: 200 }}
          placeholder="Enter weight goal"
          
          
        />
      )}

      <TouchableOpacity style = {styles.InputStyles.button_primary} onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Display & Accessibility</Text>
      </TouchableOpacity>
     

      <TouchableOpacity
        style={styles.InputStyles.button_primary}
        onPress={updateUserDetails} 
      >
        <Text style={styles.TextStyles.subtitle}>Save Changes</Text>
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


