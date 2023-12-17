import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';

function Home({ navigation }) {

  const machineData = [
    { id: 1, name: 'Machine 1', position: { x: 0, y: 0 } },
    { id: 2, name: 'Machine 2', position: { x: 1, y: 0 } },
    { id: 3, name: 'Machine 3', position: { x: 2, y: 0 } },
    { id: 4, name: 'Machine 4', position: { x: 0, y: 1 } },
    { id: 5, name: 'Machine 5', position: { x: 1, y: 1 } },
    { id: 6, name: 'Machine 6', position: { x: 2, y: 1 } },
    { id: 7, name: 'Machine 7', position: { x: 3, y: 2 } },
    { id: 8, name: 'Machine 8', position: { x: 4, y: 2 } },
    { id: 9, name: 'Machine 9', position: { x: 5, y: 2 } },
    { id: 10, name: 'Machine 10', position: { x: 6, y: 10 } },
    // Add more machines with their positions
  ];

  // size of 1 container
  const containerSize = 100; // Adjust based on your design

  // Render item component for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMachinePress(item)}>
      <View style={{
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
        position: 'absolute',
        left: item.position.x * containerSize,
        top: item.position.y * containerSize,
        width: containerSize,
        height: containerSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
<ScrollView
  horizontal
  vertical
  style={{ flex: 1 }}
  contentContainerStyle={{
    flexGrow: 1,
    // dynamically calculate width based on the number of machines
    width: machineData.length * containerSize,
    // dynamically calculate height based on the maximum y position
    height: Math.max(...machineData.map(item => item.position.y + 1)) * containerSize,
  }}
>
  {machineData.map((item) => renderItem({ item }))}
</ScrollView>
  );
}

export default Home;
