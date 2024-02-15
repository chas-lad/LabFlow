///////////////////////////////////////////////////////////
// Title:       Filter.js
// Description: Code to display the filter modal for
//              machines and apply filters to the machine
//              grid
///////////////////////////////////////////////////////////
import React from 'react';
import { View, Text, Modal, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Filter = ({
  filterModalVisible,
  setFilterModalVisible,
  filterSpecs,
  setFilterSpecs,
  machineData,
}) => {
  return (
    <Modal visible={filterModalVisible} transparent animationType="slide">
      <View style={styles.filterModalContainer}>
        <View style={styles.filterModalContent}>
          <Text style={styles.modalTitle}>Filter Machines</Text>
        {/* Close button to close the modal */}
          <TouchableOpacity onPress={() => setFilterModalVisible(false)} style={styles.closeButton}>
            <Text style={{ color: 'blue' }}>Close</Text>
          </TouchableOpacity>
        {/* Filter options for VRHeadset */}
          <View style={styles.filterOptionVR}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pickerLabel}>VR Headset:</Text>
            </View>
            <Switch
              value={filterSpecs.VRHeadset}
              onValueChange={(value) => setFilterSpecs(prev => ({ ...prev, VRHeadset: value }))}
            />
          </View>
        {/* Filter options for CPU */}
          <View style={styles.filterOption}>
            <Text style={styles.pickerLabel}>CPU:</Text>
            <Picker
              selectedValue={filterSpecs.CPU}
              style={styles.picker}
              onValueChange={(itemValue) => setFilterSpecs(prev => ({ ...prev, CPU: itemValue }))}
            >
              {Array.from(new Set(machineData.map(machine => machine.CPU))).map((value, index) => (
                <Picker.Item key={index} label={value} value={value} />
              ))}
            </Picker>
          </View>
        {/* Filter options for RAM */}
          <View style={styles.filterOption}>
            <Text style={styles.pickerLabel}>RAM:</Text>
            <Picker
              selectedValue={filterSpecs.RAM}
              style={styles.picker}
              onValueChange={(itemValue) => setFilterSpecs(prev => ({ ...prev, RAM: itemValue }))}
            >
              {Array.from(new Set(machineData.map(machine => machine.RAM))).map((value, index) => (
                <Picker.Item key={index} label={value} value={value} />
              ))}
            </Picker>
          </View>
        {/* Filter options for GPU */}
          <View style={styles.filterOption}>
            <Text style={styles.pickerLabel}>GPU:</Text>
            <Picker
              selectedValue={filterSpecs.GPU}
              style={styles.picker}
              onValueChange={(itemValue) => setFilterSpecs(prev => ({ ...prev, GPU: itemValue }))}
            >
              {Array.from(new Set(machineData.map(machine => machine.GPU))).map((value, index) => (
                <Picker.Item key={index} label={value} value={value} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  filterModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterModalContent: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 125,
  },
  filterOptionVR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 20,
    flex: 1,
    alignItems: 'center',
    paddingLeft: 1,
  },
  picker: {
    flex: 2,
    height: 50,
    width: 200,
  },
});

export default Filter;
