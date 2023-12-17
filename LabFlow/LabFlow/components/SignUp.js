import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function SignUp({ navigation }) {
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


  const handleSignup = async () => {
    try {
      // Validate code before sending to server
      if (!validateFirstName(firstName) || !validateSurname(surname) || !validateEmail(email) || !validateUserName(userName) || !validatePassword(password)) {
        return;
      }

      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/signUp?',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, surname, email, userName, password }),
        }
      );
      
      if (response.status === 200) {
        // If signup is successful, reset the navigation stack and navigate to the Home screen
        // Resetting the navigation stack prevents the user from being able to go back to the Login or SignUp screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        console.error('Error registering user, error code: ', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder="First Name" onChangeText={setFirstName} />
      {firstNameError ? <Text>{firstNameError}</Text> : null}
      <TextInput placeholder="Surname" onChangeText={setSurname} />
      {surnameError ? <Text>{surnameError}</Text> : null}
      <TextInput placeholder="Email" onChangeText={setEmail} />
      {emailError ? <Text>{emailError}</Text> : null}
      <TextInput placeholder="Username" onChangeText={setUserName} />
      {userNameError ? <Text>{userNameError}</Text> : null}
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true} />
      {passwordError ? <Text>{passwordError}</Text> : null}
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

export default SignUp;
