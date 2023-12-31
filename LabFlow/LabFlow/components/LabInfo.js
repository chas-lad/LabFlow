import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const LabInfo = ({ navigation, reloadComponent }) => {
  const [selectedLabId, setSelectedLabId] = useState(null);
  const [labs, setLabs] = useState([]);
  const [capacity, setCapacity] = useState(null);

  useEffect(() => {
    const fetchLabsFromDatabase = async () => {
      try {
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

        // Initially select the first lab's ID
        if (fetchedLabs.length > 0) {
          setSelectedLabId(fetchedLabs[0].id); // Set the lab ID
        }
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabsFromDatabase();
  }, [reloadComponent]);

  useEffect(() => {
    const fetchMachineDataFromDatabase = async () => {
      try {
        const response = await fetch(
          'https://labflowbackend.azurewebsites.net/api/machines?',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            },
            body: JSON.stringify({ labID: selectedLabId }), // Send the lab ID to the backend
          }
        );

        const fetchedMachines = await response.json();

        // Calculate the maximum capacity of the lab
        let maxCapacity = 0;
        fetchedMachines.forEach((machine) => {
          maxCapacity += 1;
        });
        // Calculate the number of machines that are currently in use
        let currentCapacity = 0;
        fetchedMachines.forEach((machine) => {
          if (machine.userID != null) {
            currentCapacity += 1;
          }
        });

        setCapacity(Math.round((currentCapacity / maxCapacity) * 100));
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    if (selectedLabId !== null) {
      fetchMachineDataFromDatabase();
    }
  }, [selectedLabId]);

  // Function to determine the color based on capacity
  const getCapacityColor = () => {
    if (capacity <= 33) {
      return 'green';
    } else if (capacity <= 67) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Lab</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedLabId}
        onValueChange={(itemValue) => setSelectedLabId(itemValue)}
      >
        {labs.map((lab) => (
          <Picker.Item key={lab.id} label={lab.labName} value={lab.id} />
        ))}
      </Picker>
      {selectedLabId &&
        labs.find((lab) => lab.id == selectedLabId)?.wheelchairAccess && (
          <Text style={styles.accessText}>This lab is wheelchair accessible</Text>
        )}
      {selectedLabId && (
        <Text style={styles.locationText}>
          {labs.find((lab) => lab.id == selectedLabId)?.locationDescription}
        </Text>
      )}
      {capacity && (
        <Text style={[styles.capacityText, { color: getCapacityColor() }]}>
          {capacity}% Spaces Occupied
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0', // Background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Text color
  },
  picker: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff', // Picker background color
    borderRadius: 5,
  },
  accessText: {
    fontSize: 20,
    marginBottom: 8,
    color: 'green', // Access text color
    textAlign: 'center',
  },
  locationText: {
    fontSize: 20,
    marginBottom: 8,
    color: '#333', // Location text color
    textAlign: 'center',
  },
  capacityText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LabInfo;
