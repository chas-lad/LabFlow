import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { ScrollView, PinchGestureHandler } from 'react-native-gesture-handler';

function MachineGrid({ navigation }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLabID, setSelectedLabID] = useState(null);
  const [labs, setLabs] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setSelectedMachine(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMachine(null);
  };

  const renderModalContent = () => {
    if (!selectedMachine) return null;

    return (
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>{`Machine Specification:`}</Text>
            <Text>{selectedMachine.specification}</Text>
            {/* uncomment below if I decide at later stage to include a close button */ }
            {/* <TouchableOpacity onPress={closeModal}>
              <Text>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
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

    return { contentWidth, contentHeight };
  };

  const { contentWidth, contentHeight } = calculateContentSize();

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

  const renderItem = ({ item }) => {
    const adjustedSize = containerSize * zoomLevel;
    const adjustedX = item.xPos * adjustedSize + padding;
    const adjustedY = item.yPos * adjustedSize + padding;

    // Determine the background color based on the presence of userID
    const backgroundColor = item.userID ? 'red' : 'green';

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
            backgroundColor: backgroundColor,
          }}
        >
          <Text>{`Machine ID: ${item.machineID}`}</Text>
          <Text>{`User ID: ${item.userID || 'NULL'}`}</Text>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Styling to help distinguish the FlatList(labs selection) and ScrollView(machines selection)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    flatList: {
      height: Dimensions.get('window').height * 0.1, // This will take up 10% of the height
    },
    scrollView: {
      height: Dimensions.get('window').height * 0.9, // This will take up 90% of the height
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with some transparency
      justifyContent: 'center',
    },
    modalContent: {
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5, // Android elevation for shadow
    },
  });

  return (
    <View style={styles.container}>
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
          {machineData.map((item) => renderItem({ item, key: item.machineID.toString() }))}
        </ScrollView>
      </PinchGestureHandler>

      <Modal visible={isModalVisible} transparent animationType="slide">
        {renderModalContent()}
      </Modal>
    </View>
  );
}

export default MachineGrid;