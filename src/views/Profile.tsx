import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as styles from '../Styles'

export default function Profile(): React.JSX.Element {
  return (
    <View style={{ flex: 1,}}>
      <TouchableOpacity onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Reminders & Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Units</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>User Details</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Weight Goals</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Display & Accessibility</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style = {styles.TextStyles.subtitle}>Statistics & Trends</Text>
      </TouchableOpacity>
    </View>
  );
}


