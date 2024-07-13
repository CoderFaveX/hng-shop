import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MontText from './MontText';

const RadioButton = () => {
  const [selectedOption, setSelectedOption] = useState('Old Secretariat Complex, Area 1, Garki Abaji Abji');

  const handlePress = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => handlePress('Old Secretariat Complex, Area 1, Garki Abaji Abji')}
      >
        <View style={styles.radioButton}>
          {selectedOption === 'Old Secretariat Complex, Area 1, Garki Abaji Abji' && <View style={styles.radioButtonSelected} />}
        </View>
        <MontText style={styles.radioLabel} monttype={"Mont"}>Old Secretariat Complex, Area 1, Garki Abaji Abji</MontText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => handlePress('Sokoto Street, Area 1, Garki Area 1 AMAC')}
      >
        <View style={styles.radioButton}>
          {selectedOption === 'Sokoto Street, Area 1, Garki Area 1 AMAC' && <View style={styles.radioButtonSelected} />}
        </View>
        <MontText style={styles.radioLabel} monttype={"Mont"}>Sokoto Street, Area 1, Garki Area 1 AMAC</MontText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FF7F7D',
  },
  radioLabel: {
    fontSize: 12.3,
  },
});

export default RadioButton;
