import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Capacity = () => {
  const [selectedLabId, setSelectedLabId] = useState(null); // Use lab ID instead of the entire lab object
  const [labs, setLabs] = useState([]);

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
    </View>
  );
};

export default Capacity;
