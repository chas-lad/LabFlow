// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here
    
    console.log('Login:', { username, password });
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LoginScreen;
