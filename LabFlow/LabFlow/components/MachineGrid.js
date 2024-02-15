///////////////////////////////////////////////////////////
// Title:       MachineGrid.js
// Description: Code to display the machine grid view and
//              handles visibility of machine details
//              modal and report issue modal
///////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Modal, Switch } from 'react-native';
import { ScrollView, PinchGestureHandler } from 'react-native-gesture-handler';
import { useAuth } from './AuthContext';

import Filter from './Filter'; // Import the Filter component
import MachineGridModal from './MachineGridModal'; // Import MachineGridModal component

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

function MachineGrid() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLabID, setSelectedLabID] = useState(1);
  const [labs, setLabs] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterSpecs, setFilterSpecs] = useState({
    VRHeadset: false,
    CPU: '',
    RAM: '',
    GPU: ''
  });
  const [filteredList, setFilteredList] = useState([]);
  const [filterEnabled, setFilterEnabled] = useState(false); // State for filter toggle
  const { loggedInUser } = useAuth();

  // Fetch the labs from the database and update the state on component mount
  useEffect(() => {
    const fetchLabsFromDatabase = async () => {
      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/labs?',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          }
        }
      );

      const fetchedLabs = await response.json();
      setLabs(fetchedLabs);

      // Initially select the first lab to display to the user
      if (fetchedLabs.length > 0) {
        setSelectedLabID(fetchedLabs[0].id);
      }
    };

    fetchLabsFromDatabase();
  }, []);

  // Fetch the relevant lab's machine data based on the selected lab,
  // hence dependency array on 'selectedLabID' variable
  useEffect(() => {
    const fetchMachineDataFromDatabase = async () => {
      try {
        // Fetch machines based on the selected lab and update the state
        const response = await fetch(
          `https://labflowbackend.azurewebsites.net/api/machines?labID=${selectedLabID}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            },
          }
        );

        const fetchedMachines = await response.json();

        setMachineData(fetchedMachines);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    fetchMachineDataFromDatabase();
  }, [selectedLabID]);

  // Set up filter options for CPU, RAM, and GPU based on available values in machineData
  useEffect(() => {
    const cpuSet = new Set();
    const ramSet = new Set();
    const gpuSet = new Set();

    machineData.forEach(machine => {
      cpuSet.add(machine.CPU);
      ramSet.add(machine.RAM);
      gpuSet.add(machine.GPU);
    });

    const cpuOptions = Array.from(cpuSet);
    const ramOptions = Array.from(ramSet);
    const gpuOptions = Array.from(gpuSet);

    setFilterSpecs(prev => ({
      ...prev,
      CPU: cpuOptions[0] || '',
      RAM: ramOptions[0] || '',
      GPU: gpuOptions[0] || ''
    }));
  }, [machineData]);

  // Filter machines based on filter specifications only if filterEnabled is true
  useEffect(() => {
    if (filterEnabled) {
      const filteredMachines = machineData.map(machine => ({
        ...machine,
        clickable: (!filterSpecs.VRHeadset || machine.VRHeadset) &&
          (filterSpecs.CPU === '' || machine.CPU === filterSpecs.CPU) &&
          (filterSpecs.RAM === '' || machine.RAM === filterSpecs.RAM) &&
          (filterSpecs.GPU === '' || machine.GPU === filterSpecs.GPU),
      }));

      setFilteredList(filteredMachines);
    } else {
      // If filter is not enabled, display all machines and make them clickable
      const allMachinesClickable = machineData.map(machine => ({
        ...machine,
        clickable: true,
      }));
      setFilteredList(allMachinesClickable);
    }
  }, [machineData, filterSpecs, filterEnabled]);

  // Function to toggle filter
  const toggleFilter = () => {
    setFilterEnabled(prev => !prev);
  };

  const containerSize = 100; // Each machine is represented by a square container
  const sensitivity = 0.2; // Zoom sensitivity 
  const minZoomLevel = 0.5; // Minimum zoom level
  const maxZoomLevel = 2; // Maximum zoom level
  const padding = 50; // Padding between containers

  const handleMachinePress = (item) => {
    setSelectedMachine(item);
    setIsModalVisible(true);
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
  
    // Ensure filteredList is not empty before processing
    if (filteredList.length > 0) {
      filteredList.forEach((item) => {
        maxX = Math.max(maxX, item.xPos);
        maxY = Math.max(maxY, item.yPos);
      });
  
      // Add spacing between machines
      const spacing = 10; // Adjust this value to match the spacing used in renderItem
      maxX += 1; // Add 1 to include the last position
      maxY += 1; // Add 1 to include the last position
  
      // Calculate the total width including machines and spacing
      const totalWidth = maxX * (containerSize * zoomLevel + spacing) + padding * 2;
  
      // Ensure the content width is at least equal to the width of the screen
      const contentWidth = Math.max(totalWidth, Dimensions.get('window').width);
  
      const contentHeight = maxY * containerSize * zoomLevel + padding * 2;
  
      return { contentWidth, contentHeight };
    }
  
    // If filteredList is empty, return default content size
    return { contentWidth: 0, contentHeight: 0 };
  };
  
  const { contentWidth, contentHeight } = calculateContentSize();

  // Render the tabs for lab selection
  const renderTab = ({ item }) => (
    <TouchableOpacity
      key={item.id.toString()} 
      onPress={() => setSelectedLabID(item.id)}
      style={{
        padding: 10,
        height: 40,
        backgroundColor: selectedLabID === item.id ? 'lightblue' : 'white',
      }}
    >
      <Text>{item.labName}</Text>
    </TouchableOpacity>
  );

  // Render the machine containers
  const renderItem = ({ item }) => {
    const adjustedSize = containerSize * zoomLevel;
    const spacing = 10; // Spacing between containers
    const adjustedX = item.xPos * (adjustedSize + spacing);
    const adjustedY = item.yPos * (adjustedSize + spacing);

    // Determine the background color based on the presence of userID
    const backgroundColor = item.userID ? '#b5244d' : '#36a33d';

    return (
      <TouchableOpacity
        onPress={() => handleMachinePress(item)}
        disabled={!item.clickable}
        activeOpacity={item.clickable ? 1 : 0.5}
      >
        <View
          style={{
            padding: 10,
            margin: 5,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'black',
            position: 'absolute',
            left: adjustedX,
            top: adjustedY,
            width: adjustedSize,
            height: adjustedSize,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: item.clickable ? backgroundColor : '#ccc', // Grey out non-clickable machines
            opacity: item.clickable ? 1 : 0.5, // Reduce opacity for unclickable machines
          }}
        >
          <Text>{`Machine ID: ${item.machineID}`}</Text>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter Toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Switch
          value={filterEnabled}
          onValueChange={toggleFilter}
          style={{ marginRight: 10 }}
        />
        <Text>Filter Machines</Text>
      </View>
      {/* Filter Button */}
      <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={{ padding: 10, backgroundColor: 'lightblue', marginBottom: 10 }}>
        <Text>Change Filters</Text>
      </TouchableOpacity>

      {/* Render the Filter component */}
      <Filter
        filterModalVisible={filterModalVisible}
        setFilterModalVisible={setFilterModalVisible}
        filterSpecs={filterSpecs}
        setFilterSpecs={setFilterSpecs}
        machineData={machineData}
      />

      {/* Horizontal FlatList for tabs */}
      <FlatList
        style={styles.flatList}
        horizontal
        data={labs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTab}
      />
      {/* PinchGestureHandler ScrollView for machines */}
      <PinchGestureHandler onGestureEvent={handlePinch} style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          horizontal
          vertical
          contentContainerStyle={{
            flexGrow: 1,
            width: contentWidth,
            height: contentHeight,
          }}
        >
          {filteredList.map((item) => (
            // Correct placement of the key prop
            <React.Fragment key={item.machineID.toString()}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </ScrollView>
      </PinchGestureHandler>
      <Modal visible={isModalVisible} transparent animationType="slide">
        <MachineGridModal
          selectedMachine={selectedMachine}
          loggedInUser={loggedInUser}
          closeModal={() => setIsModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    height: Dimensions.get('window').height * 0.1,
    borderRadius: 10,
  },
  scrollView: {
    height: Dimensions.get('window').height * 0.9,
    borderRadius: 10,
  },
});

export default MachineGrid;