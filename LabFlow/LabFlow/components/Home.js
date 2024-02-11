///////////////////////////////////////////////////////////
// Title:       Home.js
// Description: Code to manage switching between our tabs
///////////////////////////////////////////////////////////

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LabInfo from './LabInfo';
import MachineGrid from './MachineGrid';
import Friends from './Friends';
import MachineUsage from './MachineUsage';
import LabSchedule from './LabSchedule';

// Import the components for each tab
const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Lab Info" component={LabInfo} />
            <Tab.Screen name="Machine Grid" component={MachineGrid} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Lab Schedule" component={LabSchedule} />
            <Tab.Screen name="Machine Use" component={MachineUsage} />
        </Tab.Navigator>
    );
};

export default Home;

