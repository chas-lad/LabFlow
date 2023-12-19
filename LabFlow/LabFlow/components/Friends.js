import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Friends = () => {
    const [friendName, setFriendName] = useState('');
    const [users, setUsers] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);

    // Fetch all users from database when comoonent mounts for the first time
    // and store them in the users array. We don't want to fetch the users
    // each time the user types a letter in the input field.
    useEffect(() => {
    const fetchUsersFromDatabase = async () => {
        try {
          const response = await fetch(
            'https://labflowbackend.azurewebsites.net/api/users?',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          const fetchedUsers = await response.json();
          setUsers(fetchedUsers);
  
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsersFromDatabase();
    }, [])
    
    const handleFriendNameChange = (text) => {
        setFriendName(text);
        // Perform logic to find friends that match the text inputted so far by
        // using the firstName and surName fields of the users in the users array
        const matchedUsers = [];
        users.forEach((user) => {
            // If the user's first name or surname or entire name contains the text inputted so far,
            // add the user to the matchedUsers array
            if (user.firstName.toLowerCase().includes(text.toLowerCase()) ||
                user.surname.toLowerCase().includes(text.toLowerCase())   ||
                (user.firstName + ' ' + user.surname).toLowerCase().includes(text.toLowerCase())) {
                matchedUsers.push(user);
            }
        });

        setMatchedUsers(matchedUsers);
    };

    console.log(matchedUsers)
    const handleAddFriend = () => {
        // Perform logic to add friend to your data structure
        // Reset the input field and matched friends list
        setFriendName('');
        setMatchedFriends([]);
    };

    return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Enter a user to add as a friend</Text>
          <TextInput
            value={friendName}
            onChangeText={handleFriendNameChange}
            placeholder="Type a friend's name"
            style={styles.input}
          />
          <FlatList
            data={friendName && matchedUsers.map((user) => user.firstName + ' ' + user.surname)}
            renderItem={({ item }) => <Text style={styles.matchedUserText}>{item}</Text>}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
      },
      flatList: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
      },
      matchedUserText: {
        fontSize: 18,
        marginBottom: 15,
      },
    });
    
    export default Friends;