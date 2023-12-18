import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, PinchGestureHandler, State } from 'react-native-gesture-handler';

function Home({ navigation }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const machineData = [
    { name: 'Machine 1', position: { x: 0, y: 0 } },
    { name: 'Machine 2', position: { x: 1, y: 0 } },
    { name: 'Machine 3', position: { x: 2, y: 0 } },
    { name: 'Machine 4', position: { x: 3, y: 0 } },
    { name: 'Machine 5', position: { x: 4, y: 8 } },
    { name: 'Machine 6', position: { x: 7, y: 18 } },
    { name: 'Machine 7', position: { x: 24, y: 15 } },
  ];

  const containerSize = 100;
  const sensitivity = 0.2; // Adjust the zoom sensitivity as needed
  const minZoomLevel = 0.5; // Adjust the minimum zoom level
  const maxZoomLevel = 2; // Adjust the maximum zoom level
  const padding = 50; // Adjust the padding as needed



  const handleMachinePress = (item) => {
    // Handle machine press event
  };

  const handlePinch = (event) => {
    const scale = event.nativeEvent.scale;

    // Adjust the zoom level within the specified range with sensitivity
    setZoomLevel((prevZoom) => {
      const newZoom = prevZoom * (1 + sensitivity * (scale - 1));
      return Math.min(Math.max(newZoom, minZoomLevel), maxZoomLevel);
    });
  };

  const calculateContentSize = () => {
    const maxX = Math.max(...machineData.map((item) => item.position.x)) + 1;
    const maxY = Math.max(...machineData.map((item) => item.position.y)) + 1;

    const contentWidth = maxX * containerSize * zoomLevel + padding * 2;
    const contentHeight = maxY * containerSize * zoomLevel + padding * 2;

    return { contentWidth, contentHeight };
  };

  const { contentWidth, contentHeight } = calculateContentSize();

  const renderItem = ({ item }) => {
    const adjustedSize = containerSize * zoomLevel;
    const adjustedX = item.position.x * adjustedSize + padding;
    const adjustedY = item.position.y * adjustedSize + padding;

    return (
      <TouchableOpacity onPress={() => handleMachinePress(item)}>
        <View
          style={{
            padding: 10,
            margin: 5,
            borderWidth: 1,
            borderColor: 'black',
            position: 'absolute',
            left: adjustedX,
            top: adjustedY,
            width: adjustedSize,
            height: adjustedSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <PinchGestureHandler onGestureEvent={handlePinch}>
      <ScrollView
        horizontal
        vertical
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          width: contentWidth,
          height: contentHeight,
        }}
      >
        {machineData.map((item) => renderItem({ item }))}
      </ScrollView>
    </PinchGestureHandler>
  );
}

export default Home;