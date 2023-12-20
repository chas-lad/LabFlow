import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';

const LabSchedule = () => {
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
  }, []);

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
    
    <View style={{ paddingBottom: 30}}>
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
        <Text>No schedule data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default LabSchedule;
