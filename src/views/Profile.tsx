import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Styles  from '../Styles';


export default function Profile(): React.JSX.Element {
  const [showBox, setShowBox] = useState<boolean>(false);
    return (
        
        <View>
      <TouchableOpacity onPress={() => setShowBox(!showBox)}>
        <Text style = {Styles.TextStyles.title}>Reminders and Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowBox(!showBox)}>
        <Text style = {Styles.TextStyles.title}>Units</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowBox(!showBox)}>
        <Text style = {Styles.TextStyles.title}>User Details</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowBox(!showBox)}>
        <Text style = {Styles.TextStyles.title}>Weight Goals</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowBox(!showBox)}>
        <Text style = {Styles.TextStyles.title}>Display & Accessibility</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowBox(!showBox)}>
        <Text style = {Styles.TextStyles.title}>Statistics & Trends</Text>
      </TouchableOpacity>
      
        </View>
    )

}