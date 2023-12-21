import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const LoginScreen = ({ navigation }) => {
  const { setUser } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
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
      const userInfo = await response.json();
      setUser(userInfo);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <ImageBackground source={require('../assets/login_and_signup_background.png')} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>LabFlow</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Text style={styles.noAccountText}>Don't have an account?</Text>
      
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    width: '100%',
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: 'green', // Customize the button color
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'blue', // Customize the button color
    padding: 5,
    borderRadius: 3,
    width: '50%',
    alignItems: 'center',
  },
  noAccountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default LoginScreen;
