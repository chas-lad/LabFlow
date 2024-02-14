///////////////////////////////////////////////////////////
// Title:       SignUp.js
// Description: Code to display the sign up form and
//              capture user's details.
///////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext'; 

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const SignUp = ({ navigation }) => {
  const { setUser } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');

  // Functions to handle validation of user input
  const validateFirstName = (name) => {
    const isValid = /^[a-zA-Z-]{1,50}$/.test(name);
    setFirstNameError(isValid ? '' : 'First name must be 1-50 characters and only contain letters and hyphens');
    return isValid;
  };

  const validateSurname = (name) => {
    const isValid = /^[a-zA-Z-]{1,50}$/.test(name);
    setSurnameError(isValid ? '' : 'Surname must be 1-50 characters and only contain letters and hyphens');
    return isValid;
  };

  const validateEmail = (email) => {
    const isValid = /^[^\s@]{1,50}@[^\s@]+\.[^\s@]{2,}$/.test(email);
    setEmailError(isValid ? '' : 'Invalid email');
    return isValid;
  };

  const validateUserName = (userName) => {
    const isValid = /^[^\s]{1,50}$/.test(userName);
    setUserNameError(isValid ? '' : 'Username must be 1-50 characters and cannot contain spaces');
    return isValid;
  };

  const validatePassword = (password) => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,72}$/.test(password);
    setPasswordError(isValid ? '' : 'Password must be 14-72 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    return isValid;
  };

  // Function to handle user sign up
  const handleSignup = async () => {
    try {
      if (!validateFirstName(firstName) || !validateSurname(surname) || !validateEmail(email) || !validateUserName(userName) || !validatePassword(password)) {
        return;
      }

      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/signUp?',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify({ firstName, surname, email, userName, password }),
        }
      );
      
      if (response.status === 200) {
        const userInfo = await response.json();
        setUser(userInfo);
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else if(response.status === 409) {
        setUserNameError('Username already exists');
      } else {
        console.error('Error registering user, error code: ', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/login_and_signup_background.png')} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>LabFlow</Text>
      <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} />
      {firstNameError ? <Text style={styles.error}>{firstNameError}</Text> : null}
      <TextInput style={styles.input} placeholder="Surname" onChangeText={setSurname} />
      {surnameError ? <Text style={styles.error}>{surnameError}</Text> : null}
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUserName} />
      {userNameError ? <Text style={styles.error}>{userNameError}</Text> : null}
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry={true} />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      {/* Custom button */}
      <TouchableOpacity style={styles.customButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
      
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
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
    borderRadius: 5,
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
  customButton: {
    backgroundColor: 'green', 
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'blue', 
    padding: 5,
    borderRadius: 3,
    width: '50%',
    alignItems: 'center',
  },
  alreadyHaveAccountText: {
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

export default SignUp;
