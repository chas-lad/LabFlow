import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, PinchGestureHandler } from 'react-native-gesture-handler';

function Home({ navigation }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLabID, setSelectedLabID] = useState(null);
  const [labs, setLabs] = useState([]);
  const [machineData, setMachineData] = useState([]);

  // Simulating fetching lab data from the database
  useEffect(() => {

    const fetchLabsFromDatabase = async () => {
      // Fetch labs from the database and update the state
      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/labs?',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const fetchedLabs = await response.json();
      console.log("fetchedLabs", fetchedLabs);
      setLabs(fetchedLabs);

      // Initially select the first lab to display to the user
      if (fetchedLabs.length > 0) {
        setSelectedLabID(fetchedLabs[0].id);
      }
    };

    fetchLabsFromDatabase();
  }, []);

  // Fetch the relevant lab's machine data based on the selected lab, hence dependency array on 'selectedLabID' variable
  useEffect(() => {
    // Replace this with your actual API call to fetch machine data from the database
    const fetchMachineDataFromDatabase = async () => {
      // Fetch machines based on the selected lab and update the state
      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/machines?',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ labID: selectedLabID }),
        }
      );
      
      //fetchedMachines = response.machines;
      const fetchedMachines = await response.json();
      console.log("fetchedMachines", fetchedMachines);
      setMachineData(fetchedMachines);
    };

    fetchMachineDataFromDatabase();
  }, [selectedLabID]);

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

    // Calculate the content size based on the machine data
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    // Ensure machineData is not empty before processing
    if (machineData.length > 0) {
      machineData.forEach((item) => {
        maxX = Math.max(maxX, item.xPos);
        maxY = Math.max(maxY, item.yPos);
      });

      // Add 1 to include the last position
      maxX += 1;
      maxY += 1;
    }

    const contentWidth = maxX * containerSize * zoomLevel + padding * 2;
    const contentHeight = maxY * containerSize * zoomLevel + padding * 2;
    console.log("zoomLevel", zoomLevel);
    console.log("maxX", maxX);
    console.log("maxY", maxY);
    console.log("contentWidth", contentWidth);
    console.log("contentHeight", contentHeight);
    return { contentWidth, contentHeight };
  };

  const { contentWidth, contentHeight } = calculateContentSize();

  const renderTabs = () => {
    return labs.map((lab) => (
      <TouchableOpacity
        key={lab.id}
        onPress={() => setSelectedLabID(lab.id)}
        style={{
          padding: 10,
          height: 40, // Set a fixed height, adjust as needed
          backgroundColor: selectedLabID === lab.id ? 'lightblue' : 'white',
        }}
      >
        <Text>{lab.labName}</Text>
      </TouchableOpacity>
    ));
  };

  const renderItem = ({ item }) => {
    const adjustedSize = containerSize * zoomLevel;
    const adjustedX = item.xPos * adjustedSize + padding;
    const adjustedY = item.yPos * adjustedSize + padding;

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
    <View style={{ flex: 1 }}>
      <ScrollView horizontal>
        {renderTabs()}
      </ScrollView>
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
    </View>
  );
}

export default Home;