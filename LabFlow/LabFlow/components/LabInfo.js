///////////////////////////////////////////////////////////
// Title:       LabInfo.js
// Description: Code to manage the home screen, showing
//              lab capacity, description and location
///////////////////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const LabInfo = () => {
  const [selectedLabId, setSelectedLabId] = useState(null);
  const [labs, setLabs] = useState([]);
  const [capacity, setCapacity] = useState(null);
  const [mapRegion, setMapRegion] = useState(null); // State to manage the map region

  const mapRef = useRef(null); // Reference to the MapView component

  // Fetch the labs from the database on component mount
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

        // Initially select the first lab's ID, we are presuming there is at least one lab
        if (fetchedLabs.length > 0) {
          setSelectedLabId(fetchedLabs[0].id); // Set the lab ID
        }
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabsFromDatabase();
  }, []);

  // Fetch the relevant lab's machine data based on the selected lab,
  // hence dependency array on 'selectedLabId' variable
  useEffect(() => {
    const fetchMachineDataFromDatabase = async () => {
      try {
        const response = await fetch(
          `https://labflowbackend.azurewebsites.net/api/machines?labID=${selectedLabId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            }
          }
        );

        const fetchedMachines = await response.json();
        console.log('Fetched machines:', fetchedMachines);
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
        
        // Handle case where capacity is 0
        if (maxCapacity === 0) {
          setCapacity(0);
        }

        setCapacity(Math.round((currentCapacity / maxCapacity) * 100));

        // Get the selected lab's coordinates
        const selectedLab = labs.find((lab) => lab.id === selectedLabId);
        if (selectedLab) {
          const { latitude, longitude } = selectedLab;

          // Set the map region to the selected lab's coordinates
          setMapRegion({
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });

          // Animate map to the marker's location
          mapRef.current.animateToRegion({
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }, 1000); // set duration in ms
        }

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
        (labs.find((lab) => lab.id == selectedLabId)?.wheelchairAccess ? (
          <Text style={styles.accessText}>This lab is wheelchair accessible</Text>
        ) : <Text style={[styles.accessText, { color: 'red' }]}>This lab is not wheelchair accessible</Text> )
      }
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
      {mapRegion && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(mapRegion.latitude),
              longitude: parseFloat(mapRegion.longitude),
            }}
            title={`Lab ${labs.find((lab) => lab.id == selectedLabId)?.labName}`}
          />
        </MapView>
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
    backgroundColor: '#f0f0f0', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', 
  },
  picker: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  accessText: {
    fontSize: 20,
    marginBottom: 8,
    color: 'green',
    textAlign: 'center',
  },
  locationText: {
    fontSize: 20,
    marginBottom: 8,
    color: '#333', 
    textAlign: 'center',
  },
  capacityText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: 200,
    marginVertical: 16,
  },
});

export default LabInfo;
