import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;


function MachineGridModal({ selectedMachine, loggedInUser, closeModal }) {
  const [isTicketFormVisible, setIsTicketFormVisible] = useState(false);
  const [ticketFormData, setTicketFormData] = useState({
    machineID: selectedMachine ? selectedMachine.machineID : "",
    userID: loggedInUser.id, 
    issueDescription: "",
    issueStatus: 1, 
    dateCreated: new Date().toISOString(),
    dateResolved: ""
  });
  const [errorMessage, setErrorMessage] = useState(null);

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
    setTicketFormData({
      machineID: selectedMachine ? selectedMachine.machineID : "",
      userID: loggedInUser.id,
      issueDescription: "",
      issueStatus: 1,
      dateCreated: new Date().toISOString(),
      dateResolved: ""
    });
    setErrorMessage(null);
  };

  const renderModalContent = () => {
    if (!selectedMachine) return null;

    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Machine Specification:</Text>
              <Text style={styles.modalText}>{selectedMachine.specification || 'Specification not available'}</Text>
              <Text style={styles.modalTitle}>Machine Issues:</Text>
              <Text style={styles.modalText}>{selectedMachine.commonIssues || 'No issues listed'}</Text>
              <TouchableOpacity onPress={() => setIsTicketFormVisible(true)}>
                <Text style={styles.ticketButton}>Report Issue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        
        <Modal visible={isTicketFormVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={handleCloseTicketForm}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.ticketText}>Please enter an issue description below:</Text>
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
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </React.Fragment>
    );
  };

  return renderModalContent();
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  ticketButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  ticketText: {
    textAlign: 'center',
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
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  }
});

export default MachineGridModal;
