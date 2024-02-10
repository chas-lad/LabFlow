import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { ScrollView, PinchGestureHandler } from 'react-native-gesture-handler';
import { useAuth } from './AuthContext';


const apiKey = process.env.EXPO_PUBLIC_API_KEY;

function MachineGrid() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLabID, setSelectedLabID] = useState(null);
  const [labs, setLabs] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTicketFormVisible, setIsTicketFormVisible] = useState(false);
  const { loggedInUser } = useAuth();
  const [ticketFormData, setTicketFormData] = useState({
    machineID: selectedMachine ? selectedMachine.machineID : "",
    userID: loggedInUser.id, 
    issueDescription: "",
    issueStatus: 1, 
    dateCreated: new Date().toISOString(), // Automatically set the creation date
    dateResolved: "" // Initially empty until resolved
  });
  const [errorMessage, setErrorMessage] = useState(null); // State for error message



  useEffect(() => {

    const fetchLabsFromDatabase = async () => {
      // Fetch labs from the database and update the state
      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/labs?',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
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
            'x-api-key': apiKey,
          },
          body: JSON.stringify({ labID: selectedLabID }),
        }
      );
      
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

  const handleTicketFormSubmit = async () => {
    try {
      // Check if issue description exceeds the character limit
      if (ticketFormData.issueDescription.length > 1000) {
        setErrorMessage('Issue description cannot exceed 1000 characters.'); // Set error message
        return; // Prevent submission
      }

      if (ticketFormData.issueDescription.length == 0) {
        setErrorMessage('Issue description cannot be empty.'); // Set error message
        return; // Prevent submission
      }

      // Make a POST request to your backend API to create a ticket
      const response = await fetch('https://labflowbackend.azurewebsites.net/api/tickets?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(ticketFormData),
      });

      // Handle response as needed
      if (response.ok) {
        // Ticket created successfully
        // You may close the form modal and show a success message
        handleCloseTicketForm();
      } else {
        // Handle error response
        console.error('Failed to create ticket:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleCloseTicketForm = () => {
    setIsTicketFormVisible(false);
    // Reset ticket form data if needed
    setTicketFormData({
      machineID: selectedMachine ? selectedMachine.machineID : "",
      userID: loggedInUser.id,
      issueDescription: "",
      issueStatus: 1,
      dateCreated: new Date().toISOString(),
      dateResolved: ""
    });
    // Reset error message
    setErrorMessage(null);
  };

  const renderModalContent = () => {
    if (!selectedMachine) return null;
  
    return (
      <React.Fragment>
        {/* Machine Specification Modal */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{`Machine Specification:`}</Text>
              <Text style={styles.modalText}>{selectedMachine.specification ? selectedMachine.specification : 'Specification not available'}</Text>
              <Text style={styles.modalTitle}>{`Machine Issues:`}</Text>
              <Text style={styles.modalText}>{selectedMachine.commonIssues ? selectedMachine.commonIssues : 'No issues listed'}</Text>
              <TouchableOpacity onPress={() => setIsTicketFormVisible(true)}>
                <Text style={styles.ticketButton}>Report Issue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        
        {/* Report Issue Modal */}
        <Modal visible={isTicketFormVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={handleCloseTicketForm}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {/* Ticket form components */}
                <Text style={styles.ticketText}>Please enter an issue of the description below:</Text>
                <TextInput
                  value={ticketFormData.issueDescription}
                  onChangeText={(text) => setTicketFormData({...ticketFormData, issueDescription: text})}
                  style={styles.input}
                  maxLength={1000}
                />
                <TouchableOpacity onPress={handleTicketFormSubmit}>
                  <Text style={styles.submitButton}>Submit Ticket</Text>
                </TouchableOpacity>
                {errorMessage && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
                )}
                {/* No need for a close button here */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </React.Fragment>
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
      borderRadius: 10,
    },
    scrollView: {
      height: Dimensions.get('window').height * 0.9, // This will take up 90% of the height
      borderRadius: 10,
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
    modalContent: {
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5, // Android elevation for shadow
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333', // Text color
    },
    modalText: {
      fontSize: 16,
      color: '#555', // Text color
      marginBottom: 15,
    },
    // Styles for the report issue button
    ticketButton: {
      backgroundColor: '#4CAF50', // Green color
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    ticketButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },

    // Styles for the report issue modal
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%', // 80% of the screen width
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333', // Text color
    },
    modalText: {
      fontSize: 16,
      color: '#555', // Text color
      marginBottom: 15,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 15,
    },
    submitButton: {
      backgroundColor: '#4CAF50', // Green color
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: '#f44336', // Red color
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    ticketText: {
      
      textAlign: 'center',
    
    }

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
          {machineData.map((item) => (
            // Correct placement of the key prop
            <React.Fragment key={item.machineID.toString()}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </ScrollView>
      </PinchGestureHandler>
      <Modal visible={isModalVisible} transparent animationType="slide">
        {renderModalContent()}
      </Modal>
    </View>
  );
}

export default MachineGrid;