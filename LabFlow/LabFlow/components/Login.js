import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // Add this line

  useFocusEffect(
    React.useCallback(() => {
        // In react-native (unlike react we maintain a stack when navigating) so we use useFocusEffect to clear the error message
        // when the user navigates away from the Login screen. If we are going backward, the component will be destroyed and this log will be executed, but if you are navigating forward, it’s not going to be executed.
        // Because navigation in React Native is like a stack and keep alive when we go to the next page.
        // So, if we want to execute the return section, even if we are navigating forward, we need to use useFocusEffect 
        setErrorMessage(null);
      }, [])
    );

  const handleLogin = async () => {

    const response = await fetch(
      'https://labflowbackend.azurewebsites.net/api/login?',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      }
    );
    
    if (response.status === 200) {
      // If login is successful, reset the navigation stack and navigate to the Home screen
      // Resetting the navigation stack prevents the user from being able to go back to the Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      setErrorMessage('Invalid username or password'); 
    }
 
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>Don't have an account?</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

export default LoginScreen;
