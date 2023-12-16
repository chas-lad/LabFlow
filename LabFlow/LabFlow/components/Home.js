import React from 'react';
import { View, Text, Button } from 'react-native';

function Home({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

export default Home;
