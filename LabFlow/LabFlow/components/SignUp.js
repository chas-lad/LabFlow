import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import bcrypt from 'react-native-bcrypt';


function SignUp({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSignup = async () => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/signUp?',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, hashedPassword, email, firstName, surname }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // If signup is successful, navigate to the Home screen
        navigation.navigate('Home');
        console.log('User registered successfully');
      } else {
        console.error('Error registering user:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={(text) => setSurname(text)}
      />
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
      <TextInput
        placeholder="Email"
        secureTextEntry
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

export default SignUp;
