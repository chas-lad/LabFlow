import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LabInfo from './LabInfo';
import MachineGrid from './MachineGrid';
import Friends from './Friends';
import MachineUsage from './MachineUsage';
import LabSchedule from './LabSchedule';

const Tab = createBottomTabNavigator();

const Home = () => {
  const [reloadComponent, setReloadComponent] = useState(false);

  const reloadTabComponent = () => {
    setReloadComponent(!reloadComponent);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarOnPress: (tab, jumpTo) => {
          // Call reloadTabComponent when a tab is pressed
          reloadTabComponent();
          jumpTo(tab.route.name);
        },
      }}>
      <Tab.Screen name="Lab Info">
        {(props) => <LabInfo {...props} reloadComponent={reloadComponent} />}
      </Tab.Screen>
      <Tab.Screen name="Machine Grid">
        {(props) => <MachineGrid {...props} reloadComponent={reloadComponent} />}
      </Tab.Screen>
      <Tab.Screen name="Friends">
        {(props) => <Friends {...props} reloadComponent={reloadComponent} />}
      </Tab.Screen>
      <Tab.Screen name="Lab Schedule">
        {(props) => <LabSchedule {...props} reloadComponent={reloadComponent} />}
      </Tab.Screen>
      <Tab.Screen name="Machine Use">
        {(props) => <MachineUsage {...props} reloadComponent={reloadComponent} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Home;
