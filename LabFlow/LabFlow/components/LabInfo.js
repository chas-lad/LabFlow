import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LabInfo = () => {
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
  }, []);

  useEffect(() => {
    const fetchMachineDataFromDatabase = async () => {
      try {
        const response = await fetch(
          'https://labflowbackend.azurewebsites.net/api/machines?',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
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

        setCapacity(Math.round(currentCapacity/maxCapacity * 100));
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
    <View>
      <Text>Select Lab:</Text>
      <Picker
        selectedValue={selectedLabId}
        onValueChange={(itemValue) => setSelectedLabId(itemValue)}
      >
        {labs.map((lab) => (
          <Picker.Item key={lab.id} label={lab.labName} value={lab.id} />
        ))}
      </Picker>
      {selectedLabId &&
        labs.find((lab) => lab.id == selectedLabId)?.wheelchairAccess && (
          <Text>This lab is wheelchair accessible</Text>
        )}
      {selectedLabId &&
          <Text>Lab location: {labs.find((lab) => lab.id == selectedLabId)?.locationDescription}</Text>
        }
      {capacity && (
        <Text style={{ color: getCapacityColor(), fontSize: 50, fontWeight: 'bold' }}>Capacity: {capacity}%</Text>
      )}
    </View>
  );
};

export default LabInfo;
