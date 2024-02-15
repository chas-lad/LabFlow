import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Key = () => {
  return (
    <View style={styles.keyContainer}>
      <View style={[styles.colorSquare, { backgroundColor: '#36a33d' }]} />
      <Text style={styles.keyText}>Available</Text>  
      <View style={[styles.colorSquare, { backgroundColor: '#b5244d' }]} />
      <Text style={styles.keyText}>Unavailable</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  keyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginTop: 7,
  },
  colorSquare: {
    width: 20,
    height: 20,
    marginLeft: 8,
    marginRight: 2,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
  },
  keyText: {
    fontSize: 16,
    marginLeft: 3,
    marginRight: 5,
  },
});

export default Key;
