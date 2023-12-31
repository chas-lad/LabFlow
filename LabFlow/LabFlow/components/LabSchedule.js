import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const LabSchedule = ({ navigation, reloadComponent }) => {
  const [schedule, setSchedule] = useState([]);
  const [collapsedDays, setCollapsedDays] = useState([]);

  const fetchScheduleFromDatabase = async () => {
    try {
      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/labSchedule?',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
        }
      );
  
      const fetchedSchedule = await response.json();
  
      // Group labs by dayOfWeek
      const groupedSchedule = fetchedSchedule.reduce((acc, item) => {
        const day = item.dayOfWeek;
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(item);
        return acc;
      }, {});
  
      // Sort labs within each day by startTime
      const sortedGroupedSchedule = Object.entries(groupedSchedule).reduce(
        (acc, [title, data]) => {
          const sortedData = data.sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
          );
          acc[title] = sortedData;
          return acc;
        },
        {}
      );
  
      const transformedSchedule = Object.entries(sortedGroupedSchedule).map(
        ([title, data]) => ({
          title,
          data,
        })
      );
  
      setSchedule(transformedSchedule);
  
      // Initialize collapsedDays with all days collapsed
      setCollapsedDays(transformedSchedule.map((section) => section.title));
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  useEffect(() => {
    fetchScheduleFromDatabase();
  }, [reloadComponent]);

  const renderSectionHeader = ({ section }) => (
    <TouchableOpacity onPress={() => toggleSection(section.title)}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    </TouchableOpacity>
  );
  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.module}</Text>
      <Text style={styles.itemText}>Staff: {item.lecturerName}</Text>
      <Text style={styles.itemText}>Start Time: {item.startTime}</Text>
      <Text style={styles.itemText}>Class Length: {item.classLength}</Text>
      <Text style={styles.itemText}>Lab: {item.labName}</Text>
    </View>
  );

  const toggleSection = (day) => {
    setCollapsedDays((prevCollapsedDays) =>
      prevCollapsedDays.includes(day)
        ? prevCollapsedDays.filter((collapsedDay) => collapsedDay !== day)
        : [...prevCollapsedDays, day]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab Schedule</Text>
      {schedule && schedule.length > 0 ? (
        <SectionList
          sections={schedule}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          renderSectionFooter={() => <View style={styles.separator} />}
          extraData={collapsedDays} // Ensure re-render when collapsedDays changes
        />
      ) : (
        <Text style={styles.noDataText}>No schedule data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  noDataText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LabSchedule;